import PixiMultiStyleText, {ExtendedTextStyle} from 'pixi-multistyle-text';
import ComponentBase from "../componentBase";

class MultiStyleText extends ComponentBase {
    private readonly _text : PixiMultiStyleText = null;

    constructor( gameObject ) {
        super( gameObject );
        this._text = new PixiMultiStyleText('', {
            'default' : {}
        });
        this.gameObject.addChild( this._text );
        this._text.visible = false;
    }

    get originText() : PixiMultiStyleText {
        return this._text;
    }

    get text() : string {
        return this._text.text;
    }

    set text(text) {
        text = text.split('\r').join('');
        this._text.text = text;
    }

    get color() {
        return this._text.style.fill;
    }

    set color( color : string | string[] | number | number[] | CanvasGradient | CanvasPattern ) {

        this.style.fill = '#ff0000';
        this._text.style.fill = '#ff0000';
        //@ts-ignore
        this._text._style.fill = '#ff0000';
    }

    get alpha() {
        return this._text.alpha;
    }

    set alpha( alpha) {
        this._text.alpha = alpha;
    }

    get style() {
        return this._text['textStyles'].default;
    }

    // setStyle( name : string, option : ExtendedTextStyle ) {
    //
    //     const style = this.style.clone();
    //
    //     for( let o in option ) {
    //         style[o] = option[o];
    //     }
    //
    //     this._text.setTagStyle( name,  style );
    // }

    onEnable() {
        this._text.visible = true;
    }

    onDisable() {
        this._text.visible = false;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        const align = jsonData.alignment.replace( 'Upper', '' ).replace( 'Middle', '' ).replace( 'Lower', '' ).toLowerCase();
        const style = new PIXI.TextStyle( {
            align,
            fontFamily : jsonData.font,
            fontSize : jsonData.fontSize,
            fill : "#" + jsonData.color,
            wordWrap : jsonData.width !== 0,
            wordWrapWidth : jsonData.width
        } );

        if( jsonData.strokeThickness > 0 ) {
            style.strokeThickness = jsonData.strokeThickness * 2;
            style.stroke = "#" + jsonData.strokeColor;
        }

        const styles = {default : style};
        if( jsonData.styles.length > 0 ) {
            for( let i = 0; i < jsonData.styles.length; i++ ) {
                const data = jsonData.styles[i];
                const style = new PIXI.TextStyle( {
                    align : data.alignment.replace( 'Upper', '' ).replace( 'Middle', '' ).replace( 'Lower', '' ).toLowerCase(),
                    fontFamily : data.font,
                    fontSize : data.fontSize,
                    fill : "#" + data.color,
                } );
                styles[ data.name ] = style;
            }
        }

        this._text.styles = styles;
        this._text.text = jsonData.text;
        this._text.anchor.set( jsonData.pivot.x, jsonData.pivot.y );



    }
}

export default MultiStyleText;
