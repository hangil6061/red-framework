import ComponentBase from "../componentBase";
import Button from "./button";
import GameObject from "../gameObject";

class ButtonEvent extends ComponentBase {
    loadInit(jsonData, tempData) {
        super.loadInit(jsonData, tempData);

        const button = tempData[ jsonData.button ] as Button;
        const gameObject = tempData[ jsonData.target ] as GameObject;

        button.actionCall = ()=>{
            gameObject.emitEvent( jsonData.eventKey );
        }
    }
}

export default ButtonEvent;
