


/** @typedef {() => GestureRecognizer} GestureRecognizerBuilder */

export class GestureRecognizer {
    constructor() { }

    /** @param {PointerEvent} event */
    pointerDown(event) { }

    /** @param {PointerEvent} event */
    pointerMove(event) { }

    /** @param {PointerEvent} event */
    pointerUp(event) { }

    /** @param {PointerEvent} event */
    pointerCancel(event) { }
}