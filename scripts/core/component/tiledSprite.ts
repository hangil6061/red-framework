import ComponentBase from "../componentBase";

class TiledSprite extends ComponentBase {
    private readonly _sprite : PIXI.extras.TilingSprite = null;

    constructor( gameObject ) {
        super( gameObject );
        this._sprite = new PIXI.extras.TilingSprite(
            PIXI.Texture.EMPTY, 0, 0
        );
        this._sprite.anchor.set( 0.5 );

        // this.sprite.transform = this.gameObject.transform;
        // this.game.stage.renderStage.addChild( this.sprite );
        this._sprite.visible = false;
        this.gameObject.addChild( this._sprite );
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

    get texture() {
        return this._sprite.texture;
    }

    get width()  {
        return this._sprite.width;
    }

    set width( v ) {
        this._sprite.width = v;
    }

    set height( v ) {
        this._sprite.height = v;
    }

    get height() {
        return this.sprite.height;
    }

    setSprite( key : string ) {
        if( key === '' ) {
            this._sprite.texture = PIXI.Texture.WHITE;
        }
        else {
            this._sprite.texture = PIXI.Texture.fromImage( key );
        }
    }

    dispose() {
        this._sprite.texture = null;
        super.dispose();
    }

    onEnable() {
        this._sprite.visible = true;
    }

    onDisable() {
        this._sprite.visible = false;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        this.setSprite( jsonData.key );
        this._sprite.anchor.set( jsonData.pivot.x, jsonData.pivot.y );
        this._sprite.width = jsonData.size.x;
        this._sprite.height = jsonData.size.y;
        this.color = parseInt( '0x' + jsonData.color );
        if( jsonData.isInteracive ) {
            this._sprite.interactive = true;
        }
    }
}

export default TiledSprite;
