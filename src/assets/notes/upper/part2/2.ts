// @ts-nocheck
/* eslint-disable */
// 第一部分: ['作用域', '词法作用域', '函数作用域和块作用域', '提升', '作用域闭包'],
// 第二部分: ['关于this', 'this全面解析', '对象', '混合对象类', '原型', '行为委托'],

export const config: { [key: string]: string[][] } = {
  this全面解析: [
    ['h1', 'this总结'],
    ['p', '1. this代替了上下文对象的引用'],
    [
      'p',
      '2. this在运行时绑定，绑定的上下文取决于函数如何被调用，而不取决于函数声明位置（类似动态作用域）'
    ],
    ['h1', '绑定规则'],
    ['p', '1. 默认绑定，调用独立函数，需要猜测谁调用了函数，一般是window'],
    [
      'p',
      '2. 隐式绑定，this替代的是最后一级调用方法的对象,例如`a.b.func()`，this指代b'
    ],
    ['p', '3. 显示绑定(call、apply或者bind)'],
    ['p', '4. new绑定'],
    ['h1', '绑定优先级'],
    ['p', '1. new一个函数，this指向新创建的对象'],
    ['p', '2. 通过call、apply或者bind，this绑定的是指定对象'],
    ['p', '3. 函数通过上下文调用，this指向上下文对象'],
    ['p', '4. 绑定到undefined（严格）或者window（非严格）'],
    ['h1', '特殊情况：'],
    [
      'p',
      ' 1. 显示绑定null、Object.create(null)或者undefined，call或者apply显示绑定失效，转化成默认绑定'
    ],
    [
      'p',
      ' 2. func(a,b)和func.apply(null,[a,b])会进行动态赋值，不过ES6已经支持func(...[a,b])代替了'
    ],
    ['p', ' 3. let bar = func.bind(null,2);bar(3)可以对参数柯里化'],
    ['p', ' 4. (p.foo=o.foo)()这种就不是隐式绑定了，而是默认绑定'],
    ['h1', '软绑定'],
    ['h1', 'new一个实例，构造调用的过程'],
    ['p', '1. 创建一个全新的对象'],
    ['p', '2. 新对象会被执行[[Prototype]]连接'],
    ['p', '3. 这个新对象会绑定到函数调用的this'],
    ['p', '4. 如果函数没有返回其他对象，自动返回刚创建的新对象']
  ]
}

window.a = 'window-a'
{
  function foo() {
    let a = 'a'

    let bar = function() {
      console.info('example1 bar print a:', this.a)
    }

    foo.a = 'foo-a'
    foo.bar = bar

    bar() // 默认绑定
    foo.bar() // 隐式绑定

    // 显示绑定
    let callReturn = bar.call(foo)
    let applyReturn = bar.apply(foo)
    console.info('call or apply return:', callReturn, applyReturn)
    let bindFoo = bar.bind(foo)
    bindFoo() // 硬绑定
    console.info(
      'example1 bar is:',
      bar,
      bar.prototype,
      typeof bar,
      bar instanceof Function
    )
    console.info(
      'example1 bind Foo is:',
      bindFoo,
      bindFoo.prototype,
      typeof bindFoo,
      bindFoo instanceof Function
    )
    let fooObj = new bindFoo()
    console.info(
      'example1 new bind Foo is:',
      fooObj,
      typeof fooObj,
      fooObj instanceof Function,
      fooObj instanceof Object
    )
    let obj = new Object()
    console.info(
      'example1 new Object is:',
      obj,
      typeof obj,
      obj instanceof Object
    )
  }
  foo()
}
{
  function foo() {
    console.info('example2 a is:', this.a)
  }
  let obj = {
    a: 2,
    foo
  }
  let bar = obj.foo
  obj.foo() // 隐式调用
  bar() // 因为引用方式调用，变成默认调用
}

{
  function foo(sth) {
    this.a = sth
  }
  let obj = {
    foo
  }
  let obj2 = {}
  obj.foo(2)
  console.info('example3 a is:', obj.a)

  obj.foo.call(obj2, 3)
  console.info('example3 a is:', obj2.a)

  let bar = new obj.foo(4)
  console.info('example3 a is:', obj.a)
  console.info('example3 a is:', bar.a)
}

{
  Function.prototype.myBind = function(othis) {
    if (!this instanceof Function) {
      throw new TypeError('invoker is wrong')
    }
    let args = Array.prototype.slice.call(arguments, 1),
      invoker = this,
      tmpFunc = function() {},
      builder = function() {
        return invoker.apply(
          this instanceof tmpFunc && othis ? this : othis,
          args.concat(Array.prototype.slice.call(arguments, 0))
        )
      }
    tmpFunc.prototype = this.prototype
    builder.prototype = new tmpFunc()
    console.info('builder', builder)
    return builder
  }

  Function.prototype.softBind = function(_this) {
    if (!this instanceof Function) {
      throw new TypeError('invoker of softBind is wrong ')
    }
    let commonArgs = [].prototype.slice.call(arguments, 1),
      invoker = this,
      builder = function() {
        return invoker.apply(
          !this || this === (window || global) ? _this : this,
          commonArgs.concat.apply(commonArgs, arguments)
        )
      }
    builder.prototype = Object.create(invoker.prototype)
    console.info('builder', builder)
    return builder
  }

  let func = function(a, b) {
    console.info(a, b)
  }
  let bindFunc = func.myBind({})
  let bindNullFunc = func.myBind(null)
  let newBindFunc = new bindFunc()
  let newBindNullFunc = new bindNullFunc()
}

{
  var user = {
    id: '1',
    name: 'shig',
    info: function toString() {
      console.info(`id:${this.id},name:${this.name}`)
    }
  }
  user.info()
  setTimeout(
    // user.info, // 通过setTimeout执行info函数，丢失this
    user.info.bind(user), // bind user作为this
    100
  )
}
