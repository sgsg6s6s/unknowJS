<template>
  <div class="nav-wrapper">
    <router-link
      :key="index"
      v-for="(route, index) in routeList"
      :to="route.path"
    >
      {{ route.name }}
    </router-link>
    <!-- <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item
        index="3"
        disabled
      >消息中心</el-menu-item>
      <el-menu-item index="4"><a
          href="https://www.ele.me"
          target="_blank"
        >订单管理</a></el-menu-item>
    </el-menu> -->
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { routes } from '../router'
import VueRouter, { RouteConfig } from 'vue-router'
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

  beforeRouteUpdate(to: VueRouter, from: VueRouter, next: Function) {
    console.info('复用组件beforeRouteUpdate', to, from, this)
    next()
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
