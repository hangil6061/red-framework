class Time {

    public maxDelta : number = 0.5;
    public delta : number = 0;
    public scale : number = 1;
    public prevTime : number = 0;

    constructor() {
        this.update();
    }

    update() {
        const currentTime = Date.now();
        this.delta = ( currentTime - this.prevTime ) / 1000;
        this.prevTime = currentTime;
        if( this.delta > this.maxDelta ) {
            this.delta = this.maxDelta;
        }
        return this.delta;
    }
}

export default Time;
