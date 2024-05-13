import { TouchRippleElement } from "./index";
import { Point } from "./point";
import { PointerPosition, TouchRippleEffectStatusListener } from "./type";

export enum TouchRippleEffectStatus {
    NONE,
    ACCEPTED,
    REJECTED,
    DISPOSED
}

export type TouchRippleEffectOption = {
    fadeInDuration: string,
    fadeInCurve: string,
}

export class TouchRippleEffect {
    private _status: TouchRippleEffectStatus;
    private _statusListeners: TouchRippleEffectStatusListener[] = [];
    private _ripple: HTMLElement;

    constructor(
        public position: PointerPosition,
        public callback: Function,
        public isRejectable: boolean,
        /** Whether to hold event calls until effects are spread all. */
        public isWait: boolean,
        public option: TouchRippleEffectOption
    ) {
        isRejectable
            ? this._status = TouchRippleEffectStatus.NONE
            : this._status = TouchRippleEffectStatus.ACCEPTED;
    }

    get status() { return this._status };

    set status(newValue: TouchRippleEffectStatus) {
        if (this._status != newValue) {
            this._status = newValue;
            this._statusListeners.forEach(l => l(newValue));
        }
    }

    set statusListener(callback: TouchRippleEffectStatusListener) {
        this._statusListeners.push(callback);
    }

    notify() {
        if (this.callback) this.callback();
    }

    fadeout(
        parent: HTMLElement,
        target: HTMLElement = this._ripple
    ) {
        target.style.animation = "ripple-fadeout var(--ripple-fadeout-duration, 0.4s)";
        target.style.animationTimingFunction = "var(--ripple-fadeout-curve, cubic-bezier(.15,.5,.5,1))";
        target.onanimationend = () => parent.removeChild(target);
        this.dispose();
    }

    cancel(
        parent: HTMLElement,
        target: HTMLElement = this._ripple
    ) {
        target.style.animation = "ripple-fadeout var(--ripple-cancel-duration, 0s)";
        target.style.animationTimingFunction = "var(--ripple-cancel-curve)";
        target.onanimationend = () => parent.removeChild(target);
        this.dispose();
    }
    
    createElement(
        parent: TouchRippleElement,
        target: HTMLElement,
    ) {
        const targetRact = parent.getBoundingClientRect();
        const targetX = this.position.x - targetRact.left;
        const targetY = this.position.y - targetRact.top;
        const centerX = parent.offsetWidth / 2;
        const centerY = parent.offsetHeight / 2;

        // Initializes setting values.
        {
            var blurRadius = parent.getPropertyByName("--ripple-blur-radius") || "15px";
            var blurRadiusValue = Number(blurRadius.replace("px", ""));
        }

        let rippleSize = new Point(centerX, centerY).distance(0, 0) * 2;
           rippleSize += new Point(centerX, centerY).distance(targetX, targetY) * 2;
           rippleSize += blurRadiusValue * 2;

        this._ripple = document.createElement("abcd");
        const ripple = this._ripple;
        ripple.classList.add("ripple");
        ripple.style.position = "absolute";
        ripple.style.left = `${targetX}px`;
        ripple.style.top = `${targetY}px`;
        ripple.style.width = `${rippleSize}px`;
        ripple.style.height = `${rippleSize}px`;
        ripple.style.pointerEvents = "none";
        ripple.style.translate = "-50% -50%";
        ripple.style.borderRadius = "50%";
        ripple.style.backgroundColor = "var(--ripple, rgba(0, 0, 0, 0.2))";
        ripple.style.animation = `ripple-fadein ${this.option.fadeInDuration}`;
        ripple.style.animationTimingFunction = this.option.fadeInCurve;
        ripple.style.animationFillMode = "forwards";
        ripple.style.filter = `blur(${blurRadius})`;

        // When don't need to hold the event call,
        // process it according to the current touch ripple status.
        if (!this.isWait) {
            if (this.status == TouchRippleEffectStatus.ACCEPTED) this.notify();
            if (this.status == TouchRippleEffectStatus.NONE) {
                this.statusListener = (status) => {
                    if (status == TouchRippleEffectStatus.ACCEPTED) this.notify();
                }
            }
        }

        // To understand this codes, need to refer to comment of variable [isWait].
        ripple.onanimationend = () => {
            if (this.isRejectable && this.status == TouchRippleEffectStatus.NONE) {
                this.statusListener = (status) => {
                    if (status == TouchRippleEffectStatus.ACCEPTED) {
                        if(this.isWait) this.notify();
                    }
                    this.fadeout(target);
                }
            } else {
                if (this.isWait) this.notify();
                this.fadeout(target);
            }
        };

        return ripple;
    }

    dispose() {
        this.status = TouchRippleEffectStatus.DISPOSED;
        this._statusListeners = null;
        this._ripple = null;
    }
}