import ComponentBase from "../componentBase";
import GameObject from "../gameObject";
import Sprite from "./sprite";
import InteractionEvent = PIXI.interaction.InteractionEvent;

class Scroll extends ComponentBase {
    private _area : GameObject = null;
    private _barBG : Sprite = null;
    private _bar : Sprite = null;

    private _isOver : boolean = false;
    private _isDown : boolean = false;
    private _prePointerPosition : PIXI.Point = new PIXI.Point();

    private _moveDelta : number = 4;

    private _bindOnDown = this._onDown.bind(this);
    private _bindOnOver = this._onOver.bind(this);
    private _bindOnOut = this._onOut.bind(this);
    private _bindOnUp = this._onUp.bind(this);
    private _bindOnMove = this._onMove.bind(this);
    private _bindWheel = this._onMouseWheel.bind(this);

    private _scrollRect : {
        top : number, bottom : number, left : number, right: number,
        width : number, height : number
    } = {
        top : 0,
        bottom : 0,
        left : 0,
        right : 0,
        width : 0,
        height : 0,
    };

    constructor( gameObject ) {
        super( gameObject );
    }

    start() {
        this.refresh();
    }


    refresh( isBottom = false, fixed = false ) {
        if( this._area.height > this._scrollRect.height ) {
            if( this._bar && this._barBG ){
                this._bar.activeSelf = true;
                this._barBG.activeSelf = true;
            }
        }
        else {
            if( this._bar && this._barBG ) {
                this._barBG.activeSelf = false;
                this._bar.activeSelf = false;
            }
        }

        if(!fixed)
        {
            if( isBottom && this._area.height > this._scrollRect.height ) {
                this._area.y = this._scrollRect.bottom - this._area.height;
            }
            else {
                this._area.y = this._scrollRect.top;
            }
        }

        this._updateBar();
    }

    addItem( gameObject : GameObject, addHeight : number = 0 ) {
        if (this._area.children.length === 0)
        {
            addHeight = 0;
        }

        gameObject.position.y = this._area.height + addHeight;
        this._area.addChild( gameObject );
    }

    onEnable() {
        window.addEventListener("mouseup", this._bindOnUp, false);
        window.addEventListener("touchend", this._bindOnUp, false);
        window.addEventListener("mousewheel", this._bindWheel, false);
    }

    onDisable() {
        window.removeEventListener("mouseup", this._bindOnUp, false);
        window.removeEventListener("touchend", this._bindOnUp, false);
        window.removeEventListener("mousewheel", this._bindWheel, false);
    }

    _updateBar() {
        if( !this._bar || !this._barBG ) return;
        const value = ( this._scrollRect.top - this._area.y ) / ( this._area.height - this._scrollRect.height );
        this._bar.height = this._barBG.height * ( this._scrollRect.height / this._area.height );
        this._bar.gameObject.y = this._barBG.gameObject.y + (( this._barBG.height - this._bar.height ) * value);
    }

    _onOver(e: InteractionEvent) {
        this._isOver = true;
    }

    _onOut(e: InteractionEvent) {
        this._isOver = false;
    }

    _onDown(e : InteractionEvent) {
        this._isDown = true;
        this._prePointerPosition.copy( e.data.global );
    }

    _onUp(e: InteractionEvent) {
        this._isDown = false;
    }

    _onMove(e: InteractionEvent) {
        if( !this._isDown || this._area.height <= this._scrollRect.height ) return;

        const moveY = e.data.global.y - this._prePointerPosition.y;
        this._area.y += moveY;

        if( moveY < 0 ) {
            if( this._area.y + this._area.height < this._scrollRect.bottom ) {
                this._area.y = this._scrollRect.bottom - this._area.height;
            }
        }
        else {
            if( this._area.y > this._scrollRect.top ) {
                this._area.y = this._scrollRect.top;
            }
        }
        this._updateBar();
        this._prePointerPosition.copy( e.data.global );
    }

    _onMouseWheel( e ) {
        if( !this._isOver || this._area.height <= this._scrollRect.height ) return;
        const delta = e.deltaY || -e.wheelDelta;

        if( delta > 0 ) {
            this._area.y -= this._moveDelta;
            if( this._area.y + this._area.height < this._scrollRect.bottom ) {
                this._area.y = this._scrollRect.bottom - this._area.height;
            }
        }
        else {
            this._area.y += this._moveDelta;
            if( this._area.y > this._scrollRect.top ) {
                this._area.y = this._scrollRect.top;
            }
        }
        this._updateBar();
    }

    load( jsonData, tempData ) {
        super.load(jsonData, tempData);
    }

    loadInit( jsonData, tempData ) {
        this._area = tempData[ jsonData.area ];
        this._area.interactive = true;
        this._area
            .on('pointerover', this._bindOnOver)
            .on('pointerout', this._bindOnOut)
            .on('pointerdown', this._bindOnDown)
            .on('pointerup', this._bindOnUp)
            .on('pointermove', this._bindOnMove);

        const maskObject = tempData[ jsonData.mask ];
        let width = 0;
        let height = 0;

        if( !maskObject ) {
            width = jsonData.size.x;
            height = jsonData.size.y;

            const mask = new PIXI.Graphics();
            mask.beginFill(0xffffff);
            mask.drawRect( 0,0, width, height );
            mask.position.set( this._area.x, this._area.y );
            this.gameObject.addChild( mask );
            this._area.mask = mask;
        }
        else {
            this._area.mask = (maskObject as GameObject).getComponent<Sprite>('sprite').sprite;
            width = this._area.mask.width;
            height = this._area.mask.height;
        }

        const bar = tempData[ jsonData.bar ];
        const barBG = tempData[ jsonData.barBG ];
        if( bar ) {
            this._bar = bar;
        }

        if( barBG ) {
            this._barBG = barBG;
        }

        this._scrollRect.top = this._area.y;
        this._scrollRect.bottom = this._area.y + height;
        this._scrollRect.left = this._area.x;
        this._scrollRect.right = this._area.x + width;
        this._scrollRect.width = width;
        this._scrollRect.height = height;

        // this.refresh();
    }
}

export default Scroll;
