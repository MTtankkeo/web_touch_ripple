import { GestureEventCallback, PointerPosition } from "../type";
import { TouchRippleGestureRecogzier } from "./gesture_recognizer";

export class LongTapGestureRecognizer extends TouchRippleGestureRecogzier {
    timerId: NodeJS.Timeout;
    isStartCalled: boolean = false;

    constructor(
        public onLongTapStart: GestureEventCallback,
        public onLongTapEnd: VoidFunction,
        public onLongTap: VoidFunction,
        public tappableDuration: number,
        public longtappableDuration: number,
    ) {
        super();
    }

    pointerDown(position: PointerPosition): void {
        this.isHold = true;
        this.timerId = setTimeout(() => {
            this.isStartCalled = true;
            this.onLongTapStart(position);
            this.timerId = setTimeout(() => {
                this.accept();
                this.onLongTap();
            }, this.longtappableDuration);
        }, this.tappableDuration);
    }

    pointerUp(position: PointerPosition): void {
        this.reject();
    }

    onReject(): void {
        if (this.isStartCalled) this.onLongTapEnd();
    }

    dispose(): void {
        if (this.timerId != null) clearTimeout(this.timerId);
    }

    toString(): string {
        return "[Object LongTapGestureRecognizer]";
    }
}