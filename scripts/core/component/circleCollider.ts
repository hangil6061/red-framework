import ComponentBase from "../componentBase";
import Vector2 from "../../util/vector2";

class CircleCollider extends ComponentBase {
    private _isTrigger : boolean = false;
    private _radius : number = 0;
    private _offset : Vector2 = new Vector2();

    constructor( gameObject ) {
        super( gameObject );
    }

    public get radius()
    {
        return this._radius;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        this._isTrigger = jsonData.isTrigger;
        this._radius = jsonData.radius;
        this._offset.set( jsonData.offset.x, jsonData.offset.y );
    }
}

export default CircleCollider;
