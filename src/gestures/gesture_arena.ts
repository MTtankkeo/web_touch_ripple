import { GestureRecognizer, GestureRecognizerResult } from "./gesture_recognizer.js";
import { GestureRecognizerBuilder, PointerType } from "../type.js";

export type GestureArenaOption = {
    // Whether to defer the gesture recognizer about to define accepting
    // or rejecting until a pointer event ends.
    isKeepAliveLastPointerUp: boolean,
}

/** 
 * Gesture Arena is a simple gesture competition system.
 * See also, this arena is based on the cycle.
 * 
 * Gestures are accepted and rejected according to the proper rules.
 */
export class GestureArena {
    constructor(
        public option?: GestureArenaOption
    ) {
        this.option = {
            ...{ isKeepAliveLastPointerUp: true }, // default
            ...this.option
        };
    }

    /** Just a items of factory functions for gesture recognizer. */
    builders: GestureRecognizerBuilder[] = [];

    /** A currently living gesture recognizers. */
    private recognizers: GestureRecognizer[] = [];

    /** Registers gesture recognizer factory builder */
    registerBuilder(builder: GestureRecognizerBuilder) {
        this.builders.push(builder);
    }

    /** Adds a given gesture recognizer in the Arena. */
    attach(recognizer: GestureRecognizer) {
        this.recognizers.push(recognizer);
    }

    /** Removes a given gesture recognizer in the Arena. */
    detach(recognizer: GestureRecognizer) {
        this.recognizers = this.recognizers.filter(r => r != recognizer);
    }

    /** Rejects a given recognizer on this arena. */
    rejectBy(target: GestureRecognizer) {
        this.detach(target);
        this.checkCycle();
    }

    /** Accepts all a recognizers except a given recognizer. */
    acceptBy(target: GestureRecognizer) {
        this.recognizers.forEach(r => r != target ? r.reject() : undefined);
        this.recognizers = [];
    }

    /** Resets builders and recognizers in this arena. */
    reset() {
        this.builders = [];
        this.recognizers = [];
    }

    createRecognizer(builder: GestureRecognizerBuilder): GestureRecognizer {
        const recognizer = builder();

        // Called when the gesture accepted or rejected.
        recognizer.listeners.push(result => {
            switch (result) {
                case GestureRecognizerResult.REJECT: this.rejectBy(recognizer); break;
                case GestureRecognizerResult.ACCEPT: this.acceptBy(recognizer); break;
                case GestureRecognizerResult.UPDATE: this.checkCycle(); break;
            }
        });

        return recognizer;
    }

    /**
     * Called when a recognizer is attached or detached or when
     * the others related state changes.
     */
    private checkCycle(type?: PointerType) {
        const isKeepAliveLastPointerUp = this.option.isKeepAliveLastPointerUp;

        // Accept a last recognizer that is un-holded survivor.
        if (isKeepAliveLastPointerUp && (type == PointerType.UP || type == null) && this.recognizers.length == 1) {
            const last = this.recognizers[0];

            if(!last.isHold) last.accept();
        }
    }

    /**
     * Handles a given pointer event properly.
     * 
     * When a pointer-down event occurs,
     * it is considered the beginning of a new gesture cycle.
     */
    handlePointer(event: PointerEvent, type: PointerType) {

        // When a pointer-down event occurs, creates recognizers by builder.
        if (type == PointerType.DOWN && this.recognizers.length == 0) {
            this.recognizers = this.builders.map(e => this.createRecognizer(e));
        }

        this.recognizers.forEach(r => r.handlePointer(event, type));
        this.checkCycle(type);
    }
}