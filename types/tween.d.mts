import { TweenFunctionComplex } from './types.mjs'

declare module 'tweenkie' {
  const tween: TweenFunctionComplex
  export = tween
}

declare module 'tweenkie/server' {
  const tween: TweenFunctionComplex
  export = tween
}

declare module 'tweenkie/umd' {
  const tween: TweenFunctionComplex
  export = tween
}
