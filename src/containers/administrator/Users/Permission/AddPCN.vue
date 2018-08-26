<template>
  <v-layout row justify-center>
    <vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="false"
      :closeButton="false"
      :closeOnClickMask="false"
      :width="width"
      :height="height"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          User PCN Add
        </v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs12>
          <add-form :type="type" :data="value" :onBack="close"></add-form>
        </v-flex>
      </v-layout>
    </vodal>
  </v-layout>
</template>

<script>
  import store from '../../../../store/index'
  import services from '../../../../services/services'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import AddForm from '../Form/AddForm.vue'

  export default {
    name: 'add-pcn',
    data() {
      return {
        show: false,
        width: 600,
        height: 0,
        type: null,
        sid: null,
        value: {}
      }
    },
    watch: {},
    components: {
      AddForm,
      Vodal
    },
    mounted() {
      const that = this
//      Open EditSid signal
      window.Vue.$on('openAddPCN', function () {
        that.open()
      })
    },
    methods: {
      open: function () {
        this.type = 'PCN'
        this.show = true
      },
      close: function () {
        this.type = null
        this.show = false
        store.commit('CLEAR', 'selectedPermission')
      }
    }
  }
</script>

<style lang="scss">
</style>
