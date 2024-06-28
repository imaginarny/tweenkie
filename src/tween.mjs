export default (a, f, cb, d = 300, e = t => 1 - (1 - t) ** 3) => {
  const n = ()=> performance.now(), b = n(), i = (v, t) => v[0] + (v[1] - v[0]) * t, s = () => {
    const t = Math.min((n() - b) / d, 1)
    f(a[0].map ? a.map(v => i(v, e(t))) : i(a, e(t)))
    t < 1 ? requestAnimationFrame(s) : cb && cb()
  }; s()
}