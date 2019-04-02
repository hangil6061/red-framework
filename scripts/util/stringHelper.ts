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
     * @param n 숫자
     * @param digits 0채울 자릿수
     * @returns {string}
     */
    public static leadingZeros (n, digits) : string {
        let zero = '';
        n = n.toString();

        if (n.length < digits) {
            for (var i = 0; i < digits - n.length; i++)
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


}

export default StringHelper;
