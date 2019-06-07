class Tts {
    public voice : {} = {};
    public ssUtterances : SpeechSynthesisUtterance[] = [];
    public isFallbackMode : boolean = false;
    public androidTTSBridgeMode : boolean = false;
    public androidTTSBridgePlayData : any = {};
    public responsiveVoiceMode : boolean = false;
    public isAndroid : boolean = false;
    public androidPlayData : any = {};
    public isPlay : boolean = false;
    public lastEvent : string = '';


    constructor() {
        this.androidTTSBridgePlayData = {
            isPause : false,
            startTime : 0,
            pauseTime : 0,
            text : '',
            volume : 1,
            onend : null,
        };

        // this.isAndroid = navigator.userAgent.toLowerCase().indexOf( 'android' ) > -1;
        this.isAndroid = true;
        this.androidPlayData = {
            isPause : false,
            startTime : 0,
            pauseTime : 0,
            ssUtterance : '',
            onend : null,
        };


        if( typeof speechSynthesis === 'undefined') {
            console.log( 'not supported speechSynthesis' );

            //@ts-ignore
            if( window.TTSBridge ) {
                this.isFallbackMode = true;
                this.androidTTSBridgeMode = true;

                //@ts-ignore
                window.onTTSStart = () => {
                    // console.log('onTTS Start');
                };

                //@ts-ignore
                window.onTTSDone = () => {
                    // console.log('onTTS Done');
                };

                //@ts-ignore
                window.onTTSError = () => {
                    // console.log('onTTS Error');
                };

                //@ts-ignore
                window.onTTSStop = () => {
                    // console.log('onTTS Error');
                };
            }
            //@ts-ignore
            else if( window.responsiveVoice ) {
                this.responsiveVoiceMode = true;
            }
        }
        else {
            this._init();
        }

        // window.addEventListener( 'focus', ()=>{
        //     this.resume();
        // } );
        //
        // window.addEventListener( 'blur', ()=>{
        //     this.pause();
        // } );
    }

    _init() {
        const voices = window.speechSynthesis.getVoices();
        for( let i = 0; i < voices.length; i++ ) {
            this.voice[ voices[i].name ] = voices[i];

            if( voices[i].name === '한국어 대한민국'  && !this.voice[ 'Korean Female' ])
            {
                this.voice[ 'Korean Female' ] = voices[i];
            }
            else if( voices[i].name === 'Google 한국의'  && !this.voice[ 'Korean Female' ])
            {
                this.voice[ 'Korean Female' ] = voices[i];
            }
        }

        // console.log( voices );
    }


    speak( text, voiceName, parameters) {

        // if( this.ssUtterances.length > 0 ) {
        //     this.cancel();
        // }

        if( this.ssUtterances.length > 0 ) {
            this.cancel();
            setTimeout( ()=>{
                this.speak( text, voiceName, parameters );
            }, 500);
            return;
        }
        else {
            this.cancel();
        }


        this.lastEvent = 'speak';

        //빈텍스트 처리
        if( text === '' || text === ' ') {
            if( parameters && parameters.onend ) {
                parameters.onend();
                return;
            }
        }

        if( parameters.volume === undefined ) {
            parameters.volume = 1;
        }

        if( !this.isFallbackMode ) {
            this._speak_base(text, voiceName, parameters);
        }
        else if( this.isFallbackMode && this.androidTTSBridgeMode ) {
            this._speak_androidBridge(text, voiceName, parameters);
        }
        else if( this.isFallbackMode && this.responsiveVoiceMode ) {
            this._speak_responsiveVoice(text, voiceName, parameters);
        }
    }

    _getWords( str ) {
        let c = str.split(/(\s*[\s,]\s*|\?|;|:|\.|\(|\)|!)/);
        c = c.filter(function(a) {
            return /[^\s]/.test(a)
        });
        return c;
    }

    _speak_base( text, voiceName, parameters ) {
        const speech = new SpeechSynthesisUtterance( text );
        if( this.voice[ voiceName ] ) {
            speech.voice = this.voice[ voiceName ];
        }
        for( let i in parameters ) {
            if( parameters.hasOwnProperty( i ) ) {
                speech[ i ] = parameters[i];
            }
        }

        if( this.isAndroid ) {
            if( this.androidPlayData.isPause ) {
                this.androidPlayData.isPause = false;
            }

            speech.onstart = (event)=>{
                // console.log( 'onstart', event );
                if( this.lastEvent === 'cancel' ) {
                    this.cancel();
                }
                else {
                    this.androidPlayData.startTime = Date.now();
                    this.isPlay = true;
                }
            };

            speech.onend = (event)=>{
                // console.log( 'onend', event );
                const idx = this.ssUtterances.indexOf( speech );
                this.ssUtterances.splice( idx );
                this.isPlay = false;
                parameters && parameters.onend && parameters.onend();
            };

            // speech.onpause = (event)=>{
            //     console.log( 'onpause', event );
            // };
            //
            // speech.onresume = (event)=>{
            //     console.log( 'onresume', event );
            // };
            //
            // speech.onerror = (event)=>{
            //     console.log( 'onerror', event );
            // };
            //
            // speech.onboundary = (event)=>{
            //     console.log( 'onboundary', event );
            // };
            //
            // speech.onmark = (event)=>{
            //     console.log( 'onmark', event );
            // };
        }
        else {
            speech.onstart = (event)=>{
                if( this.lastEvent === 'cancel' ) {
                    this.cancel();
                }
                else {
                    this.isPlay = true;
                }
            };

            speech.onend = (event)=>{
                // console.log( 'onend', event );
                const idx = this.ssUtterances.indexOf( speech );
                if( idx > -1 ) {
                    this.ssUtterances.splice( idx );
                }
                this.isPlay = false;
                parameters && parameters.onend && parameters.onend();
            };
        }



        this.ssUtterances.push( speech );
        speechSynthesis.speak(speech);
    }

    _speak_androidBridge(text, voiceName, parameters) {


        //@ts-ignore
        window.onTTSStart = ()=>{
            if( this.lastEvent === 'cancel' ) {
                this.cancel();
            }
            else {
                this.isPlay = true;
                this.androidTTSBridgePlayData.startTime = Date.now();
                this.isPlay = true;
                parameters && parameters.onstart && parameters.onstart();
            }
        };
        //@ts-ignore
        window.onTTSDone = ()=>{
            this.isPlay = false;
            parameters && parameters.onend && parameters.onend();
        };
        // window.onTTSDone = parameters && parameters.onend ? parameters.onend : () => { };
        //@ts-ignore
        window.onTTSError = parameters && parameters.onerror ? parameters.onerror : () => { };

        this.androidTTSBridgePlayData.isPause = false;
        this.androidTTSBridgePlayData.text = text;
        this.androidTTSBridgePlayData.volume = parameters.volume;

        //@ts-ignore
        window.TTSBridge.speak(text, parameters.volume );
    }

    _speak_responsiveVoice(text, voiceName, parameters) {
        //@ts-ignore
        window.responsiveVoice.speak( text, voiceName, parameters );
    }

    pause() {
        if( !this.isFallbackMode ) {
            if( this.isAndroid ) {
                if( !this.androidPlayData.isPause && this.ssUtterances.length > 0 ) {
                    this.androidPlayData.isPause = true;
                    this.androidPlayData.ssUtterance = this.ssUtterances[0];
                    this.androidPlayData.pauseTime = Date.now();
                    this.androidPlayData.onend = this.ssUtterances[0].onend;
                    this.cancel( true );
                }
            }
            else {
                speechSynthesis.pause();
            }
        }
        else if( this.isFallbackMode && this.androidTTSBridgeMode ) {
            if( !this.androidTTSBridgePlayData.isPause ) {
                this.androidTTSBridgePlayData.isPause = true;
                this.androidTTSBridgePlayData.pauseTime = Date.now();
                // const onend = window.onTTSDone;
                //@ts-ignore
                this.androidTTSBridgePlayData.onend = window.onTTSDone;
                this.cancel( true );
            }
        }
        else if( this.isFallbackMode && this.responsiveVoiceMode ) {
            //@ts-ignore
            window.responsiveVoice.pause();
        }
    }

    resume( volume : number = 1 ) {
        if( !this.isFallbackMode ) {
            if( this.isAndroid ) {
                if( this.androidPlayData.isPause ) {

                    this.androidPlayData.isPause = false;
                    const text = this._getTextByTimestamp(this.androidPlayData.ssUtterance.text, this.androidPlayData.pauseTime - this.androidPlayData.startTime );
                    if( text === '' || text === ' '  || text === '\n') {
                        this.androidPlayData.onend && this.androidPlayData.onend();
                        return;
                    }

                    const su = new SpeechSynthesisUtterance( text );
                    su.voice = this.androidPlayData.ssUtterance.voice;
                    su.onstart = ()=>{
                        this.androidPlayData.startTime = Date.now();
                        this.isPlay = true;
                    };
                    su.volume = volume;

                    const onend = this.androidPlayData.onend;
                    su.onend = ()=>{
                        const idx = this.ssUtterances.indexOf( su );
                        this.ssUtterances.splice( idx );
                        onend && onend();
                    };

                    this.ssUtterances.push( su );
                    speechSynthesis.speak(su);
                }
            }
            else {
                speechSynthesis.resume();
            }
        }
        else if( this.isFallbackMode && this.androidTTSBridgeMode ) {
            if( this.androidTTSBridgePlayData.isPause ) {

                this.androidTTSBridgePlayData.isPause = false;
                const text = this._getTextByTimestamp( this.androidTTSBridgePlayData.text, this.androidTTSBridgePlayData.pauseTime - this.androidTTSBridgePlayData.startTime );
                if( text === '' || text === ' '  || text === '\n') {
                    this.androidTTSBridgePlayData.onend && this.androidTTSBridgePlayData.onend();
                    return;
                }

                //@ts-ignore
                window.onTTSStart = ()=>{
                    this.androidTTSBridgePlayData.startTime = Date.now();
                    this.isPlay = true;
                };

                this._speak_androidBridge( text, '', {
                    onend : this.androidTTSBridgePlayData.onend,
                    volume
                } );
            }
        }
        else if( this.isFallbackMode && this.responsiveVoiceMode ) {
            //@ts-ignore
            window.responsiveVoice.resume();
        }
    }

    cancel( isPauseSkip = false ) {

        this.lastEvent = 'cancel';

        if( !this.isFallbackMode ) {
            // if( !this.isPlay ) {
            //     // console.log( 'not playing' );
            //     return;
            // }

            if( !isPauseSkip && this.isAndroid && this.androidPlayData.isPause ) {
                this.androidPlayData.isPause = false;
            }

            for( let i = 0; i < this.ssUtterances.length; i++ ) {
                this.ssUtterances[i].onend = undefined;
            }
            this.ssUtterances.length = 0;


            speechSynthesis.cancel();
        }
        else if( this.isFallbackMode && this.androidTTSBridgeMode ) {
            // if( !this.isPlay ) {
            //     // console.log( 'not playing' );
            //     return;
            // }

            if( !isPauseSkip && this.androidTTSBridgePlayData.isPause ) {
                this.androidTTSBridgePlayData.isPause = false;
            }

            //@ts-ignore
            window.TTSBridge.stop();
        }
        else if( this.isFallbackMode && this.responsiveVoiceMode ) {
            //@ts-ignore
            window.responsiveVoice.cancel();
        }
    }

    _getTextByTimestamp( text, deltaTime ) {
        let str = '';
        let time = 0;

        for( let i = 0; i < text.length; i++ ) {
            if( time >= deltaTime ) {
                str += ( text[i] );
            }
            else {
                time += 140;
            }
        }
        return str;
    }


    skip() {
        if( this.ssUtterances.length === 0 ) return;
        const temp = this.ssUtterances[0].onend;
        this.cancel();
        //@ts-ignore
        temp && temp();
        // this.ssUtterances[0].onend = null;
    }
}

const tts = new Tts();
//@ts-ignore
// window.tts = tts;

if( typeof speechSynthesis !== 'undefined' && speechSynthesis.onvoiceschanged !== undefined ) {
    speechSynthesis.onvoiceschanged  = tts._init.bind( tts );
}

export default tts;

// window.test_skip = tts.test_skip;
// window.addEventListener( 'keydown', (e)=>{
//     if( e.key === 'Enter' ) {
//         tts.test_skip();
//     }
// } );
