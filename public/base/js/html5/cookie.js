(function (Cookies) {
  const vue = new window.Vue({
    template: `
      <div>
        <h1>Cookies(current domain)</h1>
        <button @click="refresh">Refresh</button>
        <label for="name">name:</label><input name="name" v-model="name">
        <label for="value">value:</label><input name="value" v-model="value">
        <button @click="addCookie">add</button>
        <div :key="index" v-for="(item,index) in cookies">{{index}}:{{item}}<button @click="deleteCookie(index)">Delete</button><button @click="showMore(index)">More</button></div>
      </div>  
      `,
    mounted() {
      // this.refresh()
      setInterval(() => {
        this.cookies = Cookies.get()
      }, 1000)
    },
    data() {
      return {
        cookies: {},
        name: '',
        value: '',
      }
    },
    methods: {
      refresh() {
        console.info('refresh')
        window.$.ajax({
          url: "http://localhost:8080/api/test/cookies", data: { userName: "shiguang", password: "wansui2" }, success: () => {
            this.cookies = Cookies.get()
          }
        });
      },
      addCookie() {
        // if (!this.cookies[this.name]) {
        Cookies.set(this.name, this.value)
        // }
      },
      deleteCookie(name) {
        Cookies.remove(name, { path: '/', domain: 'localhost' });
        this.cookies = Cookies.get()
      },
      showMore(name) {
        const cookie = Cookies.getJSON(name)
        console.info(cookie)
      }
    }
  })
  vue.$mount(".cookie-container")
})(window.Cookies)
