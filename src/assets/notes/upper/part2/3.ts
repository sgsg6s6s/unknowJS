// @ts-nocheck
/* eslint-disable */
// 第一部分: ['作用域', '词法作用域', '函数作用域和块作用域', '提升', '作用域闭包'],
// 第二部分: ['关于this', 'this全面解析', '对象', '混合对象类', '原型', '行为委托'],

export const config: { [key: string]: string[][] } = {
  对象: [
    ['h1', '创建对象的方式'],
    ['p', '1. let a = {}'],
    ['p', '2. let a = new Object()'],
    ['p', '3. let a = Object.create(null)'],
    ['h1', 'JS语言类型(值类型)'],
    [
      'p',
      '1. string 2. number 3. boolean 4. undefined 5. null 6. object 7. Symbol(ES6新加):独立类型，和其他类型结合使用需要强制转换;'
    ],
    ['h1', 'Object函数的API'],
    ['p', "<a href='/api'>go</a>"],
    ['h1', '借用函数对象的API'],
    [
      'p',
      "1. Object.prototype.hasOwnProperty.call(obj,'inObj') 对象是否拥有该属性（第二参数，支持symbol）"
    ],
    [
      'p',
      "2. Object.prototype.propertyIsEnumerable.call(obj,'inObj') 该属性（第二参数，支持symbol）是否存在且可以被遍历出来"
    ],
    [
      'p',
      '3. Object.prototype.isPrototypeOf.call(Object.prototype,obj) 判断参数一（prototype）是否在，参数二(对象)的原型链里'
    ],
    ['h1', '对象自定义@@iterator'],
    ['p', '1. 如果对象可以被迭代遍历，需要添加Symbol.iterator属性，定义好描述符'],
    ['p', '2. 描述符定义了value是一个闭包函数'],
    ['p', '3. 闭包返回包含next方法的对象'],
    ['p', '4. next()返回的值就是for循环每次迭代拿到的值']
  ]
}

export function handler() {
  try {
    {
      console.info('创建对象')
      let obj = {}
      let obj2 = new Object()
      let obj3 = Object.create({}) // 这种方式特别，多一层__proto__
      let createNull = Object.create(null) // 这种方式特别，没有__proto__
      console.info(obj, obj2, obj3, createNull)
      console.info('对应的添加属性方式')
      obj = { a: 'a' }
      obj.b = 'b'
      Object.defineProperty(obj, 'c', { value: 'c' })
      Object.assign(obj, { d: 'd' })
      console.info('obj:', obj)
    }
    {
      console.info('JS语言类型')
      let str = 'string'
      let num = 1
      let bool = true
      let nul = null
      let unde = undefined
      let symb = Symbol('foo')
      let obj = {
        [symb]: 'symbol-value',
        get inObj() {
          return this.__a__
        },
        set inObj(tt) {
          this.__a__ = tt
        }
      }
      Object.defineProperty(obj, 'cha', {
        enumerable: false,
        set: function(name) {
          console.info(111)
          this.__cha__ = name
        },
        get: function() {
          console.info(222)
          return this.__cha__
        }
      })
      obj.cha = 'long jing'
      obj.inObj = 'test'
      console.info(
        'obj',
        obj,
        'getOwnPropertyNames',
        Object.getOwnPropertyNames(obj),
        'getOwnPropertySymbols',
        Object.getOwnPropertySymbols(obj)
      )
      for (let key in obj) {
        console.info(key, obj[key])
      }

      let combine = {
        str,
        num,
        bool,
        nul,
        unde,
        obj,
        'string-key': symb,
        [symb]: 'sym-string',
        [Symbol('key')]: Symbol('value')
      }
      console.info(Object.keys(combine), combine[symb], typeof combine[symb], typeof symb)
      console.info(symb in combine)
      console.info(
        `string:${str},number:${num},boolean:${bool},null:${nul},undefined:${unde},object:${obj},symbol:`,
        symb
      )
      console.info(
        `typeof below, string:${typeof str},number:${typeof num},boolean:${typeof bool},null:${typeof nul},undefined:${typeof unde},object:${typeof obj},symbol:${typeof symb}`
      )
      console.info('get Symbol description:', symb.description)
      for (let key in combine) {
        console.info(
          `key:${key},value:`,
          combine[key],
          `key-type:`,
          typeof key,
          `value-type:`,
          typeof combine[key]
        )
      }
      console.info('symbol keys:')
      for (let key of Object.getOwnPropertySymbols(combine)) {
        console.info(
          `key:`,
          key,
          `value:`,
          combine[key],
          `key-type:`,
          typeof key,
          `value-type:`,
          typeof combine[key]
        )
      }
      console.info(Reflect.ownKeys(combine), Symbol.for('foo') === Symbol.for('foo'))
    }
    {
      // 数组迭代器遍历
      let array = [1, 2, 3]
      let it = array[Symbol.iterator]()
      console.info(it.next())
      console.info(it.next())
      console.info(it.next())
      console.info(it.next())

      // 对象添加迭代器遍历
      let object = {
        name: 'shig',
        age: 34,
        tall: 168,
        weight: 60
      }
      Object.defineProperty(object, Symbol.iterator, {
        value: function() {
          let _self = this
          let index = 0
          let keys = Object.keys(_self)

          return {
            next: function() {
              let result = {
                key: keys[index],
                value: _self[keys[index]],
                done: index >= keys.length
              }
              index++
              return result
            }
          }
        }
      })
      for (let v of object) {
        console.info(v)
      }
      it = object[Symbol.iterator]()
      console.info(it.next())
      console.info(it.next())
      console.info(it.next())
      console.info(it.next())
      console.info(it.next())

      let obj = {
        [Symbol.iterator]: function() {
          return {
            next: function() {
              return {
                value: Math.random()
              }
            }
          }
        }
      }
      let arr = []
      let func = function() {}
      console.info(
        'prototype of ',
        'obj',
        obj.prototype,
        'arr',
        arr.prototype,
        'func',
        func.prototype,
        'Object',
        Object.prototype,
        'Function',
        Function.prototype,
        'Array',
        Array.prototype
      )
    }
  } catch (e) {
    console.warn(e)
  }
}
