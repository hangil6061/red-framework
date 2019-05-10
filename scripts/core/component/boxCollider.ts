import ComponentBase from "../componentBase";
import Vector2 from "../../util/vector2";
import Util from '../../util/math';

class BoxCollider extends ComponentBase {

    private _isTrigger : boolean = false;
    private _size : Vector2 = new Vector2();
    private _offset : Vector2 = new Vector2();
    private _bounds : PIXI.Bounds = new PIXI.Bounds();

    private _worldPoints : Vector2[] =[];
    private _points : Vector2[] = [];
    private _normals : Vector2[] = [];


    constructor( gameObject ) {
        super( gameObject );
    }

    get normals(): Vector2[] {
        return this._normals;
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        this._isTrigger = jsonData.isTrigger;
        this._size.set( jsonData.size.x, jsonData.size.y );
        this._offset.set( jsonData.offset.x, jsonData.offset.y );

        this._updatePoint();
    }

    private _updatePoint() {
        this._points.length = 0;
        this._worldPoints.length = 0;

        //좌하단
        this._points.push( new Vector2( -this._size.x/2 + this._offset.x, this._size.y/2 - this._offset.y ) );
        this._worldPoints.push( new Vector2( -this._size.x/2 + this._offset.x, this._size.y/2 - this._offset.y ) );

        //우하단
        this._points.push( new Vector2( this._size.x/2 + this._offset.x, this._size.y/2 - this._offset.y ) );
        this._worldPoints.push( new Vector2( this._size.x/2 + this._offset.x, this._size.y/2 - this._offset.y ) );

        //우상단
        this._points.push( new Vector2( this._size.x/2 + this._offset.x, -this._size.y/2 - this._offset.y ) );
        this._worldPoints.push( new Vector2( this._size.x/2 + this._offset.x, -this._size.y/2 - this._offset.y ) );

        //좌상단
        this._points.push( new Vector2( -this._size.x/2 + this._offset.x, -this._size.y/2 - this._offset.y ) );
        this._worldPoints.push( new Vector2( -this._size.x/2 + this._offset.x, -this._size.y/2 - this._offset.y ) );

        this.updateNormal();
    }

    updateNormal() {


        for( let i = 0; i < this._worldPoints.length; i++ ) {

            const p1x = this._worldPoints[i].x;
            const p1y = this._worldPoints[i].y;
            const p2x = this._worldPoints[(i + 1) % this._worldPoints.length].x;
            const p2y = this._worldPoints[(i + 1) % this._worldPoints.length].y;

            const vx = p2x - p1x;
            const vy = p2y - p1y;

            const length = Math.sqrt( vx * vx + vy * vy );
            const dx = vx / length;
            const dy = vy / length;

            const rdx = -dy;
            const rdy = dx;

            let normal = this._normals[i];
            if( !normal ) {
                normal = new Vector2();
            }
            normal.set( rdx, rdy );
            this._normals[i] = normal;
        }
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

    hitTest( x, y ) : boolean {
        //회전값 적용안됨.

        const worldPoint = this.gameObject.toWorld();
        const minX = worldPoint.x + this._offset.x - (this._size.x/2);
        const maxX = worldPoint.x + this._offset.x + (this._size.x/2);
        const minY = worldPoint.y - this._offset.y - (this._size.y/2);
        const maxY = worldPoint.y - this._offset.y + (this._size.y/2);

        if( Util.intersectsBoundsToPoint( minX, minY, maxX, maxY, x, y ) ) {
            return true;
        }
        return false;
    }

    getBounds( skipUpdate : boolean = false ) : PIXI.Bounds {

        if( !skipUpdate ) {
            const worldPoint = this.gameObject.toWorld();
            this._bounds.minX = worldPoint.x + this._offset.x - (this._size.x/2);
            this._bounds.maxX = worldPoint.x + this._offset.x + (this._size.x/2);
            this._bounds.minY = worldPoint.y - this._offset.y - (this._size.y/2);
            this._bounds.maxY = worldPoint.y - this._offset.y + (this._size.y/2);
        }

        return this._bounds;
    }

    getWorldPoints( skipUpdate : boolean = false ) : Vector2[] {

        if( !skipUpdate ) {
            for( let i = 0; i < this._worldPoints.length; i++ ) {
                const point = this._worldPoints[i];

                //@ts-ignore
                this.gameObject.toGlobal( this._points[i], point, true );
                //@ts-ignore
                this.game.stage.stage.toLocal( point, null, point );
            }
            this.updateNormal();
        }

        return this._worldPoints;
    }



}


export default BoxCollider;
