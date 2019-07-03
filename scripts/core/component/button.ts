import ComponentBase from "../componentBase";
import Sprite from "./sprite";

const _state = {
    normal : 0,
    highlight : 1,
    press : 2,
    disable : 3
};

const _transitionType = {
    None : 'None',
    ColorTint : 'ColorTint',
    SpriteSwap : 'SpriteSwap',
    Animation : 'Animation',
};

class Button extends ComponentBase {

    public event : PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();

    public normalCall = null;
    public overCall = null;
    public pushCall = null;
    public outCall = null;
    public onOffCall = null;

    private _actionCall = null;
    private _targetSprite : Sprite = null;
    private _colors : number[] = [0xffffff, 0xffffff, 0xffffff, 0xffffff];
    private _textures : PIXI.Texture[] = [ null, null, null, null ];
    private _state = _state.normal;
    private _transitionType = _transitionType.None;

    private _isDown = false;
    private _isOn = true;
    private _isOver = false;

    private _tempPoint = new PIXI.Point();

    private _bind : {name:string, bind}[] = [];

    public static Event : PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();

    constructor( gameObject ) {
        super( gameObject );

        this._bind.push( { name : 'touchstart', bind : this.onTouchStart.bind(this) } );
        this._bind.push( { name : 'touchmove', bind : this.onTouchMove.bind(this) } );
        this._bind.push( { name : 'pointerdown', bind : this.onPointerDown.bind(this) } );
        this._bind.push( { name : 'pointerup', bind : this.onPointerUp.bind(this) } );
        this._bind.push( { name : 'pointerupoutside', bind : this.onPointerUp.bind(this) } );
        this._bind.push( { name : 'pointerover', bind : this.onPointerOver.bind(this) } );
        this._bind.push( { name : 'pointerout', bind : this.onPointerOut.bind(this) } );
    }

    public set actionCall(call) {
        this._actionCall = call;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );

        this._transitionType = _transitionType[jsonData.transition];

        this._colors[_state.normal] = parseInt('0x' + jsonData.normalColor);
        this._colors[_state.highlight] = parseInt('0x' + jsonData.highlightedColor);
        this._colors[_state.press] = parseInt('0x' + jsonData.pressedColor);
        this._colors[_state.disable] = parseInt('0x' + jsonData.disabledColor);

        this._textures[_state.normal] = PIXI.Texture.fromImage(jsonData.normalSprite);
        this._textures[_state.highlight] = jsonData.highlightedSprite === '' ?
            this._textures[_state.normal] : PIXI.Texture.fromImage(jsonData.highlightedSprite);
        this._textures[_state.press] = jsonData.pressedSprite === '' ?
            this._textures[_state.normal] : PIXI.Texture.fromImage(jsonData.pressedSprite);
        this._textures[_state.disable] =jsonData.disabledSprite === '' ?
            this._textures[_state.normal] : PIXI.Texture.fromImage(jsonData.disabledSprite);
    }

    loadInit( jsonData, tempData ) {
        super.loadInit( jsonData, tempData );
        const targetID = jsonData.imageInstanceID;
        this.setTargetSprite( tempData[ targetID ] );
        this.spriteUpdate( _state.normal )
    }

    // private onClick() {
    //     this._clickCall && this._clickCall();
    // }

    private spriteUpdate( state ) {
        this._state = state;
        switch ( this._transitionType ) {
            case _transitionType.None:
                break;
            case _transitionType.ColorTint:
                this._targetSprite.color = this._colors[ this._state ];
                break;
            case _transitionType.SpriteSwap:
                this._targetSprite.texture = this._textures[ this._state ];
                break;
            case _transitionType.Animation:
                break;
        }
    }

    private onTouchStart( e ) {
        if( !this._isOn ) return;
        this._isDown = true;
        this.spriteUpdate(_state.press);
        this.pushCall && this.pushCall();
    }

    private onTouchMove(e) {

        if(!this._isDown) return;

        let hit = false;
        const point = e.data.global;
        if (this._targetSprite.sprite.hitArea)
        {
            this._targetSprite.sprite.worldTransform.applyInverse(point, this._tempPoint);
            if (this._targetSprite.sprite.hitArea.contains(this._tempPoint.x, this._tempPoint.y))
            {
                hit = true;
            }
        }
        else if (this._targetSprite.sprite.containsPoint)
        {
            if (this._targetSprite.sprite.containsPoint(point)) {
                hit = true;
            }
        }

        if(!hit)
        {
            this._isOver = false;
            this._isDown = false;
            this.spriteUpdate(_state.normal);
            if(this.normalCall)
            {
                this.normalCall();
            }

            this.outCall && this.outCall();
        }
    }

    private onPointerDown(e) {
        if( !this._isOn || !this._isOver) return;

        this._isDown = true;
        this.spriteUpdate( _state.press );
        this.pushCall && this.pushCall();
    }

    private onPointerUp(e) {

        if( !this._isOn ) return;

        if (this._isOver) {
            this.spriteUpdate( _state.highlight );
            this.overCall && this.overCall();
        }
        else {
            this.spriteUpdate( _state.normal );
            this.normalCall && this.normalCall();
        }

        if( this._isDown ) {
            this._isDown = false;
            Button.Event.emit('beforeAction');
            this.event.emit('beforeAction');
            this._actionCall && this._actionCall(e);
            this.event.emit('actionAfter');
            Button.Event.emit('actionAfter');
        }
    }

    private onPointerOver(e) {
        if( !this._isOn ) return;
        this._isOver = true;

        if (this._isDown) return;
        if( this.game.input.getPointer() ) {
            return;
        }

        this.spriteUpdate( _state.highlight );
        this.overCall && this.overCall();
    }

    private onPointerOut() {
        if( !this._isOn ) return;

        this._isOver = false;
        this._isDown = false;
        this.spriteUpdate( _state.normal );
        this.normalCall && this.normalCall();
        this.outCall && this.outCall();
    }

    public setTargetSprite( sprite : Sprite ) {

        this.off();
        this._targetSprite = sprite;
        this.on();
    }

    public setOnOff( isOn : boolean ) {
        if( isOn ) {
            this.on();
            this.onOffCall( true );
        }
        else {
            this.off();
            this.onOffCall( false );
        }

        this._isOn = isOn;
    }

    private on() {
        if( this._targetSprite ){
            const sprite = this._targetSprite.sprite;
            sprite.interactive = true;
            for( let i = 0; i < this._bind.length; i++ ) {
                const bindData = this._bind[i];
                sprite.on( bindData.name, bindData.bind );
            }
            this.spriteUpdate( _state.normal );
        }
    }

    private off() {
        if( this._targetSprite ){
            const sprite = this._targetSprite.sprite;
            sprite.interactive = false;
            for( let i = 0; i < this._bind.length; i++ ) {
                const bindData = this._bind[i];
                sprite.off( bindData.name, bindData.bind );
            }

            this.spriteUpdate( _state.disable );
        }
    }

}

export default Button;
