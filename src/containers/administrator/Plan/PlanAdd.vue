<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add Plan / {{convertString(active)}} </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-container fluid>
      <v-layout row wrap>
        <v-tabs v-model="active">
          <v-tabs-bar class="transparent">
            <v-tabs-slider class="active-line"></v-tabs-slider>
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab.name"
              :href="tab.path"
              ripple
            >
              {{ tab.name }}
            </v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content key="Plan" id="plan">
              <plan type="add" :data="info"></plan>
            </v-tabs-content>
            <v-tabs-content key="compound" id="compound">
              <plan-compound type="add" :data="info"></plan-compound>
            </v-tabs-content>
            <v-tabs-content key="plan_parameters" id="plan_parameters">
              <plan-parameters type="add" :data="info"></plan-parameters>
            </v-tabs-content>
            <v-tabs-content key="daw_codes" id="daw_codes">
              <plan-daw-codes type="add" :data="info"></plan-daw-codes>
            </v-tabs-content>
            <v-tabs-content key="plan_drugs" id="plan_drugs">
              <plan-drug type="add" :data="info"></plan-drug>
            </v-tabs-content>
            <v-tabs-content key="required_fields" id="required_fields">
              <plan-required-fields type="add" :data="info"></plan-required-fields>
            </v-tabs-content>
            <v-tabs-content key="support" id="support">
              <plan-support type="add" :data="info"></plan-support>
            </v-tabs-content>
            <v-tabs-content key="comments" id="comments">
              <plan-comments type="add" :data="info"></plan-comments>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
        <v-layout>
          <v-card-text class="py-0 px-1">
            <v-divider class="mt-2"></v-divider>
            <small class="red--text">*indicates required field</small>
            <v-card-actions>
              <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
              <v-spacer></v-spacer>
              <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">create</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-layout>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
  import planServices from '../../../services/plan/planServices'
  import store from '../../../store'
  import Plan from './Plan/Plan.vue'
  import PlanCompound from './Compound/Compound.vue'
  import PlanParameters from "./PlanParameters/PlanParameters.vue";
  import PlanDawCodes from "./DawCodes/DawCodes.vue";
  import PlanDrug from "./PlanDrugs/PlanDrugs.vue";
  import PlanRequiredFields from "./RequiredFields/RequiredFields.vue";
  import PlanSupport from "./Support/Support.vue";
  import PlanComments from "./Comments/Comments.vue";

  export default {
    name: 'Plan-add',
    data() {
      return {
        tabs: [{
          name: 'Plan',
          path: 'plan'
        }, {
          name: 'compound',
          path: 'compound'
        }, {
          name: 'Plan parameters',
          path: 'plan_parameters'
        }, {
          name: 'DAW Codes',
          path: 'daw_codes'
        }, {
          name: 'Plan Drugs',
          path: 'plan_drugs'
        }, {
          name: 'Required Fields/Fields Edits',
          path: 'required_fields'
        }, {
          name: 'Support',
          path: 'support'
        }, {
          name: 'Comments',
          path: 'comments'
        }
        ],
        active: 'plan',
        info: {},
        isDisabledSave: true,
      }
    },
    components: {
      PlanComments,
      PlanSupport,
      PlanRequiredFields,
      PlanDrug,
      PlanDawCodes,
      PlanParameters,
      PlanCompound,
      Plan
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        }, deep: true
      },
      '$store.state.isUpdateStatus': function (v) {
        this.isDisabledSave = v
      }
    },
    mounted() {
      console.log('----- Administrator / Plan Add mounted -----')
      this.info = {...this.$store.state.selectedPlan}
    },
    methods: {
      convertString: function (text) {
        if (text) return text.replace(/_/g, ' ')
        else return ''
      },
      back: function () {
        store.commit('UPDATE_STATUS', true)
        store.commit('CLEAR', 'selectedPlan')
        store.commit('CLEAR', 'planSetupData')
        this.$router.push({name: 'Plan'})
      },
      save: function () {
        const that = this
        if (this.info.plan_id === ''
          || this.info.plan_type_cd === ''
          || this.info.plan_desc_txt === ''
          || this.info.effect_start_dt === ''
          || this.info.max_claim_file_day_cnt === ''
          || this.info.max_refills_covered_cnt === ''
        ) {
          this.active = 'plan'
        } else if (this.info.compound_covered_ind === 'Y'
          && this.info.compound_use_group_mac_ind === 'N'
          && this.info.compound_use_pricing_params_ind === 'N'
          && this.info.compound_use_lower_uc_ind === 'N'
          && this.info.compound_use_lower_gad_ind === 'N') {
          this.active = 'compound'
        } else if (this.info.daw_cd === '') {
          this.active = 'daw_codes'
        } else {
          planServices.addPlan(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
            if (res === "0") {
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'Plan Add!')
              store.commit('CLEAR', 'selectedPlan')
              store.commit('CLEAR', 'planSetupData')
              that.$router.push({name: 'Plan'})
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          }).catch(function () {
            window.Vue.$emit('snackbar', 'error', 'Error!')
          })
        }
      },
      clear: function () {
        this.info = {
          group_id: this.$store.state.selectedPlan.group_id,
          plan_id: '',
          plan_desc_txt: '',
          plan_type_cd: '2',
          plan_type_desc_txt: '',
          effect_start_dt: (new Date()).toLocaleDateString(),
          effect_end_dt: '12/31/9998',
          contract_dt: (new Date()).toLocaleDateString(),
          status_cd: 'A',
          open_member: 'F',
          open_enrollment_flg: 'F',
          open_enrollment_cd: null,
          open_prescriber_flg: 'T',
          open_provider_flg: 'F',
          external_pa_ind: 'N',
          person_cd_lookup_ind: 'N',
          off_pdl_warning_flg: 'F',
          track_benefits_flg: 'T',
          allow_repacks_flg: 'F',
          max_claim_file_day_cnt: 30,
          max_refills_covered_cnt: 9999,
          member_id_prefix: '',
          narcotic_refill_pct: '',
          benefit_tier: '1',
          compound_covered_ind: 'Y',
          compound_dispense_fee_amt: 0,
          compound_max_amt: 0,
          compound_copay_type_cd: 'N',
          compound_use_group_mac_ind: 'N',
          compound_use_lower_uc_ind: 'Y',
          compound_use_lower_gad_ind: 'N',
          compound_use_pricing_params_ind: 'N',
          compound_copay_amt: 0,
          compound_copay_pct: 0,
          compound_copay_tier: 0,
          use_lower_of_logic_flg: 'F',
          uc_lower_ingred_cost_ind: 'N',
          uc_lower_awp_disc_ind: 'N',
          uc_lower_generic_awp_disc_ind: 'N',
          uc_lower_mac_disc_ind: 'N',
          uc_lower_uc_ind: 'Y',
          uc_lower_gad_ind: 'N',
          dependent_age_restrict_ind: 'N',
          student_age_limit: '',
          nonstudent_age_limit: '',
          disabled_age_limit: '',
          dep_adult_age_limit: '',
          copay_type_cd: 'N',
          fixed_copay_pct: 0,
          max_family_deduct_amt: 0,
          max_member_deduct_amt: 0,
          max_family_claim_amt: 0,
          max_member_claim_amt: 0,
          max_family_oop_amt: 0,
          max_member_oop_amt: 0,
          mandatory_mail_ind: 'N',
          retail_script_cnt_limit: '',
          retail_script_cnt_term_cd: '-1',
          script_cnt_limit: '',
          script_cnt_term_cd: '-1',
          transparency_flg: 'T',
          delta_cap_pct: '',
          delta_cap_diff: '',
          delta_cap_min: '',
          rebate_level_1: 'CASH',
          rebate_copay_diff_flg: null,
          rebate_level_3: '',
          prebate_flg: 'F',
          daw_cd: '',
          member_pay_cd: 'N',
          reimbursement_cd: 'X',
          off_form_action: 'R',
          base_formulary: null,
          formulary_mgr: null,
          open_formulary: 'T',
          generic_required: 'N',
          required_fields: '',
          field_edits: '',
          support_uid: this.$store.state.planSetupData.sysuser_data[0].uid,
          comment_txt: '',
          member_card_report_id: -1,
          rollover_period_cd: 'X',
          rollover_period_desc_txt: 'Not applicable',
          use_senior_disc_flg: 'F',
          use_group_mpp_ind: 'N'
        }

        store.commit('UPDATE_SELECTED_PLAN', this.info)
        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      }
    }
  }
</script>
<style lang="stylus">

</style>
