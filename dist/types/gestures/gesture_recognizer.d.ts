import { GestureRecognizerListener, PointerPosition, PointerType } from "../type";
export declare enum GestureRecognizerResult {
    ACCEPT = 0,
    REJECT = 1
}
export declare abstract class GestureRecognizer {
    listeners: GestureRecognizerListener[];
    isHold: boolean;
    abstract handlePointer(event: PointerEvent, type: PointerType): void;
    accept(): void;
    reject(): void;
    hold(): void;
    release(): void;
    onAccept(): void;
    onReject(): void;
    dispose(): void;
    private perform;
}
export declare class TouchRippleGestureRecogzier extends GestureRecognizer {
    constructor();
    position: PointerPosition;
    createPosition(event: PointerEvent): PointerPosition;
    handlePointer(event: PointerEvent, type: PointerType): void;
    pointerDown(position: PointerPosition): void;
    pointerMove(position: PointerPosition): void;
    pointerUp(position: PointerPosition): void;
    pointerCancel(position: PointerPosition): void;
}
