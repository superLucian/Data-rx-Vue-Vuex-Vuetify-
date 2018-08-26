<template>
  <v-toolbar
    app
    clipped-left
    fixed
    flat
  >
    <v-btn icon class="" @click.native="home">
      <v-icon>apps</v-icon>
    </v-btn>
    <v-toolbar-title class="title text-light">{{title}}</v-toolbar-title>
    <v-icon class="light-grey">keyboard_arrow_right</v-icon>
    <span class=" userInfo" flat>{{currentPcn}}</span>
    <settings></settings>
    <v-spacer></v-spacer>
    <v-spacer></v-spacer>
    <span class="user-name-container" flat>{{userName}}</span>
    <v-btn icon class="" @click.native="logout">
      <v-icon>exit_to_app</v-icon>
    </v-btn>
  </v-toolbar>
</template>
<script>
  import store from '../../store'
  import Account from '../Modal/Account.vue'
  import Settings from '../Modal/Settings.vue'

  export default {
    data() {
      return {
        title: 'RxSense',
        currentPcn: '',
        userName: ''
      }
    },
    components: {
      Account,
      Settings
    },
    watch: {
      '$store.state.pcn': function (val) {
        if (val) this.currentPcn = this.$store.state.pcn.pcc
      },
      '$store.state.user': function (val) {
        if (val) this.userName = val.user_info.fname + ' ' + val.user_info.lname
      }
    },
    mounted() {
      console.log('----- Toolbar mounted -----')
      if (!(this.$store.state.user || this.$store.state.user.session_uid)) {
        this.$router.push('/login')
      } else if (this.$store.state.user.user_info) {
        this.userName = this.$store.state.user.user_info.fname + ' ' + this.$store.state.user.user_info.lname
      }

      if (this.$store.state.pcn) {
        this.currentPcn = this.$store.state.pcn.pcc
      }
    },
    methods: {
      logout: function () {
        this.$store.commit('CLEAR_ALL_DATA')
        this.$router.push('/login')
      },
      home: function () {
        this.$router.push('/')
      }
    }
  }
</script>
<style lang="stylus" scoped>
  .text-light {
    font-weight: 300;
  }

  .light-grey {
    color: #d9d9d9 !important;
  }

  .title {
    margin-left: 0 !important;
  }

  span.user-name-container {
    font-size: 14px;
    vertical-align bottom;
    letter-spacing: 0.02em;
    text-overflow: ellipsis;
    overflow: hidden;
    font-weight: 500;
    margin-left 15px
  }

  span.userInfo {
    font-size: 18px;
    font-weight: 500;
    color: #00baf2;
  }

  .toolbar {
    background: #fff !important;
    border-bottom: 1px solid #ddd;
  }
</style>
