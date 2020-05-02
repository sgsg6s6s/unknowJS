import { Component, Prop, Vue } from 'vue-property-decorator'
import { notesConfig } from '@/components/unknowJS/notes'
@Component
export default class UnknowJSNote extends Vue {
  @Prop() chapterName!: string

  render() {
    const createElement = this.$createElement
    const children: Array<Vue.VNode> = []
    const configs: string[][] = notesConfig[this.chapterName]
    if (configs) {
      configs.forEach((config: Array<string>) => {
        children.push(createElement(...config))
      })
    }
    return createElement('div', { class: 'unknow-js-content' }, children)
  }
}
