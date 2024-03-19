import { GestureRecognizer, GestureRecognizerResult } from "./gesture_recognizer.js";
import { GestureRecognizerBuilder, PointerType } from "./type.js";

enum GestureArenaStatus {
    NONE,
    ACTIVE,
    FINISH,
}

/** This arena is based on the cycle. */
export class GestureArena {
    builders: GestureRecognizerBuilder[] = [];

    /** A currently living gesture-recognizers. */
    private recognizers: GestureRecognizer[] = [];

    private status: GestureArenaStatus = GestureArenaStatus.NONE;

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
    
    createRecognizer(builder: GestureRecognizerBuilder): GestureRecognizer {
        const recognizer = builder();
        recognizer.listener = (result) => {
            if (result == GestureRecognizerResult.REJECT) {
                this.detach(recognizer);
            } else {
                this.recognizers = [];
                console.log(`제스처 승리`);
            }
        }

        return recognizer;
    }

    checkCycle() {
        if (this.recognizers.length == 0) {
            this.recognizers = this.builders.map(this.createRecognizer);
            this.status = GestureArenaStatus.ACTIVE;
        }
    }

    handlePointer(event: PointerEvent, type: PointerType) {
        if (type == PointerType.DOWN) {
            this.checkCycle();
        }

        this.recognizers.forEach(r => r.handlePointer(event, type));
    }
}