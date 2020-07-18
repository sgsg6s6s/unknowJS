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


const data = []

const viewContainer = {
    redraw(data) {
        console.info('use data redraw', data)
        if (viewContainer.publish) {
            viewContainer.publish(data)
        }
    }
}

const dataContainer = {
    push(ele) {
        data.push(ele)
        if (dataContainer.publish) {
            dataContainer.publish(data)
        }
    }
}


const logger = {
    log(data) {
        console.info('log time', new Date(), data)
    }
}

observer.register(dataContainer)
dataContainer.addSubscriber(viewContainer.redraw)

observer.register(viewContainer)
viewContainer.addSubscriber(logger.log)

const interval = setInterval(() => {
    const result = new Date().getSeconds() % 10
    dataContainer.push(result)
    if (result === 0) {
        dataContainer.removeSubscriber(viewContainer.redraw)
        clearInterval(interval)
    }
}, 1000)


