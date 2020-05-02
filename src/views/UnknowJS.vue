<template>
  <div class="unknow-js-container">
    <CatalogSelector @chapterNameChanged="chapterNameChanged" />
    <UnknowJSNote :chapterName="chapterName" />
  </div>
</template>

<script>
import UnknowJSNote from '@/components/unknowJS/index'
import CatalogSelector from '@/components/unknowJS/CatalogSelector.vue'
export default {
  name: 'UnknowJS',
  components: {
    CatalogSelector,
    UnknowJSNote
  },
  data() {
    return {
      chapterName: null
    }
  },
  computed: {},
  watch: {},
  methods: {
    chapterNameChanged(name) {
      this.chapterName = name
    }
  }
}
</script>
<style scoped lang="less">
.unknow-js-container {
  text-align: left;
}
</style>
