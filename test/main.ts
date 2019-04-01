import Red from './../scripts';
import Move from "./components/move";
import Player from "./components/player";

Red.ComponentManager.Instance.addComponent( 'move', Move );
Red.ComponentManager.Instance.addComponent( 'player', Player );

const game = new Red.Game( { width : 540, height : 960, maxWidth : 720, resizeType : Red.RESIZE_TYPE.responsive } );
Red.Preloader.loadPreload( './test/assets/preload.json', ( resources )=> {
    game.load( resources );
});
