import Text from './../core/component/text';
import MultiStyleText from "../core/component/multiStyleText";


class TextAnimation2 {
    private _text : Text | MultiStyleText = null;

    private textMetrics : PIXI.TextMetrics = null;

    private graphic : PIXI.Graphics = new PIXI.Graphics();
    private _t : number = 0;
    private _maxLength : number = 0;
    private _isPlay : boolean = false;
    private _speed : number = 0;

    private _finishCall : Function = null;

    constructor( text : Text | MultiStyleText ) {
        this._text = text;

        this._text.gameObject.addChild( this.graphic );
        this._text.originText.mask = this.graphic;

    }

    start( call : Function, speed : number = 500 ) {
        this._speed = speed;
        this._finishCall = call;
        this._isPlay = true;
        this._t = 0;
        this._maxLength = 0;

        this.textMetrics = PIXI.TextMetrics.measureText( this._text.text, this._text.originText.style );

        for( let i = 0; i < this.textMetrics.lineWidths.length; i++ ) {
            this._maxLength += this.textMetrics.lineWidths[i];
        }
    }

    skip() {
        if( !this._isPlay ) return;
        this._isPlay = false;
        this._t = this._maxLength;
        this.updateGraphic();
    }

    update( delta : number ) {
        if( !this._isPlay ) return;

        this._t += delta * this._speed;
        this.updateGraphic();
        if( this._t >= this._maxLength ) {
            this._isPlay = false;
            const temp = this._finishCall;
            this._finishCall = null;
            temp && temp();
        }
    }

    updateGraphic() {

        this.graphic.clear();
        this.graphic.beginFill( 0xffffff, 1 );

        const height = this.textMetrics.lineHeight;
        let sumWidth = 0;
        for( let i = 0; i < this.textMetrics.lineWidths.length; i++ ) {
            let width = this.textMetrics.lineWidths[i];
            if( sumWidth + width <= this._t ) {
                this.graphic.drawRect( -this.textMetrics.lineWidths[i] + width, height * i, this.textMetrics.lineWidths[i], height );
                sumWidth += width;
            }
            else {
                width = this._t - sumWidth;
                this.graphic.drawRect( -this.textMetrics.lineWidths[i] + width, height * i, this.textMetrics.lineWidths[i], height );
                break;
            }
        }
    }
}

export default TextAnimation2;