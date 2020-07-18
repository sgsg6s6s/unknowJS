// 装饰器模式是一种结构型模式，它与对象的创建无关，主要考虑的是如何拓展对象的
// 功能。

const target = {
    /**
     * @param {string} addition 追加的方法名称
     * @returns new decorator ,有decorate和base方法
     */
    decorate(addition) {
        // this => old decorator(有decorate和base方法)
        const newTarget = Object.create(this)
        newTarget.base = (...rest) => {
            this.base(...rest)
            target[addition](...rest)
        }

        return newTarget
    },
    base(word) {
        console.info('first of all', word)
    }
}

for (const name of ['add1', 'add2', 'add3']) {
    target[name] = function () {
        console.info('decorator named', name,)
    }
}

const added2 = target.decorate('add2')
const added23 = added2.decorate('add3')
const added231 = added23.decorate('add1')
const added2312 = added231.decorate('add2')
const added2311 = added231.decorate('add1')
added2.base('children')
console.info('after added2')

added23.base('children')
console.info('after added23')

added231.base('children')
console.info('after added231')

added2312.base('children')
console.info('after added2312')

added2311.base('children')
console.info('after added2311')