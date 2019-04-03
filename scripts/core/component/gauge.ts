import Sprite from "./sprite";

class Gauge extends Sprite {
    private readonly _mask : PIXI.Graphics = null;
    private _width : number = 0;
    private _height : number = 0;

    constructor( gameObject ) {
        super( gameObject );
        this._mask = new PIXI.Graphics();
        this.sprite.addChild(this._mask);
        this.sprite.mask = this._mask;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        this._width = this.texture.width;
        this._height = this.texture.height;
        this.setValue( 1, 1 );
    }

    setValue (crt, max)
    {
        this._mask.clear();
        this._mask.beginFill( 0xffffff );
        this._mask.drawRect(
            -this._width * this.sprite.anchor.x,
            -this._height * this.sprite.anchor.y,
            this._width * crt / max,
            this._height );
    }
}

export default Gauge;
