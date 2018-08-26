<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Edit User / {{active}} </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-layout row wrap>
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

  export default {
    name: 'user-edit',
    data() {
      return {
        tabs: [{
          name: 'User Information',
          path: 'information'
        }, {
          name: 'User Permission',
          path: 'permission'
        }],
        active: null
      }
    },
    components: {},
    watch: {
      active: function (tab) {
        if (tab) {
          this.$router.push({path: `${tab}`})
        }
      }
    },
    mounted() {
      console.log('----- Administrator / User Edit mounted -----')
      if (Object.keys(this.$route.meta).length > 0)
        this.active = this.$route.meta
      else
        this.$router.push({name: 'user-information'})
    },
    methods: {
      back: function () {
        this.$router.push({name: 'users'})
      }
    }
  }
</script>
<style lang="stylus">
</style>
