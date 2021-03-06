import 'pixi.js';
import 'pixi-spine';
import Render from "./render";
import Time from './time';
import SceneManager from "./sceneManager";
import Update from "./update";
import SystemEvent from "./systemEvent";
import Camera from "./camera";
import GameObject from "./gameObject";
import Stage from "./stage";
import {SYSTEM_EVENT} from "./systemConsts";
import Input from "./input";
import PluginManager from "./pluginManager";
import SoundManager from "./soundManager";
import TextManager from "../util/textManager";

class Game {

    public event : SystemEvent = new SystemEvent();
    public time : Time = new Time();
    public camera : Camera = new Camera();
    public resources : {} = null;

    public sceneManager : SceneManager = new SceneManager( this );
    public soundManager : SoundManager = new SoundManager();
    public update : Update = new Update( this );

    public render : Render = null;
    public stage : Stage = null;

    public input : Input = null;

    public plugins : PluginManager = new PluginManager();
    public textManager : TextManager = null;

    constructor( config ) {
        config.autoStart = config.autoStart !== false;

        this.render = new Render( config, this );
        this.stage = new Stage( this );

        this.input = new Input( this.render.renderer, this.stage.stage );

        this.event.emit( SYSTEM_EVENT.onResize );
        if( config.autoStart ) {
            this.update.start();
        }
    }

    load( sceneData, skipStart = false ) {
        const scenes = sceneData;
        for( let i = 0 ;i < scenes.length; i++ )
        {
            const sceneData = scenes[i];
            const scene = new GameObject( this );
            scene.load( sceneData );
            this.sceneManager.addScene( sceneData.name, scene );
        }

        if( !skipStart ) {
            this.sceneManager.changeScene( scenes[0].name );
        }
    }
}

export default Game;
