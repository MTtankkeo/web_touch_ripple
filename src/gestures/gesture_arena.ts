import { GestureRecognizer, GestureRecognizerResult } from "./gesture_recognizer.js";
import { GestureRecognizerBuilder, PointerType } from "../type.js";

/** This arena is based on the cycle. */
export class GestureArena {
    /** Just a items of factory functions for gesture-recognizer. */
    builders: GestureRecognizerBuilder[] = [];

    /** A currently living gesture-recognizers. */
    private recognizers: GestureRecognizer[] = [];

    /** Registers gesture-recognizer factory builder */
    registerBuilder(builder: GestureRecognizerBuilder) {
        this.builders.push(builder);
    }

    attach(recognizer: GestureRecognizer) {
        this.recognizers.push(recognizer);
    }

    detach(recognizer: GestureRecognizer) {
        this.recognizers = this.recognizers.filter(r => r != recognizer);
    }

    /** Rejects a given recognizer on this arena. */
    rejectBy(target: GestureRecognizer) {
        this.detach(target);
    }

    /** Rejects all a recognizers except a given recognizer. */
    acceptBy(target: GestureRecognizer) {
        this.recognizers.forEach(r => r != target ? r.reject() : undefined);
        this.recognizers = [];
    }

    acceptWith(target: GestureRecognizer) {
        target.accept();
        this.acceptBy(target);
    }

    /** Resets builders and recognizers in arena. */
    reset() {
        this.builders = [];
        this.recognizers = [];
    }

    createRecognizer(builder: GestureRecognizerBuilder): GestureRecognizer {
        const recognizer = builder();

        // Called when the gesture accepted or rejected.
        recognizer.listeners.push(result => {
            result == GestureRecognizerResult.REJECT
                ? this.rejectBy(recognizer)
                : this.acceptBy(recognizer);
        });

        return recognizer;
    }

    private checkCycle() {
        // When possible, creates a recognizers by builder.
        if (this.recognizers.length == 0) {
            this.recognizers = this.builders.map(e => this.createRecognizer(e));
        }
    }

    handlePointer(event: PointerEvent, type: PointerType) {
        if (type == PointerType.DOWN) {
            this.checkCycle();
        }

        // When the pointer are received all, accepts the last survivor.
        if (type == PointerType.UP) {
            queueMicrotask(() => {
                if (this.recognizers.length == 1) this.acceptWith(this.recognizers[0]);
            });
        }

        this.recognizers.forEach(r => r.handlePointer(event, type));
    }
}