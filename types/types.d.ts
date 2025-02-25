export type TweenFunctionSimple = (
  fromTo: [number, number],
  onUpdate: (value: number) => void,
  onEnd?: () => void,
  duration?: number,
  easing?: (t: number) => number
) => void

export type TweenFunctionComplex = <A extends [number, number] | [[number, number], ...[number, number][]]>(
  fromToOrMulti: A,
  onUpdate: A extends [number, number] ? (value: number) => void : (value: number[]) => void,
  onEnd?: () => void,
  duration?: number,
  easing?: (t: number) => number
) => void
