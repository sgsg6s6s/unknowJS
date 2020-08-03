<template>
  <div class="hook-order">
    currentName:{{currentName}}<br>
    commonName:{{commonName}}<br>
    currentCompute:{{currentCompute}}<br>
    commonCompute:{{commonCompute}}<br>
    <el-button @click.stop="destoryByHand">Destory</el-button>
    <el-button @click="currentClick">Current Btn</el-button>
    <el-button @click="commonClick">Common Btn</el-button>

    <h2>Children</h2>
    <childVue></childVue>
  </div>
</template>

<script>
import extendsVue from '@/components/hookOrder/extends.js'
import mixins1Vue from '@/components/hookOrder/mixins1.js'
import mixins2Vue from '@/components/hookOrder/mixins2.js'
import childVue from '@/components/hookOrder/childVue.vue'

export default {
  name: 'vueHookOrder',
  data: () => {
    return {
      currentName: 'Tim',
      commonName: 'current'
    }
  },
  computed: {
    currentCompute: function () {
      return 'current computed'
    },
    commonCompute: function () {
      return 'current common computed'
    }
  },
  mixins: [mixins1Vue, mixins2Vue],
  extends: extendsVue,
  components: {
    childVue
  },
  beforeCreate() {
    console.info('current vue beforeCreate', this)
  },
  created() {
    console.info('current vue created', this)
  },
  beforeUpdate() {
    console.info('current vue beforeUpdate', this)
  },
  updated() {
    console.info('current vue updated', this)
  },
  beforeMount() {
    console.info('current vue beforeMount', this)
  },
  mounted: function () {
    console.info('current vue mounted', this)
  },
  beforeDestroy: function () {
    console.info('current vue beforeDestroy', this)
  },
  destroyed: function () {
    console.info('current vue destroyed', this)
  },
  methods: {
    destoryByHand() {
      console.info('current vue invoke method[destoryByHand]')
    },
    currentClick() {
      console.info('current vue invoke method[currentClick]')
      this.currentName = 'current click'
    },
    commonClick() {
      console.info('current vue invoke method[commonClick]')
      this.commonName = 'current' + Math.round(Math.random() * 10)
    }
  }
}
</script>
