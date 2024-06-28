export default (a, f, cb, d = 300, e = t => 1 - (1 - t) ** 3) => {
  const n = ()=> performance.now(), b = n(), s = () => {
    const t = Math.min((n() - b) / d, 1)
    f(a[0] + (a[1] - a[0]) * e(t))
    t < 1 ? requestAnimationFrame(s) : cb && cb()
  }; s()
}