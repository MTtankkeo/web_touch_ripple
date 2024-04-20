import { GestureRecognizer } from "./gesture_recognizer.js";
import { GestureRecognizerBuilder, PointerType } from "../type.js";
export type GestureArenaOption = {
    isKeepAlivePointerUp: boolean;
};
export declare class GestureArena {
    option: GestureArenaOption;
    constructor(option: GestureArenaOption);
    builders: GestureRecognizerBuilder[];
    private recognizers;
    registerBuilder(builder: GestureRecognizerBuilder): void;
    attach(recognizer: GestureRecognizer): void;
    detach(recognizer: GestureRecognizer): void;
    rejectBy(target: GestureRecognizer): void;
    acceptBy(target: GestureRecognizer): void;
    acceptWith(target: GestureRecognizer): void;
    reset(): void;
    createRecognizer(builder: GestureRecognizerBuilder): GestureRecognizer;
    private checkCycle;
    handlePointer(event: PointerEvent, type: PointerType): void;
}
