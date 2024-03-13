
export const PointerType = {
    DOWN: "down",
    MOVE: "move",
    UP: "up",
    CANCEL: "cancel",
}

/* This abstract class implements a fundamental gesture recognizer. */
export class GestureRecognizer {
    constructor() {
        if (this.constructor === GestureRecognizer) {
            throw new Error("Abstract class cannot invoke constructor.");
        }
    }

    /**
     * @param {PointerEvent} event
     * @param {PointerType} type
    */
    handlePointer(event, type) {
        throw new Error("handlePointer() has not been implemented.");
    }
}

export class TapGestureRecognizer extends GestureRecognizer {

}