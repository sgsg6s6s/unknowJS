<template>
  <div class="home">
    <VueLinks msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import VueLinks from '@/components/VueLinks.vue'

export default {
  name: 'Home',
  components: {
    VueLinks
  }
}
</script>
