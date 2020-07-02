import Observer from './observer'

export class MVVM {
    constructor(options) {
        const { el, data } = options
        this.$el = el
        this.$data = data
        if (this.$el) {
            new Compile
        }
        this.$data.__ob__ = new Observer(this.$data)
        this.proxyData(this.$data)
    }

    proxyData(data) {
        for (const key in data) {
            Object.defineProperty(this, key, {
                get() {
                    return data[key]
                },
                set(val) {
                    data[key] = val
                }
            })
        }
    }
}