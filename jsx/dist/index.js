import { jsx as _jsx } from "react/jsx-runtime";
import { useLayoutEffect, useRef } from "react";
/**
 * This component provides visual representation of the pointer event to users.
 *
 * See Also, If you want to use this component in Preact,
 * you need to refer to [offical docs of Preact](https://preactjs.com/guide/v10/getting-started#aliasing-react-to-preact).
 */
export function TouchRipple({ onTap, onDoubleTap, onLongTap, wait, children }) {
    const ref = useRef();
    useLayoutEffect(() => {
        const ripple = ref.current;
        ripple.ontap = onTap;
        ripple.ondoubletap = onDoubleTap;
        ripple.onlongtap = onLongTap;
        wait ? ripple.setAttribute("wait", "") : ripple.removeAttribute("wait");
    }, [onTap, onDoubleTap, onLongTap, wait]);
    return (
    /** @ts-ignore */
    _jsx("touch-ripple", { ref: ref, children: children }));
}
/**
 * This component used when to connect gestures from a parent element
 * to a child touch-ripple element.
 */
export function TouchRippleConnection({ children }) {
    /** @ts-ignore */
    return _jsx("touch-ripple-connection", { children: children });
}
