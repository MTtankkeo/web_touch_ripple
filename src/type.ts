import { GestureRecognizer } from "./gesture_recognizer";

/** Signatures factory function of gesture recognizer. */
export type GestureRecognizerBuilder = () => GestureRecognizer;

export enum PointerType {
    DOWN,
    MOVE,
    UP,
    CANCEL
}