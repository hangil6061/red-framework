import Sprite from './component/sprite';
import Script from './component/script';

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
