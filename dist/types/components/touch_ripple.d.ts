import { TouchRippleEffect } from "../effect";
import { GestureArena } from "../gestures/gesture_arena";
import { PointerPosition } from "../type";
export declare class TouchRippleElement extends HTMLElement {
    arena: GestureArena;
    activeEffect: TouchRippleEffect;
    private _ontap;
    set ontap(callback: Function);
    private _ondoubletap;
    set ondoubletap(callback: Function);
    get child(): HTMLElement;
    getPropertyByName(name: string, scope?: this): string;
    getDurationByName(name: string, scope?: this): number;
    initBuiler(): void;
    connectedCallback(): void;
    showEffect(position: PointerPosition, callback: Function, isRejectable: boolean): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void;
}
