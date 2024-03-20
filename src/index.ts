import { createRippleKeyframesStyle } from "./components/style";

export { TouchRippleElement } from "./components/touch_ripple";
export { GestureArena } from "./gestures/gesture_arena";
export { GestureRecognizer } from "./gestures/gesture_recognizer";

document.head.appendChild(createRippleKeyframesStyle());