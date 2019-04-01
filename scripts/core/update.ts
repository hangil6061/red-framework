import Game from "./game";

class Update
{
    public game : Game = null;

    private bind = null;

    constructor( game ) {
        this.game = game;
    }

    public start() : void {
        this.bind = this.update.bind(this);
        requestAnimationFrame( this.bind );
    }

    public stop() : void {
        this.bind = ()=>{};
    }

    private update() : void {
        const delta = this.game.time.update();

        const scene = this.game.sceneManager.currentScene;
        if( scene ) {
            scene.update( delta );
        }

        this.game.stage.update();
        this.game.render.render( this.game.stage.renderStage );
        requestAnimationFrame( this.bind );
    }
}

export default Update;
