import { TouchRippleElement } from "./index";
import { PointerPosition, TouchRippleEffectStatusListener } from "./type";
export declare enum TouchRippleEffectStatus {
    NONE = 0,
    ACCEPTED = 1,
    REJECTED = 2
}
export declare class TouchRippleEffect {
    position: PointerPosition;
    callback: Function;
    isRejectable: boolean;
    isWait: boolean;
    private _status;
    private _statusListeners;
    constructor(position: PointerPosition, callback: Function, isRejectable: boolean, isWait: boolean);
    get status(): TouchRippleEffectStatus;
    set status(newValue: TouchRippleEffectStatus);
    set statusListener(callback: TouchRippleEffectStatusListener);
    fadeout(parent: HTMLElement, target: HTMLElement): void;
    notify(): void;
    createElement(parent: TouchRippleElement, target: HTMLElement): HTMLDivElement;
}
