import { GestureRecognizer } from "./gesture_recognizer.js";



export class TapGestureRecognizer extends GestureRecognizer {
    handleDown(event) {
        console.log(event);
    }
    
    pointerMove(event) {
        console.log(event);
    }
}