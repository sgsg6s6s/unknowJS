<template>
  <div>
    {{msg}} world!~
  </div>
</template>


<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class AxiosView extends Vue {
  msg = '123'
}
</script>
