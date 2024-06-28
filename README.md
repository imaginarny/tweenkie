# 🍰 Tweenkie, a bytes-sized tweening function/library

The most compact yet complete function to tween between two or more value pairs in under 300 bytes.

![Tweenkie code example](https://github.com/imaginarny/tweenkie/assets/20380121/9017d825-aa70-4f31-818f-5a47cbdfd677)

## Install, hotlink or copy & paste

**Npm:**
```properties
npm install tweenkie
```

**CDN links:**
```
https://unpkg.com/tweenkie
```
```
https://cdn.jsdelivr.net/npm/tweenkie
```

### And this is just what it takes to tween

If you don't want to install anything (like me), just copy & paste to your `utils` file or create `tweenkie.mjs` 😉

```js
export default (a,f,cb,d=300,e=t=>1-(1-t)**3)=>{
  const n=()=>performance.now(),b=n(),i=(v,t)=>v[0]+(v[1]-v[0])*t,s=()=>{
    const t=Math.min((n()-b)/d,1)
    f(a[0].map?a.map(v=>i(v,e(t))):i(a,e(t)))
    t<1?requestAnimationFrame(s):cb&&cb()
  };s()
}
```

**Minified:**
```js
export default (a,f,cb,d=300,e=t=>1-(1-t)**3)=>{const n=()=>performance.now(),b=n(),i=(v,t)=>v[0]+(v[1]-v[0])*t,s=()=>{const t=Math.min((n()-b)/d,1);f(a[0].map?a.map(v=>i(v,e(t))):i(a,e(t)));t<1?requestAnimationFrame(s):cb&&cb()};s()}
```

> Also, read more below about other [versions](#versions).

## Usage

See example in [Codepen demo](https://codepen.io/imaginarny/pen/MWdVqqW).

```js
import tween from 'tweenkie/simple'

// Tween from 0 to 300
tween([0, 300], value => console.log(value.toFixed() + 'px'), () => console.log('Done.'))

// Change duration in ms or easing function (e.g. easeOutSine from easings.net)
tween([0, 300], <updateFn>, <callbackFn>, 250, x => Math.sin((x * Math.PI) / 2))
```

### Tween more than one value pair

```js
import tween from 'tweenkie'

tween(
  [[0, 300], [50, 100], [0.8, 1]],
  ([firstVal, secondVal, ...rest]) => console.log(firstVal, secondVal, ...rest)
)
```

### Server version

If you run your code in environment where `window` is not available, node should resolve it automatically. However, you can also import `/server` version specifically.

```js
// Resolved as
import tween from 'tweenkie'        // tween.cjs
import tween from 'tweenkie/simple' // simple/tween.cjs

// Specific
import tween from 'tweenkie/server'
import tween from 'tweenkie/server/simple'
```

### Supports CommonJS and UMD

```js
// .cjs file versions should be resolved as defined in module exports
const tween = require('tweenkie')                 // tween.cjs
const tween = require('tweenkie/simple')          // simple/tween.cjs
const tween = require('tweenkie/server')          // server/tween.cjs
const tween = require('tweenkie/server/simple')   // server/simple/tween.cjs
```

```html
<script src="https://unpkg.com/tweenkie"></script> <!-- /umd/tween.min.js -->
<script src="https://unpkg.com/tweenkie/umd/simple/tween.min.js"></script>
```

## Function params breakdown

### Required params

**`tweenkie/simple` version** - one pair of values

| **param:**   | **a (array)**       | **f (update function)**    |
|:-------------|:--------------------|:---------------------------|
| **type:**    | `[number, number]`  | `(value: number) => void`  |
| **example:** | `[100, 300]`        | `v => v.toFixed() + 'px'`  |

**Default `tweenkie` version** - one or many value pairs

| **param:**   | **a (array)**                            | **f (update function)**               |
|:-------------|:-----------------------------------------|:--------------------------------------|
| **type:**    | `[number, number] \| [number, number][]` | `(value: number \| number[]) => void` |
| **example:** | `[[100, 300], [50, 500]]`                | `v => v.map(v => v.toFixed() + 'px')` |

### Optional params (indentical for all versions)

| **param:**   | **cb (callback)**  | **d (duration)** | **e (easing)**          |
|:-------------|:-------------------|:-----------------|:------------------------|
| **type:**    | `() => void`       | `number`         | `(t: number) => number` |
| **default:** | *undefined*        | `300`            | `t => 1 - (1 - t) ** 3` |
| **note:**    | runs once finished | in milliseconds  | easeOutCubic            |

## Versions

- **`tweenkie`** *(249B, Brotli 184B)*:\
Accepts array of one or many value pairs, `[ [start, end], [start, end], ... ]`

- **`tweenkie/simple`** *(202B, Brotli 155B)*:\
Accepts one pair of values, `[start, end]`

- **`tweenkie/server`** *(240B, Brotli 178B)*:\
Server version of `tweenkie`, uses `setImmediate` instead of `requestAnimationFrame`

- **`tweenkie/server/simple`** *(193B, Brotli 151B)*:\
Server version of `tweenkie/simple`, same as above

Minified versions of all files are also included ([see dist/ in npm package](https://www.npmjs.com/package/tweenkie?activeTab=code)).

There is just a small difference in the code size, but the simple one might be just good enough for your use case.

## Recap of what it takes to tween

#### `tween.mjs` - one or many value pairs

```js
export default (a, f, cb, d = 300, e = t => 1 - (1 - t) ** 3) => {
  const n = ()=> performance.now(), b = n(), i = (v, t) => v[0] + (v[1] - v[0]) * t, s = () => {
    const t = Math.min((n() - b) / d, 1)
    f(a[0].map ? a.map(v => i(v, e(t))) : i(a, e(t)))
    t < 1 ? requestAnimationFrame(s) : cb && cb()
  }; s()
}
```

#### `simple/tween.mjs` - one pair of values

```js
export default (a, f, cb, d = 300, e = t => 1 - (1 - t) ** 3) => {
  const n = ()=> performance.now(), b = n(), s = () => {
    const t = Math.min((n() - b) / d, 1)
    f(a[0] + (a[1] - a[0]) * e(t))
    t < 1 ? requestAnimationFrame(s) : cb && cb()
  }; s()
}
```

Of course, it could be shorter, for example if easing function was linear. But these default settings provide a nice setup out of the box too, besides being tiny.

## Features

- Bytes-sized
- End value is applied in updateFn (no need to apply manually in callback as in other libraries)
- Time is normalized (from 0 to 1)
- Compatible with [easings.net](https://easings.net) functions (default translates as *easeOutCubic*), or any function that accepts and returns number from 0 to 1
- Esm, cjs, umd and their min versions [included](https://www.npmjs.com/package/tweenkie?activeTab=code)
- Types included
- Name reminds of popular US candy 🤭

## Why?

Lately, I've found myself writing tweening functions for trivial one-off uses. Installing another dependency for such cases wouldn't make sense. So instead of rewriting or copying it from file to file each time, I've decided to write it down and share, with a little twist.

The aim was to keep it as simple and short as possible, while still understandable and also.. doing it just for fun.

---

If you have come this far, [say hi](https://go.petergencur.com/x-tweenkie)! 👋
