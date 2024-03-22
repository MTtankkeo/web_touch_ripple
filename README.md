# Touch Ripple For Web
Use web components to implement efficient and simple touch ripple effects.

## Preview
This is just a preview of a simple example of that package.

> This may be different from the real thing (by gif)

![ezgif-2-d586f8046c](https://github.com/MTtankkeo/web_touch_ripple/assets/122026021/eb0c866c-fb18-4f2c-8f08-c706214e01f9)

## How to apply ripple element
Please referance to a codes below!

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
    ripple.ontap = () => console.log("hello world!");
</script>
```

### How to wait callback until ripple effect are spread all?
This is can implement by adding a attribute `wait` to a touch-ripple element.

```html
<!-- For add attribute wait. -->
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
| --ripple-fadein-duration | Duration until the ripple effect completely fills the element. | 0.2s
| --ripple-fadeout-duration | Duration until the ripple effect disappears. | 0.3s
| --ripple-blur-radius | The blur effect radius of touch ripple. | 10px
| --ripple-lower-scale | The ripple scale of start point. | 0.3
| --ripple-upper-scale | The ripple scale of end point. | 1