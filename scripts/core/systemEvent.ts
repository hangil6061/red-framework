import {SYSTEM_EVENT} from "./systemConsts";

class SystemEvent extends PIXI.utils.EventEmitter {
    constructor() {
        super();
        window.addEventListener('resize', ()=>{ this.emit( SYSTEM_EVENT.onResize ); });
        window.addEventListener('focus', ()=>{ this.emit( SYSTEM_EVENT.onFocus ); });
        window.addEventListener('blur', ()=>{ this.emit( SYSTEM_EVENT.onBlur ); });
    }

}

export default SystemEvent;
