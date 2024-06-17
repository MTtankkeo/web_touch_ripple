import { TouchRippleEffect, TouchRippleEffectOption, TouchRippleEffectStatus } from "../effect";
import { GestureArena } from "../gestures/gesture_arena";
import { PointerPosition, PointerType } from "../type";
import { TapGestureRecognizer } from "../gestures/tap";
import { DoubleTapGestureRecognizer } from "../gestures/double_tap";
import { LongTapGestureRecognizer } from "../gestures/long_tap";

export class TouchRippleElement extends HTMLElement {
    private arena: GestureArena = new GestureArena({isKeepAliveLastPointerUp: true});

    /** This element is defined when the hover state. */
    private hoverEffectElement?: HTMLElement;

    /** Is defined for update the status of added a touch effect. */
    private activeEffect?: TouchRippleEffect;

    /** Called when a user taps or clicks. */
    private _ontap: Function;
    
    /** Sets a callback function that is called when a user taps or clicks. */
    set ontap(callback: Function) {
        this._ontap = callback;
        this.initBuiler();
    }

    /** Called when a user double taps of double clicks. */
    private _ondoubletap: Function;
    
    /** Sets a callback function that is called when a user double taps or double clicks. */
    set ondoubletap(callback: Function) {
        this._ondoubletap = callback;
        this.initBuiler();
    }

    /* Called when a user long press or long clicks or long pointer-down. */
    // private _onlongtap: Function;

    /** 
     * Sets a callback function that is called when a user long press or long clicks
     * or long pointer-down.
     */
    /*
    set onlongtap(callback: Function) {
        this._onlongtap = callback;
        this.initBuiler();
    }
    */

    get child(): HTMLElement {
        return this.firstElementChild as HTMLElement;
    }

    getPropertyByName(name: string, scope = this): string {
        return getComputedStyle(scope).getPropertyValue(name);
    }

    getDurationByName(name: string, scope = this): number {
        const value = this.getPropertyByName(name, scope);

        return value == "" || value == "none" ? null : value.endsWith("ms")
            ? Number(value.replace("ms", ""))
            : Number(value.replace("s", "")) * 1000;
    }

    getBooleanByName(name: string, scope = this): boolean {
        const value = this.getPropertyByName(name, scope);
        if (value == "") {
            return;
        }

        return value == "1";
    }

    /** Initializes gesture-recognizer builders for arena. */
    initBuiler() {
        this.arena.reset();

        const previewDuration = this.getDurationByName("--ripple-tap-preview-duration") ?? 150;

        if (this._ontap != null) {
            const tappableDuration = this.getDurationByName("--ripple-tappable-duration") ?? 0;

            this.arena.registerBuilder(() =>
                new TapGestureRecognizer(
                    (p) => this.showEffect(p, this._ontap, false),
                    (p) => this.showEffect(p, this._ontap, true),
                    () => this.activeEffect.status = TouchRippleEffectStatus.ACCEPTED,
                    () => this.activeEffect.status = TouchRippleEffectStatus.REJECTED,
                    previewDuration,  // ms
                    tappableDuration, // ms
                )
            );
        }

        if (this._ondoubletap != null) {
            const doubleTappableDuration = this.getDurationByName("--ripple-double-tappable-duration") ?? 300;

            this.arena.registerBuilder(() =>
                new DoubleTapGestureRecognizer(
                    p => this.showEffect(p, this._ondoubletap, false),
                    doubleTappableDuration, // ms
                )
            );
        }

        /*
        if (this._onlongtap != null) {
            const longtappableDuration = this.getDurationByName("--longtappable-duration") ?? 1000;

            this.arena.registerBuilder(() =>
                new LongTapGestureRecognizer(
                    p => this.showEffect(
                        p,
                        this._onlongtap,
                        true,
                        { // default or user option.
                            fadeInDuration: "var(--long-tappable-duration, 1s)",
                            fadeInCurve: "var(--long-tappable-curve, linear(0, 1))"
                        }
                    ),
                    () => this.activeEffect.status = TouchRippleEffectStatus.REJECTED,
                    () => this.activeEffect.status = TouchRippleEffectStatus.ACCEPTED,
                    previewDuration,
                    longtappableDuration,
                )
            );
        }
        */
    }

