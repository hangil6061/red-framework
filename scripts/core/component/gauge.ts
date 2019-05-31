import Sprite from "./sprite";

enum FillType {
    horizontal,
    radial360
}

class Gauge extends Sprite {
    private readonly _mask : PIXI.Graphics = null;
    private _width : number = 0;
    private _height : number = 0;

    private _fillType : FillType = FillType.horizontal;
    private _fillAnticlockwise : boolean = true;
    private _startAngle = 270;

    constructor( gameObject ) {
        super( gameObject );
        this._mask = new PIXI.Graphics();
        this.sprite.addChild(this._mask);
        this.sprite.mask = this._mask;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        this._fillType = jsonData.filledType === 'radial360' ? FillType.radial360 : FillType.horizontal;
        this._fillAnticlockwise = !jsonData.fillClockwise;
        this._width = this.texture.width;
        this._height = this.texture.height;
        this.setValue( 1, 1 );
    }

    setValue (crt, max)
    {
        this._mask.clear();

        if( this._fillType === FillType.horizontal ) {
            this._mask.beginFill( 0xffffff );
            this._mask.drawRect(
                -this._width * this.sprite.anchor.x,
                -this._height * this.sprite.anchor.y,
                this._width * crt / max,
                this._height );
        }
        else if( this._fillType === FillType.radial360 ) {
            this._mask.clear();

            const rad = Math.PI / 180;
            const s = this._startAngle * rad;
            const e = s + ( 360 - 360 * ( crt / max  )) * rad;

            if( crt >= max || max === 0){
                this._mask.beginFill( 0xffffff );
                this._mask.arc(0, 0, (this._width/4), 0, Math.PI * 2, this._fillAnticlockwise);
            }
            else {
                this._mask.lineStyle( this._width/2,0xffffff );
                this._mask.arc(0, 0, (this._width/4), s, e, this._fillAnticlockwise);
            }
        }
    }
}

export default Gauge;
