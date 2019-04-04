class Action {
    private _time : number = 0;
    private readonly _maxTime : number;
    private readonly _actionCall = null;
    private readonly _finishCall = null;

    constructor( maxTime : number, actionCall , finishCall ) {
        this._maxTime = maxTime;
        this._actionCall = actionCall;
        this._finishCall = finishCall;
    }

    update( delta ) : boolean {
        this._time += delta;

        if( this._time >= this._maxTime ) {
            this._time = this._maxTime;
            this._actionCall( delta, this._time, this._maxTime, this);
            if( this._finishCall ) {
                this._finishCall();
            }
            return false;
        }
        else {
            this._actionCall( delta, this._time, this._maxTime, this);
            return true;
        }
    }

}

export default Action;
