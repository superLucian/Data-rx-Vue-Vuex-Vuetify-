<template>
  <main class="claim-details-container">
    <v-layout row justify-center>
      <vodal
        :show="isShow"
        :width="width"
        :height="height"
        animation="zoom"
        :closeOnEsc="false"
        :closeButton="true"
        @hide="$emit('hide')"
        :closeOnClickMask="true"
      >
        <div v-if="!isAddPA">
          <v-toolbar dark>
            <v-btn icon @click="back()" dark>
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">Claim Details</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-container fluid>
            <v-tabs v-model="active">
              <v-tabs-bar class="transparent">
                <v-tabs-slider class="active-line"></v-tabs-slider>
                <v-tabs-item
                  v-for="tab in tabs"
                  :key="tab"
                  :href="'#'+tab"
                  ripple
                >
                  {{ tab }}
                </v-tabs-item>
              </v-tabs-bar>
              <template>
                <v-card-text>
                  <v-layout row wrap>
                    <v-flex xs4 class="text-xs-center">
                      <span>Name: <a href="#" v-on:click.prevent.stop="goToMember()"><b>{{claim['First Name']}} {{claim['Last Name']}}</b></a></span>
                    </v-flex>
                    <v-flex xs4 class="text-xs-center">
                      <span>Member Id: <a href="#" v-on:click.prevent.stop="goToMember()"><b>{{claim['Member Id']}}</b></a></span>
                    </v-flex>
                    <v-flex xs4 class="text-xs-center">
                      <span>Member Code: <b>{{claim['Person Code']}}</b></span>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </template>
              <v-divider></v-divider>
              <v-tabs-items>
                <v-tabs-content class="px-0 py-0" id="Store Claim">
                  <store-tab :data="claim"></store-tab>
                </v-tabs-content>
                <v-tabs-content class="px-0 py-0" id="Plan Claim">
                  <plan-claim-tab :data="claim"></plan-claim-tab>
                </v-tabs-content>
                <v-tabs-content class="px-0 py-0" id="Rx">
                  <rx-tab :data="claim"></rx-tab>
                </v-tabs-content>
                <v-tabs-content class="px-0 py-0" id="Compound">
                  <compound-tab :data="claim" :claim-ingradient="ingradientList"></compound-tab>
                </v-tabs-content>
                <v-tabs-content class="px-0 py-0" id="Plan">
                  <plan-tab :data="claim"></plan-tab>
                </v-tabs-content>
                <v-tabs-content class="px-0 py-0" id="Other Misc">
                  <other-misc-tab :data="claim"></other-misc-tab>
                </v-tabs-content>
                <v-tabs-content class="px-0 py-0" id="Member Benefits">
                  <member-benefits-tab :data="claim" :claim-member="memberBenefits"></member-benefits-tab>
                </v-tabs-content>
                <v-tabs-content class="px-0 py-0" id="HCPCS">
                  <hcpcs-tab :data="claim"></hcpcs-tab>
                </v-tabs-content>
                <v-tabs-content class="px-0 py-0" id="Claim Message">
                  <claim-message-tab :data="claim"></claim-message-tab>
                </v-tabs-content>
              </v-tabs-items>
            </v-tabs>
          </v-container>
          <v-layout>
            <v-card-text class="py-0 px-1">
              <v-divider class="mt-2"></v-divider>
              <v-card-actions class="d-block text-xs-center">

                <v-dialog v-model="confirmDialog" max-width="400">
                  <v-card style="height: auto;padding: 10px 5px 0 10px;">
                    <!-- <v-card-title class="headline">Reverse Confirmation</v-card-title> -->
                    <v-card-text>Are you sure want to reverse this Claim?</v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="green darken-1" flat="flat" @click.native="confirmDialog = false">No</v-btn>
                      <v-btn color="green darken-1" flat="flat" @click.native="reverse()">Yes</v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <v-btn class="primary" :disabled="isDisabledReverse" @click.native.stop="confirmDialog = true">Reverse<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
                <v-btn class="primary" @click.native="createPA()" :disabled="isDisabledSave">Create PA<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
                <v-btn @click.native="back()">Close</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-layout>
        </div>
        <div v-else>
          <v-toolbar dark>
            <v-btn icon @click="backToClaim()" dark>
              <v-icon>arrow_back</v-icon>
            </v-btn>
            <v-toolbar-title class="white--text">Add Prior Auth</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <prior-auth-add :claim-data="claim" :usage="isAddPA"></prior-auth-add>
        </div>
      </vodal>
    </v-layout>
  </main>
