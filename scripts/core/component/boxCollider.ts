import ComponentBase from "../componentBase";
import Vector2 from "../../util/vector2";

class BoxCollider extends ComponentBase {
    private _isTrigger : boolean = false;
    private _size : Vector2 = new Vector2();
    private _offset : Vector2 = new Vector2();

    constructor( gameObject ) {
        super( gameObject );
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        this._isTrigger = jsonData.isTrigger;
        this._size.set( jsonData.size.x, jsonData.size.y );
        this._offset.set( jsonData.offset.x, jsonData.offset.y );
    }

    toLocalPoints() : number[] {
        const arr = [];

        //좌하단
        arr.push( -this._size.x/2 + this._offset.x );
        arr.push( this._size.y/2 - this._offset.y );

        //우하단
        arr.push( this._size.x/2 + this._offset.x );
        arr.push( this._size.y/2 - this._offset.y );

        //우상단
        arr.push( this._size.x/2 + this._offset.x );
        arr.push( -this._size.y/2 - this._offset.y );

        //좌상단
        arr.push( -this._size.x/2 + this._offset.x );
        arr.push( -this._size.y/2 - this._offset.y );

        return arr;
    }
}

export default BoxCollider;
