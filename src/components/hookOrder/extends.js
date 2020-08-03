export default {
  name: 'extends-test',
  data: () => {
    return {
      extendsName: 'extends self',
      commonName: 'extends common'
    }
  },
  computed: {
    extendsCompute: function () {
      return 'extends computed'
    },
    commonCompute: function () {
      return 'extends common computed'
    }
  },
  mixins: [],
  extends: null,
  components: {

  },
  beforeCreate() {
    console.info('extends vue beforeCreate', this)
  },
  created() {
    console.info('extends vue created', this)
  },
  beforeUpdate() {
    console.info('extends vue beforeUpdate', this)
  },
  updated() {
    console.info('extends vue updated', this)
  },
  beforeMount() {
    console.info('extends vue beforeMount', this)
  },
  mounted: function () {
    console.info('extends vue mounted', this)
  },
  beforeDestroy: function () {
    console.info('extends vue beforeDestroy', this)
  },
  destroyed: function () {
    console.info('extends vue destroyed', this)
  },
  methods: {
    destoryByHand() {
      console.info('extends vue invoke method[destoryByHand]')
    },
    extendsClick() {
      console.info('extends vue invoke method[extendsClick]')
      this.extendsName = 'extends click'
    },
    commonClick() {
      console.info('extends vue invoke method[commonClick]')
      this.commonName = 'extends' + Math.round(Math.random() * 10)
    }
  }
}
