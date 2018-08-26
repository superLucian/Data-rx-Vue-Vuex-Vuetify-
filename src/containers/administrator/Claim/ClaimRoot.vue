<template>
  <transition name="slide-y-transition">
    <router-view class="full-height"></router-view>
  </transition>
</template>

<script>
  export default {
    name: 'claim',
    data() {
      return {}
    },
    mounted() {
      this.$store.commit('UPDATE_CLAIM_SETUP_DATA', {'callingApi': false})
    },
    methods: {},
  }
</script>
<style lang="stylus">
</style>
