class Mathf {


    static RAD2DEG = 180/Math.PI;
    static DEG2RAD = Math.PI/180;

    /**
     *
     * @param f 실수
     * @param cipher  반올림할 소숫점 자릿수
     * @returns {number} 반환실수
     */
    public static floatRound (f, cipher) : number
    {
        return Math.round( f * cipher ) / cipher;
    };

    public static isNumber(num) : boolean
    {
        if( num === null
            || num === ''
            || num === ' '
            || num === true
            || num === false
        ) return false;
        return !isNaN( num );
    };


    public static distance (x1, y1, x2, y2) : number
    {
        const dx = x1 - x2;
        const dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    public static clamp( value : number, min : number, max : number ) : number
    {
        if (value < min)
            return min;
        if (value > max)
            return max;
        return value;
    }

    /**
     *
     * @param start {number}
     * @param end {number}
     * @param t {number} 0 ~ 1 사이값
     * @returns {*}
     */
    public static lerp(start, end, t)
    {
        return start + (end - start) * t;
    }

    /**
     *
     * @param color1 {number} 0x000000 ~ 0xffffff
     * @param color2 {number} 0x000000 ~ 0xffffff
     * @param t {number} 0 ~ 1 사이값
     * @returns {*}
     * @constructor
     */
    public static lerpColor ( color1, color2, t ) {
        const r1 = color1 >> 16;
        const g1 = ( color1 >> 8 ) - ( r1 << 8 );
        const b1 = ( color1 ) - ( r1 << 16 ) - ( g1 <<  8);

        const r2 = color2 >> 16;
        const g2 = ( color2 >> 8 ) - ( r2 << 8 );
        const b2 = ( color2 ) - ( r2 << 16 ) - ( g2 <<  8);

        const r = Mathf.lerp( r1, r2, t );
        const g = Mathf.lerp( g1, g2, t );
        const b = Mathf.lerp( b1, b2, t );

        return Mathf.rgbToColor( r, g, b );
    };

    public static rgbToColor( r, g, b ) {
        return (r << 16) + (g << 8) +  (b);
    }

    /**
     *
     * @param min {int}
     * @param max {int}
     * @returns {number}
     * min 포함, max 미포함
     */
    public static randomInt (min, max)
    {
        return Math.floor( min + Math.random() * (max - min));
    }

    public static randomFloat (min, max)
    {
        return  min + Math.random() * (max - min);
    }

    public static intersectsBounds( minX1, minY1, maxX1, maxY1, minX2, minY2, maxX2, maxY2 )
    {
        if (minX1 > maxX2
            || maxX1 < minX2
            || minY1 > maxY2
            || maxY1 < minY2)
        {
            return false;
        }
        return true;
    }

    public static intersectsBoundsToPoint(minX1,minY1,maxX1,maxY1, pointX, pointY)
    {
        if (minX1 > pointX
            || maxX1 < pointX
            || minY1 > pointY
            || maxY1 < pointY)
        {
            return false;
        }
        return true;
    }

    public static intersectsCircle( aX, aY, aR, bX, bY, bR )
    {
        const sqrt = ((aX - bX) * (aX - bX)) + ((aY - bY) * (aY - bY ));
        return sqrt < (aR+bR)*(aR+bR);
    }

    public static intersectsBoundsToCircle(xb : number, yb : number, wb : number, hb : number, xc : number, yc : number, rc : number)
    {
        const hw = wb / 2;
        const hh = hb / 2;
        const distX = Math.abs(xc - (xb + wb / 2));
        const distY = Math.abs(yc - (yb + hb / 2));

        if (distX > hw + rc || distY > hh + rc)
        {
            return false
        }

        if (distX <= hw || distY <= hh)
        {
            return true
        }

        const x = distX - hw;
        const y = distY - hh;
        return x * x + y * y <= rc * rc
    }
}

export default Mathf;
