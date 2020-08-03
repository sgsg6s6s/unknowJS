export default {
  name: 'mixins2-test',
  data: () => {
    return {
      mixinsName: 'mixins2 self',
      commonName: 'mixins2 common'
    }
  },
  computed: {
    mixinsCompute: function () {
      return 'mixins2 computed'
    },
    commonCompute: function () {
      return 'mixins2 common computed'
    }
  },
  components: {

  },
  beforeCreate() {
    console.info('mixins2 vue beforeCreate', this)
  },
  created() {
    console.info('mixins2 vue created', this)
  },
  beforeUpdate() {
    console.info('mixins2 vue beforeUpdate', this)
  },
  updated() {
    console.info('mixins2 vue updated', this)
  },
  beforeMount() {
    console.info('mixins2 vue beforeMount', this)
  },
  mounted: function () {
    console.info('mixins2 vue mounted', this)
  },
  beforeDestroy: function () {
    console.info('mixins2 vue beforeDestroy', this)
  },
  destroyed: function () {
    console.info('mixins2 vue destroyed', this)
  },
  methods: {
    destoryByHand() {
      console.info('mixins2 vue invoke method[destoryByHand]')
    },
    mixinsClick() {
      console.info('mixins2 vue invoke method[mixinsClick]')
      this.mixinsName = 'mixins2 click'
    },
    commonClick() {
      console.info('mixins2 vue invoke method[commonClick]')
      this.commonName = 'mixins2' + Math.round(Math.random() * 10)
    }
  }
}
