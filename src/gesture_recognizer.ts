import { PointerType } from "./type";

export enum GestureRecognizerResult {
    ACCEPT,
    REJECT,
}

/* This abstract class implements a fundamental gesture recognizer. */
export abstract class GestureRecognizer {
    listener: (result: GestureRecognizerResult) => void;

    abstract handlePointer(
        event: PointerEvent,
        type: PointerType
    ): void;

    accept() {
        this.perform(GestureRecognizerResult.ACCEPT);
    }

    reject() {
        this.perform(GestureRecognizerResult.REJECT);
    }

    private perform(result: GestureRecognizerResult) {
        this.listener(result);
    }
}

export class TapGestureRecognizer extends GestureRecognizer {
    handlePointer(event: PointerEvent, type: PointerType): void {
        if (type === PointerType.UP) {
            this.accept();
        }
    }
}