function fooASM(stdlib, foreign, heap) {
  "use asm"
  const arr = new stdlib.Int32Array(heap)

  return {
    foo(x, y) {
      x = x | 0
      y = y | 0
      let i = 0
      let p = 0
      let sum = 0
      const count = ((y | 0) - (x | 0)) | 0
      for (i = x | 0; ((i | 0) < (y | 0)); p = (p + 8) | 0, i = (i + 1) | 0) {
        arr[p >> 3] = (i * (i + 1)) | 0
      }

      for (i = 0, p = 0; ((i | 0) < (count | 0)); p = (p + 8) | 0, i = (i + 1) | 0) {
        sum = (sum + arr[p >> 3]) | 0
      }

      return +(sum / count)
    }
  }
}

const heap = new ArrayBuffer(0x1000)
const foo = fooASM(window, null, heap).foo
console.info(foo(10, 20))