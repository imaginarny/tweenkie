import { TweenFunctionSimple } from '../types.mjs'

declare module 'tweenkie/simple' {
  const tween: TweenFunctionSimple
  export = tween
}

declare module 'tweenkie/server/simple' {
  const tween: TweenFunctionSimple
  export = tween
}

declare module 'tweenkie/umd/simple' {
  const tween: TweenFunctionSimple
  export = tween
}
