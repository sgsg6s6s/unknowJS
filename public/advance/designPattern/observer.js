const observer = {
    addSubscriber(callback) {
        if (callback && typeof callback === 'function') {
            this.subscribers.push(callback)
        } else {
            throw new Error('bad subscriber')
        }
    },
    removeSubscriber(callback) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (this.subscribers[i] === callback) {
                delete this.subscribers[i]
            }
        }
        console.info('remain subscribers', this.subscribers)
    },
    publish(params) {
        for (let i = 0; i < this.subscribers.length; i++) {
            if (typeof this.subscribers[i] === 'function') {
                this.subscribers[i](params)
            }
        }
    },
    register(target) {
        target.subscribers = []
        for (const name in this) {
            if (this.hasOwnProperty(name)) {
                target[name] = this[name]
            }
        }
    }
}


// const data = []

// const viewContainer = {
//     redraw(data) {
//         console.info('use data redraw', data)
//         if (viewContainer.publish) {
//             viewContainer.publish(data)
//         }
//     }
// }

// const dataContainer = {
//     push(ele) {
//         data.push(ele)
//         if (dataContainer.publish) {
//             dataContainer.publish(data)
//         }
//     }
// }


// const logger = {
//     log(data) {
//         console.info('log time', new Date(), data)
//     }
// }

// observer.register(dataContainer)
// dataContainer.addSubscriber(viewContainer.redraw)

// observer.register(viewContainer)
// viewContainer.addSubscriber(logger.log)

// const interval = setInterval(() => {
//     const result = new Date().getSeconds() % 10
//     dataContainer.push(result)
//     if (result === 0) {
//         dataContainer.removeSubscriber(viewContainer.redraw)
//         clearInterval(interval)
//     }
// }, 1000)

// 通过NotifyObserver实例进行注册通知
class NotifyObserver {
    constructor() {
        this.subs = {}
    }

    register(...rest) {
        if (rest && Array.isArray(rest)) {
            for (const child of rest) {
                for (const key of ['addSub', 'removeSub', 'emit']) {
                    child[key] = this[key].bind(this)
                }
                const events = child.events
                if (events) {
                    for (const key in events) {
                        child.addSub(key, events[key])
                    }
                }
            }
        }
    }

    addSub(type, sub) {
        if (this.subs[type]) {
            this.subs[type].push(sub)
        } else {
            this.subs[type] = [sub]
        }
    }

    removeSub(type, sub) {
        if (this.subs[type]) {
            this.subs[type] = this.subs[type].filter(e => e != sub)
        }
    }

    emit(type, ...rest) {
        const subs = this.subs[type]
        if (subs) {
            for (const sub of subs) {
                if (typeof sub === 'function') {
                    sub(...rest)
                }
            }

        }
    }
}



class Data {
    constructor(name) {
        this.name = name
        this.cache = []
        this.events = { 'viewSelect': this.selectPartData.bind(this) }
    }

    selectPartData(start, end) {
        this.cache = this.cache.slice(start, end)
        this.emit('dataChanged', this.cache)
    }

    addData(arr) {
        this.cache = this.cache.concat(arr)
        // 通知View
        this.emit('dataChanged', this.cache)
    }
}

class View {
    constructor(name) {
        this.name = name
        // this.container = document.getElementById("myCanvas")
        // this.ctx = this.container.getContext('2d')
        this.events = { 'dataChanged': this.redraw.bind(this) }
        this.changePeriod(0, 0)
    }

    changePeriod(start, end) {
        this.start = start
        this.end = end
    }

    redraw(data) {
        console.info('redraw', this.name)
        for (const e of data) {
            console.log(e)
        }
        console.info('redraw finish', this.name)
        this.changePeriod(0, data.length)
    }

    selectPart(start, end) {
        this.changePeriod(start, end)
        // 通知Data
        this.emit('viewSelect', start, end)
    }
}

class Paint {
    constructor(name) {
        this.name = name
        this.d = new Data(this.name)
        this.v = new View(this.name)
        const no = new NotifyObserver()
        no.register(this.d, this.v)
    }

    appendData(arr) {
        console.info('appendData')
        this.d.addData(arr)
    }

    refreshImage() {
        this.v.redraw()
    }
}



const p = new Paint('number')
p.appendData([1, 2, 3, 4, 5, 6, 7])
setTimeout(() => {
    p.appendData([8, 9, 10])
}, 3000)
setTimeout(() => {
    p.v.selectPart(3, 8)
}, 4000)

const p2 = new Paint('char')
p2.appendData(['a', 'b', 'c', 'd', 'e', 'f', 'g'])
setTimeout(() => {
    p2.appendData(['h', 'i', 'j'])
}, 2000)
setTimeout(() => {
    p2.v.selectPart(2, 5)
}, 5000)
