import { Howl } from 'howler';

class Preloader {
    public static loadPreload( url, onLoadCall, onProgressCall  = null) {
        new PIXI.loaders.Loader().add( 'preload', url ).load( ( loader, resources )=>{
            Preloader.load( resources['preload'].data, onLoadCall, onProgressCall );
        } );
    }

    public static load( jsonData, onLoadCall, onProgressCall, isSkipSpine = false ) {
        const loader = new PIXI.loaders.Loader();
        let totalCount = 0;
        let loadCount = 0;

        for( let type in jsonData ) {
            if( type === 'sound' ) continue;
            if( type === 'spine' && isSkipSpine ) continue;

            if( !jsonData.hasOwnProperty( type ) ) continue;

            const data = jsonData[ type ];
            for( let i = 0; i < data.length; i++ ) {
                loader.add( data[i].key, data[i].path );
                totalCount++;
            }
        }

        const returnData = {
            resources : null,
            sounds : null
        };

        const progressCall = () => {
            loadCount++;
            onProgressCall && onProgressCall( loadCount, totalCount )
        };

        loader.onProgress.add(progressCall);
        loader.load( ( loader, resources ) => {
            returnData.resources = resources;
            if( returnData.resources && returnData.sounds ) {
                onLoadCall( returnData.resources, returnData.sounds );
            }
        } );

        totalCount += jsonData.sound.length;
        Preloader.howlerLoad( jsonData.sound, ( sounds ) => {
            returnData.sounds = sounds;
            if( returnData.resources && returnData.sounds ) {
                onLoadCall( returnData.resources, returnData.sounds );
            }
        }, progressCall );
    }

    // public static loadSpine( spineData, textures, call ) {
    //     const data = spineData;
    //     const atlas = new PIXI.spine.core.TextureAtlas();
    //     atlas.addTextureHash(textures, true);
    //
    //     for( let i = 0; i < data.length; i++) {
    //         PIXI.loader.add(data[i].key, data[i].path,  { metadata: { spineAtlas: atlas }});
    //     }
    //
    //     PIXI.loader.load( (loader, resources) => {
    //         call( resources );
    //     } );
    // }

    public static howlerLoad ( soundData, call, onProgressCall ) {
        const sounds = {};
        let loadCount = 0;

        const finishCall = () => {
            loadCount++;
            onProgressCall();

            if( loadCount >= soundData.length )
            {
                call( sounds );
            }
        };


        for( let i = 0; i < soundData.length; i++ )
        {
            const howl = new Howl({
                src: [soundData[i].path],
                autoplay: false,
                loop: false,
                volume: 1,
                onload: finishCall,
            });
            sounds[ soundData[i].key ] = howl;
        }

        if( soundData.length <= 0 )
        {
            call( sounds );
        }
    }
}

export default Preloader;
