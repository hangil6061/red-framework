class Mathf {


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

}

export default Mathf;
