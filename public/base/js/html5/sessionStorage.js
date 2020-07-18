(function (sessionStorage) {
  const configs = {
    title: 'sessionStorage',
    target: '.sessionStorage-container',
    autoRefresh: false,
    autoLoad: true,
    refresh() {
      this.collector = {}
      if (sessionStorage.length > 0) {
        for (const key of Object.getOwnPropertyNames(sessionStorage)) {
          this.collector[key] = sessionStorage.getItem(key)
        }
        this.collector = Object.assign({}, this.collector)
      }
    },
    add() {
      sessionStorage.setItem(this.name, this.value)
      this.refresh()
    },
    deleteElement(index) {
      sessionStorage.removeItem(index)
      this.refresh()
    },
  }
  window.framework(configs)
})(window.sessionStorage)

