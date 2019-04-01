import { ComponentBase } from "../../scripts";

class Move extends ComponentBase {
    start() {
        this.gameObject.position.x = 100;
    }

    update( delta : number ) {
        this.gameObject.position.x -= delta * 50;

    }
}

export default Move;
