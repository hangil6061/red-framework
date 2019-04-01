import Game from "./game";
import ComponentBase from "./componentBase";
import ComponentManager from "./componentManager";

class GameObject extends PIXI.Container {
    public game : Game = null;
    public components = {};
    public componentArr : ComponentBase[] = [];

    private _isActiveSelf : boolean = true;

    constructor( game ) {
        super();
        this.game = game;
    }

    public get activeSelf() : boolean {
        return this._isActiveSelf;
    }

    public set activeSelf( v : boolean ) {
        this._isActiveSelf = v;
        this.activeUpdate();
    }

    public getActive() {
        if( this.activeSelf && this.parent && this.parent instanceof GameObject) {
            return this.parent.getActive();
        }
        return this.activeSelf;
    }

    public toWorld() {
        return this.game.stage.stage.toLocal( this.parent.toGlobal( this.position ) );
    }

    public activeUpdate() {
        let count = 0;
        count = this.componentArr.length;
        for( let i = 0; i < count; i++ ) {
            const comp = this.componentArr[i];
            comp.activeUpdate();
        }

        count = this.children.length;
        for( let i = 0; i < count; i++ ) {
            const child = this.children[ i ];
            if( child instanceof GameObject) {
                child.activeUpdate();
            }
        }
    }


    addComponent<T>( name : string ) : T {
        if( this.components[ name ] ) return;
        const Construct = ComponentManager.Instance.getComponent( name );

        if( !Construct ) {
            console.log( `컴포넌트 ${name}을 찾을수 없습니다.` );
            return null;
        }

        const comp = new Construct( this );
        this.components[ name ] = comp;
        this.componentArr.push( comp );
        return comp;
    }

    getComponent<T>( name : string ) : T {
        const comp = this.components[ name ] as T;
        return comp || null;
    }

    removeComponent( name : string ) {
        const comp = this.components[ name ];
        if( !comp ) return;
        const idx = this.componentArr.indexOf( comp );
        this.componentArr.splice( idx, 1 );
        comp.dispose();
        this.components[ name ] = undefined;
    }

    update( delta : number ) {
        if( !this.activeSelf ) return;

        let count = 0;
        count = this.componentArr.length;
        for( let i = 0; i < count; i++ ) {
            const comp = this.componentArr[i];
            comp.mainUpdate( delta );
        }

        count = this.children.length;
        for( let i = 0; i < count; i++ ) {
            const child = this.children[ i ];
            if( child instanceof GameObject) {
                child.update( delta );
            }
        }
    }

    load( jsonData, tempData = null )
    {
        let postProcess = false;
        if( !tempData ) {
            tempData = {};
            postProcess = true;
        }

        tempData[ jsonData.instanceID ] = this;
        this.name = jsonData.name;
        this.activeSelf = jsonData.isAcitive;
        this.position.set( jsonData.position.x, jsonData.position.y );
        this.rotation = jsonData.rotation.z;
        this.scale.set( jsonData.scale.x, jsonData.scale.y );

        const components = jsonData.components;
        for( let i = 0;i < components.length; i++ ) {
            const componentData = components[i];
            const comp = this.addComponent( componentData.name ) as ComponentBase;
            if( comp ) {
                comp.load( componentData, jsonData );
            }
        }

        const children = jsonData.children;
        for( let i = 0;i < children.length; i++ ) {
            const childData = children[i];
            const child = new GameObject( this.game );
            child.load( childData, tempData );
            this.addChild( child );
        }

        if(postProcess)
        {
            this.loadInit( jsonData, tempData );
            this.activeUpdate();
        }
    }

    loadInit(jsonData, tempData)
    {
        let length = this.componentArr.length;
        for( let i = 0; i < length; i++ ) {
            const comp = this.componentArr[i];
            comp.loadInit( jsonData.components[i], tempData );
        }

        length = this.children.length;
        for( let i = 0; i < length; i++ ) {
            const child = this.children[ i ];
            if( child instanceof GameObject) {
                child.loadInit( jsonData.children[i], tempData );
            }
        }
    }

}

export default GameObject;
