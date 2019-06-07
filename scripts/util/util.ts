import Mathf from './math';

class Util {
    public static deepCopy( obj ) {
        let ret;
        if( obj instanceof Array) {
            ret = []
        }
        else if( obj instanceof Object) {
            ret = {};
        }
        else {
            return obj;
        }

        for (let i in obj)
        {
            if (obj.hasOwnProperty(i))
            {
                ret[i] = Util.deepCopy(obj[i]);
            }
        }
        return ret;
    }

    public static getParameterByName(name) {
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        const regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
            results = regex.exec(location.search);
        return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
    };

    public static clearParameter() {
        history.replaceState({}, null, location.pathname);
    };


    /**
     * 존재하면 덮어쓰기
     * @param key
     * @param str
     */
    public static localSave (key : string, str : string) {
        if( localStorage ) {
            localStorage.setItem(key, str);
        }
    };

    /**
     * 값 찾지 못하면 null 리턴
     * @param key
     */
    public static localLoad( key : string ) {
        if( localStorage ) {
            return localStorage.getItem(key)
        }
        return null;
    }

    public static shuffle( arr : any[], count : number ) {
        for( let i = 0; i < count; i++  ) {
            const src = Mathf.randomInt( 0, arr.length );
            const dst = Mathf.randomInt( 0, arr.length );
            if( src === dst ) continue;

            const temp = arr[ src ];
            arr[src] = arr[dst];
            arr[dst] = temp;
        }
    }

    public static readTextFile(file, call) {
        const req = new XMLHttpRequest();
        req.open("GET", file, true);
        req.onreadystatechange = function() {
            if( req.readyState === 4 && req.status === 200 ) {
                call && call( req.responseText );
            }
        };
        req.send(null);
    }
}


export default Util;
