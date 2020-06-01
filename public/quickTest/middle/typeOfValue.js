const values = [
  undefined,
  null,
  1,
  'love',
  true,
  Symbol('PASS'),
  {},
  function() {},
  [],
  new Set(),
  new Map(),
  new ArrayBuffer()
]
for (const value of values) {
  const container = value
  try {
    console.info('变量container的值是', container, '，类型是', typeof container)
  } catch (e) {
    console.info(value, e)
  }
}
