import ComponentBase from "../componentBase";
import Sprite from "./sprite";
import GameObject from "../gameObject";

class ToggleButton extends ComponentBase{

    private _sprite : Sprite = null;
    private _onGameObject : GameObject = null;

    private _isDown = false;
    private _isOn = true;
    private _isOver = false;

    private _actionCall : (isActive : boolean)=>{} = null;

    private _bind : {name:string, bind}[] = [];

    public static Event : PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();

    constructor( gameObject ) {
        super( gameObject );

        this._bind.push( { name : 'touchstart', bind : this.onTouchStart.bind(this) } );
        this._bind.push( { name : 'touchmove', bind : this.onTouchMove.bind(this) } );
        this._bind.push( { name : 'pointerdown', bind : this.onPointerDown.bind(this) } );
        this._bind.push( { name : 'pointerup', bind : this.onPointerUp.bind(this) } );
        this._bind.push( { name : 'pointerupoutside', bind : this.onPointerUp.bind(this) } );
        this._bind.push( { name : 'pointerover', bind : this.onPointerOver.bind(this) } );
        this._bind.push( { name : 'pointerout', bind : this.onPointerOut.bind(this) } );
    }

    public set actionCall(call) {
        this._actionCall = call;
    }

    public get value() : boolean {
        return this._onGameObject.activeSelf;
    }

    public set value(v) {
        this._onGameObject.activeSelf = v;
    }

    public get sprite() {
        return this._sprite;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
    }

    loadInit( jsonData, tempData ) {
        super.loadInit( jsonData, tempData );
        const targetID = jsonData.onInstanceID;
        this._sprite = tempData[ jsonData.buttonSpriteintanceID ];
        this._onGameObject = tempData[ targetID ];

        const sprite = this._sprite.sprite;
        sprite.interactive = true;
        for( let i = 0; i < this._bind.length; i++ ) {
            const bindData = this._bind[i];
            sprite.on( bindData.name, bindData.bind );
        }
    }

    onTouchStart() {
        if( !this._isOn ) return;
        this._isDown = true;
    }

    onTouchMove( e ) {
        if(!this._isDown) return;
    }

    onPointerDown() {
        if( !this._isOn || !this._isOver) return;
        this._isDown = true;
    }

    onPointerUp() {
        if( !this._isOn ) return;
        if( this._isDown ) {
            this._isDown = false;
            this._onGameObject.activeSelf = !this._onGameObject.activeSelf;

            ToggleButton.Event.emit('beforeAction');
            this._actionCall && this._actionCall( this._onGameObject.activeSelf );
            ToggleButton.Event.emit('actionAfter');
        }
    }

    onPointerOver() {
        if( !this._isOn ) return;
        this._isOver = true;
    }

    onPointerOut() {
        if( !this._isOn ) return;
        this._isOver = false;
        this._isDown = false;
    }

}

export default ToggleButton;
