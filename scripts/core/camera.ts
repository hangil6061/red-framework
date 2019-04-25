import Game from "./game";

class Camera extends PIXI.Container {
    private bounds : PIXI.Bounds = null;

    constructor() {
        super();
    }

    setPosition( x : number, y : number ) {
        if( y === undefined ) {
            y = x;
        }

        if( this.bounds ) {
            if( x < this.bounds.minX ) {
                x = this.bounds.minX;
            }
            else if( x > this.bounds.maxX )
            {
                x = this.bounds.maxX;
            }

            if( y < this.bounds.minY ) {
                y = this.bounds.minY;
            }
            else if( y > this.bounds.maxY )
            {
                y = this.bounds.maxY;
            }
        }

        this.position.set( x, y );
    }

    getPosition() {
        return this.position;
    }

    setBounds( minX : number, minY : number, maxX : number, maxY : number ) {
        if(!this.bounds) {
            this.bounds = new PIXI.Bounds();
        }
        this.bounds.minX = minX;
        this.bounds.minY = minY;
        this.bounds.maxX = maxX;
        this.bounds.maxY = maxY;
    }

    clearBounds() {
        this.bounds = null;
    }
}

export default Camera;
