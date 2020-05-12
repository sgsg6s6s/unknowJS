<template>
  <div class="about">
    <Navigator :routes="childrenRoutes"></Navigator>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Navigator from '@/components/Navigator.vue'
import { Route } from 'vue-router'

@Component({
  components: {
    Navigator
  }
})
export default class Patterns extends Vue {
  childrenRoutes: Array<Route> = []

  mounted() {
    const nodes: Array<Route> = (this.$router as any).options.routes
    const { path } = this.$route
    const splits = path.match(/\/\w+/g)
    const currentBigPath = splits ? splits[0] : ''
    const curentNode = nodes.find((e: Route) => e.path == currentBigPath)
    let children = curentNode ? (curentNode as any).children : []
    children = children.map((e: Route) => {
      const copy: Route = { ...e }
      copy.path = currentBigPath + '/' + copy.path
      return copy
    })
    this.childrenRoutes = children
  }
}
</script>
