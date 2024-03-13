import { GestureRecognizer } from "./gesture_recognizer.js";

/**
 * Signatures factory function of gesture recognizer.
 * @typedef {() => GestureRecognizer} GestureRecognizerBuilder
 */

/**  */
export class GestureArena {
    constructor() {   
        /** @type {GestureRecognizerBuilder[]} */
        this.builders = [];

        /** @type {GestureRecognizer[]} */
        this.recognizers = [];
    }

    /** @param {GestureRecognizerBuilder} builder */
    attach(builder) {
        this.builders.push(builder);
    }

    /**
     * @param {PointerEvent} event
     * @param {PointerType} type 
     */
    handlePointer(event, type) {
        this.recognizers.forEach(r => r.handlePointer(event));
    }
}