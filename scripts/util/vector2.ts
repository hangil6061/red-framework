class Vector2 {
    public x : number = 0;
    public y : number = 0;

    constructor( x = 0, y = 0 ){
        this.x = x;
        this.y = y;
    }

    public set(x, y) : Vector2 {
        this.x = x || 0;
        this.y = y || 0;
        return this;
    }

    public copy( vec ) : Vector2 {
        this.x = vec.x;
        this.y = vec.y;
        return this;
    }

    public negative() : Vector2 {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    public add( x, y ) : Vector2 {
        this.x += x;
        this.y += y;
        return this;
    }

    public sub ( x, y ) : Vector2 {
        this.x -= x;
        this.y -= y;
        return this;
    }

    public mad (v, s) : Vector2 {
        this.x += v.x * s;
        this.y += v.y * s;
        return this;
    }

    public addVec2 ( vec2 ) : Vector2 {
        this.x += vec2.x;
        this.y += vec2.y;
        return this;
    }

    public subVec2 ( vec2 ) : Vector2 {
        this.y -= vec2.y;
        this.x -= vec2.x;
        return this;
    }

    public scale ( s ) : Vector2 {
        this.x *= s;
        this.y *= s;
        return this;
    }

    public length() : number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    public lengthSq () : number
    {
        return (this.x * this.x + this.y * this.y);
    }

    public normalize () : Vector2
    {
        const invLen = (this.x !== 0 || this.y !== 0) ? 1 / Math.sqrt(this.x * this.x + this.y * this.y) : 0;
        this.x *= invLen;
        this.y *= invLen;
        return this;
    }

    public dot ( vec2 ) : number
    {
        return this.x * vec2.x + this.y * vec2.y;
    }

    public cross ( vec2 ) : number
    {
        return this.x * vec2.y - this.y * vec2.x;
    }

    public toAngle () : number
    {
        return Math.atan2( this.y, this.x );
    }

    public rotate (angle) : Vector2
    {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        this.set(this.x * cos - this.y * sin, this.x * sin + this.y * cos);
        return this;
    }

    public clone () : Vector2
    {
        return new Vector2( this.x, this.y );
    }

    public static Add (vec1, vec2) : Vector2
    {
        return new Vector2(vec1.x + vec2.x, vec1.y + vec2.y);
    }

    public static Sub  (vec1, vec2): Vector2
    {
        return new Vector2(vec1.x - vec2.x, vec1.y - vec2.y);
    }

    public static Negative (vec): Vector2
    {
        return new Vector2(-vec.x, -vec.y);
    }

    public static Normalized (vec): Vector2
    {
        const invLen = (vec.x !== 0 || vec.y !== 0) ? 1 / Math.sqrt(vec.x * vec.x + vec.y * vec.y) : 0;
        return new Vector2(vec.x * invLen, vec.y * invLen );
    }

    public static Duplicate  (vec) : Vector2
    {
        return new Vector2( vec.x, vec.y );
    }

    public static Rotation  (angle) : Vector2
    {
        return new Vector2( Math.cos(angle), Math.sin(angle) );
    }

    public static Rotate (vec, angle) : Vector2
    {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        return new Vector2(vec.x * c - vec.y * s, vec.x * s + vec.y * c);
    }

    public static Perp (vec) : Vector2
    {
        // Return perpendicular vector (90 degree rotation)
        return new Vector2(-vec.y, vec.x );
    }

    public static RPerp  (vec) : Vector2
    {
        // Return perpendicular vector (-90 degree rotation)
        return new Vector2(vec.y, -vec.x );
    }

    public static Mad (vec1, vec2, s) : Vector2
    {
        return new Vector2(vec1.x + vec2.x * s, vec1.y + vec2.y * s);
    }

    public static Scale (vec, s) : Vector2 {
        return new Vector2(vec.x * s, vec.y * s);
    }

    public static Distance (vec1, vec2) : number
    {
        const dx = vec2.x - vec1.x;
        const dy = vec2.y - vec1.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static DistanceSq (vec1, vec2) : number
    {
        const dx = vec2.x - vec1.x;
        const dy = vec2.y - vec1.y;
        return dx * dx + dy * dy;
    }

    public static Lerp ( vec1, vec2, t ) : Vector2
    {
        //float lerp(s, e, t) = s*(1-t) + e*t;
        return new Vector2((vec1.x * (1 - t)) + (vec2.x * t), (vec1.y * (1 - t)) + (vec2.y * t) );
    }

    public static Dot ( vec1, vec2 ) : number
    {
        return vec1.x * vec2.x + vec1.y * vec2.y;
    }

    public static Cross  ( vec1, vec2 ) : number
    {
        return vec1.x * vec2.y - vec1.y * vec2.x;
    }

}

export default Vector2;
