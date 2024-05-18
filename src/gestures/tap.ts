import { GestureEventCallback, PointerPosition } from "../type";
import { TouchRippleGestureRecogzier } from "./gesture_recognizer";

export class TapGestureRecognizer extends TouchRippleGestureRecogzier {
    timerIds: NodeJS.Timeout[] = [];

    /** Whether the gesture can be rejected in the middle. */
    isRejectable: boolean = false;
    
    constructor(
        public onTap: GestureEventCallback,
        public onTapRejectable: GestureEventCallback,
        public onTapAccept: GestureEventCallback,
        public onTapReject: GestureEventCallback,
        public rejectableDuration: number, // tap preview duration
        public tappableDuration: number,
    ) {
        super();
    }

    pointerDown(position: PointerPosition): void {
        const _handleRejectalbe = () => {
            this.isRejectable = true;
            this.onTapRejectable(position);
        }

        // about --tap-preview-duration
        this.timerIds.push(setTimeout(_handleRejectalbe, this.rejectableDuration));

        // about --tappable-duration
        if (this.tappableDuration != 0) {
            this.timerIds.push(setTimeout(this.reject.bind(this), this.tappableDuration));
        }
    }

    dispose(): void {
        this.timerIds.forEach(id => clearTimeout(id));
        this.timerIds = null;
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

    toString(): string {
        return "[Object TapGestureRecognizer]";
    }
}