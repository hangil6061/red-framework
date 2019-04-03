import GameObject from "./gameObject";
import Game from "./game";

class ComponentBase {
    public game : Game = null;
    public gameObject : GameObject = null;

    private _isFirstUpdate : boolean = true;

    private _isActiveSelf : boolean = true;

    public constructor( gameObject ) {
        this.gameObject = gameObject;
        this.game = this.gameObject.game;
    }

    public load( jsonData, tempData) {
        tempData[ jsonData.instanceID ] = this;
    }
    public loadInit( jsonData, tempData ) {}

    public awake() {};
    public start() {};
    public dispose() {};
    public update( delta : number ) {};

    public getActive() {
        if( this.activeSelf ) {
            return this.gameObject.getActive();
        }
        return this.activeSelf;
    }

    public get activeSelf() : boolean {
        return this._isActiveSelf;
    }

    public set activeSelf( v : boolean ) {
        this._isActiveSelf = v;
        this.activeUpdate();
    }

    public activeUpdate() {

    }

    public mainUpdate( delta : number ) {
        if( !this.activeSelf ) return;

        if( this._isFirstUpdate ) {
            this._isFirstUpdate = false;
            this.start();
        }
        this.update( delta );
    }
}

export default ComponentBase;
