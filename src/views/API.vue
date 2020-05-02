<template>
  <div ref="wrapper"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class CatalogSelector extends Vue {
  mounted() {
    const baseFunctions = [
      Object,
      Array,
      Function,
      String,
      Number,
      Set,
      Map,
      RegExp
    ]
    for (const funcObject of baseFunctions) {
      const protoType = funcObject.prototype
      const groupName = protoType.constructor.name
      console.info(protoType)
      this.printAndConsole('-----分割线----' + groupName + '的方法----')
      this.printAPI(funcObject)
      this.printAndConsole('---------' + groupName + '原型的方法----')
      this.printAPI(protoType)
    }
  }

  printAndConsole(msg: string) {
    console.info(msg)
    const row = document.createElement('div')
    row.innerText = msg
    ;(this.$refs.wrapper as HTMLElement).append(row)
  }

  printAPI(target: object) {
    let index = 1
    for (const propName of Object.getOwnPropertyNames(target)) {
      if (
        !['constructor', 'caller', 'callee', 'arguments', '__proto__'].includes(
          propName
        ) &&
        !propName.includes('__')
      ) {
        try {
          const propValue = (target as { [key: string]: Function })[propName]
          if (typeof propValue === 'function') {
            this.printAndConsole(index++ + '. ' + propName + ' ')
          }
        } catch (e) {
          console.warn(e)
        }
      }
    }
    if (index === 1) {
      this.printAndConsole('暂无')
    }
  }
}
</script>
