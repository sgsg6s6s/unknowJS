function Person() {
  if (this != window) {
    this.personName = 1
  }
}

Person.prototype.speak = function() {
  console.info('Person can speak')
}

const p = new Person()
p.speak()

console.info('p的原型链上能否找到Person.prototype?', p instanceof Person)
console.info('p的原型链上能否找到Object.prototype?', p instanceof Object)
console.info('p的原型链上能否找到Function.prototype?', p instanceof Function)
console.info('p的原型链上能否找到Person.prototype?', Person.prototype.isPrototypeOf(p))
console.info('p的原型链上能否找到Person.prototype?', Object.getPrototypeOf(p) === Person.prototype)

Object.defineProperty(Object.prototype, '__proto__', {
  set: function(prototype) {
    Object.setPrototypeOf(this.prototype, prototype)
    return this.prototype
  },
  get: function() {
    return Object.getPrototypeOf(this)
  }
})

console.info('set 和 get 内部this的指向')
Object.defineProperty(Object.prototype, 'lookThis', {
  set: function(value) {
    console.info('set look this', value, this)
    this._lookThis = value
  },
  get: function() {
    console.info('get look this', this)
    return this._lookThis
  }
})

p.lookThis++

console.info('--------end----------------')
