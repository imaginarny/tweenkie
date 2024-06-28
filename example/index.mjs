import tween from '../src/server/tween.mjs'

tween(
  // minimal
  [[100, 300], [50, 500]],            // value pair(s)
  ([width, height]) => console.log(   // updateFn
    `${width.toFixed()}px`,
    `${height.toFixed()}px`,
  ),

  // optional
  () => console.log('Done!'),         // callbackFn
  25,                                 // duration (in ms)
  (t) => t                            // easingFn (linear)
)

// $ node ./example/index.mjs
