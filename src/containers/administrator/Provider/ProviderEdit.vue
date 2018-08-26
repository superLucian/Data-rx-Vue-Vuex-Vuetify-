<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Edit Provider / {{convertString(active)}} </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout row wrap class="my-scroll-enabled">
      <v-container fluid>
      <v-tabs v-model="active">
        <v-tabs-bar class="transparent">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.path"
            ripple
          >
            {{ tab.name }}
          </v-tabs-item>
        </v-tabs-bar>
      </v-tabs>
      <router-view></router-view>
      </v-container>
    </v-layout>
  </main>
</template>
<script>
  import services from '../../../services/services'
  import store from '../../../store'

  export default {
    name: 'Provider-edit',
    data() {
      return {
        tabs: [{
          name: 'Provider',
          path: 'provider'
        }, {
          name: 'Price It!',
          path: 'pricing'
        }, {
          name: 'Mail Address',
          path: 'mail_address'
        }, {
          name: 'Location',
          path: 'location'
        }, {
          name: 'Contact',
          path: 'contact'
        }, {
          name: 'Comments',
          path: 'comments'
        }
        ],
        active: null
      }
    },
    components: {},
    watch: {
      '$route.meta': function (d) {
        this.active = d
      },
      active: function (val) {
        if (val) {
          this.$router.push({path: `${val}`})
        }
      }
    },
    mounted() {
      console.log('--------- Administrator / Provider Edit mounted ---------')
      if (Object.keys(this.$route.meta).length > 0)
        this.active = this.$route.meta
      else
        this.$router.push({name: 'Provider-main'})
    },
    methods: {
      convertString: function (text) {
        if (text) return text.replace(/_/g, ' ')
        else return ''
      },
      back: function () {
        store.commit('UPDATE_STATUS', true)
        store.commit('CLEAR', 'selectedProvider')
        store.commit('CLEAR', 'providerSetupData')
        this.$router.push({name: 'provider'})
      }
    }
  }
</script>
<style lang="stylus">
</style>
