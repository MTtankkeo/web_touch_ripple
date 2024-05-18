/// <reference types="node" />
import { GestureEventCallback, PointerPosition } from "../type";
import { TouchRippleGestureRecogzier } from "./gesture_recognizer";
export declare class LongTapGestureRecognizer extends TouchRippleGestureRecogzier {
    onLongTapStart: GestureEventCallback;
    onLongTapEnd: VoidFunction;
    onLongTap: VoidFunction;
    tappableDuration: number;
    longtappableDuration: number;
    timerId: NodeJS.Timeout;
    isStartCalled: boolean;
    constructor(onLongTapStart: GestureEventCallback, onLongTapEnd: VoidFunction, onLongTap: VoidFunction, tappableDuration: number, longtappableDuration: number);
    pointerDown(position: PointerPosition): void;
    pointerUp(position: PointerPosition): void;
    onReject(): void;
    dispose(): void;
    toString(): string;
}
