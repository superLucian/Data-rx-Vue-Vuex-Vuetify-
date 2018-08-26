<template>
  <div id="app">
    <router-view></router-view>
    <v-snackbar
      :timeout="3000"
      :color="context"
      top
      v-model="snackbar"
    >
      <p class="snackbar text-xs-center"> {{ text }} </p>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {
        snackbar: false,
        context: '',
        text: ''
      }
    },
    mounted() {
      const that = this
      window.Vue.$on('snackbar', function (status, text) {
        that.snackbar = true
        that.context = status
        if(status === 'success') that.context = 'primary'
        that.text = text
      })
    }
  }
</script>

<style lang="scss">
  html {
    position: relative;
    min-height: 100%;
  }

  .app-content {
    padding: 60px 15px 0;
  }
</style>
