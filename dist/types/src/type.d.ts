import { TouchRippleEffectStatus } from "./effect";
import { GestureRecognizer, GestureRecognizerResult } from "./gestures/gesture_recognizer";
export type GestureRecognizerBuilder = () => GestureRecognizer;
export type GestureRecognizerListener = (result: GestureRecognizerResult) => void;
export type GestureEventCallback = ({ x, y }: {
    x: number;
    y: number;
}) => void;
export type PointerPosition = {
    x: number;
    y: number;
};
export type TouchRippleEffectStatusListener = (status: TouchRippleEffectStatus) => void;
export declare enum PointerType {
    DOWN = 0,
    MOVE = 1,
    UP = 2,
    CANCEL = 3
}
