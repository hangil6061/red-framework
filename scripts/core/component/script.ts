import ComponentBase from "../componentBase";

class Script extends ComponentBase {

    constructor( gameObject ) {
        super( gameObject );
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
    }

    loadInit( jsonData, tempData ) {
        const numbers = jsonData.numbers;
        const strings = jsonData.strings;
        const references = jsonData.references;

        for( let i = 0; i < numbers.length; i++ ) {
            const data = numbers[i];
            if( this.hasOwnProperty( data.name ) ) {
                this[ data.name ] = data.value;
            }
        }

        for( let i = 0; i < strings.length; i++ ) {
            const data = strings[i];
            if( this.hasOwnProperty( data.name ) ) {
                this[ data.name ] = data.value;
            }
        }

        for( let i = 0; i < references.length; i++ ) {
            const data = references[i];
            if( this.hasOwnProperty( data.name ) ) {
                this[ data.name ] = tempData[data.instanceID];
            }
        }

    }
}

export default Script;
