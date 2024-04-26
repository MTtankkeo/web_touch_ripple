# Touch Ripple For Web
Use web components to implement efficient and simple touch ripple effects.

## Preview
This is just a preview of a simple example of that package.

> This may be different from the real thing (by gif)

![ezgif-2-d586f8046c](https://github.com/MTtankkeo/web_touch_ripple/assets/122026021/eb0c866c-fb18-4f2c-8f08-c706214e01f9)

## How to apply ripple element
Please refer to the following codes for details!

### Staticly
This is a solution of converting a string into a function and using it.

> Not recommended to use it in this way and it can mainly be used for debugging purposes.

```html
<!-- Called when a user taps or clicks. -->
<touch-ripple ontap="console.log('hello world!')">
    <h1 style="padding: 15px;">
        Tappabe
    </h1>
</touch-ripple>
```

### Locally
This is the most ideal and widely used solution.

```html
<touch-ripple id="ripple">...</touch-ripple>
<script>
    // in script.
    const ripple = document.getElementById("ripple");

    // Called when a user taps or clicks.
    ripple.ontap = () => console.log("tap!");

    // Called when a user double taps or clicks.
    ripple.ondoubletap = () => console.log("double tap!");

    // Called when a user long press or long clicks or long pointer-down.
    ripple.onlongtap = () => console.log("long tap!");
</script>
```

### How to wait callback until ripple effects are spread all?
This is can implement by adding a attribute `wait` to a touch-ripple element.

```html
<!-- Called when a ripple effect has spread all, after a user taps and clicks. -->
<touch-ripple ontap="() => ..." wait>
```

### How to use with react in typescript?
This is can easily implement this by adding the code below or modifying some of it.

```tsx
export function TouchRipple({onTap, wait, children}: {
    onTap?: Function,
    wait?: boolean,
    children: VNode,
}) {
    const ref = useRef<TouchRippleElement>();

    useLayoutEffect(() => {
        const ripple = ref.current;
        ripple.ontap = onTap;
        
        wait ? ripple.setAttribute("wait", "") : ripple.removeAttribute("wait");
    }, [onTap, wait]);

    return (
        /** @ts-ignore */
        <touch-ripple ref={ref}>{children}</touch-ripple>
    );
}
```

## Static variables of CSS
| Name | Description | Default Value
| ------ | ------ | ------
| --ripple | background color of touch-ripple effect. | rgba(0, 0, 0, 0.2)
| --ripple-fadein-duration | Duration until the ripple effect completely fills the element. | 0.25s
| --ripple-fadein-curve | This is curve about fade-in and spread animation of ripples. | cubic-bezier(.2,.3,.4,1)
| --ripple-fadeout-duration | Duration until the ripple effect disappears. | 0.4s
| --ripple-fadeout-curve | This is curve about fade-out animation of ripples. | default of browser
| --ripple-blur-radius | The blur effect radius of touch ripple. | 15px
| --ripple-lower-scale | The ripple scale of start point. | 0.3
| --ripple-upper-scale | The ripple scale of end point. | 1
| --tap-preview-duration | The rejectable duration about tap event. | 0.15s
| --tappable-duration | After a pointer down occurs, gestures are rejected after this duration. | none
| --double-tappable-duration | This duration required to define if it is a double tap. | 0.1s
| --long-tappable-duration | This duration required to define if it is a long tap. | 1s
| --ripple-overlap-behavior | This option defines the behavior of a touch ripple when it overlaps. | overlappable

## How to customize gestures?
Use the `Gesture Arena` and `Gesture Recognizer` provide on this package.

```js
// for gestures competition for accept on the place.
this.arena = new GestureArena();
```

```js
// for factory function registering about the gesture-recognizer.
this.arena.registerBuilder(() =>
    new TapGestureRecognizer(...args)
);
```

### How to make gesture recognizer?
Please refer to the following codes for details!

```ts
// in `gesture_recognizer.ts`
export class TouchRippleGestureRecogzier extends GestureRecognizer { ... }
```

```ts
// e.g.
export class TestGestureRecognizer extends TouchRippleGestureRecogzier {
    constructor(
        public callback1: GestureEventCallback,
        public callback2: GestureEventCallback,
        public callback3: GestureEventCallback,
    ) {
        super();
    }

    pointerDown(position: PointerPosition): void { ... }
    pointerMove(positoin: PointerPosition): void { ... }
    pointerUp(positoin: PointerPosition): void { ... }
    pointerCancel(positoin: PointerPosition): void { ... }

    dispose(): void {
        // Defines all values defined for judgment as null.
    }

    onAccept(): void { ... }
    onReject(): void { ... }
}
```