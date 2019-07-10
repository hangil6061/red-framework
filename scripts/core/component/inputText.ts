import ComponentBase from "../componentBase";
import {SYSTEM_EVENT} from "../systemConsts";

class InputText extends ComponentBase {
    private _element : HTMLInputElement | HTMLTextAreaElement = null;
    private _style : CSSStyleDeclaration = null;
    private _size : PIXI.Point = new PIXI.Point( 150, 16 );
    private _fontSize : number = 14;
    private _pivot : PIXI.Point = new PIXI.Point();

    private bindResize = this.resize.bind(this);

    constructor( gameObject ) {
        super( gameObject );
    }

    get value() : string {
        return this._element.value;
    }

    get element(): HTMLInputElement | HTMLTextAreaElement {
        return this._element;
    }

    create( type ) {
        if( type === 'input' ) {
            this._element = window.document.createElement( 'input' );
        }
        else if( type === 'textArea' ) {
            this._element = <HTMLTextAreaElement>window.document.createElement( 'textArea' );
        }

        window.document.body.appendChild( this._element );
        this._style = this._element.style;

        this._style.position = 'absolute';
        this._style.border = '0px';
        this._style.color = '#ffffff';
        this._style.backgroundColor = 'transparent';
        this._style.resize = 'none';
        this._style.outlineColor = '#000000';
        this._style.outlineWidth = '0px';
        this._style.textAlign = 'center';

        this._element.style.display = "none";
    }

    onEnable() {
        this._element.style.display = "";
        this.game.event.on( SYSTEM_EVENT.onResize, this.bindResize );
        this.resize();
    }

    onDisable() {
        this._element.style.display = "none";
        this.game.event.off( SYSTEM_EVENT.onResize, this.bindResize );
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );

        const type = jsonData.lineType === 'SingleLine' ? 'input' : 'textArea';
        this.create( type );
        this._fontSize = jsonData.fontSize;
        this._size.x = jsonData.width;
        this._size.y = jsonData.height;
        this._pivot.x = jsonData.pivot.x;
        this._pivot.y = jsonData.pivot.y;
        this._element.placeholder = jsonData.placeholder;
        this._style.color = '#' + jsonData.fontColor;
        this._style.textAlign = jsonData.textAlign || 'left';

        if( jsonData.font && jsonData.font !== '') {
            this._style.fontFamily = jsonData.font;
        }

        if( this._element instanceof HTMLInputElement )
        {
            switch ( jsonData.contentType )
            {
                case 'Password' :
                    this._element.type = 'password';
                    break;
                case 'IntegerNumber':
                    this._element.type = 'number';
                    break;
                case 'DecimalNumber':
                    this._element.type = 'number';
                    break;
                default :
                    this._element.type = 'text';
                    break;
            }
        }
    }

    resize() {
        const globalPos = this.gameObject.getGlobalPosition();
        const screenRatio = this.game.render.screenRatio;
        const x = (globalPos.x + (-this._size.x * this._pivot.x)) * screenRatio;
        const y = (globalPos.y + (-this._size.y * this._pivot.y)) * screenRatio;
        this._style.left = `${this.game.render.position.x + x}px`;
        this._style.top = `${this.game.render.position.y + y}px`;
        this._style.width = `${this._size.x * screenRatio}px`;
        this._style.height = `${this._size.y * screenRatio}px`;
        this._style.fontSize = `${this._fontSize * screenRatio}px`;
    }
}

export default InputText;
