import { TouchRippleEffect, TouchRippleEffectStatus } from "../effect";
import { GestureArena } from "../gestures/gesture_arena";
import { TapGestureRecognizer } from "../gestures/tap";
import { PointerPosition, PointerType } from "../type";

export class TouchRippleElement extends HTMLElement {
    arena: GestureArena = new GestureArena();

    activeEffect: TouchRippleEffect;

    /** Called when a user taps or clicks. */
    private _ontap: Function;
    set ontap(callback: Function) {
        this._ontap = callback;
        this.initBuiler();
    }

    get child(): HTMLElement {
        return this.firstElementChild as HTMLElement;
    }

    getPropertyByName(name: string, scope = this) {
        return getComputedStyle(scope).getPropertyValue(name);
    }

    /** Initializes gesture-recognizer builders for arena. */
    initBuiler() {
        this.arena.reset();
        
        if (this._ontap != null) {
            this.arena.registerBuilder(() => {
                return new TapGestureRecognizer(
                    (p) => this.showEffect(p, this._ontap, false),
                    (p) => this.showEffect(p, this._ontap, true),
                    () => this.activeEffect.status = TouchRippleEffectStatus.ACCEPTED,
                    () => this.activeEffect.status = TouchRippleEffectStatus.REJECTED,
                    150
                );
            });
        }
    }

    connectedCallback() {
        // Sets a transparent to a touch effect color of chrome.
        this.style["-webkit-tap-highlight-color"] = "transparent";

        requestAnimationFrame(() => {
            const child = this.child;
            if (child == null) {
                throw "This element must be exists child element.";
            }

            child.style.position = "relative";
            child.style.overflow = "hidden";
            child.style.userSelect = "none";
            // child.style.cursor = "pointer";
            // child.style.transitionDuration = "var(--ripple-hover-fade-duration)";

            // A gestures competition related.
            {
                this.onpointerdown   = e => this.arena.handlePointer(e, PointerType.DOWN);
                this.onpointermove   = e => this.arena.handlePointer(e, PointerType.MOVE);
                this.onpointerup     = e => this.arena.handlePointer(e, PointerType.UP);
                this.onpointercancel = e => this.arena.handlePointer(e, PointerType.CANCEL);
                this.onpointerleave  = e => this.arena.handlePointer(e, PointerType.CANCEL);
            }

            /*
            if (!('ontouchstart' in window)) {
                child.style.transitionDuration = "var(--ripple-hover-fade-duration, 0.2s)";
                child.style.transitionProperty = "background-color";

                child.onmouseenter = () => this.hoverStart();
                child.onmouseleave = () => this.hoverStart();
            }
            */
        });
    }

    showEffect(
        position: PointerPosition,
        callback: Function,
        isRejectable: boolean,
    ) {
        this.activeEffect = new TouchRippleEffect(
            position,
            callback,
            isRejectable,
            this.hasAttribute("wait")
        );
        
        this.child.appendChild(this.activeEffect.createElement(this, this.child));
    }

    /** Returns a names of a touch-ripple events. */
    static get observedAttributes() {
        return ["ontap"];
    }

    attributeChangedCallback(attrName, oldVal, newVal) {
        if (newVal != null) {
            if (attrName == "ontap") this.ontap = () => eval(newVal);
        }
    }
}

customElements.define("touch-ripple", TouchRippleElement);