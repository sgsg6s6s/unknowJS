<template>
  <div class="mutation-observer-view">
    <ul ref="ul">
      <li
        :key="'mutationObserver'+index"
        v-for="(item,index) in liList"
      >{{item}}</li>
    </ul>
    <el-button @click="removeLast">remove element</el-button>
    <el-button @click="addAttribute">add ul attribute</el-button>
    <el-button @click="changeLI">change li</el-button>
    <el-button @click="clearArray">clear Array</el-button>
  </div>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class MutationObserverView extends Vue {
  liList: Array<any> = ['a', 'e', 'i', 'o', 'u']

  mounted() {
    const observer = new MutationObserver(this.mutationCallback)
    observer.observe(this.$refs.ul as HTMLElement, {
      attributes: true,
      childList: true,
      subtree: true
    })
  }

  clearArray() {
    const tmp = [...this.liList]

    console.info('reset', this.liList)
    this.liList.splice(0, this.liList.length)
    console.info('splice(0,len) not return', this.liList)

    this.liList = tmp
    console.info('reset', this.liList)
    this.liList = []
    console.info('this.liList = []', this.liList)

    this.liList = [...tmp]
    console.info('reset', this.liList)
    this.liList.length = 0
    console.info(' this.liList.length = 0', this.liList)

    this.liList = [...tmp]
    console.info('reset', this.liList)
    while (this.liList.length > 0) {
      this.liList.pop()
    }
    console.info('this.liList.pop()', this.liList)

    this.liList = tmp
    console.info('reset', this.liList)
    while (this.liList.length > 0) {
      this.liList.shift()
    }
    console.info('this.liList.shift()', this.liList)
  }

  // Callback function to execute when mutations are observed
  mutationCallback(mutations: any) {
    for (const mutation of mutations) {
      const type = mutation.type
      switch (type) {
        case 'childList':
          console.log('A child node has been changed.')
          break
        case 'attributes':
          console.log(`The ${mutation.attributeName} attribute was modified.`)
          break
        // case 'subtree':
        //   console.log(`The subtree was modified.`)
        //   break
        default:
          break
      }
    }
  }
  removeLast() {
    const liElements = (this.$refs.ul as HTMLElement).children
    if (liElements.length > 0) {
      liElements[liElements.length - 1].remove()
    }
  }

  addAttribute() {
    const ul = this.$refs.ul as HTMLElement
    const random = Math.floor(Math.random() * 10)
    ul.setAttribute('attr' + random, String(random))
  }
  changeLI() {
    const liElements = (this.$refs.ul as HTMLElement).children
    for (const liElement of liElements) {
      if (liElement.innerHTML.length % 2 === 1) {
        liElement.innerHTML = liElement.innerHTML.repeat(2)
      } else {
        const random = Math.floor(Math.random() * 10)
        liElement.setAttribute('attr' + random, String(random))
      }
    }
  }
}
</script>
<style lang="less">
</style>
