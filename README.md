# Touch Ripple For Web
Use web components to implement simple touch ripple effects.

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
| --ripple | background color of touch-ripple effect. | 0.1s
| --ripple-hover | background color when hover. | 0.1s
| --ripple-hover-fade-duration | None. | 0.1s
| --ripple-fadein-duration | Duration until the ripple effect completely fills the element. | 0.2s
| --ripple-fadeout-duration | Duration until the ripple effect disappears. | 0.3s
| --ripple-blur-radius | The blur effect radius of touch ripple. | 10px
| --ripple-lower-scale | The ripple scale of start point. | 0.3
| --ripple-upper-scale | The ripple scale of end point. | 1