import { useLayoutEffect, useRef } from "react";
export function TouchRipple(_a) {
    var onTap = _a.onTap, onDoubleTap = _a.onDoubleTap, wait = _a.wait, children = _a.children;
    var ref = useRef();
    useLayoutEffect(function () {
        var ripple = ref.current;
        ripple.ontap = onTap;
        ripple.ondoubletap = onDoubleTap;
        wait ? ripple.setAttribute("wait", "") : ripple.removeAttribute("wait");
    }, [onTap, onDoubleTap, wait]);
    return (
    /** @ts-ignore */
    <touch-ripple ref={ref}>{children}</touch-ripple>);
}
