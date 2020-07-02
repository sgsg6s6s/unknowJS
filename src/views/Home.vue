<template>
  <div class="home">
    <form>
      <input
        ref="age-input"
        name="age"
        v-model="age"
      >
      <input
        ref="age-job"
        name="job"
        :value="job"
      >
      <p @click="pushToArray">Append:{{joinArray}}</p>
    </form>

    <p @click="replaceArray">replace</p>
    <p @click="spliceArray">splice</p>
    <div
      v-for="(v,index) in arr"
      :key="index"
    >{{v}}</div>

    <slot name="header"></slot>
    <slot name="footer"></slot>
    <VueLinks
      ref="vue-links"
      attr1="test1"
      msg="Welcome to Your Vue.js App"
    >
      <template v-slot:default>
        no image
      </template>
      <template v-slot:hasName>
        no slot
      </template>
    </VueLinks>
  </div>
</template>

<script>
// @ is an alias to /src
import VueLinks from '@/components/VueLinks.vue'

export default {
  name: 'Home',
  data: () => {
    return {
      arr: [1, 2, 3],
      job: 'coder',
      age: 18
    }
  },
  computed: {
    joinArray: function () {
      return this.arr.join('~')
    }
  },
  watch: {
    "arr": function (val, old) {
      console.info(JSON.stringify(val), JSON.stringify(old))
    },
    "job": function (val, old) {
      console.info(val, old)
    },
    "age": function (val, old) {
      console.info(val, old)
    }
  },
  components: {
    VueLinks
  },
  beforeCreate() {
    debugger
    console.info('Home.vue is ', this)
  },
  created() {
    debugger
    console.info('Home.vue is ', this)
  },
  beforeMount() {
    debugger
    console.info('Home.vue is ', this)
  },
  mounted: function () {
    debugger
    console.info('Home.vue is ', this)
  },
  methods: {
    pushToArray: function () {
      this.arr.push(this.job)
    },
    replaceArray: function () {
      this.arr = ['i', 'love', 'you']
    },
    spliceArray: function () {
      this.arr.splice(1, 0, 'a', 'b', 'c')
    }
  }
}
</script>
