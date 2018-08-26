<template>
  <transition name="slide-y-transition">
    <router-view class="full-height"></router-view>
  </transition>
</template>
<script>
  import services from '../../../services/services'
  import store from '../../../store'

  export default {
    name: 'groups',
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
