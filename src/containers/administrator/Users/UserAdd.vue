<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add User</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text>
      <user-information :type="'new'" :data="info"></user-information>
    </v-card-text>
  </main>
</template>
<script>
  import services from '../../../services/services'
  import store from '../../../store'
  import UserInformation from './Information/UserInformation.vue'

  export default {
    name: 'user-add',
    components: {
      UserInformation
    },
    data() {
      return {
        isDisabledSave: true,
        info: {
          lname: "",
          fname: "",
          pwd: "",
          v_pwd: "",
          uid: "",
          addr1_txt: "",
          addr2_txt: "",
          city_txt: "",
          state_cd: "",
          zip_cd: "",
          phone_num: "",
          fax_num: "",
          cell_num: "",
          pager_num: "",
          email_addr_txt: "",
          type_cd: null,
          status_cd: "A",
          all_pcc: "N",
          locked_out_flg: "F",
          internal_flg: "F"
        }
      }
    },
    watch: {},
    mounted() {
      console.log('----- Administrator / User Add mounted -----')
    },
    methods: {
      back() {
        this.$router.push({name: 'users'})
      }
    }
  }
</script>
<style lang="stylus">
  .errorAddUserMsg {
    color: red;
    text-align: center;
    font-size: 14px;
  }

  .headline {
    padding 0
  }
</style>