</template>
<script>
  import Vodal from '../../../../components/common/Vodal.vue'
  import services from '../../../../services/claim/claimServices'
  import memberServices from '../../../../services/member/memberServices'
  import store from '../../../../store'
  import StoreTab from './StoreTab'
  import PlanTab from './PlanTab'
  import RxTab from './RxTab'
  import CompoundTab from './CompoundTab'
  import PlanClaimTab from './PlanClaimTab'
  import OtherMiscTab from './OtherMiscTab'
  import MemberBenefitsTab from './MemberBenefitsTab'
  import HcpcsTab from './HcpcsTab'
  import ClaimMessageTab from './ClaimMessageTab'
  import PriorAuthAdd from '../../PriorAuthorization/PriorAuthAdd'

  import {convertToDollar, convertToPercent} from '../../../../components/utils/Converter'

  const defaultTabs = ['Store Claim', 'Plan Claim','Rx','Compound','Plan','Other Misc','Member Benefits','HCPCS','Claim Message']
  const defaultTabs1 = ['Store Claim', 'Plan Claim','Rx','Plan','Other Misc','Member Benefits','HCPCS','Claim Message']
  import { convertDate } from '../../../../components/utils/DateMethods'
  export default {
    name: 'claim-display-modal',
    props: ['isShow', 'data', 'close', 'reload'],
    data() {
      return {
        width: 1024,
        height: 0,
        claim: {},
        active: 'Store Claim',
        ingradientList: [],
        memberBenefits: [],
        tabs: defaultTabs,
        isDisabledSave: true,
        isDisabledReverse: true,
        loading: false,
        isAddPA: false,
        confirmDialog: false
      }
    },
    components: {
      PriorAuthAdd, ClaimMessageTab,
      HcpcsTab, MemberBenefitsTab, OtherMiscTab, PlanClaimTab, CompoundTab, RxTab, PlanTab, StoreTab, Vodal
    },
    mounted() {
    },
    watch: {
      data: function (v) {
        if(v){
          this.getClaimData(v)
        }
      }
    },
    methods: {
      goToMember: function() {
        const that = this
        if(this.$store.state.memberPlanLists) {
          const data = {
            pcc: that.$store.state.pcn.pcc,
            memberId: that.claim['MemberId'] || that.claim['Member Id'],
            personCode: that.claim['PersonCode'] || that.claim['Person Code'] || '*',
            includeProperties: 'PlanMembers,Allergy,Diagnosis'
          }
          memberServices.getMember(data).then(function (res) {
            if(res) {
              that.$store.commit('UPDATE_SELECTED_PLAN_MEMBER', res.PlanMembers)
              that.$store.commit('UPDATE_SELECTED_MEMBER', res)
              that.$router.push({name: 'member-benefits', params: {mid: that.claim['Member Id']}})
            } else {
              window.Vue.$emit('snackbar', 'warning', 'Can\'t find member information!')
            }
          })
        } else {
          memberServices.getMemberPlanLists({
            search: {
              pcc: this.$store.state.pcn.pcc
            },
            orderBy: 'PlanId',
            includeProperties: '',
          }).then(function (res) {
            store.commit('UPDATE_MEMBER_PLAN_LISTS', res)
            const data = {
              pcc: that.$store.state.pcn.pcc,
              memberId: that.claim['MemberId'] || that.claim['Member Id'],
              personCode: that.claim['PersonCode'] || that.claim['Person Code'] || '*',
              includeProperties: 'PlanMembers,Allergy,Diagnosis'
            }
            memberServices.getMember(data).then(function (res) {
              if(res) {
                that.$store.commit('UPDATE_SELECTED_PLAN_MEMBER', res.PlanMembers)
                that.$store.commit('UPDATE_SELECTED_MEMBER', res)
                that.$router.push({name: 'member-benefits', params: {mid: that.claim['Member Id']}})
              } else {
                window.Vue.$emit('snackbar', 'warning', 'Can\'t find member information!')
              }
            })
          })
        }

      },
      getClaimData(selectedClaim) {
        const id = selectedClaim['ClaimId']
        const {
          pcn: { pcc },
          user: { sessionId, sessionUid },
        } = this.$store.state
        const data = {
          sessionUid,
          sessionId,
          pcc,
          claim_id: id,
          groups: '*'
        }
        const that = this
        services.getByIdClaim(data).then(function (res) {
          const claim = res.claim[0]
          if (claim['Compound Drug Code'] === 2) {
            that.getClaimCompoundIngradientList(claim['Claim Id'])
          }
          that.getMemberBenefitsByPlan(claim)
          const newClaim = Object.assign({}, {...selectedClaim}, {...claim}, {
            "Provider Claim Amt": convertToDollar(claim['Provider Claim Amt'] || '0'),
            'Store Dispense Fee Amt': convertToDollar(claim['Store Dispense Fee Amt'] || '0'),
            'Gross Amt Due Submit': convertToDollar(claim['Gross Amt Due Submit'] || '0'),
            'Other Payor Submit Amt': convertToDollar(claim['Other Payor Submit Amt'] || '0'),
            'Store Ingred Cost Amt': convertToDollar(claim['Store Ingred Cost Amt'] || '0'),
            'Sales Tax Amt': convertToDollar(claim['Sales Tax Amt'] || '0'),
            'Dispense Fee Submit Amt': convertToDollar(claim['Dispense Fee Submit Amt'] || '0'),
            'Store Admin Fee Amt': convertToDollar(claim['Store Admin Fee Amt'] || '0'),
            'Store Claim Amt': convertToDollar(claim['Store Claim Amt'] || '0'),
            'Member Paid Amt': convertToDollar(claim['Member Paid Amt'] || '0'),
            'Member Copay Amt': convertToDollar(claim['Member Copay Amt'] || '0'),
            'Deductible Amt': convertToDollar(claim['Deductible Amt'] || '0'),
            'Store Unit Price Amt': convertToDollar(claim['Store Unit Price Amt'] || '0'),
            'Store Price Disc Pct': convertToPercent(claim['Store Price Disc Pct'] || '0'),
            'Plan Dispense Fee Amt': convertToDollar(claim['Plan Dispense Fee Amt'] || '0'),
            'Plan Ingred Cost Amt': convertToDollar(claim['Plan Ingred Cost Amt'] || '0'),
            'Plan Claim Amt': convertToDollar(claim['Plan Claim Amt'] || '0'),
            'Plan Admin Fee Amt': convertToDollar(claim['Plan Admin Fee Amt'] || '0'),
            'Plan Price Disc Pct': convertToPercent(claim['Plan Price Disc Pct'] || '0'),
            'Plan Unit Price Amt': convertToDollar(claim['Plan Unit Price Amt'] || '0'),
            'Authorization Required Amt': convertToDollar(claim['Authorization Required Amt'] || '0'),
            'Agent Commission Amt': convertToDollar(claim['Agent Commission Amt'] || '0'),
            'Allow Refill Pct': convertToPercent(claim['Allow Refill Pct'] || '0'),
            'Script Fill Date': convertDate(claim['Script Fill Date']),
            'Max Qty Dispensable': claim['Max Qty Dispensable'] || '0',
            'Max Rx Fill Count': claim['Max Rx Fill Count'] || '0',
            'Max Rx Fill Days Count': claim['Max Rx Fill Days Count'] || '0',
            'Max Days Supply': claim['Max Days Supply'] || '0',
            'DOB 9B': claim['DOB 9B'] == "mm/dd/yyyy" ? '0' : '0',
            'DOB 11A': claim['DOB 11A'] == "mm/dd/yyyy" ? '0' : '0',
            'Gender 11A': claim['Gender 11A'] || 'U',
            'Gender 9B': claim['Gender 9B'] || 'U',
            'DoctorId': selectedClaim['DoctorId']
          })
          that.claim = newClaim
          that.isDisabledReverse = claim['Claim Type Code'] == 'PD' ? false : true
          that.isDisabledSave = claim['Claim Type Code'] == 'RJ' ? false : true
          that.tabs = claim['Compound Drug Code'] === 2 ? defaultTabs : defaultTabs1
        }).catch(function(err) {
//          that.back()
        })
      },
      getClaimCompoundIngradientList(claimId){
        const that = this
        services.getClaimCompoundIngredientList({ claim_id: claimId }).then(function (res) {
          that.ingradientList = res['compound_ingredient_list']
        })
      },
      getMemberBenefitsByPlan(claim){
        const data = {
          pcc: store.state.pcn.pcc,
          plan_id: claim['Plan Id'],
          group_id: claim['Group Id'],
          member_id: claim['Member Id'],
          person_cd: claim['Person Code'],
          benefit_period: (new Date()).getFullYear().toString(),
        }
        const that = this
        services.getMemberBenefitsByPlan(data).then(function (res) {
          that.memberBenefits = res['member_benefits']
        })
      },
      back () {
        this.active = 'Store Claim'
        this.close()
      },
      createPA () {
        this.isAddPA = true
      },
      reverse () {
        const that = this
        that.confirmDialog = false
        if(this.claim['Claim Id']) {
          const claimMsg = `<claim_reversal><pid>${this.claim['PID']}</pid><provider_id>${this.claim['Provider ID']}</provider_id><member_id>${this.claim['Member Id']}</member_id><person_cd>${this.claim['Person Code']}</person_cd>`
          + "<" + "script_" + "id" + ">" + this.claim['Script Id'] + "<" + "/script" + "_" + "id>" + "<" +
            "script_fill_dt" + ">" + this.claim['Script Fill Date'] + "<" + "/" + "script" + "_fill_dt" + ">" +
            "<ndc>" + this.claim['NDC'] + "</ndc><uid>" + this.$store.state.user.session_uid + "</uid>" + "<" + "/" + "claim_reversal" + ">"

          const data = {
            claim_id: this.claim['Claim Id'].toString(),
            claim_msg: claimMsg,
          }
          services.postClaimReversal(data).then(function (res) {
            that.active = 'Store Claim'
            that.reload()
          })
        }
      },
      backToClaim() {
        this.isAddPA = false
      }
    }
  }
</script>
<style lang="stylus">
  .claim-details-container .input-group input:disabled {
    color: rgba(0,0,0,.65);
  }
  .claim-details-container .input-group:not(.input-group--error).input-group--disabled label {
    color: rgba(0,0,0,.45);
  }
</style>
