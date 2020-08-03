export default {
  name: 'mixins1-test',
  data: () => {
    return {
      mixinsName: 'mixins1 self',
      commonName: 'mixins1 common'
    }
  },
  computed: {
    mixinsCompute: function () {
      return 'mixins1 computed'
    },
    commonCompute: function () {
      return 'mixins1 common computed'
    }
  },
  components: {

  },
  beforeCreate() {
    console.info('mixins1 vue beforeCreate', this)
  },
  created() {
    console.info('mixins1 vue created', this)
  },
  beforeUpdate() {
    console.info('mixins1 vue beforeUpdate', this)
  },
  updated() {
    console.info('mixins1 vue updated', this)
  },
  beforeMount() {
    console.info('mixins1 vue beforeMount', this)
  },
  mounted: function () {
    console.info('mixins1 vue mounted', this)
  },
  beforeDestroy: function () {
    console.info('mixins1 vue beforeDestroy', this)
  },
  destroyed: function () {
    console.info('mixins1 vue destroyed', this)
  },
  methods: {
    destoryByHand() {
      console.info('mixins1 vue invoke method[destoryByHand]')
    },
    mixinsClick() {
      console.info('mixins1 vue invoke method[mixinsClick]')
      this.mixinsName = 'mixins1 click'
    },
    commonClick() {
      console.info('mixins1 vue invoke method[commonClick]')
      this.commonName = 'mixins1' + Math.round(Math.random() * 10)
    }
  }
}
