import { TouchRippleEffectOption } from "../effect";
import { PointerPosition } from "../type";
export declare class TouchRippleElement extends HTMLElement {
    private arena;
    private hoverEffectElement?;
    private activeEffect?;
    private _ontap;
    set ontap(callback: Function);
    private _ondoubletap;
    set ondoubletap(callback: Function);
    get child(): HTMLElement;
    getPropertyByName(name: string, scope?: this): string;
    getDurationByName(name: string, scope?: this): number;
    getBooleanByName(name: string, scope?: this): boolean;
    initBuiler(): void;
    connectedCallback(): void;
    private createHoverEffectElement;
    onHoverStart(): void;
    onHoverEnd(): void;
    showEffect(position: PointerPosition, callback: Function, isRejectable: boolean, option?: TouchRippleEffectOption): void;
    static get observedAttributes(): string[];
    attributeChangedCallback(attrName: string, oldVal: string, newVal: string): void;
}
