const RESIZE_TYPE = {
    none : 'none',
    base : 'base',
    responsive : 'responsive',
    stretch : 'stretch',
};

const SYSTEM_EVENT = {
    onResize : 'onResize',
    onFocus : 'onFocus',
    onBlur : 'onBlur',

    onPointerUp : 'onPointerUp',
    onMouseWheel : 'onMouseWheel'
};

const INPUT_EVENT = {
    touchStart : 'touchstart',
    touchEnd : 'touchend',
    touchCancel : 'touchcancel',
    touchMove : 'touchmove',

    keyDown : 'keydown',
    keyUp : 'keyup',

    mouseDown : 'mousedown',
    mouseUp : 'mouseup',
    mouseMove : 'mousemove',
    mouseEnter : 'mouseenter',
    mouseLeave : 'mouseleave',
};


export {
    RESIZE_TYPE,
    SYSTEM_EVENT,
    INPUT_EVENT,
}
