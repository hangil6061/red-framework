import Sprite from './component/sprite';
import Script from './component/script';
import Button from './component/button';
import Text from "./component/text";
import Spine from "./component/spine";
import BoxCollider from "./component/boxCollider";
import CircleCollider from "./component/circleCollider";
import Gauge from "./component/gauge";
import SpriteAnimation from "./component/spriteAnimation";
import InputText from "./component/inputText";
import NineSlice from "./component/nineSlice";
import Scroll from "./component/scroll";
import TiledSprite from "./component/tiledSprite";
import ToggleButton from "./component/toggleButton";
import PaintArea from "./component/paintArea";
import MultiStyleText from './component/multiStyleText';

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
        this.addComponent( 'spriteAnimation', SpriteAnimation );
        this.addComponent( 'inputText', InputText );
        this.addComponent( 'nineSlice', NineSlice );
        this.addComponent( 'scroll', Scroll );
        this.addComponent( 'tiledSprite', TiledSprite );
        this.addComponent( 'toggleButton', ToggleButton );
        this.addComponent( 'paintArea', PaintArea );
        this.addComponent( 'multiStyleText', MultiStyleText );
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
