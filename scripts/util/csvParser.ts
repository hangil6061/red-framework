class CsvParser {
    static parse( string : string)  {

        string = CsvParser.removeLine( string );

        const dataList = [];
        const headArr = [];
        const str = {
            str : "",
        };
        str.str = "";
        let firstLine = true;
        let headNum = 0;
        let data = {};

        for( let i = 0; i < string.length; i++ )
        {
            switch ( string[i] )
            {
                case "\r":
                    break;
                case "\n" :
                    if( firstLine )
                    {
                        headArr.push(  str.str );
                        firstLine = false;
                    }
                    else
                    {
                        data[ headArr[headNum] ] = str.str;
                        dataList.push(data);
                    }


                    str.str = "";
                    headNum = 0;
                    data = {};
                    break;
                case undefined:
                    if( firstLine )
                    {
                        headArr.push(  str.str );
                        firstLine = false;
                    }
                    else
                    {
                        data[ headArr[headNum] ] = str.str;
                        dataList.push(data);
                    }


                    str.str = "";
                    headNum = 0;
                    data = {};
                    break;
                case "\"" :
                    i++;
                    while ( true )
                    {
                        if( string[i] === "\"" && string[i+1] === "\"")
                        {
                            str.str += string[i];
                            i++;
                            i++;
                        }
                        else if( string[i] === "\"" && ( ! string[i+1] || string[i+1] !== "\""))
                        {
                            break;
                        }
                        else
                        {
                            str.str += string[i];
                            i++;
                        }
                    }
                    break;
                case "," :


                    if( firstLine )
                    {
                        headArr.push(  str.str );
                    }
                    else
                    {
                        data[ headArr[headNum] ] = str.str;
                    }

                    headNum++;
                    str.str = "";
                    break;
                default:
                    str.str += string[i];
                    break;
            }
        }

        if( headNum !== 0 )
        {
            data[ headArr[headNum] ] = str.str;
            dataList.push(data);
        }

        return dataList;
    }

    static removeLine( str : string ) : string {

        const line = str.split( '\n' );
        let result = '';

        for( let i = 0; i < line.length; i++ ) {
            if( line[i][0] === '#' ) continue;
            if( result === '' ) {
                result += line[i];
            }
            else {
                result += '\n' + line[i];
            }
        }

        return result;
    }
}

export default CsvParser;
