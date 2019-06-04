import Game from "./game";
import {SYSTEM_EVENT} from "./systemConsts";

class Stage {
    public game : Game = null;

    private _stage : PIXI.Container = new PIXI.Container();
    private _back : PIXI.Container = new PIXI.Container();
    private _scene : PIXI.Container = new PIXI.Container();
    private _front : PIXI.Container = new PIXI.Container();

    // private _renderStage : PIXI.Container = new PIXI.Container();

    public get stage() {
        return this._stage;
    }

    public get back() {
        return this._back;
    }

    public get front() {
        return this._front;
    }

    public get scene() {
        return this._scene;
    }

    public get renderStage() {
        // return this._renderStage;
        return this._stage;
    }

    constructor( game ) {
        this.game = game;

        const parentStage = new PIXI.Container();
        parentStage.addChild( this._stage );
        this._stage.addChild( this._back );
        this._stage.addChild( this._scene );
        this._stage.addChild( this._front );

        // parentStage.addChild( this._renderStage );

        // this.game.event.on( SYSTEM_EVENT.onResize, ()=>{
        //     this.stage.position.set( this.game.render.halfWidth, this.game.render.halfHeight );
        //     this.renderStage.position.set( this.game.render.halfWidth, this.game.render.halfHeight );
        // } )
    }

    update() {
        this._stage.position.x = this.game.render.halfWidth - this.game.camera.x;
        this._stage.position.y = this.game.render.halfHeight - this.game.camera.y;
        this._stage.updateTransform();
    }
}

export default Stage;
