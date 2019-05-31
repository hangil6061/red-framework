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

}


export default Util;
