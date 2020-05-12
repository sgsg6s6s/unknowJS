<template>
  <div class="nav-wrapper">
    <router-link
      :key="index"
      v-for="(route, index) in routeList"
      :to="route.path"
    >
      {{ route.name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { routes } from '../router'
import { RouteConfig } from 'vue-router'
@Component
export default class Navigator extends Vue {
  data() {
    return {}
  }
  @Prop()
  private routes!: Array<RouteConfig>

  get routeList(): Array<RouteConfig> {
    const result = this.routes || routes
    return result
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.nav-wrapper {
  padding: 10px 0;
  text-align: center;
  a {
    margin-right: 20px;
  }
}
</style>
