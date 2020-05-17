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
    ['p', '4. 重复var定义标识符会被编译器忽略，但后面的赋值会覆盖前面的'],
    ['p', '5. var定义标识符提升不受块作用域束缚'],
    ['p', '6. 包括函数表达式的赋值在内的等等赋值操作不会提升']
  ]
}

export function handler() {
  try {
    var varA = 'A'
    var varA = 'A2'
    console.info('1. 忽略重复var的定义语句，但varA是后面赋予的值，varA=', varA)

    funcLevel1() // 在前面执行，B也只能属于函数作用域
    try {
      console.info('varB=', varB)
    } catch (e) {
      console.error('外部不能访问函数funcLevel1内部定义的varB', e.toString().split('\n')[0])
    }

    function funcLevel1() {
      {
        var varD = 'D'
      }
      console.info('2. 块级作用域阻挡不了varD提升，varD=', varD)
      console.info('3. varB提升的定义，但提升不了赋值，所以varB=', varB)
      var varB = 'B'
      console.info('4. varA赋值在函数调用之前，函数内部获得varA=', varA)
      console.info('5. varC赋值在函数调用之后，函数内部无法获得varC后面赋予的值，所以varC=', varC)
    }

    try {
      funcLevel2()
    } catch (e) {
      console.info('6. funcLevel2没有作为函数提升，而是一个标识符提升，funcLevel2是', funcLevel2)
    }

    var varC = 'outter-varC'
    var funcLevel2 = function() {
      console.info('7. 当前函数作用域能找到varC，就不会冒泡去外作用域再找了,varC=', varC)
      var varC = 'C'
    }
    funcLevel2()

    // let letA = 'letA'

    // {
    //   var a = true
    //   {
    //     var c = 'c'
    //   }
    //   if (a) {
    //     var b = 3
    //     function foo(params) {
    //       console.info('a')
    //     }
    //   } else {
    //     var c = 4
    //     let d = 'd'
    //     function foo(params) {
    //       console.info('b')
    //     }
    //   }
    //   try {
    //     foo()
    //     console.info(b, c, d)
    //   } catch (error) {
    //     console.info(error)
    //   }
    // }
    // console.info(a,b, c, d)
  } catch (e) {
    console.warn(e)
  }
}
