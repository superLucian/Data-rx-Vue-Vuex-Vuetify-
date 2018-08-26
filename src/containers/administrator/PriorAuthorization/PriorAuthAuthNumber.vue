<template>
  <main>
    <v-form ref="form">
      <v-card-title primary-title>
        Find authorizations using:
      </v-card-title>
      <v-card-text>
        <v-flex md4 xs12>
          <v-text-field v-model="authNumber" label="Auth Number" required :rules="[rules.required]">
          </v-text-field>
        </v-flex>
      </v-card-text>
      <v-card-actions class="d-block text-xs-center py-0">
        <v-btn color="primary-color" @click="find">Find<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      </v-card-actions>
    </v-form>
    <prior-auth-list :tableData="priorAuthList" v-if="showAuthList"></prior-auth-list>
  </main>
</template>

<script>
  import priorAuthorizationService from '../../../services/priorauthorization/priorAuthorizationService'
  import store from '../../../store'
  import PriorAuthList from "./PriorAuthList.vue"


  export default {
    name: 'prior-auth-auth-number',
    components: {
      PriorAuthList,
    },
    data() {
      return {
        authNumber: '',
        priorAuthList: [],
        showAuthList: false,
        rules: {
          required: (value) => !!value || 'Required.'
        },
        loading: false
      }
    },
    methods: {
      find: function () {
        if (this.$refs.form.validate()) {
          const that = this
          that.loading = true
          const requestData = {
            auth_num: this.authNumber,
            pcc: that.$store.state.pcn.pcc,
          }
          priorAuthorizationService.findByAuthNumber(requestData).then(function (response) {
            that.showAuthList = true
            that.priorAuthList = response.authorization_data
            that.loading = false
          }).catch(function (error) {
            that.loading = false
          })
        }
      }
    }
  }
</script>
