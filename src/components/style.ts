export const createRippleKeyframesStyle = () => {
    const style = document.createElement("style");
    style.appendChild(document.createTextNode(`
        @keyframes ripple-fadein {
            from {
                opacity: 0;
                transform-origin: center;
                transform: scale(var(--ripple-lower-scale, 0.3));
            }
            30% { opacity: 1; }
            to  { transform: scale(var(--ripple-upper-scale, 1)); }
        }
        
        @keyframes ripple-fadeout {
            from { opacity: 1; } to { opacity: 0; }
        }
    `));

    return style;
}