class TextAnimation {

    private _text : PIXI.Text = null;
    private _idx : number = 0;
    private _buffer : { char : string, style : string }[] = [];
    private _interval : number = 0.03;
    private _time : number = 0;
    private _isPlay : boolean = false;
    private _finishCall : Function = null;


    constructor( text : PIXI.Text ) {
        this._text = text;

    }

    setText( text : string ) {
        this._buffer.length = 0;
        this.parse( text );
    }

    setFinishCall( call : Function ) {
        this._finishCall = call;
    }

    start( interval : number = 0.03 ) {
        this._idx = 0;
        this._time = 0;
        this._isPlay = true;
        this._interval = interval;
        this._text.text = '';
    }

    private parse( text : string )
    {
        for( let i = 0; i < text.length; i++ ) {
            const char = text[i];

            switch ( char )
            {
                case '<':
                    i = this.tagParse( text, i );
                    break;

                default:
                    this._buffer.push( { char, style : null } );
                    break;
            }
        }
    }

    private tagParse( text : string, i : number ) : number
    {
        let style : string = '';
        let startTagId = true;
        let endTagId = false;

        for( ; i < text.length; i++ )
        {
            const char = text[i];
            switch ( char )
            {
                case '<':
                    if( startTagId ) {

                    }
                    else {
                        if( text[i+1] === '/' ) {
                            endTagId = true;
                            startTagId = false;
                        }
                        else
                        {
                            i = this.tagParse( text, i );
                        }
                    }
                    break;

                case '>':
                    if( startTagId ) {
                        startTagId = false;
                    }
                    else if(endTagId) {
                        return i;
                    }
                    else {

                    }
                    break;

                default:
                    if( startTagId ) {
                        if( style === '' ) {
                            style = text[i];
                        }
                        else {
                            style += text[i];
                        }
                    }
                    else if( endTagId ) {

                    }
                    else {
                        this._buffer.push( { char, style } );
                    }
                    break;
            }
        }

        return i;
    }

    update( delta : number ) {
        if( !this._isPlay ) return;

        this._time += delta;
        if( this._interval <= this._time ) {
            this._time = 0;
            this.updateText();
            this._idx++;
            if( this._buffer.length <= this._idx ) {
                this._isPlay = false;
                this._finishCall && this._finishCall();
            }
        }
    }

    skip() {
        if( !this._isPlay ) return;
        this._idx = this._buffer.length - 1;
        this._isPlay = false;
        this.updateText();
    }

    updateText()
    {
        let text = '';
        for( let i = 0; i <= this._idx; i++ ) {
            const buffer = this._buffer[ i ];

            if( buffer.style ) {
                if( (i === 0 && buffer.style) || (i > 0 && this._buffer[ i -1 ].style !== buffer.style) ) {
                    if( text === '' ) {
                        text = `<${buffer.style}>`;
                    }
                    else {
                        text += `<${buffer.style}>`;
                    }
                }
            }

            if( text === '' ) {
                text = buffer.char;
            }
            else {
                text += buffer.char;
            }

            if( buffer.style ) {
                if( (i===this._buffer.length-1 && buffer.style) || (i + 1 <= this._idx && this._buffer[ i + 1 ].style !== buffer.style) ) {
                    text += `</${buffer.style}>`;
                }
            }
        }

        this._text.text = text;
    }
}
export default TextAnimation;
