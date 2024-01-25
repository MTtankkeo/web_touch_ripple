# Touch Ripple For Web
Use web components to implement touch ripple effects.

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
| Name | Description
| ------ | ------
| --ripple-hover-fade-duration | None.
| --ripple-fadein-duration | Duration until the ripple effect completely fills the element.
| --ripple-fadeout-duration | Duration until the ripple effect disappears.

## How to customize touch ripple effect animations?
refer to css/keyframes.css for see also.
```css
@keyframes ripple-fadein {
    from {
        opacity: 0;
    
        transform-origin: center;
        transform: scale(0.5);
    }
    30% { opacity: 1; }
    
    to { transform: scale(1); }
}

@keyframes ripple-fadeout {
    from { opacity: 1; } to { opacity: 0; }
}
```