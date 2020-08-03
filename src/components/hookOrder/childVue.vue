<template>
  <div class="child-test">
    childName:{{childName}}<br>
    childCompute:{{childCompute}}<br>
    <el-button @click.stop="destoryByHand">Destory</el-button>
    <el-button @click="childClick">child Btn</el-button>
  </div>
</template>

<script>

export default {
  name: 'child-test',
  data: () => {
    return {
      childName: 'child self',
    }
  },
  computed: {
    childCompute: function () {
      return 'child computed'
    },
  },
  components: {

  },
  beforeCreate() {
    console.info('child vue beforeCreate', this)
  },
  created() {
    console.info('child vue created', this)
  },
  beforeUpdate() {
    console.info('child vue beforeUpdate', this)
  },
  updated() {
    console.info('child vue updated', this)
  },
  beforeMount() {
    console.info('child vue beforeMount', this)
  },
  mounted: function () {
    console.info('child vue mounted', this)
  },
  beforeDestroy: function () {
    console.info('child vue beforeDestroy', this)
  },
  destroyed: function () {
    console.info('child vue destroyed', this)
  },
  methods: {
    destoryByHand() {
      console.info('child vue invoke method[destoryByHand]')
    },
    childClick() {
      console.info('child vue invoke method[childClick]')
      this.childName = 'child click'
    },
  }
}
</script>
