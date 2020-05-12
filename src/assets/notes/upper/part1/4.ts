// @ts-nocheck
/* eslint-disable */
// 第一部分: ['作用域', '词法作用域', '函数作用域和块作用域', '提升', '作用域闭包'],
// 第二部分: ['关于this', 'this全面解析', '对象', '混合对象类', '原型', '行为委托'],

export const config: { [key: string]: string[][] } = {
  提升: [
    ['h1', '函数优先提升'],
    ['p', '1. 函数比变量优先提升'],
    ['p', '2. 块内部的函数仅能提升到所在作用域的顶部'],
    ['p', '3. 重复定义函数会覆盖前面的'],
    ['p', '4. 重复var定义标识符会被编译器忽略'],
    ['p', '5. var定义标识符提升不受块作用域束缚'],
    ['p', '6. 包括函数表达式的赋值在内的等等赋值操作不会提升']
  ]
}

export function handler() {
  try {
    // foo()
    // var foo
    // function foo(params) {
    //   console.info(1)
    // }
    // foo = function (params) {
    //   console.info(2)
    // }
    {
      var a = true
      {
        var c = 'c'
      }
      if (a) {
        var b = 3
        function foo(params) {
          console.info('a')
        }
      } else {
        var c = 4
        let d = 'd'
        function foo(params) {
          console.info('b')
        }
      }
      try {
        foo()
        console.info(b, c, d)
      } catch (error) {
        console.info(error)
      }
    }
    console.info(b, c, d)
  } catch (e) {
    console.warn(e)
  }
}
