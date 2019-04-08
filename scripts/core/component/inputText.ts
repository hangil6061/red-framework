import ComponentBase from "../componentBase";
import {SYSTEM_EVENT} from "../systemConsts";

class InputText extends ComponentBase {
    private element : HTMLInputElement | HTMLTextAreaElement = null;
    private style : CSSStyleDeclaration = null;
    private size : PIXI.Point = new PIXI.Point( 150, 16 );
    private fontSize : number = 14;
    private pivot : PIXI.Point = new PIXI.Point();

    private bindResize = this.resize.bind(this);

    constructor( gameObject ) {
        super( gameObject );
    }

    create( type ) {
        if( type === 'input' ) {
            this.element = window.document.createElement( 'input' );
        }
        else if( type === 'textArea' ) {
            this.element = <HTMLTextAreaElement>window.document.createElement( 'textArea' );
        }

        window.document.body.appendChild( this.element );
        this.style = this.element.style;

        this.style.position = 'absolute';
        this.style.border = '0px';
        this.style.color = '#ffffff';
        this.style.backgroundColor = 'transparent';
        this.style.resize = 'none';
        this.style.outlineColor = '#000000';
        this.style.outlineWidth = '0px';

        this.element.style.display = "none";
    }

    onEnable() {
        this.element.style.display = "";
        this.game.event.on( SYSTEM_EVENT.onResize, this.bindResize );
        this.resize();
    }

    onDisable() {
        this.element.style.display = "none";
        this.game.event.off( SYSTEM_EVENT.onResize, this.bindResize );
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );

        const type = jsonData.lineType === 'SingleLine' ? 'input' : 'textArea';
        this.create( type );
        this.fontSize = jsonData.fontSize;
        this.size.x = jsonData.width;
        this.size.y = jsonData.height;
        this.pivot.x = jsonData.pivot.x;
        this.pivot.y = jsonData.pivot.y;
        this.element.placeholder = jsonData.placeholder;
        this.style.color = '#' + jsonData.fontColor;

        if( this.element instanceof HTMLInputElement )
        {
            switch ( jsonData.contentType )
            {
                case 'Password' :
                    this.element.type = 'password';
                    break;
                case 'IntegerNumber':
                    this.element.type = 'number';
                    break;
                case 'DecimalNumber':
                    this.element.type = 'number';
                    break;
                default :
                    this.element.type = 'text';
                    break;
            }
        }
    }

    resize() {
        const globalPos = this.gameObject.getGlobalPosition();
        const screenRatio = this.game.render.screenRatio;
        const x = (globalPos.x + (-this.size.x * this.pivot.x)) * screenRatio;
        const y = (globalPos.y + (-this.size.y * this.pivot.y)) * screenRatio;
        this.style.left = `${this.game.render.position.x + x}px`;
        this.style.top = `${this.game.render.position.y + y}px`;
        this.style.width = `${this.size.x * screenRatio}px`;
        this.style.height = `${this.size.y * screenRatio}px`;
        this.style.fontSize = `${this.fontSize * screenRatio}px`;
    }
}

export default InputText;
