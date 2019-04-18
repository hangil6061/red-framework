import ComponentBase from "../componentBase";

class PaintArea extends ComponentBase {
    private _graphic : PIXI.Graphics = new PIXI.Graphics();
    private _mask : PIXI.Graphics = new PIXI.Graphics();
    private _thickness : number = 1;
    private _color : number = 0x000000;
    private _isDown : boolean = false;
    private _inSide : boolean = false;
    private _prePosition : PIXI.Point = new PIXI.Point();
    private _point : PIXI.Point = new PIXI.Point();

    constructor( gameObject ) {
        super( gameObject );
        this._graphic.visible = false;
        this.gameObject.addChild( this._graphic );
        this._graphic.addChild( this._mask );
        this._graphic.mask = this._mask;

        this._graphic
            .on( 'pointerdown', this.onPointerDown.bind(this) )
            .on( 'pointerup', this.onPointerUp.bind(this) )
            .on( 'pointerupoutside', this.onPointerUp.bind(this) )
            .on( 'pointerover', this.onPointerOver.bind(this) )
            .on( 'pointerout', this.onPointerOut.bind(this) )
            .on( 'pointermove', this.onPointerMove.bind(this) )
    }


    onEnable() {
        this._graphic.visible = true;
    }

    onDisable() {
        this._graphic.visible = false;
    }

    clear() {
        this._graphic.clear();
        this._graphic.lineStyle(this._thickness, this._color, 1);
        this._graphic.beginFill(this._color);
    }

    load( jsonData, tempData ) {
        super.load(jsonData, tempData);

        this._mask.beginFill(0xffffff);
        this._mask.drawRect(
            -jsonData.size.x * jsonData.pivot.x,
            -jsonData.size.y * jsonData.pivot.y,
            jsonData.size.x, jsonData.size.y );
        this._color = parseInt( '0x' + jsonData.color );
        this._thickness = jsonData.thickness;
        this._graphic.hitArea = new PIXI.Rectangle(
            -jsonData.size.x * jsonData.pivot.x,
            -jsonData.size.y * jsonData.pivot.y,
            jsonData.size.x, jsonData.size.y );
        this._graphic.interactive = true;
        this.clear();
    }

    onPointerDown( e ) {
        this._inSide = true;
        this._isDown = true;
        this._prePosition = e.data.getLocalPosition(this._graphic, this._prePosition);
        this._graphic.drawCircle(this._prePosition.x, this._prePosition.y, 1);
    }

    onPointerUp() {
        this._isDown = false;
    }

    onPointerOver() {
        if(this._isDown)
        {
            this._inSide = true;
        }
    }

    onPointerOut() {
        this._inSide = false;
    }

    onPointerMove(e) {
        if( !this._isDown ) return;

        e.data.getLocalPosition(this._graphic, this._point);
        if( this._inSide ) {
            this._graphic.moveTo(this._prePosition.x, this._prePosition.y);
            this._graphic.lineTo(this._point.x, this._point.y);
        }
        this._prePosition.copy( this._point );
    }
}

export default PaintArea;
