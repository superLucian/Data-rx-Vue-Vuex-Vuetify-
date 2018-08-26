<template>
  <v-form ref="form">
    <v-container fluid class="form-scroll-enabled" v-bind:class="{ add: type === 'new' }">
      <v-layout row>
        <v-flex xs6>
          <v-layout row wrap>
            <v-flex xs12 class="px-0">
              <h5>Session Parameters</h5>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field label="User Id*" v-model="user_info.uid" :rules="[rules.required]"
                              :disabled="type !== 'new'" @keypress.32="$event.preventDefault"></v-text-field>
                <v-text-field label="Password" v-model="user_info.pwd"
                              :rules="type === 'new' ? [rules.required] : []"></v-text-field>
                <v-text-field label="Verify Password" type="password" v-model="user_info.v_pwd"
                              :rules="type === 'new' ? [rules.password] : [rules.confirmPassword]"></v-text-field>
                <v-btn class="generate" @click.native="generate">Generate Password</v-btn>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-layout row wrap>
            <v-flex xs12 class="px-2">
              <h5>User Information</h5>
              <v-divider></v-divider>
              <v-card-text>
                <v-text-field label="First Name*" v-model="user_info.fname" :rules="[rules.required]" @keypress.32="$event.preventDefault"></v-text-field>
                <v-text-field label="Last Name*" v-model="user_info.lname" :rules="[rules.required]" @keypress.32="$event.preventDefault"></v-text-field>
                <v-layout row wrap>
                  <v-flex xs5>
                    <v-checkbox label="Internal User" v-model="user_info.internal_flg" color="primary-color" true-value="T"
                                false-value="F"></v-checkbox>
                  </v-flex>
                  <v-flex xs7>
                    <v-checkbox label="User has access to all PCNs" v-model="user_info.all_pcc"
                                color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                  </v-flex>
                </v-layout>

                <v-layout row wrap>
                  <v-flex xs12>
                    <v-radio-group row v-model="user_info.status_cd">
                      <v-radio value="A" label="Active"></v-radio>
                      <v-radio value="I" label="Inactive"></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="mt-4">
        <v-flex xs12>
          <h5>User Information</h5>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs6>
              <v-card-text>
                <v-text-field label="Address" v-model="user_info.addr1_txt"></v-text-field>
                <v-text-field label="" v-model="user_info.addr2_txt"></v-text-field>
                <v-text-field label="Email" v-model="user_info.email_addr_txt" required
                              :rules="[rules.email]"></v-text-field>
              </v-card-text>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-card-text class="py-0">
                    <v-text-field label="Phone" v-model="user_info.phone_num"
                                  required :rules="[rules.phone]" hint="xxx-xxx-xxxx" persistent-hint></v-text-field>
                    <v-text-field label="Cell" v-model="user_info.cell_num"></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-card-text class="py-0">
                    <v-text-field label="Fax" v-model="user_info.fax_num"></v-text-field>
                    <v-text-field label="Pager" v-model="user_info.pager_num"></v-text-field>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs6>
              <v-card-text>
                <v-text-field label="City" v-model="user_info.city_txt"></v-text-field>
                <v-select
                  v-bind:items="items"
                  v-model="user_info.state_cd"
                  label="State"
                  bottom
                ></v-select>
                <v-text-field label="Zip Code" v-model="user_info.zip_cd"></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
    <v-divider class="mt-2"></v-divider>
    <small class="red--text">*indicates required field</small>
    <v-card-actions>
      <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="primary" @click.native="create" :disabled="isDisabledSave" v-if="type === 'new'">Create</v-btn>
      <v-btn class="primary" @click.native="save" v-else :disabled="isDisabledSave">update</v-btn>
    </v-card-actions>
  </v-form>
</template>
<script>
  import services from '../../../../services/services'
  import store from '../../../../store'
  import { required } from '../../../../components/utils/FormRuleDefinitions'

  export default {
    name: 'user-information',
    props: ['type', 'data'],
    components: {},
    data() {
      return {
        user_info: {},
        isDisabledSave: true,
        items: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'],
        mailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phonePattern: /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/,
        rules: {
          required: required,
          email: (value) => {
            if (!!value) {
              const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.(XXX@XXX.com)'
            } else {
              return 'Required'
            }
          },
          password: (value) => {
            if (!!value) {
              return (value === this.user_info.pwd) || 'Confirm password'
            } else {
              return 'Required'
            }
          },
          confirmPassword: (value) => {
            return (value === this.user_info.pwd) || 'Confirm password'
          },
          phone: (value) => {
            if (!!value) {
              const pattern = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
              return pattern.test(value) || 'Invalid Phone Number.(XXX-XXX-XXXX)'
            } else {
              return 'Required'
            }
          }
        }
      }
    },
    watch: {
      user_info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        },
        deep: true
      }
    },
    mounted() {
      console.log('----- Administrator / User / Information mounted -----')
      this.$refs.form.validate()
      if (this.type === 'new') {
        this.user_info = this.data
      } else {
        const that = this
        services.getUserData(this.$route.params.uid).then(function (res) {
          res.user[0].pwd = ''
          res.user[0].v_pwd = ''
          that.user_info = res.user[0]
        })
      }
    },
    methods: {
      generate: function () {
        const password = Math.random().toString(36).slice(-8)
        this.user_info.pwd = password
        this.user_info.v_pwd = password
      },
      create: function () {
        const that = this
        if (this.$refs.form.validate()) {
          services.addUser(this.user_info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
            if (res === "0") {
              that.$router.push({name: 'users'})
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'Create User!')
            } else {
              window.Vue.$emit('snackbar', 'error', 'This User created already!')
            }
          })
        }
      },
      save: function () {
        const that = this
        if (this.$refs.form.validate()) {
          services.updateUserInfo(this.user_info, this.$store.state.user, this.$store.state.pcn).then(function (res) {
            if (res === "0") {
              if(that.user_info.uid === that.$store.state.user.session_uid){
                const data = {
                  session_id: that.$store.state.user.session_id,
                  session_uid: that.$store.state.user.session_uid,
                  user_info: that.user_info
                }
                store.commit('UPDATE_USER', data)
              }
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'Update User Information!')
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      clear: function () {
        const that = this
        if (this.type === 'new') {
          this.user_info = {
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
          this.$refs.form.validate()
        } else {
          services.getUserData(this.$route.params.uid).then(function (res) {
            res.user[0].pwd = ''
            res.user[0].v_pwd = ''
            that.user_info = res.user[0]
          })
        }
        this.isDisabledSave = true
      }
    }
  }
</script>
<style lang="stylus">
  h5 {
    margin-top: 0;
  }

  .generate {
    margin: 26px 0 !important
  }
</style>
