import Stack from "./stack";


class PoolManager<T> {
    private _use : Stack<T> = new Stack<T>();
    private _pool : Stack<T> = new Stack<T>();
    private readonly _generator = null;

    constructor( generator : ( ()=> T ) ) {
        this._generator = generator;
    }

    get use() : Stack<T> {
        return this._use;
    }

    get() : T {
        let item : T = null;
        if( this._pool.length > 0 ) {
            item = this._pool.pop();
        }
        else {
            item = this._generator();
        }
        this._use.push( item );
        return item;
    }

    return( item : T ) : void {
        this._pool.push( item );
        this._use.remove( item );
    }
}

export default PoolManager;
