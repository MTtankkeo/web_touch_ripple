import { GestureRecognizerListener, PointerPosition, PointerType } from "../type";
export declare enum GestureRecognizerResult {
    ACCEPT = 0,
    REJECT = 1
}
export declare abstract class GestureRecognizer {
    listeners: GestureRecognizerListener[];
    abstract handlePointer(event: PointerEvent, type: PointerType): void;
    accept(): void;
    reject(): void;
    onAccept(): void;
    onReject(): void;
    dispose(): void;
    private perform;
}
export declare class TouchRippleGestureRecogzier extends GestureRecognizer {
    constructor();
    position: PointerPosition;
    createPosition(event: PointerEvent): {
        x: number;
        y: number;
    };
    handlePointer(event: PointerEvent, type: PointerType): void;
    pointerDown(position: PointerPosition): void;
    pointerMove(position: PointerPosition): void;
    pointerUp(position: PointerPosition): void;
    pointerCancel(position: PointerPosition): void;
}
