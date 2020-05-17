<template>
  <div class="editor-container">
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
    <div
      ref="result"
      class="result-container-unique"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import { editor } from 'monaco-editor'
import 'monaco-editor/esm/vs/editor/editor.main.js'
// import 'monaco-editor/esm/vs/basic-languages/javascript/javascript.contribution'

import UnknowJS from '@/components/unknowJS/index.tsx'
// @ts-ignore
function printToResult(...args) {
  const resultDom = document.querySelector('.result-container-unique')
  const ele = document.createElement('p')
  for (let i = 0; i < args.length; i++) {
    if (!args[i]) {
      args[i] = String(args[i])
    }
  }

  ele.innerHTML = Array.prototype.join.call(args, ' ')
  if (resultDom) {
    resultDom.append(ele)
  }
}

@Component
export default class MonocaEditor extends Vue {
  tabNames = ['Notes', 'Script', 'Css']
  monacoEditor!: editor.IStandaloneCodeEditor
  activeName = this.tabNames[0].toLowerCase()
  currentShow = ''
  unknowJS!: UnknowJS

  @Prop() template!: string
  @Prop() script!: Function
  @Prop() css!: string

  get selectTabIndex() {
    return this.tabNames.findIndex(e => e.toLowerCase() === this.activeName)
  }

  // 接收外部通知
  get value() {
    return this.template + this.script + this.css
  }

  get elements() {
    return eval(this.currentShow)
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
    const model = this.monacoEditor.getModel()
    if (model) {
      model.onDidChangeContent(event => {
        console.info(event)
        this.currentShow = this.monacoEditor.getValue()
      })
    }
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

  clearResult() {
    const resultDom = this.$refs.result as HTMLElement
    resultDom.innerHTML = ''
    if (this.unknowJS) {
      this.unknowJS.$destroy()
    }
  }

  runJS() {
    this.clearResult()
    switch (this.selectTabIndex) {
      case 0: {
        this.operateVueForNoteShow()
        break
      }
      case 1: {
        this.renderScript()
        break
      }
      case 2: {
        break
      }
    }
  }

  operateVueForNoteShow() {
    try {
      const resultDom = this.$refs.result as HTMLElement

      this.unknowJS = new UnknowJS({ propsData: { elements: this.elements } }).$mount()
      // console.info(this.currentShow, elements, this.unknowJS.$props, this.unknowJS.$el)
      resultDom.innerHTML = this.unknowJS.$el.innerHTML
    } catch (e) {
      console.info(this.value, e)
    }
  }

  renderScript() {
    if (this.selectTabIndex === 1) {
      const jsCode = this.formatFunction()
      if (jsCode.length > 0) {
        eval(jsCode)
      }
    }
  }

  getInitJsCode() {
    let result = ''
    if (this.script) {
      const handler = this.script
      const funcName = handler.name
      result = handler.toString() + '\n' + funcName + '()\n'
    }
    return result
  }

  formatFunction() {
    let result = ''
    if (this.currentShow) {
      result = this.currentShow.replace(
        /console\.info|console\.warn|console\.log|console\.error/g,
        'printToResult'
      )
      result += '\n' + printToResult.toString()
    }
    return result
  }

  // renderTemplate() {
  //   const elements = this.template || []
  //   const result = '[]'
  //   for (const element of elements) {
  //   }

  //   this.monacoEditor.setValue((this as any)[this.activeName] || '')
  // }

  formatNoteData() {
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
        value = this.formatNoteData()
        break
      }
      case 1: {
        value = this.getInitJsCode()
        break
      }
      case 2: {
        value = this.css || this.formatCssData()
        break
      }
    }
    this.currentShow = value
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
.editor-container {
  display: flex;
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

  .result-container-unique {
    display: inline-block;
    margin-left: 10px;
    width: 58%;
    background: #ccc;
    padding-left: 10px;
  }
}
</style>
