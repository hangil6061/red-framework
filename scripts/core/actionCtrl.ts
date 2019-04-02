import Action from "./action";

class ActionCtrl {
    private actions : Action[] = [];
    private addArr : Action[] = [];

    public clear() : void {
        this.actions.length = 0;
        this.addArr.length = 0;
    }

    public addAction( action : Action ) : void {
        this.addArr.push( action );
    }

    public update( delta ) : void {
        let len = this.actions.length;
        for(let i = 0; i < len;) {
            const action = this.actions[i];
            if( action.update(delta) ) {
                i++;
            }
            else {
                this.actions.splice(i,1);
                len = this.actions.length;
            }
        }

        len = this.addArr.length;
        for( let i = 0; i < len; i++ ) {
            this.actions.push( this.addArr[i] );
        }
        this.addArr.length = 0;
    }
}

export default ActionCtrl;