"use strict"
function Singleton(name) {
    if (Singleton.single === true) {
        this.name = name
    } else {
        return Singleton.getInstance(name)
    }
}
Object.defineProperty(Singleton, "getInstance", {
    value: (function () {
        let instance
        return function (...rest) {
            if (!instance) {
                if (Singleton.single === true) {
                    throw new Error('Singleton.single can not set true.')
                }
                Singleton.single = true
                instance = new Singleton(...rest)
                Singleton.single = false
            }
            return instance
        }
    })(),
    configurable: false,
    writable: false,
    enumerable: false
})

// Singleton.single = true
const bad = Singleton('bad boy');

const s3 = Singleton.getInstance('li 2');
const s1 = new Singleton('li si');
const s0 = new Singleton();
const s2 = Singleton('li si');
console.info(s0 === s1)
console.info(s2 === s1)
console.info(s2 === s3)
console.info(bad === s3)
console.info(s0, s1, s2, s3, bad)