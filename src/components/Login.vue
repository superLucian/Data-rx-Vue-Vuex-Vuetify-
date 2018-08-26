<template>
  <div class="container app-content">
    <v-app standalone>
      <main>
        <v-dialog v-model="showModal" :value="true" persistent max-width="400">
          <v-toolbar dark>
            <v-icon class="white--text">account_circle</v-icon>
            <v-toolbar-title class="white--text">Log In to RxSense Administrator</v-toolbar-title>
          </v-toolbar>

          <v-container class="white px-0 py-0 my-scroll-enabled-2">
            <v-card-text>
              <p class="title text-xs-center">Welcome to the Data-Rx</p>
              <p class="guide">
                This system contains patient information including protected health information (PHI). The confidentiality of PHI is protected by law (HIPAA). Unauthorized or improper use of this system may result in disciplinary action. System use is for business purposes only. RxSense Acceptable Use Policy applies. If you do not agree to abide by this policy, please log off the system.
                <br>
                <br>
                User and user’s company/employer are solely responsible for any and all additions, deletions and other changes made by user to data in benefit plans and other information in RxSense. User acknowledges on behalf of user and user’s company/employer that any changes in RxSense may result in a detrimental effect, financial and otherwise, to any plan accessed in RxSense, to persons covered by any such plan, to user’s company/employer, and/or to user.  To the extent permitted under applicable laws, user and user’s company/employer hereby jointly and severally release and hold Data Rx harmless from any and all claims of liability related to any such changes made by user.
              </p>
              <div class="policy">
                <a target="_blank" href="http://apps.data-rx.com/AcceptableUsePolicy.pdf">View Acceptable Use Policy</a>
              </div>
            </v-card-text>
            <v-card-text>
              <v-text-field label="User Id" v-model="uid" :autofocus="true"></v-text-field>
              <v-text-field name="pwd" label="Enter your password" v-model="pwd" :type="'password'"
                            @keyup.enter.native="login"></v-text-field>
              <p class="red--text" v-if="isError">Invalid username and/or password... Please try again.</p>
              <v-btn color="primary-color" block @click.native="login" :disabled="isLoginBtn">
                Login
              </v-btn>
            </v-card-text>
          </v-container>
        </v-dialog>
      </main>
    </v-app>
  </div>
</template>

<script>
  import services from '../services/services'
  import store from '../store'

  export default {
    name: 'login',
    data() {
      return {
        dialog: {
          title: 'Login to DataRx',
          icon: 'account_circle'
        },
        isLoginBtn: true,
        uid: '',
        pwd: '',
        isError: false,
        showModal: false
      }
    },
    watch: {
      uid: function () {
        this.isChecking()
      },
      pwd: function () {
        this.isChecking()
      }
    },
    mounted() {
      console.log('---------- login ----------')
      store.commit('CLEAR_ALL_DATA')
      setTimeout(() => this.showModal = true, 0)
    },
    methods: {
      isChecking: function () {
        this.isError = false
        if (this.uid.length > 0 && this.pwd.length > 0) {
          this.isLoginBtn = false
        } else {
          this.isLoginBtn = true
        }
      },
      login() {
        if (this.isLoginBtn) return
        const that = this
        const loginInfo = {
          uid: this.uid,
          pwd: this.pwd
        }

        services.getLogin(loginInfo).then(function (res) {
          if (res.session_status.return_cd._text === '0') {
            const logged = {
              session_uid: loginInfo.uid,
              session_id: res.session_status.session_id._text
            }
            that.isError = false
            store.commit('UPDATE_AUTH', true)
            store.commit('UPDATE_USER', logged)

            that.showModal = false

            services.getUserData(loginInfo.uid).then(function (res) {
              if(res && res.hasOwnProperty('user')) {
                store.commit('UPDATE_USER', {user_info: res.user[0]})
              }
            })

            that.$router.push('/')

          } else {
            store.commit('UPDATE_AUTH', false)
            store.commit('UPDATE_USER', '')
            that.isError = true
          }
        })
      }
    }
  }
</script>

<style lang="scss">
  html {
    position: relative;
  }

  .loginForm {
    min-height: 0 !important;
    margin: 0 auto;
    background: #fff;
  }

  .guide {
    height: 250px;
    overflow: auto;
  }

  .policy {
    text-align: center;
  }

  .policy a {
    color: black;
    list-style: none;
    padding: 5px 15px;
    text-decoration: none;
    border: 1px solid;
  }
</style>
