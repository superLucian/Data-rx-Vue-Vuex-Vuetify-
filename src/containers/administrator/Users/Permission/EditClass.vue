<template>
  <v-layout row justify-center>
    <vodal
      :show="show"
      animation="zoom"
      :closeButton="false"
      :width="width"
      :height="height"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          User PCN Class Edit
        </v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs12>
          <edit-form :type="type" :data="value" :onBack="close"></edit-form>
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
  import EditForm from '../Form/EditForm.vue'

  export default {
    name: 'edit-class',
    data() {
      return {
        show: false,
        width: 600,
        height: 0,
        type: null,
        active: 'main',
        sid: null,
        value: {}
      }
    },
    watch: {},
    components: {
      EditForm,
      Vodal
    },
    mounted() {
      const that = this
//      Open EditSid signal
      window.Vue.$on('openEditClass', function () {
        that.open()
      })
    },
    methods: {
      open: function () {
        this.type = 'PCN Class'
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
