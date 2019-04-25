class Stack<T> {
    private _arr : T[] = [];
    private _length : number = 0;
    private _size : number = 0;
    private readonly _defaultSize : number = 0;

    constructor( size : number = 100 ) {
        this._size = size;
        this._defaultSize = size;
        this._arr.length = this._size;
        this._length = 0;
    }

    public get length() {
        return this._length;
    }

    public get arr() : T[] {
        return this._arr;
    }

    public clear() : void {
        for (let i = 0; i < this._length; i++){
            this._arr[i] = undefined;
        }
        this._length = 0;
    }

    public push(item : T) : void {
        if( this._length >= this._size )
        {
            this._arr.length += this._defaultSize;
            this._size = this._arr.length;
        }

        this._arr[ this._length++ ] = item;
    }

    public pop () : T {
        let item = this._arr[ --this._length ];
        this._arr[ this._length ] = undefined;
        return item;
    }

    public remove (item : T) : void {
        const idx = this._arr.indexOf( item );
        if( idx > -1 )
        {
            this.splice( idx, 1 );
        }
    }

    public splice ( startIdx : number, removeCount:number ) {
        const length = this._length;

        if (startIdx >= length || removeCount <= 0) {
            return;
        }

        removeCount = (startIdx + removeCount > length ? length - startIdx : removeCount);

        let len = length - removeCount;

        for (let i = startIdx; i < len; i++)
        {
            this._arr[i] = this._arr[i + removeCount];
            this._arr[i + removeCount] = undefined;
        }

        this._length = len;
    }
}

export default Stack;
