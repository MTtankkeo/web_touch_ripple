import { useLayoutEffect, useRef } from "react";
export function TouchRipple({ onTap, onDoubleTap, wait, children }) {
    const ref = useRef();
    useLayoutEffect(() => {
        const ripple = ref.current;
        ripple.ontap = onTap;
        ripple.ondoubletap = onDoubleTap;
        wait ? ripple.setAttribute("wait", "") : ripple.removeAttribute("wait");
    }, [onTap, onDoubleTap, wait]);
    return (<touch-ripple ref={ref}>{children}</touch-ripple>);
}
