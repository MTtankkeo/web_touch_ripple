import { GestureEventCallback, PointerPosition } from "../type";
import { TouchRippleGestureRecogzier } from "./gesture_recognizer";
export declare class TapGestureRecognizer extends TouchRippleGestureRecogzier {
    onTap: GestureEventCallback;
    onTapRejectable: GestureEventCallback;
    onTapAccept: GestureEventCallback;
    onTapReject: GestureEventCallback;
    rejectableDuration: number;
    tappableDuration: number;
    timerIds: number[];
    isRejectable: boolean;
    constructor(onTap: GestureEventCallback, onTapRejectable: GestureEventCallback, onTapAccept: GestureEventCallback, onTapReject: GestureEventCallback, rejectableDuration: number, tappableDuration: number);
    pointerDown(position: PointerPosition): void;
    dispose(): void;
    onAccept(): void;
    onReject(): void;
    toString(): string;
}
