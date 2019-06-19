import ComponentBase from "../componentBase";
import Text from './text';

class InitText extends ComponentBase {

    private _key : string = '';
    private _targetText : Text = null;
    private _onChangeBind = this._initText.bind(this);

    loadInit( jsonData, tempData ) {
        this._targetText = tempData[ jsonData.targetText ];
        this._key = jsonData.key;
    }

    awake() {
        this._initText();
    }

    onEnable() {
        if( this.game.textManager ) {
            this.game.textManager.event.on( 'changeLanguage', this._onChangeBind );
        }

    }

    onDisable() {
        if( this.game.textManager ) {
            this.game.textManager.event.off( 'changeLanguage', this._onChangeBind );
        }
    }

    _initText() {
        if( this.game.textManager ) {
            const text = this.game.textManager.getText( this._key );
            if( text ) {
                this._targetText.text = text;
            }
        }
    }
}

export default InitText;
