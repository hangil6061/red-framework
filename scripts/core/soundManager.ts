class SoundManager {

    private _isBgmMute : boolean = false;     //배경음
    private _isSoundMute : boolean = false;        //일반사운드

    private _bgm : Howl = null;
    private _sounds : {} = {};

    constructor() {

    }

    get isBgmMute(): boolean {
        return this._isBgmMute;
    }

    set isBgmMute(value: boolean) {
        if(this._isBgmMute === value) return;
        this._isBgmMute = value;
        if( !this._bgm ) return;

        if( this.isBgmMute)
        {
            // @ts-ignore
            this._bgm._preVolume = this._bgm.volume();
            this._bgm.volume(0) ;
        }
        else
        {
            // @ts-ignore
            this._bgm.volume(this._bgm._preVolume || 1);
        }
    }

    get isSoundMute(): boolean {
        return this._isSoundMute;
    }

    set isSoundMute(value: boolean) {
        if(this._isSoundMute === value) return;

        this._isSoundMute = value;

        if( this._isSoundMute )
        {
            for( const key in this._sounds )
            {
                if( !this._sounds.hasOwnProperty( key ) ) continue;
                const sound = this._sounds[ key ];
                if( sound === this._bgm) continue;
                if( sound.playing() )
                {
                    sound.stop();
                }
            }
        }
    }

    addSound( key : string, sound : Howl ) {
        this._sounds[ key ] = sound;
    }

    playBgm( key : string, volume : number = 1 ) {
        if( this._bgm === this._sounds[ key ] || !this._sounds[ key ] ) return;
        if( this._bgm && this._bgm.playing() ){
            this._bgm.stop();
        }

        let bgm : Howl = this._sounds[ key ];
        if( bgm) {

            // @ts-ignore
            bgm._preVolume = volume;
            if( this._isBgmMute )
            {
                bgm.volume(0);
            }
            else
            {
                bgm.volume(volume);
            }
            bgm.loop(true);
            bgm.play();

            this._bgm = bgm;
        }
    }

    stopBgm()
    {
        if(this._bgm)
        {
            this._bgm.stop();
            this._bgm = null;
        }
    }


    playSound (key : string, volume : number = 1, loop : boolean = false, call : Function = null)
    {
        const sound = this._sounds[key];

        if( sound && !this.isSoundMute)
        {
            sound.volume(volume);
            sound.loop(loop);
            sound.play();
            if( call )
            {
                sound.once('load', call);
            }
        }
    }

    playSoundFade( key : string, fadeTime : number = 500, volume : number = 1, loop : boolean = false, call : Function = null ) {
        const sound = this._sounds[key];
        if( sound && !this.isSoundMute)
        {
            sound.volume(0);
            sound.loop(loop);
            sound.play();
            sound.fade( 0, volume, fadeTime );
            if( call )
            {
                sound.once('load', call);
            }
        }
    }

    stopSound (key : string)
    {
        const sound = this._sounds[key];
        if( sound )
        {
            sound.stop();
        }
    }

    stopSoundFade( key : string, fadeTime : number = 500 ) {
        const sound = this._sounds[key];
        sound.once( 'fade', () => { sound.stop(); } );
        sound.fade( sound.volume(), 0, fadeTime );
    }

    isPlaySound (key : string)
    {
        if( this._sounds[key] )
        {
            return this._sounds[key].playing();
        }
        return false;
    }
}

export default SoundManager;
