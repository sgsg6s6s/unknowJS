function framework(configs) {
  const { title, autoRefresh, autoLoad, target, add, deleteElement } = configs

  const vueConfig = {
    template: `
        <div>
          <h1>${title}</h1>
          <button @click="refresh">Refresh</button>
          ${add ? `<div>
            <label for="name">name:</label><input name="name" v-model="name">
            <label for="value">value:</label><input name="value" v-model="value">
            <button @click="add">add</button>
          </div>`: ''}
          <div :key="index" v-for="(item,index) in collector">{{index}}:{{item}}${deleteElement ? `<button @click="deleteElement(index)">Delete</button>` : ''}</div>
        </div>  
        `,
    mounted() {
      if (autoRefresh) {
        setInterval(() => {
          this.refresh()
        }, 1000)
      } else if (autoLoad) {
        this.refresh()
      }
    },
    data() {
      return {
        collector: {},
        name: '',
        value: '',
      }
    },
    methods: {}
  }


  for (const key in configs) {
    const value = configs[key]
    if (typeof value === 'function') {
      vueConfig.methods[key] = value
    }
  }
  const vue = new window.Vue(vueConfig)
  vue.$mount(target)
}