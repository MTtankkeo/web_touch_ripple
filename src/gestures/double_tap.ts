import { GestureEventCallback, PointerPosition } from "../type";
import { TouchRippleGestureRecogzier } from "./gesture_recognizer";

export class DoubleTapGestureRecognizer extends TouchRippleGestureRecogzier {
    /** A total number of taps or clicks by a user. */
    tapCount: number = 0;

    timeId: number;

    constructor(public onDoubleTap: GestureEventCallback) {
        super();
    }

    pointerDown(position: PointerPosition): void {
        if (++this.tapCount == 2) {
            this.accept();
        } else {
            this.hold();
            setTimeout(() => this.reject(), 300);
        }
    }

    onAccept(): void {
        this.onDoubleTap(this.position);
    }

    dispose(): void {
        if (this.timeId != null) clearTimeout(this.timeId);
    }

    toString(): string {
        return "[Object DoubleTapGestureRecognizer]";
    }
}