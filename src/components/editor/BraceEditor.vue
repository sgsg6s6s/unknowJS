<template>
  <div>
    <div id="javascript-editor"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import * as ace from 'brace'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

@Component
export default class CommonEditor extends Vue {
  monacoEditor: any
  value = ''
  mounted() {
    const editor = ace.edit('javascript-editor')
    editor.getSession().setMode('ace/mode/javascript')
    editor.setTheme('ace/theme/monokai')
  }
  //   @Prop()

  //   get routeList(): Array<RouteConfig> {
  //     const result = this.routes || routes
  //     return result
  //   }
}
</script>

<style scoped lang="less">
#javascript-editor,
#monoca-editor {
  height: 300px;
}
</style>
