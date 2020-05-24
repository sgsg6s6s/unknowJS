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
    ['p', '2. 隐式绑定，this替代的是最后一级调用方法的对象,例如`a.b.func()`，this指代b'],
    ['p', '3. 显示绑定(call、apply或者bind)'],
    ['p', '4. new绑定'],
    ['h1', '绑定优先级'],
    ['p', '1. 箭头函数的this取决于所在词法作用域的this的指向'],
    ['p', '2. new一个函数，this指向新创建的对象'],
    ['p', '3. 通过call、apply或者bind，this绑定的是指定对象'],
    ['p', '4. 函数通过上下文调用，this指向上下文对象'],
    ['p', '5. 绑定到undefined（严格）或者window（非严格）'],
    ['h1', '特殊情况：'],
    [
      'p',
      ' 1. 显示绑定（call或者apply）传入null、Object.create(null)或者undefined会失效，转化成默认绑定'
    ],
    [
      'p',
      ' 2. func(a,b)和func.apply(null,[a,b])会进行动态赋值，不过ES6已经支持func(...[a,b])代替了'
    ],
    ['p', ' 3. let bar = func.bind(null,2);bar(3)可以对参数柯里化'],
    ['p', ' 4. (p.foo=o.foo)()这种就不是隐式绑定了，而是默认绑定'],
    [
      'p',
      ' 5. 箭头函数不能重新指定this，new箭头函数返回的实例是箭头函数所在作用域下的this（箭头函数有返回值）或{}（箭头函数无返回值）'
    ],
    ['h1', '软绑定'],
    ['h1', 'new一个实例，构造调用的过程'],
    ['p', '1. 创建一个全新的对象'],
    ['p', '2. 新对象的[[Prototype]](浏览器叫__proto__)指向函数的prototype'],
    ['p', '3. 函数硬绑定this为新对象，再执行函数'],
    ['p', '4. 如果函数没有返回其他对象，自动返回刚创建的新对象']
  ]
}

export function handler() {
  try {
    function Person(name, age) {
      this.name = name
      this.age = age
    }

    function Animal(name, age) {
      this.name = name
      this.age = age
      return age
    }

    Person.prototype.introduce = function() {
      console.info(name, age)
    }

    {
      // 模拟new关键字的过程

      function _new(fn, ...args) {
        const instance = {}
        instance.__proto__ = fn.prototype
        const result = fn.apply(instance, args)
        return result || instance
      }

      const p1 = new Person('shig', 34)
      const p2 = _new(Person, 'shig', 34)
      console.info(p1, p2)

      const a1 = new Animal('cat', 3)
      const a2 = _new(Animal, 'dog', 5)
      console.info(a1, a2)
    }

    {
      // 比较this指向的优先级,new产生的对象和显示绑定（bind）影响的对象是不同的对象，互不影响
      let paper = {
        name: 'paper',
        color: 'white'
      }
      const PaperPerson = Person.bind(paper)
      console.info('prototype of bind function', PaperPerson.prototype)
      PaperPerson('bind')
      console.info('after bind ,paper now:', paper)
      const pp = new PaperPerson('paperPerson', 18)
      console.info('new result', pp, 'paper now:', paper)
    }

    {
      const obj = {}
      function wrapper() {
        name = 'wrapper'
        this.age = 1

        let arrow = (name, age) => {
          this.name = name
          this.age = age
          console.info('this in arrow', this)
          // return this
        }

        return arrow
      }

      wrapper.prototype.print = function() {
        return { name: this.name, age: this.age }
      }

      let arrowFunc = wrapper.call(window)
      arrowFunc('arrow2', 30)
      console.info('wrappers', wrapper.name, wrapper.age)
      console.info('arrows', name, age, this === window, window.name, window.age)

      let findArrow = wrapper.bind(obj)()
      console.info(findArrow('arrow', 30), obj, wrapper.name, wrapper.age)

      arrowFunc.bind({ color: 123 })('arrow3', 300)
      const arrowObj = new arrowFunc('arrow4', 400)
      console.info('instance of bind arrow function', arrowObj)
    }

    {
      // 手撸bind方法1
      function bindWrapper(fn, thisArg) {
        return function bindFn(...args) {
          return fn.apply(thisArg, args)
        }
      }

      const obj = {
        name: 'xx',
        age: 60
      }

      const fn = bindWrapper(Person, obj)
      console.info(obj)
      fn('peter', 78)
      console.info(obj)

      const newBind = new fn('new my bind', -1)
      console.info(newBind, '这个结果让人大跌眼镜，绑定函数没有复制Person的原型')

      // 手撸bind方法2
      Function.prototype.bindByHand = function(oThis) {
        if (typeof this != 'function') {
          throw new TypeError('this is not a valid function')
        }
        const sourceFunc = this,
          defaultArgs = Array.prototype.slice.call(arguments, 1),
          BindParent = function() {},
          Bind = function() {
            'use strict'
            const result = sourceFunc.apply(
              this instanceof BindParent ? this : !oThis ? Object.create(null) : oThis,
              defaultArgs.concat(Array.prototype.slice.apply(arguments))
            )
            return result
          }
        BindParent.prototype = sourceFunc.prototype
        Bind.prototype = BindParent.prototype
        return Bind
      }

      function A(a, b) {
        // console.info('this in A', this)
        this.a = a
        this.b = b
        return this.a + ',' + this.b
      }

      const target = null
      var B = A.bindByHand(target)

      const b = new B(3, 5)
      console.info(b.a, b.b, b, target)
      console.info(B(4, 2), target)
    }

    {
      // 手撸软绑定 (失败)
      Function.prototype.softBind = function(oThis) {
        if (typeof this != 'function') {
          throw new TypeError('this is not a valid function')
        }
        const sourceFunc = this,
          defaultArgs = Array.prototype.slice.call(arguments, 1),
          bindFn = function() {
            return  sourceFunc.apply(
              !this || this === (window||global) ? oThis || Object.create(null) : this, 
              defaultArgs.concat(Array.prototype.slice.call(arguments))
            )
          }
        bindFn.prototype =  sourceFunc.prototype
        return bindFn
      }
      const obj1 = {}
      const obj2 = {}
      const obj3 = {}
      const obj4 = {}
      var h1 = Person.softBind(null)
      h1('soft1', 11)
      console.info('-----------------------')
      const h2 = h1.softBind(obj2)
      obj4.h2 = h2
      obj4.h2('soft2', 22)
      console.info('-----------------------')
      h1.call(obj3, 'soft3', 33)
      console.info('soft bind', obj1, obj2, obj3,obj4)

      const hh1 = new h1('new1', 111)
      const hh2 = new obj4.h2('new2', 222)
      const hh3 = new h2('new3', 333)

      console.info('new bind', hh1, hh2, hh3)
      console.info('see bind', obj1, obj2, obj3,obj4)
    }
  } catch (e) {
    console.warn(e)
  }
}
