<template>
  <div>
    <div class="monoca-wrapper">
      <div class="tabs-bar">
        <el-tabs
          type="border-card"
          v-model="activeName"
          @tab-click="tabClick"
        >
          <el-tab-pane
            v-for="item in tabNames"
            :key="item"
            :label="item"
            :name="item.toLowerCase()"
          ></el-tab-pane>
        </el-tabs>
        <el-button
          class="run-btn"
          type="success"
          size="mini"
          @click="runJS"
        >Run</el-button>
      </div>
      <div id="monoca-editor"></div>
    </div>
    <div id="result-console"></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { editor } from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/editor.main.js'
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'

@Component
export default class MonocaEditor extends Vue {
  tabNames = ['Template', 'Script', 'Css']
  monacoEditor!: editor.IStandaloneCodeEditor
  activeName = this.tabNames[0].toLowerCase()

  @Prop() template!: string
  @Prop() script!: string
  @Prop() css!: string

  get selectTabIndex() {
    return this.tabNames.findIndex(e => e.toLowerCase() === this.activeName)
  }
  get value() {
    return this.template + this.script + this.css
  }

  @Watch('value')
  valueChanged() {
    this.tabClick()
  }

  @Watch('$route.matched', { immediate: true })
  routeMatched(val: any) {
    // debugger
    console.info(val, this)
  }

  beforeCreate() {
    console.info(this)
  }

  mounted() {
    const dom = document.getElementById('monoca-editor') || document.body

    this.monacoEditor = editor.create(dom, {
      value: '',
      language: 'text',
      fontFamily: 'Arial',
      fontSize: 20
    })
    this.setTheme()

    this.registerVueEvents()
  }

  registerVueEvents() {
    // 可注册外部组件的vue事件到
    for (const key in this.$listeners) {
      console.info(key, this.$listeners.key)
      if (key === 'click') {
        this.monacoEditor.onMouseUp(event => {
          this.$emit(key, event)
        })
      }
    }
  }

  runJS() {
    console.info()
  }

  renderScript() {
    if (this.selectTabIndex === 1) {
      eval(this.script)
    }
  }

  // renderTemplate() {
  //   const elements = this.template || []
  //   const result = '[]'
  //   for (const element of elements) {
  //   }

  //   this.monacoEditor.setValue((this as any)[this.activeName] || '')
  // }

  formatTemplateData() {
    const elements = this.template || []
    let result = '[\n'
    for (const element of elements) {
      result += `  ['${element[0]}', '${element[1]}'],\n`
    }
    result += ']'
    return result
  }

  formatCssData() {
    const styleTag = document.querySelector('style')
    return styleTag ? styleTag.innerText : ''
  }

  tabClick() {
    let value = ''
    switch (this.selectTabIndex) {
      case 0: {
        value = this.formatTemplateData()
        break
      }
      case 1: {
        value = this.script
        break
      }
      case 2: {
        value = this.css || this.formatCssData()
        break
      }
    }
    this.monacoEditor.setValue(value)
  }

  setTheme() {
    editor.defineTheme('myTheme', {
      base: 'vs',
      inherit: true,
      rules: [{ background: 'EDF9FA', token: '' }],
      colors: {
        'editor.foreground': '#000000',
        'editor.background': '#EDF9FA',
        'editorCursor.foreground': '#8B0000',
        'editor.lineHighlightBackground': '#0000FF20',
        'editorLineNumber.foreground': '#008800',
        'editor.selectionBackground': '#88000030',
        'editor.inactiveSelectionBackground': '#88000015'
      }
    })
    editor.setTheme('myTheme')
  }
}
</script>

<style scoped lang="less">
.monoca-wrapper {
  display: inline-block;
  width: 40%;
  height: 340px;

  .tabs-bar {
    position: relative;
    .el-tabs {
      height: 40px;
    }

    .run-btn {
      position: absolute;
      z-index: 10;
      right: 10px;
      top: 7px;
    }
  }

  #monoca-editor {
    height: 300px;
    width: 100%;
  }
}

#result-console {
  display: inline-block;
  margin-left: 10px;
  width: 58%;
  height: 340px;
  background: #ccc;
}
</style>
