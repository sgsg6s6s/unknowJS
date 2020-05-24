function Person(name, age) {
  this.name = name
  this.age = age
  console.info(this.name, this.age)
  return this
}
// 手撸软绑定
Function.prototype.softBind = function(oThis) {
    const fn = this
    const defaultArgs = Array.prototype.slice.call(arguments, 1)
    const bound = function(){
        return fn.apply((!this||this===(window||global))?oThis:this,defaultArgs.concat(Array.prototype.slice.call(arguments)))
    }
    bound.prototype = Object.create(fn.prototype)
    return bound

//   if (typeof this != 'function') {
//     throw new TypeError('this is not a valid function')
//   }
//   const sourceFunc = this, 
//   BindParent = function() {},
//   defaultArgs = Array.prototype.slice.call(arguments, 1),
//   bindFn = function() {
//       // sourceFunc=h1=bindFn(oThis = obj1,this=obj2), oThis = obj2 ,this = undefined || window
//     result = sourceFunc.apply(
//       this instanceof BindParent  ? this :  oThis|| this !== (window||global)  && this || Object.create(null),
//       defaultArgs.concat(Array.prototype.slice.call(arguments))
//     )
//     return result
//   }
// BindParent.prototype = sourceFunc.prototype
// bindFn.prototype = BindParent.prototype
// return bindFn
}
const obj1 = {}
const obj2 = {}
const obj3 = {}
const h1 = Person.softBind(obj1)
h1('soft1', 11)
console.info('-----------------------')
const h2 = h1.softBind(obj2)
h2('soft2', 22)
console.info('-----------------------')
h1.call(obj3, 'soft3', 33)
console.info('soft bind', obj1, obj2, obj3)

const hh1 = new h1('new1', 111)
const hh2 = new h2('new2', 222)
const hh3 = new h2('new3', 333)

console.info('new bind', hh1, hh2, hh3)
console.info('see bind', obj1, obj2, obj3)
