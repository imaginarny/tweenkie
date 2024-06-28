export type ArrayComplex = [number, number] | [number, number][]

export type UpdateFunctionComplex<A extends ArrayComplex> =
  A extends [number, number] ? (value: number) => void :
  A extends [number, number][] ? (value: number[]) => void :
  never

export type Duration = number
export type CallbackFunction = () => void
export type EasingFunction = (t: number) => number

export type TweenFunctionSimple = (
  a: [number, number],
  f: (value: number) => void,
  cb?: CallbackFunction,
  d?: Duration,
  e?: EasingFunction
) => void

export type TweenFunctionComplex = <A extends ArrayComplex>(
  a: A,
  f: UpdateFunctionComplex<A>,
  cb?: CallbackFunction,
  d?: Duration,
  e?: EasingFunction
) => void
