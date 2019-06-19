readTextFile( 'version.json', ( text )=>{
    printVersion(JSON.parse(text));
} );

function readTextFile(file, call) {
    const req = new XMLHttpRequest();
    req.open("GET", file, true);
    req.onreadystatechange = function() {
        if( req.readyState === 4 && req.status === 200 ) {
            call && call( req.responseText );
        }
    };
    req.send(null);
}

function printVersion( version ) {
    const color1 = '#f4f4f4';
    const bgColor1 = '#bb2525';
    const color2 = '#fff560';
    const bgColor2 = '#030307';

    //@ts-ignore
    window.RED_GAME_VERSION = version.version;

    if (navigator.userAgent.toLowerCase().indexOf('chrome') > -1) {
        const args = [
            '%c '+ version.title+ ' %c v' + version.version + ' ',
            'color: '+color1+'; background: '+bgColor1+'; padding:2px 0;',
            'color: '+color2+'; background: '+bgColor2+'; padding:2px 0;',
        ];

        window.console.log.apply(console, args);
    } else if (window.console)
    {
        window.console.log( version.title + ' - v' + version.version);
    }
}
