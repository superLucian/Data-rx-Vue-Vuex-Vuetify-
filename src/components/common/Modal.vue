<template>
  <v-layout row justify-center>
    <vodal
      :show="show"
      animation="zoom"
      :closeButton="false"
      :width="width"
      :height="height"
    >
      <v-toolbar class="light-blue darken-4">
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>

      </v-layout>
    </vodal>
  </v-layout>
</template>

<script>
  import Vodal from 'vodal'
  import 'vodal/common.css'
  import 'vodal/zoom.css'

  export default {
    name: 'rx-modal',
    props: ['show', 'title'],
    data() {
      return {
        width: 800,
        height: 0,
      }
    },
    watch: {},
    components: {
      Vodal
    },
    mounted() {
      console.log('----- Modal mounted -----')
    },
    methods: {
      open: function () {
      },
      close: function () {
        this.show = false
      }
    }
  }
</script>

<style lang="scss">
</style>
