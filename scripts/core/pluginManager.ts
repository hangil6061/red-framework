class PluginManager {
    private plugins = { };

    constructor() {

    }

    addPlugin( key, plugin ) {
        this.plugins[ key ] = plugin;
    }

    getPlugin<T>( key ) : T {
        return this.plugins[ key ];
    }
}

export default PluginManager;
