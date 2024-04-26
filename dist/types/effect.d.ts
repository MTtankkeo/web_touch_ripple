import { TouchRippleElement } from "./index";
import { PointerPosition, TouchRippleEffectStatusListener } from "./type";
export declare enum TouchRippleEffectStatus {
    NONE = 0,
    ACCEPTED = 1,
    REJECTED = 2,
    DISPOSED = 3
}
export declare class TouchRippleEffect {
    position: PointerPosition;
    callback: Function;
    isRejectable: boolean;
    isWait: boolean;
    private _status;
    private _statusListeners;
    private _ripple;
    constructor(position: PointerPosition, callback: Function, isRejectable: boolean, isWait: boolean);
    get status(): TouchRippleEffectStatus;
    set status(newValue: TouchRippleEffectStatus);
    set statusListener(callback: TouchRippleEffectStatusListener);
    notify(): void;
    fadeout(parent: HTMLElement, target?: HTMLElement): void;
    cancel(parent: HTMLElement, target?: HTMLElement): void;
    createElement(parent: TouchRippleElement, target: HTMLElement): HTMLElement;
}
