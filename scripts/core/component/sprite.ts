import ComponentBase from "../componentBase";

class Sprite extends ComponentBase {
    private readonly _sprite : PIXI.Sprite = null;

    constructor( gameObject ) {
        super( gameObject );
        this._sprite = new PIXI.Sprite();
        this._sprite.anchor.set( 0.5 );

        // this.sprite.transform = this.gameObject.transform;
        // this.game.stage.renderStage.addChild( this.sprite );
        this.gameObject.addChild( this._sprite );
        this.activeUpdate();
    }

    get sprite() : PIXI.Sprite {
        return this._sprite;
    }

    get color() {
        return this._sprite.tint;
    }

    set color( color : number ) {
        this._sprite.tint = color;
    }

    set texture( tex : PIXI.Texture ) {
        this._sprite.texture = tex;
    }

    setSprite( key : string ) {
        this._sprite.texture = PIXI.Texture.fromImage( key );
    }

    dispose() {
        this._sprite.texture = null;
        super.dispose();
    }

    activeUpdate() {
        this._sprite.visible = this.getActive();
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );

        this.setSprite( jsonData.key );
        this._sprite.anchor.set( jsonData.pivot.x, jsonData.pivot.y );
        this.color = parseInt( '0x' + jsonData.color );
    }
}

export default Sprite;
