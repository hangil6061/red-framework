class PluginManager {
    private plugins : {[key:string] : any} = { };

    constructor() {

    }

    addPlugin<T>( key : string, plugin : T ) : T {
        this.plugins[ key ] = plugin;
        return plugin;
    }

    getPlugin<T>( key : string ) : T {
        return this.plugins[ key ];
    }
}

export default PluginManager;
