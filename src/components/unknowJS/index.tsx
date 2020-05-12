import { Component, Prop, Vue } from 'vue-property-decorator'
@Component
export default class UnknowJSNote extends Vue {
  @Prop() elements!: string[][]

  render() {
    const createElement = this.$createElement
    const children: Array<Vue.VNode> = []
    if (this.elements) {
      this.elements.forEach((config: Array<string>) => {
        children.push(createElement(...config))
      })
    }
    return createElement('div', { class: 'unknow-js-content' }, children)
  }
}
