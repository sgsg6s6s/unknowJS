function a(p) {
  console.info('async1 代码行数要多，这样加载时间才会长')
}
function b(p) {
  console.info('async1 代码行数要多，这样加载时间才会长')
}
function c(p) {
  console.info('async1 代码行数要多，这样加载时间才会长')
}
function d(p) {
  console.info('async1 代码行数要多，这样加载时间才会长')
}
function e(p) {
  console.info('async1 代码行数要多，这样加载时间才会长')
}
a && b && c && d && e()
