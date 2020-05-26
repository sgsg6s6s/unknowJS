// @ts-nocheck
/* eslint-disable */
// 第一部分: ['作用域', '词法作用域', '函数作用域和块作用域', '提升', '作用域闭包'],
// 第二部分: ['关于this', 'this全面解析', '对象', '混合对象类', '原型', '行为委托'],

export const config: { [key: string]: string[][] } = {
  原型: [
    ['h1', '原型链'],
    ['p', '`自有属性`是指不包括在原型链中，但可以被getOwnPropertyNames获取的属性'],
    ['h2', '查找属性，例如:obj.a,从对象obj查找属性a'],
    ['p', '1. 查看obj的自有属性是否有a'],
    ['p', '2. 如果不在自有属性里，开始遍历原型链，继续查找a'],
    ['p', '3. 如果确实查不到，返回undefined'],
    ['h2', "设置属性到对象，例如:obj.a = 'b', 不一定会成功，原因如下："],
    ['p', '1. 如果在obj的自有属性找到a，查看a的属性描述符，如果存在set,执行set方法，结束'],
    ['p', '2. 如果在obj的自有属性找到a，查看a的属性描述符，如果writable=true,修改成功'],
    [
      'p',
      '3. 如果在obj的自有属性找到a，查看a的属性描述符，如果writable=false,严格模式下报TypeError,非严格模式下修改无效'
    ],
    [
      'p',
      '4. obj的自有属性未找到a，在原型链上找到a，且a的属性描述符包含set方法，仅仅会执行set方法，obj上不会增加新的属性'
    ],
    [
      'p',
      '5. obj的自有属性未找到a，在原型链上找到a，且a是可修改的（writable=true），在obj上创建属性a，并成功修改a的值'
    ],
    [
      'p',
      '6. obj的自有属性未找到a，在原型链上找到a，且a是不可修改的（writable=false）,obj上不会增加新的属性，严格模式下还会报TypeError'
    ]
  ]
}

export function handler() {
  try {
    console.info('函数对象通过原型链寻根')
    console.info('一、 Object')
    console.info('Object.__proto__ === Object.prototype // ', Object.__proto__ === Object.prototype)
    console.info(
      'Object.__proto__ === Function.prototype // ',
      Object.__proto__ === Function.prototype
    )
    console.info('Object.prototype.__proto__ === null // ', Object.prototype.__proto__ === null)
    console.info(
      '结论1：Object也是一个函数（也是一种类型的对象），发现Function.prototype是自己的父亲'
    )

    console.info('二、 Function')
    console.info(
      'Function.__proto__ === Function.prototype // ',
      Function.__proto__ === Function.prototype
    )
    console.info(
      'Function.__proto__ === Object.prototype // ',
      Function.__proto__ === Object.prototype
    )
    // console.info(
    //   'Function.prototype.__proto__ === Object.prototype // ',
    //   Function.prototype.__proto__ === Object.prototype
    // )
    console.info(
      '结论2：结合结论1，函数对象的鼻祖的确是Function.prototype了，那Function.prototype是什么？先不急,标记为疑问1'
    )

    console.info('三、function A(){this.a=1}')
    function A() {
      this.a = 1
    }
    console.info('A.__proto__ === Function.prototype // ', A.__proto__ === Function.prototype)
    console.info('结论3：函数A得祖先是Function.prototype，A是函数家族的成员')

    console.info('四、class B extends A{constructor(){this.b=2}}')
    console.info('(class{}).__proto__ === Function.prototype // true,匿名创建ES6的class')
    console.info('B.__proto__ === A.prototype // false')
    console.info('B.__proto__ === A.prototype.constructor // true')
    console.info('B.__proto__ === A // true')
    console.info(
      '结论4：ES6的类的语法定义了类的继承（extends），会改变__proto__的指向（继承不仅仅如此），指向规则依然以Function.prototype为根'
    )
    console.info('typeof Function // "function"')
    console.info('typeof Function === typeof A // true')
    console.info('typeof B === typeof A // true')
    console.info('结论5：ES6的类也是函数类型，也是函数家族的成员')

    console.info('普通对象通过原型链寻根')
    let a = new A()
    console.info('let b = new B()')
    console.info('a.__proto__ == A.prototype', a.__proto__ == A.prototype)
    console.info('b.__proto__ === B.prototype // true')
    let c = {}
    console.info('c.__proto__ === Object.prototype ', c.__proto__ === Object.prototype)
    console.info(
      '结论5：对象都包含__proto__，它指向函数（也可以叫函数对象或构造函数，new这个函数得到了对象）的原型prototype'
    )

    console.info('prototype又是什么？')

    console.info('你会发现函数对象才有prototype，比如a.prototype=', a.prototype)
    console.info('Object.prototype=', Object.prototype)
    console.info('Function.prototype=', Function.prototype)
    console.info(
      '结论6：只有函数对象才有prototype，Function的prototype是函数对象，其余的prototype是普通对象'
    )

    console.info(
      'Function.prototype.constructor === Function // ',
      Function.prototype.constructor === Function
    )
    console.info(
      'Object.prototype.constructor === Function // ',
      Object.prototype.constructor === Object
    )
    console.info('A.prototype.constructor === Function // ', A.prototype.constructor === A)
    console.info('结论7：prototype有个重要的属性是constructor,它一般指向函数本身')
  } catch (e) {
    console.info(e)
  }
  try {
    // "use strict"
  } catch (e) {
    console.warn(e)
  }
}
