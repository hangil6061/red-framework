import { Script, Sprite } from "../../scripts";

class Player extends Script {
    public speed : number = 0;
    public say : string = "";
    public player : any = null;

    start() {
    }

    update( delta : number ) {
        this.gameObject.position.x += this.speed * delta;
        const pos =  this.gameObject.toWorld();
        this.game.camera.setPosition( pos.x, pos.y );
    }
}

export default Player;
