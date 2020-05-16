<template>
  <div class="about">
    <Navigator :routes="childrenRoutes"></Navigator>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component } from 'vue-property-decorator'
import Navigator from '@/components/Navigator.vue'
import RouteVue from '@/components/mixins/RouteVue.vue'

@Component({
  components: {
    Navigator
  }
})
export default class Patterns extends RouteVue {}
</script>
