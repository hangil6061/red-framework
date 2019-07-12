class StringHelper {
    public static stringFormat( string, ...arg ) {
        const args = arguments;
        return string.replace(/{(\d+)}/g, function (match, number)
        {
            return args[ parseInt(number)+1];
        });
    }

    public static getGoogleSpreadsheetToCSV( key, sheetID = 0) {
        return StringHelper.stringFormat("https://docs.google.com/spreadsheets/d/{0}/export?gid={1}&format=csv", key, sheetID);
    }

    /**
     *
     * @param num 숫자
     * @param digits 0채울 자릿수
     * @returns {string}
     */
    public static leadingZeros( num : number | string, digits : number) : string {
        let zero = '';
        const n : string = num.toString();

        if (n.length < digits) {
            for (let i = 0; i < digits - n.length; i++)
                zero += '0';
        }
        return zero + n;
    };

    /**
     * 숫자 입력받아 3자리수마다 ,찍어서 반환함
     * @param num 정수
     * @returns {string}
     */
    public static addComma (num) : string
    {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    /**
     * 단어의 마지막 글자 받침을 반환해줌, 없으면 빈텍스트
     * @param a
     */
    public static getFinalConsonant(a) : string
    {
        const r = (a.charCodeAt(0) - parseInt('0xac00',16)) % 28;
        const t = String.fromCharCode(r + parseInt('0x11A8') -1);
        return t;
    }

    public static dateToString( date : Date, format ) {
        const weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];

        return format.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
            switch ($1) {
                case "yyyy": return date.getFullYear();
                case "yy": return StringHelper.leadingZeros(date.getFullYear() % 1000, 2);
                case "MM": return StringHelper.leadingZeros(date.getMonth() + 1,2);
                case "dd": return StringHelper.leadingZeros( date.getDate(),2);
                case "E": return weekName[date.getDay()];
                case "HH": return StringHelper.leadingZeros(date.getHours(),2);
                case "hh":
                    const h = date.getHours() % 12;
                    return StringHelper.leadingZeros(h !== 0 ? h : 12,2);
                case "mm": return StringHelper.leadingZeros(date.getMinutes(), 2);
                case "ss": return StringHelper.leadingZeros(date.getSeconds(), 2);
                case "a/p": return date.getHours() < 12 ? "오전" : "오후";
                default: return $1;
            }
        });
    }


}

export default StringHelper;
