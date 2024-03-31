/// <reference types="node" />
import { GestureEventCallback, PointerPosition } from "../type";
import { TouchRippleGestureRecogzier } from "./gesture_recognizer";
export declare class TapGestureRecognizer extends TouchRippleGestureRecogzier {
    onTap: GestureEventCallback;
    onTapRejectable: GestureEventCallback;
    onTapAccept: GestureEventCallback;
    onTapReject: GestureEventCallback;
    previewDuration: number;
    timerId: NodeJS.Timeout;
    isRejectable: boolean;
    constructor(onTap: GestureEventCallback, onTapRejectable: GestureEventCallback, onTapAccept: GestureEventCallback, onTapReject: GestureEventCallback, previewDuration: number);
    pointerDown(position: PointerPosition): void;
    dispose(): void;
    onAccept(): void;
    onReject(): void;
}
