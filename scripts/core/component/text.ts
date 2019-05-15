import ComponentBase from "../componentBase";

class Text extends ComponentBase {
    private readonly _text : PIXI.Text = null;

    constructor( gameObject ) {
        super( gameObject );
        this._text = new PIXI.Text();
        this.gameObject.addChild( this._text );
        this._text.visible = false;
    }

    get originText() : PIXI.Text {
        return this._text;
    }

    get text() : string {
        return this._text.text;
    }

    set text(text) {
        this._text.text = text;
    }

    get color() {
        return this._text.style.fill;
    }

    set color( color) {
        this._text.style.fill = color;
    }

    get alpha() {
        return this._text.alpha;
    }

    set alpha( alpha) {
        this._text.alpha = alpha;
    }

    get style() {
        return this._text.style;
    }

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

        this._text.style = style;
        this._text.text = jsonData.text;
        this._text.anchor.set( jsonData.pivot.x, jsonData.pivot.y );

        if( jsonData.strokeThickness > 0 ) {
            this._text.style.strokeThickness = jsonData.strokeThickness * 2;
            this._text.style.stroke = "#" + jsonData.strokeColor;
        }

    }
}

export default Text;
