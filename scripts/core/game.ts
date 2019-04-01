import 'pixi.js';
import Render from "./render";
import Time from './time';
import SceneManager from "./sceneManager";
import Update from "./update";
import SystemEvent from "./systemEvent";
import Camera from "./camera";
import GameObject from "./gameObject";
import Stage from "./stage";
import {SYSTEM_EVENT} from "./systemConsts";

class Game {

    public event : SystemEvent = new SystemEvent();
    public time : Time = new Time();
    public camera : Camera = new Camera();

    public stage : Stage = null;
    public sceneManager : SceneManager = new SceneManager( this );
    public update : Update = new Update( this );



    public render : Render = null;

    constructor( config ) {
        config.autoStart = config.autoStart !== false;

        this.render = new Render( config, this );
        this.stage = new Stage( this );

        this.event.emit( SYSTEM_EVENT.onResize );
        if( config.autoStart ) {
            this.update.start();
        }
    }

    load( resources ) {
        const scenes = resources.scene.data;
        for( let i = 0 ;i < scenes.length; i++ )
        {
            const sceneData = scenes[i];
            const scene = new GameObject( this );
            scene.load( sceneData );
            this.sceneManager.addScene( sceneData.name, scene );
        }
        this.sceneManager.changeScene( scenes[0].name );
    }
}

export default Game;
