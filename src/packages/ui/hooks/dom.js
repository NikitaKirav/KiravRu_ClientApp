function getTargetByEvent(event) {
    return /scroll|resize/.test(event) ? window : document;
}

export function addEventListener(event, handler) {
    let target = getTargetByEvent(event);

    target.addEventListener(event, handler);

    return () => removeEventListener(event, handler);
}

export function removeEventListener(event, handler) {
    let target = getTargetByEvent(event);

    target.removeEventListener(event, handler);
}