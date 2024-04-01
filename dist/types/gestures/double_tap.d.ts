/// <reference types="node" />
import { GestureEventCallback, PointerPosition } from "../type";
import { TouchRippleGestureRecogzier } from "./gesture_recognizer";
export declare class DoubleTapGestureRecognizer extends TouchRippleGestureRecogzier {
    onDoubleTap: GestureEventCallback;
    tapCount: number;
    timeId: NodeJS.Timeout;
    constructor(onDoubleTap: GestureEventCallback);
    pointerDown(position: PointerPosition): void;
    onAccept(): void;
    dispose(): void;
}
