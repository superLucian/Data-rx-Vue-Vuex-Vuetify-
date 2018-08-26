<template>
  <main>
    <v-form ref="form">
      <v-card-title primary-title>
        Find authorizations for:
      </v-card-title>
      <v-card-text>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs5>
              <v-text-field label="Provider" v-model="provider" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn icon @click.native="showFinder()"> <v-icon>search</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs5>
                  <date-picker v-model="effectiveDate" label="Effective Date"></date-picker>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs5>
                  <date-picker v-model="expirationDate" label="Expiration Date"></date-picker>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-card-text>
      <v-card-actions class="d-block text-xs-center">
        <v-btn color="primary-color" @click="find">Find<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      </v-card-actions>
    </v-form>
    <prior-auth-list :tableData="priorAuthList" v-if="showAuthList">
    </prior-auth-list>
    <!--<v-layout row justify-center>-->
    <Vodal
      :show="finderDialog"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="false"
      :width="1200"
      :height="800"
      :closeOnClickMask="false"
    >
      <provider-find :selectable="true" :methodName="methodName">
      </provider-find>
      <v-card-text class="py-0 px-1">
        <v-divider class="mt-2"></v-divider>
        <v-card-actions class="d-block text-xs-center">
          <v-btn @click.native="cancel()">Cancel</v-btn>
        </v-card-actions>
      </v-card-text>

    </Vodal>
    <!--</v-layout>-->
  </main>
</template>

<script>
  import priorAuthorizationService from '../../../services/priorauthorization/priorAuthorizationService'
  import {pickerFormat} from '../../../components/utils/DateMethods'
  import store from '../../../store'
  import Vodal from '../../../components/common/Vodal.vue'
  import ProviderFind from '../Provider/ProviderFind.vue'
  import PriorAuthList from "./PriorAuthList.vue"
  import DatePicker from '../../../components/common/DatePicker.vue'

  export default {
    name: 'prior-auth-provider',
    components: {
      ProviderFind,
      PriorAuthList,
      Vodal,
      DatePicker
    },
    data() {
      return {
        provider: '',
        effectiveDate: pickerFormat(new Date()),
        expirationDate: pickerFormat(new Date()),
        priorAuthList: [],
        showAuthList: false,
        finderDialog: false,
        methodName: 'selectProviderToPriroAuth',
        rules: {
          required: (value) => !!value || 'Required.'
        },
        loading: false,
      }
    },
    mounted() {
      const that = this
      window.Vue.$on(this.methodName, function (item) {
        that.provider = item['NPI']
        that.finderDialog = false
      })
    },
    methods: {
      find: function () {
        if (this.$refs.form.validate()) {
          const that = this
          that.loading = true
          const requestData = {
            provider_id: that.provider,
            start_dt: that.effectiveDate,
            end_dt: that.expirationDate,
            pcc: that.$store.state.pcn.pcc
          }
          priorAuthorizationService.findByProvider(requestData).then(function (response) {
            that.showAuthList = true
            that.priorAuthList = response.authorization_data
            that.loading = false
          }).catch(function (error) {
            that.loading = false
          })
        }
      },
      showFinder: function () {
        this.finderDialog = true
      },
      cancel: function () {
        this.finderDialog = false
      }
    }
  }
</script>