    connectedCallback() {
        // Sets a transparent to a touch effect color of chrome.
        this.style["-webkit-tap-highlight-color"] = "transparent";

        requestAnimationFrame(() => {
            const useHoverEffect = this.getBooleanByName("--ripple-use-hover") ?? true;
            const child = this.child;
            if (child == null) {
                throw "This element must be exists child element.";
            }

            child.style.position = "relative";
            child.style.overflow = "hidden";
            child.style.userSelect = "none";
            child.style.touchAction = "manipulation";

            { // A gestures competition related.
                this.onpointerdown   = e => this.arena.handlePointer(e, PointerType.DOWN);
                this.onpointermove   = e => this.arena.handlePointer(e, PointerType.MOVE);
                this.onpointerup     = e => this.arena.handlePointer(e, PointerType.UP);
                this.onpointercancel = e => this.arena.handlePointer(e, PointerType.CANCEL);
                this.onmouseleave    = e => this.arena.handlePointer(e as PointerEvent, PointerType.CANCEL); // for touch env
            }

            if (!('ontouchstart' in window) && useHoverEffect) {
                child.onmouseenter = () => this.onHoverStart();
                child.onmouseleave = () => this.onHoverEnd();
            }
        });
    }

    private createHoverEffectElement(): HTMLDivElement {
        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.top = "0px";
        div.style.left = "0px";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.backgroundColor = "var(--ripple-hover, rgba(0, 0, 0, 0.1))";
        div.style.opacity = "0";
        div.style.transitionProperty = "opacity";
        div.style.transitionDuration = "var(--ripple-hover-duration, 0.25s)";
        div.style.pointerEvents = "none";

        return div;
    }

    onHoverStart() {
        const parent = this.child;

        if (this.hoverEffectElement == null) {
            parent.appendChild(this.hoverEffectElement = this.createHoverEffectElement());
        }
    
        this.hoverEffectElement.ontransitionend = null;
        this.hoverEffectElement.getBoundingClientRect(); // for reflow
        this.hoverEffectElement.style.opacity = "1";
    }

    onHoverEnd() {
        if (this.hoverEffectElement) {
            const hoverEffect = this.hoverEffectElement;
            hoverEffect.style.opacity = "0";
            hoverEffect.ontransitionend = () => {
                this.child.removeChild(hoverEffect);
                this.hoverEffectElement = null;
            }
        }
    }

    showEffect(
        position: PointerPosition,
        callback: Function,
        isRejectable: boolean,
        option: TouchRippleEffectOption = {
            fadeInDuration: "var(--ripple-fadein-duration, 0.25s)",
            fadeInCurve: "var(--ripple-fadein-curve, cubic-bezier(.2,.3,.4,1))"
        },
    ) {
        const overlapBehavior = this.getPropertyByName("--ripple-overlap-behavior") ?? "overlappable";
        if (overlapBehavior == "\"cancel\"") {
            this.activeEffect?.cancel(this.child);
        } else if (overlapBehavior == "\"ignoring\"" && this.activeEffect != null) {
            return;
        }

        this.activeEffect = new TouchRippleEffect(
            position,
            callback,
            isRejectable,
            this.hasAttribute("wait"),
            option,
        );
        
        this.child.appendChild(this.activeEffect.createElement(this, this.child));
    }

    /** Returns a names of a touch-ripple events. */
    static get observedAttributes() {
        return ["ontap", "ondoubletap"];
    }

    attributeChangedCallback(
        attrName: string,
        oldVal: string,
        newVal: string
    ) {
        if (newVal != null) {
            if (attrName == "ontap") this.ontap = new Function(newVal);
            if (attrName == "ondoubletap") this.ondoubletap = new Function(newVal);
        }
    }
}

customElements.define("touch-ripple", TouchRippleElement);