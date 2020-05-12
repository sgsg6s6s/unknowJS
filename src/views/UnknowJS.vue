<template>
  <div class="unknow-js-container">
    <CatalogSelector @chapterChanged="chapterChanged" />
    <!-- <UnknowJSNote  :elements="elements"/> -->
    <MonocaEditor
      @click="clickEditor"
      :template="elements"
      :script="script"
    />
  </div>
</template>

<script>
import MonocaEditor from '@/components/editor/MonocaEditor'
// import UnknowJSNote from '@/components/unknowJS/index'
import CatalogSelector from '@/components/unknowJS/CatalogSelector.vue'

export default {
  name: 'UnknowJS',
  components: {
    CatalogSelector,
    MonocaEditor,
    // UnknowJSNote
  },
  data() {
    return {
      elements: [],
      script: '',
    }
  },
  computed: {},
  watch: {},
  methods: {
    clickEditor(event) {
      console.info(event)
    },
    chapterChanged(volume, part, chapter, chapterName) {
      const volumeNames = ['upper', 'middle', 'lower']
      import(`@/assets/notes/${volumeNames[volume]}/part${part + 1}/${chapter + 1}.ts`)
        .then(module => {
          this.elements = module.config[chapterName]
          this.script = this.extractFunction(module.handler)

        })
        .catch(err => {
          this.elements = [['h1', '暂无数据']]
          console.error(err.message)
        });
    },
    extractFunction(handler) {
      let result = ''
      if (handler) {
        const funcName = handler.name
        result = handler.toString() + '\n' + funcName + '()\n'
      }
      return result
    },
  }
}
</script>
<style scoped lang="less">
.unknow-js-container {
  text-align: left;
}
</style>
