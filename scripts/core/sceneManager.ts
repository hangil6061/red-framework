import Game from "./game";
import GameObject from "./gameObject";

class SceneManager {
    public game : Game = null;

    private _scenes = {};
    private _currentScene : GameObject = null;
    private _prevScene : GameObject = null;

    constructor( game : Game ) {
        this.game = game;
    }

    public get currentScene() : GameObject {
        return this._currentScene;
    }

    public get prevScene() : GameObject {
        return this._prevScene;
    }

    public addScene( key : string, scene : GameObject ) {
        if( this._scenes[ key ] ) {
            return;
        }
        this._scenes[ key ] = scene;
        this.game.stage.scene.addChild( scene );
        scene.activeSelf = false;
    }

    public changeScene( key : string, skipPrevSceneActive = false ) {

        this._prevScene = this._currentScene;
        if(this._currentScene && !skipPrevSceneActive) {
            this._currentScene.activeSelf = false;
        }

        const scene = this._scenes[ key ];
        if( scene ) {
            this._currentScene = scene;
            this._currentScene.activeSelf = true;
        }

    }
}

export default SceneManager;
