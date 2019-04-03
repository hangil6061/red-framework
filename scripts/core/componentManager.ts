import Sprite from './component/sprite';
import Script from './component/script';
import Button from './component/button';
import Text from "./component/text";
import Spine from "./component/spine";
import BoxCollider from "./component/boxCollider";
import CircleCollider from "./component/circleCollider";
import Gauge from "./component/gauge";

class ComponentManager {
    private static instance : ComponentManager = null;
    public static get Instance() : ComponentManager {
        if( !ComponentManager.instance ) {
            ComponentManager.instance = new ComponentManager();
        }
        return ComponentManager.instance;
    }

    private components : object = {};
    private constructor() {
        this.addComponent( 'sprite', Sprite );
        this.addComponent( 'script', Script );
        this.addComponent( 'button', Button );
        this.addComponent( 'text', Text );
        this.addComponent( 'spine', Spine );
        this.addComponent( 'boxCollider', BoxCollider );
        this.addComponent( 'circleCollider', CircleCollider );
        this.addComponent( 'gauge', Gauge );
    }

    addComponent( name : string, construct : object ) {
        this.components[name] = construct;
    }

    getComponent( name : string ) {
        const construct = this.components[ name ];
        if( construct ) {
            return construct;
        }
        return null;
    }
}

export default ComponentManager;
