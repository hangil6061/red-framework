class IFrame {
    static EventType = {
        gamePlay : '@gamePlay',
        gameRetry : '@gameRetry',
        gameReady : '@gameReady',
        updateScore : '@updateScore',
        gameOver : '@gameOver',
        gamePause : '@gamePause',
        gameResume : '@gameResume',
        soundOn : '@soundOn',
        soundOff : '@soundOff',

        leftArrowDown : '@leftArrowDown',
        leftArrowUp : '@leftArrowUp',
        rightArrowDown: '@rightArrowDown',
        rightArrowUp : '@rightArrowUp',
        upArrowDown : '@upArrowDown',
        upArrowUp : '@upArrowUp',
        downArrowDown : '@downArrowDown',
        downArrowUp : '@downArrowUp',

        aButtonDown : '@aButtonDown',
        aButtonUp : '@aButtonUp',
        bButtonDown : '@bButtonDown',
        bButtonUp : '@bButtonUp',
        cButtonDown : '@cButtonDown',
        cButtonUp : '@cButtonUp',
    };

    private call = {};

    constructor() {
        window.addEventListener("message", this._onMessage.bind(this));
    }

    addEvent( event, call ) {
        this.call[event] = call;
    }

    removeEvent ( event ) {
        this.call[event] = null;
    }

    ready() {
        if( window.parent )
        {
            window.parent.postMessage({
                type : IFrame.EventType.gameReady,
            }, '*');
        }

        // @ts-ignore
        if( window && window.Android )
        {
            // @ts-ignore
            window.Android.gameReady();
        }
    }

    updateScore ( score : number )
    {
        if( window.parent )
        {
            window.parent.postMessage({
                type : IFrame.EventType.updateScore,
                score : score
            }, '*');
        }

        // @ts-ignore
        if( window.Android )
        {
            // @ts-ignore
            window.Android.updateScore(score);
        }
    }

    gameOver (score : number)
    {
        if( window.parent )
        {
            window.parent.postMessage({
                type : IFrame.EventType.gameOver,
                score : score
            }, '*');
        }

        // @ts-ignore
        if( window.Android )
        {
            // @ts-ignore
            window.Android.gameEnd(score);
        }
    }

    _onMessage ( message )
    {
        if( !message.data || !message.data.type ) return;
        this.call[message.data.type] && this.call[message.data.type]( message.data );
    }
}

export default IFrame;
