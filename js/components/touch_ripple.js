
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance(x, y) {
        let a = this.x - x;
        let b = this.y - y;
        return Math.sqrt(a * a + b * b);
    }
}

class TouchRippleElement extends HTMLElement {
    get child() {
        return this.firstElementChild;
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
                throw "해당 요소는 무조건 자식 요소가 존재해야 합니다.";
            }
            
            const asyncWait = this.hasAttribute("await");
            if (asyncWait && wait) {
                throw "선택 속성인 [await]와 [wait]가 동시 정의되었습니다.";
            }
            
            child.style.position = "relative";
            child.style.overflow = "hidden";
            child.style.cursor = "pointer";
            child.style.userSelect = "none";
            child.style.transitionDuration = "var(--fade-duration)";
            child.onclick = (event) => {
                if ((wait || asyncWait) && child.getElementsByClassName("ripple").length != 0)
                    return;
                if (wait) {
                    return this.show(event, () => eval(onTap));
                }
                this.show(event, null);
                eval(onTap);
            };

            if (!('ontouchstart' in window || navigator.maxTouchPoints)) {
                child.onpointerenter = () => { child.style.backgroundColor = "var(--hover)"; };
                child.onpointerleave = () => { child.style.backgroundColor = ""; };
            }
        });
    }

    show(event, onTap) {
        const child = this.child;
        const targetRact = child.getBoundingClientRect();
        const targetX = event.clientX - targetRact.left;
        const targetY = event.clientY - targetRact.top;
        const centerX = child.clientWidth / 2;
        const centerY = child.clientHeight / 2;

        let rippleSize = new Point(centerX, centerY).distance(0, 0) * 2;
        rippleSize += new Point(centerX, centerY).distance(targetX, targetY) * 2;

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
        ripple.style.backgroundColor = "var(--ripple)";
        ripple.style.animation = "ripple-fadein 0.15s";
        ripple.style.animationFillMode = "forwards";
        ripple.onanimationend = () => {
            ripple.style.animation = "ripple-fadeout 0.3s";
            if (onTap != null) {
                onTap();
            }
            ripple.onanimationend = () => child.removeChild(ripple);
        };
        child.appendChild(ripple);
    }
}

customElements.define("touch-ripple", TouchRippleElement);
