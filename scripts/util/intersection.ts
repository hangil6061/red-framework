import IntersectionInfo from './intersectionInfo';

class Intersection {
    constructor() {
    }

    static LineToLine( a1x:number, a1y:number, a2x:number, a2y:number,
                       b1x:number, b1y:number, b2x:number, b2y:number,
                       intersectionInfo : IntersectionInfo = new IntersectionInfo()) : IntersectionInfo
    {
        // const v3x = b1x - a1x;
        // const v3y = b1y - a1y;
        const v3x_ = a1x - b1x;
        const v3y_ = a1y - b1y;

        const v2x = b2x - b1x;
        const v2y = b2y - b1y;
        const v1x = a2x - a1x;
        const v1y = a2y - a1y;

        //오른쪽면만 검사
        const den = v2y * v1x - v2x * v1y;
        if (den <= 0)
        {
            return null;
        }
        const t = (v2x * v3y_ - v2y * v3x_) / den;
        const t_ = (v1x * v3y_ - v1y * v3x_) / den;

        //오른쪽 왼쪽 둘다 검사
        // const t = (v3x * v2y - v3y * v2x) / (v1x * v2y - v1y * v2x);
        // const t_ = (v3x_ * v1y - v3y_ * v1x) / (v2x * v1y - v2y * v1x);


        if( t>=0 && t<=1 && t_>=0 && t_<=1)
        {
            const ipx = a1x + v1x * t;
            const ipy = a1y + v1y * t;

            //  v - 2( v . n )n
            const l1 = (v1x !== 0 || v1y !== 0) ? 1 / Math.sqrt( v1x * v1x + v1y * v1y ) : 0;
            const l2 = (v2x !== 0 || v2y !== 0) ? 1 / Math.sqrt( v2x * v2x + v2y * v2y ) : 0;
            const vx = v1x * l1;
            const vy = v1y * l1;
            const lx = v2y * l2;
            const ly = -v2x * l2;

            const dot = ( vx * lx + vy * ly );
            const reflectX = vx - ( lx * dot * 2 );
            const reflectY = vy - ( ly * dot * 2 );

            intersectionInfo.setInfo( ipx, ipy, t );
            intersectionInfo.rx = reflectX ;
            intersectionInfo.ry = reflectY;
            intersectionInfo.beforeDirX = vx;
            intersectionInfo.beforeDirY = vy;


            return intersectionInfo;
        }
        else {
            return null;
        }
    }

    static LineToCircle( p1x : number, p1y : number, p2x : number, p2y : number,
                         cx : number, cy : number, radius : number,
                         intersectionInfo : IntersectionInfo = new IntersectionInfo())
    {
        const v1x = p2x - p1x;
        const v1y = p2y - p1y;
        const v2x = p1x - cx;
        const v2y = p1y - cy;
        const b = -2 * ( v1x * v2x + v1y * v2y );
        const c = 2 * ( v1x * v1x + v1y * v1y );
        const d = Math.sqrt( b * b - 2 * c
            * ( v2x * v2x + v2y * v2y - radius * radius ) );
        if( isNaN(d) ) {
            return null;
        }

        const u1 = ( b - d ) / c;
        const u2 = ( b + d ) / c;

        if(u1 <= 1 && u1 >= 0.0001) {
            const ipx = p1x + v1x * u1;
            const ipy = p1y + v1y * u1;
            intersectionInfo.setInfo( ipx, ipy, u1 );

            const v3x = ipx - cx;
            const v3y = ipy - cy;

            const l1 = (v1x !== 0 || v1y !== 0) ? 1 / Math.sqrt( v1x * v1x + v1y * v1y ) : 0;
            const l3 = (v3x !== 0 || v3y !== 0) ? 1 / Math.sqrt( v3x * v3x + v3y * v3y ) : 0;
            const v1x_n = v1x * l1;
            const v1y_n = v1y * l1;
            const v3x_n = v3x * l3;
            const v3y_n = v3y * l3;


            const dot = ( v1x_n * v3x_n + v1y_n * v3y_n ) * 2;
            const vsx = v3x_n * dot;
            const vsy = v3y_n * dot;
            const reflectX = v1x_n - vsx;
            const reflectY = v1y_n - vsy;

            intersectionInfo.rx = reflectX;
            intersectionInfo.ry = reflectY;
            intersectionInfo.beforeDirX = v1x_n;
            intersectionInfo.beforeDirY = v1y_n;

            return intersectionInfo;
        }

        if(u2 <= 1 && u2 >= 0.0001){
            const ipx = p1x + v1x * u2;
            const ipy = p1y + v1y * u2;
            intersectionInfo.setInfo( ipx, ipy, u2 );

            const v3x = ipx - p2x;
            const v3y = ipy - p2y;

            const l1 = (v1x !== 0 || v1y !== 0) ? 1 / Math.sqrt( v1x * v1x + v1y * v1y ) : 0;
            const l3 = (v3x !== 0 || v3y !== 0) ? 1 / Math.sqrt( v3x * v3x + v3y * v3y ) : 0;
            const v1x_n = v1x * l1;
            const v1y_n = v1y * l1;
            const v3x_n = v3x * l3;
            const v3y_n = v3y * l3;

            const dot = ( v1x_n * v3x_n + v1y_n * v3y_n );
            const vsx = v3x_n * dot * 2;
            const vsy = v3y_n * dot * 2;
            const reflectX = v1x_n - vsx;
            const reflectY = v1x_n - vsy;

            intersectionInfo.rx = reflectX;
            intersectionInfo.ry = reflectY;
            intersectionInfo.beforeDirX = v1x_n;
            intersectionInfo.beforeDirY = v1y_n;

            return intersectionInfo;
        }

        return null;
    }
}

export default Intersection;
