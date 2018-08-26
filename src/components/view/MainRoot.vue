<template>
  <v-app id="inspire">
    <navigation></navigation>
    <toolbar></toolbar>
    <v-content>
      <transition name="slide-y-transition">
        <router-view></router-view>
      </transition>
    </v-content>
  </v-app>
</template>
<script>
  import services from '../../services/services'
  import store from '../../store'
  import Toolbar from '../layouts/Toolbar.vue'
  import Navigation from '../layouts/Navigation.vue'
  import PageFooter from '../../components/layouts/PageFooter.vue'

  export default {
    data() {
      return {}
    },
    methods: {},
    components: {
      Toolbar,
      Navigation,
      PageFooter
    },
    mounted() {
      const that = this
      if (this.$store.state.auth.isLoggedIn === false) that.$router.push('/login')

      // Init PCNs
      services.getAllPCN(that.$store.state.user.session_uid).then(function (res) {
        store.commit('UPDATE_ALL_PCN', res.pcc_list)
        window.Vue.$emit('loaded_allPCN')
      }).catch(function () {
        that.$router.push('/login')
      })

      // Init All Classes
      services.getAllClassesData().then(function (res) {
        store.commit('UPDATE_ALL_CLASSES', res.user_classes)
      })

      // Init All Features
      services.getAllFeaturesData().then(function (res) {
        store.commit('UPDATE_ALL_FEATURES', res.feature_codes)
      })

      // Init All Access Levels
      const allAccesses = [{
        level: 0,
        name: 'No Access'
      }, {
        level: 1,
        name: 'Read Only'
      }, {
        level: 2,
        name: 'Read and Edit'
      }, {
        level: 3,
        name: 'Read Edit and Delete'
      }]
      store.commit('UPDATE_ALL_ACESSES', allAccesses)
    }
  }
</script>
<style lang="stylus">
  .scroll-enabled {
    max-height: calc(100vh - 60px) !important;
    min-height: calc(100vh - 60px) !important;
    overflow: auto;
  }

  .scroll-enabled::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, 0.3);
    border-radius: 7px;
    background-color: #F5F5F5;
  }

  .scroll-enabled::-webkit-scrollbar {
    width: 9px;
    height: 9px;
    background-color: #F5F5F5;
  }

  .scroll-enabled::-webkit-scrollbar-thumb {
    border-radius: 7px;
    -webkit-box-shadow: inset 0 0 7px rgba(0, 0, 0, .3);
    background-color: #555;
  }
</style>
