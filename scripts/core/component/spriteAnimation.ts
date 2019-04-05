import ComponentBase from "../componentBase";
import Sprite = PIXI.Sprite;

class SpriteAnimation extends ComponentBase {
    private _sprite : Sprite = null;
    private _textures : PIXI.Texture[] = [];
    private _clips : {} = {};

    private _currentClip : { interval : number, spriteIndexArr : number[], name : string } = null;
    private _isPlay = false;
    private _time = 0;
    private _index = 0;
    private _finishCall = null;

    awake() {
        this._sprite = this.gameObject.findComponent<Sprite>('sprite');
    }

    update( delta : number ) {
        if(!this._isPlay) return;
        this._time += delta;
        if( this._time >= this._currentClip.interval ) {
            this._time = 0;
            this._index++;
            if( this._index >= this._currentClip.spriteIndexArr.length ) {
                this._isPlay = false;
                this._finishCall && this._finishCall();
                this._finishCall = null;
            }
            else {
                this._sprite.texture = this._textures[ this._currentClip.spriteIndexArr[this._index] ];
            }
        }
    }

    playAnimation( key, finishCall ) {
        const clip = this._clips[key];
        if( !clip ) return;
        this._isPlay = true;
        this._currentClip = clip;
        this._time = 0;
        this._index = 0;
        this._finishCall = finishCall;
        this._sprite.texture = this._textures[ this._currentClip.spriteIndexArr[this._index] ];
    }

    load( jsonData, tempData ) {
        super.load( jsonData, tempData );
        const texArr = jsonData.sprites;
        for( let i = 0; i < texArr.length; i++ ) {
            this._textures[i] = PIXI.Texture.fromImage( texArr[i] );
        }

        const clipArr = jsonData.clips;
        for( let i = 0; i < clipArr.length; i++ ) {
            const data = clipArr[i];
            this._clips[ data.name ] = data;
        }
    }
}

export default SpriteAnimation;
