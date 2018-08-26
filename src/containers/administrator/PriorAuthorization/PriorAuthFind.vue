<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Prior Authorization</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="add">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-layout row wrap>
      <v-container fluid class="my-scroll-enabled">
        <v-tabs v-model="activeTab">
          <v-tabs-bar class="transparent">
            <v-tabs-slider class="active-line"></v-tabs-slider>
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab"
              :href="'#' + tab"
              ripple
              flat>
              {{ tab }}
            </v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content id="provider">
              <prior-auth-provider></prior-auth-provider>
            </v-tabs-content>
            <v-tabs-content id="member">
              <prior-auth-member></prior-auth-member>
            </v-tabs-content>
            <v-tabs-content id="processed">
              <prior-auth-processed></prior-auth-processed>
            </v-tabs-content>
            <v-tabs-content id="authorization">
              <prior-auth-auth-number></prior-auth-auth-number>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-container>
    </v-layout>
  </main>
</template>
<script>
  import PriorAuthProvider from "./PriorAuthProvider.vue"
  import PriorAuthMember from "./PriorAuthMember.vue"
  import PriorAuthProcessed from "./PriorAuthProcessed.vue"
  import PriorAuthAuthNumber from "./PriorAuthAuthNumber.vue"
  import PriorAuthAdd from "./PriorAuthAdd.vue"

  import priorAuthorizationService from '../../../services/priorauthorization/priorAuthorizationService'

  export default {
    components: {
      PriorAuthProvider,
      PriorAuthMember,
      PriorAuthProcessed,
      PriorAuthAuthNumber,
      PriorAuthAdd
    },
    data() {
      return {
        tabs: ['provider', 'member', 'processed', 'authorization'],
        activeTab: 'provider',
      }
    },
    methods: {
      add() {
        this.$router.push({path: "add"})
      },
    },
    mounted() {
    }
  }
</script>
