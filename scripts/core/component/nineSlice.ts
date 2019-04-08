import ComponentBase from "../componentBase";

class NineSlice extends ComponentBase {
    private readonly _plane : PIXI.mesh.NineSlicePlane = new PIXI.mesh.NineSlicePlane( PIXI.Texture.EMPTY );

    constructor( gameObject ) {
        super( gameObject );
        this.gameObject.addChild( this._plane );
        this._plane.visible = false;
    }

    get color() {
        return this._plane.tint;
    }

    set color( color : number ) {
        this._plane.tint = color;
    }

    set texture( tex : PIXI.Texture ) {
        this._plane.texture = tex;
    }

    get texture() {
        return this._plane.texture;
    }

    get alpha() {
        return this._plane.alpha;
    }

    set alpha(v) {
        this._plane.alpha = v;
    }

    set width( v ) {
        this._plane.width = v;
    }

    set height( v ) {
        this._plane.height = v;
    }

    onEnable() {
        this._plane.visible = true;
    }

    onDisable() {
        this._plane.visible = false;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        this.texture = PIXI.Texture.fromImage( jsonData.key );
        this._plane.width = jsonData.size.x;
        this._plane.height = jsonData.size.y;
        this._plane.topHeight = jsonData.top;
        this._plane.bottomHeight = jsonData.bottom;
        this._plane.leftWidth = jsonData.left;
        this._plane.rightWidth = jsonData.right;
        this._plane.pivot.set( jsonData.pivot.x, jsonData.pivot.y );
        this.color = parseInt( '0x' + jsonData.color );
        this.alpha = jsonData.alpha;
    }
}

export default NineSlice;
