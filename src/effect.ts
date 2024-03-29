import { TouchRippleElement } from "./index";
import { Point } from "./point";
import { PointerPosition, TouchRippleEffectStatusListener } from "./type";

export enum TouchRippleEffectStatus {
    NONE,
    ACCEPTED,
    REJECTED,
}

export class TouchRippleEffect {
    private _status: TouchRippleEffectStatus;
    private _statusListeners: TouchRippleEffectStatusListener[] = [];

    constructor(
        public position: PointerPosition,
        public callback: Function,
        public isRejectable: boolean,
        public isWait: boolean
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

    fadeout(
        parent: HTMLElement,
        target: HTMLElement,
    ) {
        target.style.animation = "ripple-fadeout var(--ripple-fadeout-duration, 0.3s)";
        target.onanimationend = () => parent.removeChild(target);
    }

    notify() {
        if (this.callback) this.callback();
    }
    
    createElement(
        parent: TouchRippleElement,
        target: HTMLElement
    ) {
        const targetRact = parent.getBoundingClientRect();
        const targetX = this.position.x - targetRact.left;
        const targetY = this.position.y - targetRact.top;
        const centerX = parent.clientWidth / 2;
        const centerY = parent.clientHeight / 2;

        // Initializes setting values.
        {
            var blurRadius = parent.getPropertyByName("--ripple-blur-radius") || "10px";
            var blurRadiusValue = Number(blurRadius.replace("px", ""));

            parent.getAttribute("attribute");
        }

        let rippleSize = new Point(centerX, centerY).distance(0, 0) * 2;
           rippleSize += new Point(centerX, centerY).distance(targetX, targetY) * 2;
           rippleSize += blurRadiusValue * 2;

        const ripple = document.createElement("div");
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
        ripple.style.animation = "ripple-fadein var(--ripple-fadein-duration, 0.2s)";
        ripple.style.animationFillMode = "forwards";
        ripple.style.filter = `blur(${blurRadius})`;

        if (!this.isWait) {
            if (this.status == TouchRippleEffectStatus.ACCEPTED) this.notify();
            if (this.status == TouchRippleEffectStatus.NONE) {
                this.statusListener = (status) => {
                    if (status == TouchRippleEffectStatus.ACCEPTED) this.notify();
                }
            }
        }

        ripple.onanimationend = () => {
            if (this.isRejectable && this.status == TouchRippleEffectStatus.NONE) {
                this.statusListener = (status) => {
                    if (status == TouchRippleEffectStatus.ACCEPTED) {
                        if(this.isWait) this.notify();
                    }
                    this.fadeout(target, ripple);
                }
            } else {
                if (this.isWait) this.notify();
                this.fadeout(target, ripple);
            }
        };

        return ripple;
    }
}