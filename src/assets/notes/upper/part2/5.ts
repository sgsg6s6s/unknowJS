// @ts-nocheck
/* eslint-disable */
// 第一部分: ['作用域', '词法作用域', '函数作用域和块作用域', '提升', '作用域闭包'],
// 第二部分: ['关于this', 'this全面解析', '对象', '混合对象类', '原型', '行为委托'],

export const config: { [key: string]: string[][] } = {
  原型: [
    ['h1', '函数（Function）'],
    ['p', '1. Object、Function、Array都是函数'],
    ['p', '2. new func()或者func()会执行函数func的大括号内的代码，不过两者还是有区别的'],
    ['p', '3. 函数包含prototype、__proto__、name、length等属性'],
    [
      'p',
      '4. 除了Function和Array,prototype属性的值是个对象，包含constructor属性以及通过`函数名.prototype.XX`方式增加的属性，其中constructor属性的值指向自身（即本函数）'
    ],
    ['p', '5. __proto__属性的值是一个函数，它是匿名的，也是native code'],
    ['h1', '函数对象'],
    ['p', '1. 通过new某个函数得到函数对象，函数对象和{}类似'],
    ['p', '2. 函数对象包含__proto__和函数体中`this.XX`增加的属性，后续依然可以为函数对象增加属性'],
    [
      'p',
      '3. 不存在继承时，函数对象的__proto__默认指向函数的prototype，即f.__proto__ === F.prototype'
    ],
    ['h1', '原型链'],
    ['p', '`自有属性`是指不包括在原型链中，但可以被getOwnPropertyNames获取的属性'],
    ['h2', '查找属性，例如:obj.a,从对象obj查找属性a'],
    ['p', '1. 查看obj的自有属性是否有a'],
    ['p', '2. 如果不在自有属性里，开始遍历原型链，继续查找a'],
    ['p', '3. 如果确实查不到，返回undefined'],
    ['h2', "设置属性，例如:obj.a = 'b', 需要先查询属性，再决定设置值到哪个位置"],
    ['p', ' 1. 未找到属性a的情况，obj新增属性a，并设置值，a成为obj的自有属性'],
    ['p', ' 2. 如果在obj的自有属性找到a，直接修改a的值'],
    [
      'p',
      ' 3. 如果自有属性不存在a，在原型链中找到，并且该属性是描述符(writable:false)，增加自有属性a，并修改自由属性，但遮蔽了原型链的同名属性'
    ],
    ['p', ' 4. 如果自有属性不存在a，在原型链中找到，并且该属性不是描述符，修改原型链的属性a的值']
  ]
}

export function handler() {
  try {
    // "use strict"
    let inner = {
      // innerName:'inner',
      // get innerName2(){
      //   console.info('inner get innerName2')
      //   return this.innerName
      // },
      // set innerName2(name){
      //   console.info('inner set innerName2',name)
      //   this.innerName = name
      // }
    }
    Object.defineProperty(inner, 'innerDefineName', {
      writable: false
      // set:function(name){
      //   console.info('inner set innerDefineName',name,this)
      //   this.__innerDefineName__ = name
      // },
      // get:function(){
      //   console.info('inner get innerDefineName')
      //     return this.__innerDefineName__
      // }
    })

    console.info('--------------inner begin:', inner)
    inner.innerName = 'innerName-changed'
    inner.innerName2 = 'innerName2-changed'
    inner.innerDefineName = 'innerDefineName-changed' // error
    console.info('--------------inner end:', inner, inner)

    let copy = Object.create(inner)
    let outer = Object.create(inner, {
      outerName: {
        value: 'outer',
        writable: true
        // get function(){
        //   console.info('outer set outerName')
        //   return this.outerName
        // },
        // set function(name){
        //   console.info('outer set outerName',name)
        //   this.outerName = name
        // }
      }
    })
    console.info('outer begin--------copy------:', copy)
    console.info(
      'outer.hasOwnProperty-------outerName-------:',
      outer.hasOwnProperty('outerName'),
      Reflect.ownKeys(outer)
    )
    outer.outerName = 'outerName-changed'
    console.info(
      'outer.hasOwnProperty--------outerName------:',
      outer.hasOwnProperty('outerName'),
      Reflect.ownKeys(outer)
    )
    console.info(
      'outer.hasOwnProperty--------innerName------:',
      outer.hasOwnProperty('innerName'),
      Reflect.ownKeys(outer)
    )
    outer.innerName = 'innerName-changed-by-outter'
    console.info(
      'outer.hasOwnProperty--------innerName------:',
      outer.hasOwnProperty('innerName'),
      Reflect.ownKeys(outer)
    )
    console.info(
      'outer.hasOwnProperty--------innerDefineName------:',
      outer.hasOwnProperty('innerDefineName'),
      Reflect.ownKeys(outer)
    )
    outer.innerDefineName = 'innerDefineName-changed-by-outter'
    console.info(
      'outer.hasOwnProperty--------innerDefineName------:',
      outer.hasOwnProperty('innerDefineName'),
      Reflect.ownKeys(outer),
      outer.innerDefineName
    )
    console.info('outer end--------------:', outer, 'copy', copy)
  } catch (e) {
    console.warn(e)
  }
}
