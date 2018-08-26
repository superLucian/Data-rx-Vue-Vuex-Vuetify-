<template>
  <main>
    <v-form ref="form">
      <v-card-title primary-title>
        Find authorizations for:
      </v-card-title>
      <v-card-text>
        <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs5>
              <v-text-field label="Member ID" v-model="memberId" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs2>
              <v-btn icon @click.native="showFinder()"> <v-icon>search</v-icon></v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs5>
              <v-text-field label="Member CD" v-model="memberCd" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs4 class="pr-5">
        <date-picker v-model="effectiveDate" label="Effective Date"></date-picker>
        </v-flex>
        <v-flex xs4 class="pr-5">
          <date-picker v-model="expirationDate" label="Expiration Date"></date-picker>
        </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-actions class="d-block text-xs-center py-0">
        <v-btn color="primary-color" @click="find">Find<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      </v-card-actions>
    </v-form>
    <prior-auth-list :tableData="priorAuthList" v-if="showAuthList"></prior-auth-list>
    <Vodal
      :show="finderDialog"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="false"
      :width="1200"
      :height="800"
      :closeOnClickMask="true">
      <MemberFind :selectable="true" :methodName="methodName">
      </MemberFind>
      <v-flex xs12>
        <v-divider class="mt-2"></v-divider>
        <v-card-text class="text-xs-center py-1">
          <v-btn @click.native="cancel()">Cancel</v-btn>
        </v-card-text>
      </v-flex>
    </Vodal>
  </main>
</template>

<script>
  import priorAuthorizationService from '../../../services/priorauthorization/priorAuthorizationService'
  import {pickerFormat} from '../../../components/utils/DateMethods'
  import store from '../../../store'
  import Vodal from '../../../components/common/Vodal.vue'
  import MemberFind from '../Member/MemberList.vue'
  import PriorAuthList from "./PriorAuthList.vue"
  import DatePicker from '../../../components/common/DatePicker.vue'

  export default {
    components: {
      MemberFind,
      PriorAuthList,
      Vodal,
      DatePicker
    },
    data() {
      return {
        memberId: "",
        memberCd: "",
        effectiveDate: pickerFormat(new Date()),
        expirationDate: pickerFormat(new Date()),
        priorAuthList: [],
        showAuthList: false,
        finderDialog: false,
        methodName: 'selectMemeberToPriroAuth',
        rules: {
          required: (value) => !!value || 'Required.'
        },
        loading: false
      }
    },
    mounted() {
      const that = this
      window.Vue.$on(this.methodName, function (item) {
        that.memberId = item['MemberId']
        that.memberCd = item['PersonCode']
        that.finderDialog = false
      })
    },
    methods: {
      find: function () {
        if (this.$refs.form.validate()) {
          const that = this
          that.loading = true
          const requestData = {
            member_id: this.memberId,
            person_cd: this.memberCd,
            start_dt: this.effectiveDate,
            end_dt: this.expirationDate,
            pcc: this.$store.state.pcn.pcc,
          }
          priorAuthorizationService.findByMember(requestData).then(function (response) {
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
