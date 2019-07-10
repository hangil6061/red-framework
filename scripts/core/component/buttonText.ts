import ComponentBase from "../componentBase";
import Button from "./button";
import Text from './text';

export class ButtonText extends ComponentBase {

    private _targetText : Text = null;
    private _targetButton : Button = null;
    private _enabledColor : string = '';
    private _disabledColor : string = '';

    load(jsonData, tempData) {
        super.load(jsonData, tempData);
        this._enabledColor = jsonData.enabledColor;
        this._disabledColor = jsonData.disabledColor;
    }

    loadInit(jsonData, tempData) {
        this._targetText = tempData[ jsonData.textInstanceID ];
        this._targetButton = tempData[ jsonData.buttonInstanceID ];
    }

    awake() {
        this._targetButton.event.on( 'onEnable', this._onButtonOn.bind(this) );
        this._targetButton.event.on( 'onDisable', this._onButtonOff.bind(this) );
    }

    private _onButtonOn() {
        this._targetText.color = parseInt('0x' + this._enabledColor);
    }

    private _onButtonOff() {
        this._targetText.color = parseInt('0x' + this._disabledColor);
    }
}