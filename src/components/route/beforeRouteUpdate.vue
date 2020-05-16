<template>
  <div class="bru-wrapper">
    验证beforeRouteUpdate钩子，ID为{{ $route.params.id }}
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import VueRouter from 'vue-router'
@Component
export default class BeforeRouteUpdateTest extends Vue {
  beforeRouteUpdate(to: VueRouter, from: VueRouter, next: Function) {
    console.info('复用组件beforeRouteUpdate', to, from, this)
    next()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
