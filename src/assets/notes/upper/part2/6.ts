// @ts-nocheck
/* eslint-disable */
// 第一部分: ['作用域', '词法作用域', '函数作用域和块作用域', '提升', '作用域闭包'],
// 第二部分: ['关于this', 'this全面解析', '对象', '混合对象类', '原型', '行为委托'],

export const config: { [key: string]: string[][] } = {
  行为委托: [
    ['h1', '行为委托'],
    ['p', '行为委托和面向类的设计不同，更直观的使用prototype,更好的利用了JS的特性'],
    [
      'p',
      '行为委托使用纯对象之间的关系进行委托，可以通过Object.setPrototypeOf或者Object.create建立委托关系'
    ],
    ['p', '为了重新定义并内部调用委托对象的函数，需要重新函数名称，防止循环调用'],
    ['p', '如果需要使用委托对象的引用变量，需要自己重新复制一份，防止与委托对象冲突']
  ]
}

export function handler() {
  try {
    {
      // parent
      function Foo() {}
      // children
      function Bar() {}
      // 委托
      Bar.prototype = Foo.prototype // bad， 互相影响，不如合二为一
      Bar.prototype = new Foo() // bad， Foo对象会影响Bar对象
      Bar.prototype = Object.create(Foo.prototype) // before es6,good
      Object.setPrototypeOf(Bar.prototype, Foo.prototype) // es6,good
    }
    {
      // 面向委托的设计
      const Foo = {
        init(name) {
          this.name = name
        },
        identify() {
          return "i'am" + this.name
        }
      }

      const Bar = Object.create(Foo)

      Bar.speak = function() {
        console.info('Hello, ' + this.identify() + '.')
      }

      const b1 = Object.create(Bar)
      b1.init('ketty')
      const b2 = Object.create(Bar)
      b2.init('lucy')
      b1.speak()
      b2.speak()
    }
    {
      // 面向类的设计
      function Foo(name) {
        this.name = name
      }
      Foo.prototype.identify = function() {
        return "i'am" + this.name
      }
      function Bar(name) {
        Foo.call(this, name)
      }
      Bar.prototype = Object.create(Foo.prototype)
      Bar.prototype.speak = function() {
        console.info('Hello, ' + this.identify() + '.')
      }

      const b1 = new Bar('ketty')
      const b2 = new Bar('lucy')
      b1.speak()
      b2.speak()
    }
  } catch (e) {
    console.warn(e)
  }
}
