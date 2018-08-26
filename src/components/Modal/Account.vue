<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" scrollable>
      <v-btn slot="activator" icon class="white--text">
        <v-icon>person</v-icon>
      </v-btn>
      <v-toolbar class="light-blue darken-4">
        <v-icon class="white--text">person</v-icon>
        <v-toolbar-title class="white--text">
          Person Information
        </v-toolbar-title>
      </v-toolbar>
      <v-card>
        <v-card-text style="height: 300px;">
          <p>User: {{person.email}}</p>
          <p>Uid: {{person.uid}}</p>
          <p>First Name: {{info.ContactFirstName}}</p>
          <p>Last Name: {{info.ContactLastName}}</p>
          <p>Phone Number: {{info.PhoneNumber}}</p>
          <p>Pcc: {{info.Pcc}}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn class="blue--text text-center close" flat @click.native="dialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
  import store from '../../store'

  export default {
    data() {
      return {
        dialog: false,
        person: store.state.user,
        info: store.state.pcn
      }
    },
    mounted: function () {
    }
  }
</script>

<style lang="scss">
  .close {
    margin: 0 auto;
    width: 100%;
  }
</style>
