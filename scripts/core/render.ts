import { RESIZE_TYPE, SYSTEM_EVENT } from "./systemConsts";
import Game from "./game";

class Render  {
    public width : number = 960;
    public height : number = 540;
    public baseWidth : number = 960;
    public baseHeight : number = 540;
    public maxWidth : number = 960;
    public maxHeight : number = 540;
    public minWidth : number = 960;
    public minHeight : number = 540;
    public halfWidth : number = 480;
    public halfHeight : number = 270;
    public viewWidth : number = 540;
    public viewHeight : number = 960;
    public position : { x : number, y: number } = { x:0, y:0 };


    public  game : Game = null;
    public renderer : PIXI.WebGLRenderer | PIXI.CanvasRenderer  = null;
    public view : HTMLCanvasElement = null;
    private resizeType : string = RESIZE_TYPE.responsive;
    private resizeFuncArr : {} = {};

    // '게임화면'에 대한 '실제화면' 비율
    public get screenRatio() {
        return this.viewHeight / this.height;
    }


    constructor( config, game ) {
        this.width = config.width || this.width;
        this.height = config.height || this.height;
        this.baseWidth = this.width;
        this.baseHeight = this.height;
        this.maxWidth = config.maxWidth || this.width;
        this.maxHeight = config.maxHeight || this.height;
        this.minWidth = config.minWidth || this.width;
        this.minHeight = config.minHeight || this.height;
        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
        this.viewWidth = config.width;
        this.viewHeight = config.height;
        this.resizeType = config.resizeType || this.resizeType;

        this.game = game;

        this.renderer = PIXI.autoDetectRenderer( config );
        this.view = this.renderer.view;
        window.document.body.appendChild( this.view );

        for( let type in RESIZE_TYPE )
        {
            const funcName = `_resize_${type}`;
            if( typeof this[funcName] === 'function' ) {
                this.resizeFuncArr[ type ] = this[funcName].bind(this);
            }
        }

        this.game.event.on( SYSTEM_EVENT.onResize, ()=>{
            this.resizeFuncArr[ this.resizeType ] && this.resizeFuncArr[ this.resizeType ]();
        } );
    }

    public render( stage ) : void {
        this.renderer.render( stage, undefined, undefined, undefined, true );
    }

    private _resize_none() : void {
        console.log( 'none' );
    }

    private _resize_base() : void {
        let viewWidth = window.innerWidth;
        let viewHeight = window.innerHeight;
        let gameRatio = this.width / this.height;
        let windowRatio = viewWidth / viewHeight;

        if (windowRatio >= gameRatio)
        {
            viewWidth = viewHeight * gameRatio;
        }
        else
        {
            viewHeight = viewWidth / gameRatio;
        }

        this.position.x = Math.floor((window.innerWidth - viewWidth) / 2);
        this.position.y = Math.floor((window.innerHeight - viewHeight) / 2);
        this.view.style.left = this.position.x + 'px';
        this.view.style.top = this.position.y + 'px';
        this.view.style.width = viewWidth + 'px';
        this.view.style.height = viewHeight + 'px';
        this.view.style.position = 'absolute';
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
    }

    private _resize_responsive() : void {

        let viewWidth = window.innerWidth;
        let viewHeight = window.innerHeight;

        // let minRatio = this.game.minWidth / this.game.minHeight;
        // let maxRatio = this.game.maxWidth / this.game.maxHeight;
        let baseRatio = this.baseWidth / this.baseHeight;
        let windowRatio = viewWidth / viewHeight;

        if( baseRatio < windowRatio ) {
            this.width = this.minWidth * ( windowRatio / baseRatio );
            this.height = this.minHeight;
            if( this.width > this.maxWidth ) {
                const ratio = viewWidth / this.width;
                this.width = this.maxWidth;
                viewWidth = this.width * ratio;
            }
        }
        else {
            this.width = this.minWidth;
            this.height = this.minHeight * ( baseRatio / windowRatio );
            if( this.height > this.maxHeight ) {
                const ratio = viewHeight / this.height;
                this.height = this.maxHeight;
                viewHeight = this.height * ratio;
            }
        }

        this.halfWidth = this.width / 2;
        this.halfHeight = this.height / 2;
        this.renderer.resize( this.width , this.height );

        this.position.x = Math.floor((window.innerWidth - viewWidth) / 2);
        this.position.y = Math.floor((window.innerHeight - viewHeight) / 2);
        this.view.style.left = this.position.x + 'px';
        this.view.style.top = this.position.y + 'px';
        this.view.style.width = viewWidth + 'px';
        this.view.style.height = viewHeight + 'px';
        this.view.style.position = 'absolute';
        this.viewWidth = viewWidth;
        this.viewHeight = viewHeight;
    }

    private _resize_stretch() : void {
        this.view.style.position = "absolute";
        this.view.style.width = "100%";
        this.view.style.height = "100%";
        this.viewWidth = window.innerWidth;
        this.viewHeight = window.innerHeight;
    }
}

export default Render;
