import { TouchRippleEffect, TouchRippleEffectOption, TouchRippleEffectStatus } from "../effect";
import { GestureArena } from "../gestures/gesture_arena";
import { PointerPosition, PointerType } from "../type";
import { TapGestureRecognizer } from "../gestures/tap";
import { DoubleTapGestureRecognizer } from "../gestures/double_tap";
import { LongTapGestureRecognizer } from "../gestures/long_tap";

export class TouchRippleElement extends HTMLElement {
    arena: GestureArena = new GestureArena({isKeepAliveLastPointerUp: true});

    /** Is defined for update the status of added a touch effect. */
    activeEffect?: TouchRippleEffect;

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
    private _onlongtap: Function;

    /** 
     * Sets a callback function that is called when a user long press or long clicks
     * or long pointer-down.
     */
    set onlongtap(callback: Function) {
        this._onlongtap = callback;
        this.initBuiler();
    }

    get child(): HTMLElement {
        return this.firstElementChild as HTMLElement;
    }

    getPropertyByName(name: string, scope = this) {
        return getComputedStyle(scope).getPropertyValue(name);
    }

    getDurationByName(name: string, scope = this) {
        const value = this.getPropertyByName(name, scope);

        return value == "" || value == "none" ? null : value.endsWith("ms")
            ? Number(value.replace("ms", ""))
            : Number(value.replace("s", "")) * 1000;
    }

    /** Initializes gesture-recognizer builders for arena. */
    initBuiler() {
        this.arena.reset();

        const previewDuration = this.getDurationByName("--tap-preview-duration") ?? 150;

        if (this._ontap != null) {
            const tappableDuration = this.getDurationByName("--tappable-duration") ?? 0;

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
            this.arena.registerBuilder(() =>
                new DoubleTapGestureRecognizer(p => this.showEffect(p, this._ondoubletap, false))
            );
        }

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