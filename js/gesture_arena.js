


export class GestureArena {
    constructor() {   
        /** @type {import("./gesture_recognizer").GestureRecognizerBuilder[]} */
        this.builders = [];

        /** @type {GestureRecognizer[]} */
        this.recognizers = [];
    }

    /** @param {GestureRecognizer} builder  */
    register(builder) {
        this.builders.push(builder);
    }

    attach(recognizer) {
        this.recognizers.push(recognizer);
    }
    
    pointerDown(event) {
        if (this.recognizers.length == 0) {
            this.builders.forEach(e => this.attach(e()));
        }

        this.recognizers.forEach(r => r.pointerDown(event));
    }

    pointerMove(event) {
        this.recognizers.forEach(r => r.pointerMove(event));
    }

    pointerUp(event) {
        this.recognizers.forEach(r => r.pointerUp(event));
    }

    pointerCancel(event) {
        this.recognizers.forEach(r => r.pointerCancel(event));
    }
}