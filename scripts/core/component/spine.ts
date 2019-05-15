import ComponentBase from "../componentBase";

class Spine extends ComponentBase {
    private _spine : PIXI.spine.Spine = null;


    constructor( gameObject ) {
        super( gameObject );
    }

    get originSpine() {
        return this._spine;
    }

    get spine () {
        return this._spine;
    }

    get color() {
        return this._spine.tint;
    }

    set color( color : number ) {
        this._spine.tint = color;
    }

    // activeUpdate() {
    //     this._spine.visible = this.getActive();
    // }

    onEnable() {
        this._spine.visible = true;
    }

    onDisable() {
        this._spine.visible = false;
    }

    update( delta ) {
        this._spine.update( delta );
    }

    create( spineKey ) {
        if( this._spine === null ) {
            this._create(this.game.resources[ spineKey ].spineData  );
        }
    }

    private _create( spineData ) {
        this._spine = new PIXI.spine.Spine( spineData );
        this._spine.autoUpdate = false;
        this.gameObject.addChild( this._spine );
        this._spine.visible = false;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        this._create( this.game.resources[ jsonData.key ].spineData );
        if( jsonData.defaultSkin !== 'default' ) {
            this.setSkin( jsonData.defaultSkin );
        }
        this.color = parseInt('0x' + jsonData.color);
        if( jsonData.startAnimation !== '' ) {
            this.playAnimation( jsonData.startAnimation, jsonData.isStartLoop );
        }
    }

    setSkin( name ) {
        this._spine.skeleton.setSkin(null);
        this._spine.skeleton.setSkinByName(name);
    }

    playAnimation( name, isLoop = true ) {
        this._spine.state.setAnimation( 0, name, isLoop );
    }

    addAnimation( name ) {
        this._spine.state.addAnimation(0, name, true, 0);
    }
}

export default Spine;
