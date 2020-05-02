<template>
  <div class="nav-wrapper">
    <router-link :key="index" v-for="(route, index) in routes" :to="route.path">
      {{ route.name }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { routes } from '../router'
@Component
export default class Navigator extends Vue {
  data() {
    return {
      routes
    }
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
