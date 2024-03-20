import { GestureArena } from "../gestures/gesture_arena";
import { TapGestureRecognizer } from "../gestures/tap";
import { PointerPosition, PointerType } from "../type";

class Point {
    constructor(
        public x: number,
        public y: number
    ) {}

    distance(x: number, y: number) {
        let a = this.x - x;
        let b = this.y - y;
        return Math.sqrt(a * a + b * b);
    }
}

export class TouchRippleElement extends HTMLElement {
    arena: GestureArena = new GestureArena();

    get child(): HTMLElement {
        return this.firstElementChild as HTMLElement;
    }

    getPropertyByName(name, scope = this) {
        return getComputedStyle(scope).getPropertyValue(name);
    }

    connectedCallback() {
        const onTap = this.getAttribute("ontap");
        if (onTap == null) {
            throw "Required property value [ontap] is undefined";
        }

        requestAnimationFrame(() => {
            const wait = this.hasAttribute("wait");
            const child = this.child;
            if (child == null) {
                throw "This element must be exists child element.";
            }

            const asyncWait = this.hasAttribute("await");
            if (asyncWait && wait) {
                throw "A optional attributes [wait] and [wait] are both defined.";
            }

            child.style.position = "relative";
            child.style.overflow = "hidden";
            child.style.cursor = "pointer";
            child.style.userSelect = "none";
            child.style.transitionDuration = "var(--ripple-hover-fade-duration)";
            /*
            child.onclick = (event) => {
                if ((wait || asyncWait) && child.getElementsByClassName("ripple").length != 0)
                    return;
                if (wait) {
                    return this.show(event, () => eval(onTap));
                }
                this.show(event, null);
                eval(onTap);
            };
            */

            // A gestures competition related.
            {
                const _clearEventListener = () => {
                    document.removeEventListener("pointerup", _handlePointerUp);
                    document.removeEventListener("pointermove", _handlePointerMove);
                }
                const _handlePointerUp = (event: PointerEvent) => {
                    this.arena.handlePointer(event, PointerType.UP);
                    _clearEventListener();
                }
                const _handlePointerMove = (event: PointerEvent) => {
                    this.arena.handlePointer(event, PointerType.MOVE);
                }
                const _handlePointerCancel = (event: PointerEvent) => {
                    this.arena.handlePointer(event, PointerType.CANCEL);
                    _clearEventListener();
                }

                document.addEventListener("pointerup", _handlePointerUp);
                document.addEventListener("pointermove", _handlePointerMove);

                this.onpointerdown = event => {
                    this.arena.handlePointer(event, PointerType.DOWN);

                    document.addEventListener("pointerup", _handlePointerUp);
                    document.addEventListener("pointermove", _handlePointerMove);
                };
                this.onpointercancel = _handlePointerCancel;
                this.onpointerleave = _handlePointerCancel;

                this.arena.registerBuilder(() => {
                    return new TapGestureRecognizer(
                        (p) => this.show(p, () => console.log("onTap")),
                        () => console.log("onTapRejectable"),
                        () => console.log("onTapAccept"),
                        () => console.log("onTapReject"),
                        500
                    );
                });
            }

            if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
                child.onpointerenter = () => { child.style.backgroundColor = "var(--hover)"; };
                child.onpointerleave = () => { child.style.backgroundColor = ""; };
            }
        });
    }

    show(position: PointerPosition, onTap: Function) {
        const child = this.child;
        const targetRact = child.getBoundingClientRect();
        const targetX = position.x - targetRact.left;
        const targetY = position.y - targetRact.top;
        const centerX = child.clientWidth / 2;
        const centerY = child.clientHeight / 2;

        // Initializes setting values.
        {
            var blurRadius = this.getPropertyByName("--ripple-blur-radius") || "10px";
            var blurRadiusValue = Number(blurRadius.replace("px", ""));
            
            var rippleColor = this.getPropertyByName("--ripple") || "rgba(255, 255, 255, 0.2)";
            var rippleFadeInDuration  = this.getPropertyByName("--ripple-fadein-duration")  || "0.2s";
            var rippleFadeOutDuration = this.getPropertyByName("--ripple-fadeout-duration") || "0.3s";

            this.getAttribute("attribute");
        }

        let rippleSize = new Point(centerX, centerY).distance(0, 0) * 2;
        rippleSize += new Point(centerX,centerY).distance(
            targetX + blurRadiusValue,
            targetY + blurRadiusValue
        ) * 2;

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
        ripple.style.backgroundColor = `${rippleColor}`;
        ripple.style.animation = `ripple-fadein ${rippleFadeInDuration}`;
        ripple.style.animationFillMode = "forwards";
        ripple.style.filter = `blur(${blurRadius})`;
        ripple.onanimationend = () => {
            ripple.style.animation = `ripple-fadeout ${rippleFadeOutDuration}`;
            if (onTap != null) {
                onTap();
            }
            ripple.onanimationend = () => child.removeChild(ripple);
        };
        child.appendChild(ripple);
    }
}

customElements.define("touch-ripple", TouchRippleElement);
