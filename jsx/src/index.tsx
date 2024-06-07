import { ReactNode, useLayoutEffect, useRef } from "react";
import { TouchRippleElement } from "web-touch-ripple";

export function TouchRipple({onTap, onDoubleTap, wait, children}: {
    onTap?: VoidFunction,
    onDoubleTap?: VoidFunction,
    wait?: boolean,
    children: ReactNode,
}) {
    const ref = useRef<TouchRippleElement>();

    useLayoutEffect(() => {
        const ripple = ref.current;
        ripple.ontap = onTap;
        ripple.ondoubletap = onDoubleTap;
        
        wait ? ripple.setAttribute("wait", "") : ripple.removeAttribute("wait");
    }, [onTap, onDoubleTap, wait]);

    return (
        /** @ts-ignore */
        <touch-ripple ref={ref}>{children}</touch-ripple>
    );
}