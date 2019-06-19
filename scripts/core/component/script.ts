import ComponentBase from "../componentBase";
import GameObject from "../gameObject";

class Script extends ComponentBase {

    constructor( gameObject ) {
        super( gameObject );
    }

    awake() {
        for( let i = 0; i < this.gameObject.children.length; i++ ) {
            const go = this.gameObject.children[i] as GameObject;
            if( !go ) continue;
            const property =  this[go.name];
            if( property === null ) {
                this[go.name] = go.getComponentByIndex( 0 );
            }
        }
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
                const go = tempData[data.instanceID];
                this[ data.name ] = data.componentName === "" ? go : go.getComponent( data.componentName );
            }
        }

    }
}

export default Script;
