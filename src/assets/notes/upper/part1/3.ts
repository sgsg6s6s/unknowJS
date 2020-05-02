// @ts-nocheck
/* eslint-disable */
// 第一部分: ['作用域', '词法作用域', '函数作用域和块作用域', '提升', '作用域闭包'],
// 第二部分: ['关于this', 'this全面解析', '对象', '混合对象类', '原型', '行为委托'],

export const config: { [key: string]: string[][] } = {
  函数作用域和块作用域: [
    ['h1', '一、函数作用域'],
    ['h2', '作用：'],
    ['p', '1. 隐藏内部实现'],
    ['p', '2. 防止标识符冲突'],
    ['h2', '匿名函数缺点'],
    ['p', '1. 少个有意义的名字，无法获取引用'],
    [
      'p',
      '2. 栈追踪不会显示出有意义的名字(解决办法：给匿名函数加个名字，并不违背当初划分作用域的初衷)'
    ],
    ['h2', '立即执行函数表达式（IIFE）'],
    ['p', '1. (function(){})() 等价于 (function(){}())'],
    ['p', '2. 可传参 (function(a){console.info(a)})()'],
    ['h1', '二、块作用域'],
    ['p', ' 1. with（作用域内赋值操作需谨慎） 2. try/catch 3. let'],
    ['h2', '块作用域替代方案'],
    ['p', '1. ES6之前通过try/catch/throw达到块作用域效果'],
    ['p', '2. ES6及之前版本不支持显示作用域方式']
  ]
}

a = 2
;(function foo(obj) {
  var a = 8
  console.log(a)
})()

console.log(a)
;(function() {
  console.info(1)
})()
;(function() {
  console.info(1)
})() // 被格式化了
console.info('begin for')
for (var i = 0; i < 10; i++) {
  console.info(i)
}
console.info('out for', i)
try {
  function f1() {
    var level1 = 1
    function f2() {
      var level2 = 2
      function f3() {
        var level3 = 3
        console.info('level1', level1, 'level2', level2, 'level3', level3)
      }
      console.info('f2()', level2)
      f3()
    }
    console.info('f1()', level1, level2, level3)
    f2()
  }
  f1()
} catch (err) {
  console.info('err', err)
}
try {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {}
    }
  }
  console.info('i', i, 'j', j, 'k', k)
} catch (error) {
  console.info('error', error)
}
try {
  try {
    {
      console.log(bar)
      var bar = 2
    }
    {
      console.log(bar)
      let bar = 2
    }
  } catch (error) {
    console.info('error', error)
  }
} catch (error) {
  console.info('error', error)
}

// 显示作用域方式
// let (a=8){
//   console.info(a)
// }
{
  try {
    throw undefined
  } catch (e) {
    e = 2
    console.info(e)
  }
  // console.info(e)
}
