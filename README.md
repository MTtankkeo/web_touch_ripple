# Touch Ripple For Web
Use web components to implement simple touch ripple effects.

## Preview
> This may be different from the real thing `by gif`
> 
![ezgif-2-d586f8046c](https://github.com/MTtankkeo/web_touch_ripple/assets/122026021/eb0c866c-fb18-4f2c-8f08-c706214e01f9)

## How to apply ripple element
Please referance to this code!
```html
<!-- Called when the user taps or clicks. -->
<touch-ripple ontap="console.log('hello world!')">
    <h1 style="padding: 15px;">
        Tappabe
    </h1>
</touch-ripple>
```

## Static variables of CSS
| Name | Description | Default Value
| ------ | ------ | ------
| --ripple | background color of touch-ripple effect. | rgba(0, 0, 0, 0.2)
| --ripple-hover | background color when hover. | none
| --ripple-hover-fade-duration | None. | 0.2s
| --ripple-fadein-duration | Duration until the ripple effect completely fills the element. | 0.2s
| --ripple-fadeout-duration | Duration until the ripple effect disappears. | 0.3s
| --ripple-blur-radius | The blur effect radius of touch ripple. | 10px
| --ripple-lower-scale | The ripple scale of start point. | 0.3
| --ripple-upper-scale | The ripple scale of end point. | 1
