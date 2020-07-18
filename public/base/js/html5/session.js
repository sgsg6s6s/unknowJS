(function () {
  const configs = {
    title: 'Server session',
    target: '.session-container',
    autoRefresh: false,
    autoLoad: false,
    refresh() {
      const _self = this
      window.$.ajax({
        url: "http://localhost:8080/api/test/sessions", data: { userName: "shiguang", password: "wansui2" }, success: function (result) {
          _self.collector = result.data
        }
      });
    },
    add() {
      const self = this
      window.$.ajax({
        url: "http://localhost:8080/api/test/session", type: "get", data: { key: this.name, value: this.value }, success: function (result) {
          self.collector = result.data
        }
      });
    },
    deleteElement(index) {
      const self = this
      window.$.ajax({
        url: "http://localhost:8080/api/test/session/" + index, type: "get", success: function (result) {
          self.collector = result.data
        }
      });
    },
  }
  window.framework(configs)
})()

