!function(t,e){"object"==typeof exports&&"undefined"!=typeof module?e(exports):"function"==typeof define&&define.amd?define(["exports"],e):e((t="undefined"!=typeof globalThis?globalThis:t||self).index={})}(this,(function(t){"use strict";class e{constructor(t,e){this.x=t,this.y=e}distance(t,e){let i=this.x-t,s=this.y-e;return Math.sqrt(i*i+s*s)}}var i,s,n;!function(t){t[t.NONE=0]="NONE",t[t.ACCEPTED=1]="ACCEPTED",t[t.REJECTED=2]="REJECTED",t[t.DISPOSED=3]="DISPOSED"}(i||(i={}));class o{constructor(t,e,s,n){this.position=t,this.callback=e,this.isRejectable=s,this.isWait=n,this._statusListeners=[],this._status=s?i.NONE:i.ACCEPTED}get status(){return this._status}set status(t){this._status!=t&&(this._status=t,this._statusListeners.forEach((e=>e(t))))}set statusListener(t){this._statusListeners.push(t)}notify(){this.callback&&this.callback()}fadeout(t,e=this._ripple){e.style.animation="ripple-fadeout var(--ripple-fadeout-duration, 0.4s)",e.style.animationTimingFunction="var(--ripple-fadeout-curve, cubic-bezier(.15,.5,.5,1))",e.onanimationend=()=>t.removeChild(e),this.dispose()}cancel(t,e=this._ripple){e.style.animation="ripple-fadeout var(--ripple-cancel-duration, 0s)",e.style.animationTimingFunction="var(--ripple-cancel-curve)",e.onanimationend=()=>t.removeChild(e),this.dispose()}createElement(t,s){const n=t.getBoundingClientRect(),o=this.position.x-n.left,r=this.position.y-n.top,a=t.offsetWidth/2,h=t.offsetHeight/2;var l=t.getPropertyByName("--ripple-blur-radius")||"15px",c=Number(l.replace("px",""));let p=2*new e(a,h).distance(0,0);p+=2*new e(a,h).distance(o,r),p+=2*c,this._ripple=document.createElement("div");const u=this._ripple;return u.classList.add("ripple"),u.style.position="absolute",u.style.left=`${o}px`,u.style.top=`${r}px`,u.style.width=`${p}px`,u.style.height=`${p}px`,u.style.pointerEvents="none",u.style.translate="-50% -50%",u.style.borderRadius="50%",u.style.backgroundColor="var(--ripple, rgba(0, 0, 0, 0.2))",u.style.animation="ripple-fadein var(--ripple-fadein-duration, 0.25s)",u.style.animationTimingFunction="var(--ripple-fadein-curve, cubic-bezier(.2,.3,.4,1))",u.style.animationFillMode="forwards",u.style.filter=`blur(${l})`,this.isWait||(this.status==i.ACCEPTED&&this.notify(),this.status==i.NONE&&(this.statusListener=t=>{t==i.ACCEPTED&&this.notify()})),u.onanimationend=()=>{this.isRejectable&&this.status==i.NONE?this.statusListener=t=>{t==i.ACCEPTED&&this.isWait&&this.notify(),this.fadeout(s)}:(this.isWait&&this.notify(),this.fadeout(s))},u}dispose(){this.status=i.DISPOSED,this._statusListeners=null,this._ripple=null}}!function(t){t[t.DOWN=0]="DOWN",t[t.MOVE=1]="MOVE",t[t.UP=2]="UP",t[t.CANCEL=3]="CANCEL"}(s||(s={})),function(t){t[t.ACCEPT=0]="ACCEPT",t[t.REJECT=1]="REJECT"}(n||(n={}));class r{constructor(){this.listeners=[],this.isHold=!1}accept(){this.perform(n.ACCEPT),this.onAccept()}reject(){this.perform(n.REJECT),this.onReject()}hold(){this.isHold=!0}release(){this.isHold=!1}onAccept(){}onReject(){}dispose(){}perform(t){this.dispose(),this.listeners.forEach((e=>e(t)))}}class a extends r{constructor(){super()}createPosition(t){return{x:t.clientX,y:t.clientY}}handlePointer(t,e){const i=this.position=this.createPosition(t);e==s.DOWN&&this.pointerDown(i),e==s.MOVE&&this.pointerMove(i),e==s.UP&&this.pointerUp(i),e==s.CANCEL&&(this.reject(),this.pointerCancel(i))}pointerDown(t){}pointerMove(t){}pointerUp(t){}pointerCancel(t){}}class h{constructor(t){this.option=t,this.builders=[],this.recognizers=[],this.option=Object.assign({isKeepAlivePointerUp:!0},this.option)}registerBuilder(t){this.builders.push(t)}attach(t){this.recognizers.push(t)}detach(t){this.recognizers=this.recognizers.filter((e=>e!=t))}rejectBy(t){this.detach(t),this.checkCycle()}acceptBy(t){this.recognizers.forEach((e=>e!=t?e.reject():void 0)),this.recognizers=[]}acceptWith(t){t.accept(),this.acceptBy(t)}reset(){this.builders=[],this.recognizers=[]}createRecognizer(t){const e=t();return e.listeners.push((t=>{t==n.REJECT?this.rejectBy(e):this.acceptBy(e)})),e}checkCycle(t){if(t==s.DOWN&&0==this.recognizers.length)this.recognizers=this.builders.map((t=>this.createRecognizer(t)));else if(1==this.recognizers.length){const t=this.recognizers[0];0==t.isHold&&this.acceptWith(t)}}handlePointer(t,e){e==s.DOWN&&this.checkCycle(e),this.option.isKeepAlivePointerUp&&e!=s.UP||queueMicrotask((()=>this.checkCycle(e))),this.recognizers.forEach((i=>i.handlePointer(t,e)))}}class l extends a{constructor(t,e,i,s,n,o){super(),this.onTap=t,this.onTapRejectable=e,this.onTapAccept=i,this.onTapReject=s,this.rejectableDuration=n,this.tappableDuration=o,this.timerIds=[],this.isRejectable=!1}pointerDown(t){this.timerIds.push(setTimeout((()=>{this.isRejectable=!0,this.onTapRejectable(t)}),this.rejectableDuration)),0!=this.tappableDuration&&this.timerIds.push(setTimeout(this.reject.bind(this),this.tappableDuration))}dispose(){this.timerIds.forEach((t=>clearTimeout(t)))}onAccept(){this.isRejectable?this.onTapAccept(this.position):this.onTap(this.position)}onReject(){this.isRejectable&&this.onTapReject(this.position)}}class c extends a{constructor(t){super(),this.onDoubleTap=t,this.tapCount=0}pointerDown(t){2==++this.tapCount?this.accept():(this.hold(),setTimeout((()=>this.reject()),300))}onAccept(){this.onDoubleTap(this.position)}dispose(){null!=this.timeId&&clearTimeout(this.timeId)}}class p extends a{constructor(t,e,i,s,n){super(),this.onLongTapStart=t,this.onLongTapEnd=e,this.onLongTap=i,this.tappableDuration=s,this.longtappableDuration=n,this.isStartCalled=!1}pointerDown(t){this.isHold=!0,this.timerId=setTimeout((()=>{this.isStartCalled=!0,this.onLongTapStart(t),this.timerId=setTimeout((()=>{this.accept(),this.onLongTap()}),this.longtappableDuration)}),this.tappableDuration)}pointerUp(t){this.reject()}onReject(){this.isStartCalled&&this.onLongTapEnd()}dispose(){null!=this.timerId&&clearTimeout(this.timerId)}}class u extends HTMLElement{constructor(){super(...arguments),this.arena=new h({isKeepAlivePointerUp:!0})}set ontap(t){this._ontap=t,this.initBuiler()}set ondoubletap(t){this._ondoubletap=t,this.initBuiler()}set onlongtap(t){this._onlongtap=t,this.initBuiler()}get child(){return this.firstElementChild}getPropertyByName(t,e=this){return getComputedStyle(e).getPropertyValue(t)}getDurationByName(t,e=this){const i=this.getPropertyByName(t,e);return""==i||"none"==i?null:i.endsWith("ms")?Number(i.replace("ms","")):1e3*Number(i.replace("s",""))}initBuiler(){var t,e,s;this.arena.reset();const n=null!==(t=this.getDurationByName("--tap-preview-duration"))&&void 0!==t?t:150;if(null!=this._ontap){const t=null!==(e=this.getDurationByName("--tappable-duration"))&&void 0!==e?e:0;this.arena.registerBuilder((()=>new l((t=>this.showEffect(t,this._ontap,!1)),(t=>this.showEffect(t,this._ontap,!0)),(()=>this.activeEffect.status=i.ACCEPTED),(()=>this.activeEffect.status=i.REJECTED),n,t)))}if(null!=this._ondoubletap&&this.arena.registerBuilder((()=>new c((t=>this.showEffect(t,this._ondoubletap,!1))))),null!=this._onlongtap){const t=null!==(s=this.getDurationByName("--longtappable-duration"))&&void 0!==s?s:1e3;this.arena.registerBuilder((()=>new p((t=>console.log("start")),(()=>console.log("end")),(()=>console.log("long-tap")),n,t)))}}connectedCallback(){this.style["-webkit-tap-highlight-color"]="transparent",requestAnimationFrame((()=>{const t=this.child;if(null==t)throw"This element must be exists child element.";t.style.position="relative",t.style.overflow="hidden",t.style.userSelect="none",this.onpointerdown=t=>this.arena.handlePointer(t,s.DOWN),this.onpointermove=t=>this.arena.handlePointer(t,s.MOVE),this.onpointerup=t=>this.arena.handlePointer(t,s.UP),this.onpointercancel=t=>this.arena.handlePointer(t,s.CANCEL),this.onpointerleave=t=>this.arena.handlePointer(t,s.CANCEL)}))}showEffect(t,e,i){var s,n;const r=null!==(s=this.getPropertyByName("--ripple-overlap-behavior"))&&void 0!==s?s:"overlappable";if('"cancel"'==r)null===(n=this.activeEffect)||void 0===n||n.cancel(this.child);else if('"ignoring"'==r&&null!=this.activeEffect)return;this.activeEffect=new o(t,e,i,this.hasAttribute("wait")),this.child.appendChild(this.activeEffect.createElement(this,this.child))}static get observedAttributes(){return["ontap","ondoubletap"]}attributeChangedCallback(t,e,i){null!=i&&("ontap"==t&&(this.ontap=new Function(i)),"ondoubletap"==t&&(this.ondoubletap=new Function(i)))}}customElements.define("touch-ripple",u),document.head.appendChild((()=>{const t=document.createElement("style");return t.appendChild(document.createTextNode("\n        @keyframes ripple-fadein {\n            from {\n                opacity: 0;\n                transform-origin: center;\n                transform: scale(var(--ripple-lower-scale, 0.3));\n            }\n            30% { opacity: 1; }\n            to  { transform: scale(var(--ripple-upper-scale, 1)); }\n        }\n        \n        @keyframes ripple-fadeout {\n            from { opacity: 1; } to { opacity: 0; }\n        }\n    ")),t})()),t.GestureArena=h,t.GestureRecognizer=r,t.TouchRippleElement=u}));
//# sourceMappingURL=index.js.map
