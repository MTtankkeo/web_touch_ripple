import { GestureEventCallback, PointerPosition } from "../type";
import { TouchRippleGestureRecogzier } from "./gesture_recognizer";

export class TapGestureRecognizer extends TouchRippleGestureRecogzier {
    timerId: NodeJS.Timeout;

    isRejectable: boolean = false;
    
    constructor(
        public onTap: GestureEventCallback,
        public onTapRejectable: GestureEventCallback,
        public onTapAccept: GestureEventCallback,
        public onTapReject: GestureEventCallback,
        public previewDuration: number,
    ) {
        super();
    }

    pointerDown(position: PointerPosition): void {
        this.timerId = setTimeout(() => {
            this.isRejectable = true;
            this.onTapRejectable(position);
        }, this.previewDuration);
    }

    dispose(): void {
        clearTimeout(this.timerId);
    }

    onAccept(): void {
        if (this.isRejectable) {
            this.onTapAccept(this.position);
        } else {
            this.onTap(this.position);
        }
    }

    onReject(): void {
        if (this.isRejectable) this.onTapReject(this.position);
    }
}