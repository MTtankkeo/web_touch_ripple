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
| --ripple-hover-fade-duration | None. | 0.1s
| --ripple-fadein-duration | Duration until the ripple effect completely fills the element. | 0.2s
| --ripple-fadeout-duration | Duration until the ripple effect disappears. | 0.3s
| --ripple-blur-radius | The blur effect radius of touch ripple. | 10px
| --ripple-lower-scale | The ripple scale of start point. | 0.3
| --ripple-upper-scale | The ripple scale of end point. | 1

## How to customize touch ripple effect animations?
Refer to `css/keyframes.css` for further info.
```css
@keyframes ripple-fadein {
    from {
        opacity: 0;
    
        transform-origin: center;
        transform: scale(var(--ripple-lower-scale, 0.3));
    }
    30% { opacity: 1; }
    
    to { transform: scale(var(--ripple-upper-scale, 1)); }
}

@keyframes ripple-fadeout {
    from { opacity: 1; } to { opacity: 0; }
}
```
