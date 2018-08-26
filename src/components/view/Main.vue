<template>
  <main>
    <v-container fluid v-show="isShow" class="my-scroll-full-enabled">
      <v-layout row>
        <v-flex xs12 sm6 offset-sm3>
          <h5>Welcome <span class="primary--text">{{accout}}</span>, let's get started.</h5>
          <v-card>
            <v-list>
              <v-list-tile avatar v-for="item in items" :to="{name: item.to}" v-bind:key="item.title">
                <v-list-tile-avatar>
                  <v-icon v-bind:class="[item.iconClass]">{{ item.icon }}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-btn icon ripple>
                    <v-icon class="grey--text text--lighten-1">info</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider inset></v-divider>
            </v-list>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>
<script>
  import store from '../../store'
  import Toolbar from '../layouts/Toolbar.vue'
  import Navigation from '../layouts/Navigation.vue'
  import PageFooter from '../layouts/PageFooter.vue'

  export default {
    name: 'main',
    components: {
      Toolbar,
      Navigation,
      PageFooter,
    },
    data() {
      return {
        accout: this.$store.state.user.session_uid,
        items: [
          {icon: 'person', iconClass: 'grey lighten-1 white--text', title: 'Manage Users', to: 'users'},
          {icon: 'group', iconClass: 'grey lighten-1 white--text', title: 'Manage Groups', to: 'groups'},
          {icon: 'local_hospital', iconClass: 'grey lighten-1 white--text', title: 'Manage Provider', to: 'provider'},
          {icon: 'group_work', iconClass: 'grey lighten-1 white--text', title: 'Manage Network', to: 'network'},
          {icon: 'link', iconClass: 'grey lighten-1 white--text', title: 'Chain Administration', to: 'chain'},
          {icon: 'note', iconClass: 'grey lighten-1 white--text', title: 'Manage Prescribers', to: 'prescribers'},
          {
            icon: 'description',
            iconClass: 'grey lighten-1 white--text',
            title: 'Manage Plans and Parameters',
            to: 'Plan'
          },
          {icon: 'face', iconClass: 'grey lighten-1 white--text', title: 'Manage Members', to: 'member'},
          {icon: 'receipt', iconClass: 'grey lighten-1 white--text', title: 'Manage Claims', to: 'claims'},
          {
            icon: 'check',
            iconClass: 'grey lighten-1 white--text',
            title: 'Manage Prior Authorization',
            to: 'prior-authorization'
          },
          {
            icon: 'code',
            iconClass: 'grey lighten-1 white--text',
            title: 'Manage Diagnosis Codes',
            to: 'diagnosis-codes'
          },
          {icon: 'bubble_chart', iconClass: 'grey lighten-1 white--text', title: 'Manage EDI', to: 'edi'},
          {icon: 'network_wifi', iconClass: 'grey lighten-1 white--text', title: 'Manage PCN', to: 'pcns'},
          {icon: 'list', iconClass: 'grey lighten-1 white--text', title: 'Manage Formulary', to: 'formulary'},
          {
            icon: 'folder_special',
            iconClass: 'grey lighten-1 white--text',
            title: 'Manage Special Programs',
            to: 'special-programs'
          },
          {icon: 'donut_small', iconClass: 'grey lighten-1 white--text', title: 'Manage Drugs', to: 'drug-database'},
        ],
        user: null,
        isShow: false,
      }
    },
    watch: {
      '$store.state.pcn': function (val) {
        if (val) this.isShow = true
      },
      '$store.state.isMPP': function (val) {
        if (val) {
          this.items.splice(12, 0, {
            icon: 'event',
            iconClass: 'grey lighten-1 white--text',
            title: 'Price It!',
            to: 'mpp-drug'
          })
        } else {
          this.items.splice(12, 1)
        }
      }
    },
    mounted() {
      if (this.$store.state.pcn) this.isShow = true

      if(this.$store.state.isMPP) {
        this.items.splice(12, 0, {
          icon: 'event',
          iconClass: 'grey lighten-1 white--text',
          title: 'Price It!',
          to: 'mpp-drug'
        })
      }else {
        if(this.items.length > 16) this.items.splice(12, 1)
      }
    },
    methods: {}
  }
</script>
<style lang="stylus">
  h5 {
    margin-top: 25px;
  }
</style>
