import Red from '../../index';

class TextManager {

    private language = 'kr';
    private data : {[key:string] : any} = {};

    private _event : PIXI.utils.EventEmitter = new PIXI.utils.EventEmitter();
    public get event() : PIXI.utils.EventEmitter {
        return this._event;
    }

    constructor( text : string ) {
        const list = Red.CsvParser.parse( text );
        for( let i = 0; i < list.length; i++ ) {
            const data = list[i];
            this.data[ data.key ] = data;
        }
    }

    setLanguage( lang : string ) {
        this.language = lang;
        this.event.emit('changeLanguage');
    }

    getText( key : string ) {
        const data = this.data[ key ];
        return  data && data[ this.language ] && data[ this.language ] || null;
    }
}

export default TextManager;