<template>
  <transition name="slide-y-transition">
    <router-view class="full-height"></router-view>
  </transition>
</template>
<script>
  import store from '../../../store'

  export default {
    name: 'formulary',
    data() {
      return {}
    },
    components: {},
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="stylus">
</style>
