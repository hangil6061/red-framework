import ComponentBase from "../componentBase";

class Sprite extends ComponentBase {
    public sprite : PIXI.Sprite = null;

    constructor( gameObject ) {
        super( gameObject );
        this.sprite = new PIXI.Sprite();
        this.sprite.anchor.set( 0.5 );

        // this.sprite.transform = this.gameObject.transform;
        // this.game.stage.renderStage.addChild( this.sprite );
        this.gameObject.addChild( this.sprite );
        this.activeUpdate();
    }

    get color() {
        return this.sprite.tint;
    }

    set color( color : number ) {
        this.sprite.tint = color;
    }

    setSprite( key : string ) {
        this.sprite.texture = PIXI.Texture.fromImage( key );
    }

    dispose() {
        this.sprite.texture = null;
        super.dispose();
    }

    activeUpdate() {
        this.sprite.visible = this.getActive();
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );

        this.setSprite( jsonData.key );
    }
}

export default Sprite;
