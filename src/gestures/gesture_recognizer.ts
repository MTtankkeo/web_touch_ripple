import { GestureRecognizerListener, PointerPosition, PointerType } from "../type";

export enum GestureRecognizerResult {
    ACCEPT,
    REJECT,
    UPDATE,
}

/* This abstract class implements a fundamental gesture recognizer. */
export abstract class GestureRecognizer {
    /** A listeners that is called when accpeted or rejected. */
    listeners: GestureRecognizerListener[] = [];

    /** Whether can be accepted naturally(case of being last alone and accepted) */
    isHold: boolean = false;

    abstract handlePointer(
        event: PointerEvent,
        type: PointerType
    ): void;

    accept() { this.perform(GestureRecognizerResult.ACCEPT), this.onAccept(); }
    reject() { this.perform(GestureRecognizerResult.REJECT), this.onReject(); }
    
    hold() {
        this.isHold = true;
        this.listeners.forEach(l => l(GestureRecognizerResult.UPDATE));
    }

    release() {
        this.isHold = false;
        this.listeners.forEach(l => l(GestureRecognizerResult.UPDATE));
    }

    onAccept() {}
    onReject() {}
    dispose() {}

    private perform(result: GestureRecognizerResult) {
        this.dispose();
        this.listeners.forEach(l => l(result));
    }
}

export class TouchRippleGestureRecogzier extends GestureRecognizer {
    constructor() { super(); }

    /** A current or last handled pointer position by `handlePointer()` */
    position: PointerPosition;

    /** Returns the pointer-position object by the given pointer-event. */
    createPosition(event: PointerEvent): PointerPosition {
        return { x: event.clientX, y: event.clientY };
    }

    handlePointer(event: PointerEvent, type: PointerType): void {
        const position = (this.position = this.createPosition(event));

        if (type == PointerType.DOWN) this.pointerDown(position);
        if (type == PointerType.MOVE) this.pointerMove(position);
        if (type == PointerType.UP) this.pointerUp(position);
        if (type == PointerType.CANCEL) {
            this.reject();
            this.pointerCancel(position);
        }
    }

    pointerDown(position: PointerPosition) {}
    pointerMove(position: PointerPosition) {}
    pointerUp(position: PointerPosition) {}
    pointerCancel(position: PointerPosition) {}
}