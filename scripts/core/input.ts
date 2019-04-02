import { INPUT_EVENT } from './systemConsts';
import WebGLRenderer = PIXI.WebGLRenderer;
import CanvasRenderer = PIXI.CanvasRenderer;

const _state = {
    none : 0,
    start : 1,
    stay : 2,
    up : 3
};

class Input {
    private _keyArr : {keyCode:number,state:number}[] = [];
    private _keys : {} = {};
    private _pointerState : number = _state.none;
    private _globalPointerPosition : PIXI.PointLike = new PIXI.Point();
    private _worldPointerPosition :  PIXI.PointLike = new PIXI.Point();

    private readonly _interactionManager : PIXI.interaction.InteractionManager = null;
    private readonly _stage : PIXI.Container = null;


    constructor( renderer, stage ) {
        this._interactionManager = renderer.plugins.interaction;
        this._stage = stage;

        window.addEventListener( INPUT_EVENT.keyDown, (e : KeyboardEvent)=>{
            if( this._keys[e.keyCode] && this._keys[e.keyCode].state === _state.none ) {
                this._keys[e.keyCode].state = _state.start;
            }
        } );

        window.addEventListener( INPUT_EVENT.keyUp, (e : KeyboardEvent )=>{
            if( this._keys[e.keyCode] ) {
                this._keys[e.keyCode].state = _state.up;
            }
        } );

        this._interactionManager.on('pointerdown', ( e : PIXI.interaction.InteractionEvent )=>{
            this._pointerState = _state.start;
            console.log( e );
        });

        this._interactionManager.on('pointerup', ( e : PIXI.interaction.InteractionEvent )=>{
            this._pointerState = _state.up;
        });

        this._interactionManager.on('pointermove', ( e : PIXI.interaction.InteractionEvent  )=>{
            this._globalPointerPosition.copy( e.data.global );
        });
    }

    public update() {
        const count = this._keyArr.length;
        for( let i = 0; i < count; i++ ) {
            const key = this._keyArr[i];
            if( key.state === _state.start ) {
                key.state = _state.stay;
            }
            else if( key.state === _state.up ) {
                key.state = _state.none;
            }
        }

        if( this._pointerState === _state.start ) {
            this._pointerState = _state.stay;
        }
        else if( this._pointerState === _state.up ) {
            this._pointerState = _state.none;
        }
    }

    public addKey( key ) {
        if( ! this._keys[key] ) {
            this._keys[key] = {
                keyCode : key,
                state : _state.none
            };
            this._keyArr.push( this._keys[key] );
        }
    }

    public removeKey( key ) {
        if( this._keys[key] ) {
            const idx = this._keyArr.indexOf( this._keys[key] );
            if( idx !== -1 ) {
                this._keyArr.splice( idx, 1 );
            }
            this._keys[key] = undefined;
        }
    }

    public getKey( key ) : boolean {
        if( this._keys[key] ) {
            return this._keys[key].state === _state.stay;
        }
        return false;
    }

    public getKeyDown( key ) : boolean {
        if( this._keys[key] ) {
            return this._keys[key].state === _state.start;
        }
        return false;
    }

    public getKeyUp( key ) : boolean {
        if( this._keys[key] ) {
            return this._keys[key].state === _state.up;
        }
        return false;
    }

    public getPointer() : boolean {
        return this._pointerState === _state.stay;
    }

    public getPointerDown() : boolean {
        return this._pointerState === _state.start;
    }

    public getPointerUp() : boolean {
        return this._pointerState === _state.up;
    }

    public getPointerPosition() {
        return this._globalPointerPosition;
    }

    public getPointerWorldPosition() {
        this._stage.toLocal( this.getPointerPosition(), this._stage, this._worldPointerPosition, true );
        return this._stage.toLocal( this._worldPointerPosition );
    }
}

export default Input;
