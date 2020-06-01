<template>
  <div class="selectors-container">
    <el-select
      v-model="bookValue"
      placeholder="请选择卷"
    >
      <el-option
        v-for="(item, index) in books"
        :key="index"
        :label="item"
        :value="index"
      ></el-option>
    </el-select>
    <el-select
      v-model="partValue"
      placeholder="请选择部分"
    >
      <el-option
        v-for="(item, index) in partOptions"
        :key="index"
        :label="item"
        :value="index"
      ></el-option>
    </el-select>
    <el-select
      v-model="chapterValue"
      placeholder="请选择章"
    >
      <el-option
        v-for="(item, index) in chapterOptions"
        :key="index"
        :label="appendChapterName(item, index)"
        :value="index"
      ></el-option>
    </el-select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { books, chapters } from '@/components/unknowJS/metadata/catalog'
@Component
export default class CatalogSelector extends Vue {
  bookValue = 0
  partValue = 0
  chapterValue = 0
  books = books
  chapters = chapters

  get chapterConfigs() {
    return this.chapters[this.books[this.bookValue]] || {}
  }
  get chapterOptions() {
    return this.chapterConfigs[this.partOptions[this.partValue]] || []
  }
  get partOptions() {
    return this.chapterConfigs ? Object.keys(this.chapterConfigs) : []
  }
  get chapterName() {
    return this.chapterOptions[this.chapterValue]
  }

  @Watch('bookValue')
  bookValueChanged() {
    this.partValue = 0
    this.emptyChapterValue()
    this.$emit(
      'chapterChanged',
      this.bookValue,
      this.partValue,
      this.chapterValue,
      this.chapterName
    )
  }

  @Watch('partValue', {
    immediate: true
  })
  partValueChanged() {
    this.emptyChapterValue()
    this.$emit(
      'chapterChanged',
      this.bookValue,
      this.partValue,
      this.chapterValue,
      this.chapterName
    )
  }

  @Watch('chapterValue', {
    immediate: true
  })
  chapterValueChanged() {
    this.$emit(
      'chapterChanged',
      this.bookValue,
      this.partValue,
      this.chapterValue,
      this.chapterName
    )
  }

  emptyChapterValue() {
    this.chapterValue = this.chapterOptions.length > 0 ? 0 : -1
  }

  appendChapterName(name: string, index: number) {
    return `第${index + 1}章 ${name}`
  }
}
</script>
