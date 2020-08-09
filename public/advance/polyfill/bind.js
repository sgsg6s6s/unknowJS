Function.prototype.myCall = function (target) {
  if (typeof this !== 'function') {
    throw new Error('must be a function to use myCall')
  }

  const argLen = arguments.length
  let realParams = []
  if (argLen > 1) {
    realParams = [...arguments].slice(1)
  }
  target = target || window;// 当做对象，用对象点方法绑定
  target.fn = this
  const result = target.fn(...realParams)
  delete target.fn
  return result
}
Function.prototype.myApply = function (target) {
  if (typeof this !== 'function') {
    throw new Error('must be a function to use myCall')
  }

  const argLen = arguments.length
  let realParams = []
  if (arguments[1]) {
    realParams = [...arguments[1]]
  }
  target = target || window;// 当做对象，用对象点方法绑定
  target.fn = this
  const result = target.fn(...realParams)
  delete target.fn
  return result
}

Function.prototype.myBind = function (target) {
  if (typeof this !== 'function') {
    throw new Error('must be a function to use myCall')
  }
  const oldFunc = this
  let realParams = []
  if (arguments[1]) {
    realParams = [...arguments].slice(1)// 函数柯力化
  }
  const bindFunc = function () {
    return oldFunc.myCall(this instanceof bindFunc ? this : target, ...realParams.concat([...arguments]))// new和不new不同处理；函数柯力化参数合并
  }
  bindFunc.prototype = this.prototype // 保证new的时候获得原型是原函数的原型
  return bindFunc // 返回一个函数
}

function getName(index, status) {
  this.index = index
  this.status = status
  return this.name + index
}

console.info(getName.myCall({ name: 'pig' }, 1, 2))
console.info(getName.call({ name: 'pig' }, 1, 2))
console.info(getName.myApply({ name: 'pig' }, [1, 2]))
console.info(getName.apply({ name: 'pig' }, [1, 2]))

const bindFunc = getName.bind({ name: 'beach' }, 3)
const myBindFunc = getName.myBind({ name: 'bitch' }, 2)
console.info(bindFunc(3, 4))
console.info(new bindFunc(3, 4))
console.info(myBindFunc(2, 9))
console.info(new myBindFunc(2, 9))