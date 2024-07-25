import { jsx as _jsx } from "react/jsx-runtime";
import { useLayoutEffect, useRef } from "react";
export function TouchRipple({ onTap, onDoubleTap, onLongTap, wait, children }) {
    const ref = useRef();
    useLayoutEffect(() => {
        const ripple = ref.current;
        ripple.ontap = onTap;
        ripple.ondoubletap = onDoubleTap;
        ripple.onlongtap = onLongTap;
        wait ? ripple.setAttribute("wait", "") : ripple.removeAttribute("wait");
    }, [onTap, onDoubleTap, onLongTap, wait]);
    return (_jsx("touch-ripple", { ref: ref, children: children }));
}
