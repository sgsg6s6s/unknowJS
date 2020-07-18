(function (localStorage) {
  const configs = {
    title: 'localStorage',
    target: '.localStorage-container',
    autoRefresh: false,
    autoLoad: true,
    refresh() {
      this.collector = {}
      if (localStorage.length > 0) {
        for (const key of Object.getOwnPropertyNames(localStorage)) {
          this.collector[key] = localStorage.getItem(key)
        }
        this.collector = Object.assign({}, this.collector)
      }
    },
    add() {
      localStorage.setItem(this.name, this.value)
      this.refresh()
    },
    deleteElement(index) {
      localStorage.removeItem(index)
      this.refresh()
    },
  }


  window.framework(configs)
})(window.localStorage)