function Observer() { return void 1 }

Observer.prototype = {
  init() {
    this.subscribers = []
  },
  add(subscriber) {
    if (this.subscribers.includes(subscriber)) {
      console.warn('subscriber already exist.')
    } else {
      this.subscribers.push(subscriber)
    }
  },
  remove(subscriber) {
    if (this.subscribers.includes(subscriber)) {
      this.subscribers.splice(this.subscribers.indexOf(subscriber), 1)
    } else {
      console.warn('subscriber already not exist.')
    }
  },
  removeAll() {
    this.subscribers.length = 0
  }
}