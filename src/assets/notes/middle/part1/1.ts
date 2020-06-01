// @ts-nocheck
/* eslint-disable */
// 第一部分: ['类型', '值', '原生函数', '强制类型转换', '语法'],
// 第二部分: ['异步', '回调', 'Promise', '生成器', '程序性能', '性能测试和调优']

export const config: { [key: string]: string[][] } = {
  类型: [
    ['p', 'JS的值隐含类型，但字面量不隐含类型'],
    ['h1', 'JS的内置类型'],
    ['p', 'null、undefined、number、string、boolean、object、symbol'],
    ['h1', 'JS的内置基本类型'],
    ['p', 'null、undefined、number、string、boolean、symbol'],
    ['h1', 'object的子类型'],
    ['p', 'function、array、set、map等'],
    ['h1', 'typeof 查看类型'],
    ['p', '可以查看值的类型（用在字面量上也是查看值的类型）'],
    ['p', 'typeof 是安全的（即使用在未定义的变量上），永远返回字符串']
  ]
}

export function handler() {
  try {
    // typeof 被babel转义了
    // console.info('值是', undefined, '，类型是', typeof undefined)
    // console.info('值是', null, '，类型是', typeof null)
    // console.info('值是', 1, '，类型是', typeof 1)
    // console.info('值是', 'love', '，类型是', typeof 'love')
    // console.info('值是', true, '，类型是', typeof true)
    // console.info('值是', Symbol('PASS'), '，类型是', typeof Symbol('PASS'))
    // console.info('值是', {}, '，类型是', typeof {})
    // console.info('值是', function() {}, '，类型是', typeof function() {})
    // console.info('值是', [], '，类型是', typeof [])
    // console.info('值是', new Set(), '，类型是', typeof new Set())
    // console.info('值是', new Map(), '，类型是', typeof new Map())
    // console.info('值是', new ArrayBuffer(), '，类型是', typeof new ArrayBuffer())
  } catch (e) {
    console.warn(e)
  }
}
