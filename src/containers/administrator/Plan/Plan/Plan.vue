<template>
  <v-form ref="form">
    <v-container fluid class="my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs6>
          <v-text-field label="Plan Id" v-model="info.plan_id" :rules="[rules.required]"
                        required :disabled="type !== 'add'"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-card-text class="py-0">
            <v-radio-group row v-model="info.status_cd">
              <v-radio value="A" label="Active" light></v-radio>
              <v-radio value="I" label="Inactive" light></v-radio>
            </v-radio-group>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs12>
          <v-select
            v-bind:items="items"
            v-model="info.plan_type_cd"
            label="Select a Plan Type"
            item-text="plan_type_desc_txt"
            item-value="plan_type_cd"
            returnObject
            bottom
            :rules="[rules.required]"
            required
          >
          </v-select>
          <v-text-field
            label="Plan Desc"
            v-model="info.plan_desc_txt"
            :rules="[rules.required]"
            required
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs3>
                  <date-picker
                    v-model="info.contract_dt"
                    label="Contract Date"
                  ></date-picker>
                </v-flex>
                <v-flex xs3>
                  <date-picker
                    v-model="info.effect_start_dt"
                    label="Plan Start Date"
                  ></date-picker>
                </v-flex>
                <v-flex xs3>
                  <v-checkbox class="pt-3" label="Plan has an end date?" v-model="isEndDate"
                              color="primary-color"></v-checkbox>
                </v-flex>
                <v-flex xs3>
                  <date-picker
                    v-if="isEndDate === true"
                    v-model="info.effect_end_dt"
                    label="Plan End Date"
                  ></date-picker>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs9>
          <v-radio-group v-model="isRadio" row>
            <v-radio label="Open Membership" value="0"></v-radio>
            <v-radio label="Closed Enrollment" value="1"></v-radio>
            <v-radio label="Open Enrollment" value="2"></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs3>
          <v-checkbox class="pt-3" label="24 Hours" v-model="info.open_enrollment_cd" v-if="isRadio === '2'"
                      color="primary-color" true-value="01" false-value="null"></v-checkbox>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md4>
          <v-checkbox label="Open Provider" v-model="info.open_provider_flg"
                      color="primary-color" true-value="T" false-value="F"></v-checkbox>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-checkbox label="Open Prescriber" v-model="info.open_prescriber_flg"
                      color="primary-color" true-value="T" false-value="F"></v-checkbox>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-checkbox label="Uses External Prior Authorization" v-model="info.external_pa_ind"
                      color="primary-color" true-value="Y" false-value="N"></v-checkbox>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-checkbox label="Person Code Lookup" v-model="info.person_cd_lookup_ind"
                      color="primary-color" true-value="Y" false-value="N"></v-checkbox>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-checkbox label="Warn If Off The Rebatable Drug List" v-model="info.off_pdl_warning_flg"
                      color="primary-color" true-value="T" false-value="F"></v-checkbox>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-checkbox label="Track Member Benefits" v-model="info.track_benefits_flg"
                      color="primary-color" true-value="T" false-value="F"></v-checkbox>
        </v-flex>
        <v-flex xs12 sm6 md4>
          <v-checkbox label="Allow Repackaged NDCs" v-model="info.allow_repacks_flg"
                      color="primary-color" true-value="T" false-value="F"></v-checkbox>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md6>
          <v-card-text class="py-0">
            <v-text-field label="Max # Days To File Claim" v-model="info.max_claim_file_day_cnt" type="number"
                          :rules="[rules.required,rules.claimRules,]" :counter="4"></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-card-text class="py-0">
            <v-text-field label="Max Scripts Covered" v-model="info.max_refills_covered_cnt" type="number"
                          :rules="[rules.claimRules, rules.required]" :counter="4"></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-card-text class="py-0">
            <v-text-field label="Member ID Prefix" v-model="info.member_id_prefix"
            ></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-card-text class="py-0">
            <v-text-field label="Per Diem" v-model="info.per_diem_amt" :disabled="true" prefix="$"></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-card-text class="py-0">
            <v-text-field label="Allow Narcotic Refill When" v-model="info.narcotic_refill_pct" type="number"
                          suffix="% Consumed" :rules="[rules.prefixRules]" :counter="2"></v-text-field>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 md6>
          <v-card-text class="py-0">
            <v-select
              v-bind:items="benefit_lists"
              v-model="info.benefit_tier"
              label="Benefit Sharing"
              item-text="desc_txt"
              item-value="field_value"
              bottom
            ></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs12 sm6 md6>
          <v-card-text class="py-0">
            <v-select
              v-bind:items="member_card_lists"
              v-model="info.member_card_report_id"
              label="Member Card"
              item-text="report_desc"
              item-value="report_id"
              bottom
            ></v-select>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
    <template v-if="type !== 'add'">
      <v-divider class="mt-2"></v-divider>
      <v-flex xs12>
        <small class="red--text">*indicates required field</small>
      </v-flex>
      <v-card-actions>
        <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update<i v-if="loading"
                                                                                        class="fa fa-circle-o-notch fa-spin fa-fw"></i>
        </v-btn>
      </v-card-actions>
    </template>
  </v-form>
</template>
<script>
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'
  import {convertStringDate, pickerFormat} from '../../../../components/utils/DateMethods'
  import DatePicker from "../../../../components/common/DatePicker.vue";

  export default {
    name: 'plan',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedPlan || {},
        isEndDate: false,
        isRadio: 0,
        plan_type_cd: '',
        menu: null,
        startMenu: null,
        endMenu: null,
        items: [],
        isDisabledSave: true,
        benefit_lists: [],
        member_card_lists: [],
        rules: {
          required: (value) => !!value || 'Required.',
          gqTMin: (v) => {
            return v >= this.info.min_qty || 'Should be more than Min Quantities Value'
          },
          prefixRules: (v) => v <= 100 || 'This Limit must be less more than 100 %.',
          dayRules: (v) => v <= 999 || 'Day Limit must be less more than 999.',
          claimRules: (v) => v <= 9999 || 'This field Limit must be less more than 9999.',
          ageRules: (v) => v <= 999 || 'Age Limit must be less more than 999.',
          qtyRules: (v) => v <= 99999 || 'Quantity Limit must be less more than 99999.',
        },
        loading: false,
        isSet: false
      }
    },
    components: {DatePicker},
    watch: {
      '$store.state.selectedPlan': function (val) {
        if (val && this.type !== 'add') {
          this.info = val
          this.setValues()
        }
      },
      '$store.state.planSetupData': function (val) {
        if (val) {
          this.items = val.plan_type_data
          this.benefit_lists = [...this.$store.state.planSetupData.plan_benefit_tier_syscode]
          this.benefit_lists.forEach(function (d) {
            d.field_value = Number(d.field_value)
          })
          this.member_card_lists = [...this.$store.state.planSetupData.member_card_report_list]
          this.member_card_lists.unshift({report_id: -1, report_desc: 'Please Select...'})
          if (this.type === 'add') {
            this.info.member_card_report_id = -1
          }
        }
      },
      info: {
        handler: function (newData, oldData) {
          if (Object.keys(oldData).length < 3) return true
          if (newData && oldData && newData === oldData && this.type !== 'add') {
            this.isDisabledSave = false
            store.commit('UPDATE_STATUS', false)
          }
        }, deep: true
      },
      data: {
        handler: function () {
          if (this.data) {
            this.info = this.data
            this.setValues()
            this.isSet = false
          }
        }, deep: true
      },
      isRadio(val) {
        if (this.isSet) {
          this.isSet = false
          return true
        }
        if (val === '0') {
          this.info.open_member = 'T'
        } else if (val === '1') {
          if (this.type !== 'add')
            this.info.open_enrollment_flg = ''
          this.info.open_enrollment_flg = 'F'
        } else {
          this.info.open_enrollment_flg = 'T'
        }
      },
      plan_type_cd: function (val) {
        this.info.plan_type_cd = val.plan_type_cd
        this.info.plan_type_desc_txt = val.plan_type_desc_txt
      },
      isEndDate: function (v) {
        if (this.isSet) {
          this.isSet = false
          return true
        }

        if (v === false && this.isSet === false && this.type === 'add') {

        } else {
          this.isDisabledSave = false
          store.commit('UPDATE_STATUS', false)
        }
      }
    },
    mounted() {
      console.log('----- Administrator / Plan / Plan mounted -----')
      this.$refs.form.validate()
      this.isDisabledSave = this.$store.state.isUpdateStatus
    }
    ,
    methods: {
      convertDate: pickerFormat,
      convertStringDate:
      convertStringDate,
      setValues() {
        if (this.info.effect_end_dt === '12/31/9998' || this.info.effect_end_dt === '12/31/9997') this.isEndDate = false
        else this.isEndDate = true
        if (this.info.open_member === 'T') {
          this.isRadio = '0'
        } else if (this.info.open_enrollment_flg === 'T') {
          this.isRadio = '2'
        } else {
          this.isRadio = '1'
        }

        this.plan_type_cd = {
          plan_type_cd: this.info.plan_type_cd,
          plan_type_desc_txt: this.info.plan_type_desc_txt
        }

        this.benefit_lists = []
        this.member_card_lists = []
        if (this.$store.state.planSetupData) {
          this.items = this.$store.state.planSetupData.plan_type_data
          this.benefit_lists = [...this.$store.state.planSetupData.plan_benefit_tier_syscode]
          this.member_card_lists = [...this.$store.state.planSetupData.member_card_report_list]
          this.member_card_lists.unshift({report_id: -1, report_desc: 'Please Select...'})
        }
        if (this.info.benefit_tier) this.benefit_tier = (this.info.benefit_tier).toString()
        this.isSet = true
      },
      save() {
        const that = this
        if (that.$refs.form.validate()) {
          if (this.info.plan_id === ''
            || this.info.plan_type_cd === ''
            || this.info.plan_desc_txt === ''
            || this.info.effect_start_dt === ''
            || this.info.max_claim_file_day_cnt === ''
            || this.info.max_refills_covered_cnt === ''
          ) {
            this.$refs.form.validate()
          } else if (this.info.compound_covered_ind === 'Y'
            && this.info.compound_use_group_mac_ind === 'N'
            && this.info.compound_use_pricing_params_ind === 'N'
            && this.info.compound_use_lower_uc_ind === 'N'
            && this.info.compound_use_lower_gad_ind === 'N') {
            this.$router.push({path: 'compound'})
          } else if (this.info.daw_cd === '') {
            this.$router.push({path: 'daw_codes'})
          } else {
            that.loading = true
            planServices.updatePlan(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
              if (res === "0") {
                that.loading = false
                that.isDisabledSave = true
                store.commit('UPDATE_STATUS', true)
                window.Vue.$emit('snackbar', 'success', 'Plan Data Saved!')
                store.commit('UPDATE_SELECTED_PLAN', that.info)
              } else {
                window.Vue.$emit('snackbar', 'warning', res)
              }
            })
          }
        }
      }
      ,
      clear: function () {
        const that = this
        const data = {
          session_uid: this.$store.state.user.session_uid,
          session_id: this.$store.state.user.session_id,
          pcc: this.$store.state.pcn.pcc,
          group_cd: this.$store.state.selectedPlanData.group_cd,
          plan_id: this.$store.state.selectedPlanData.plan_id
        }
        planServices.getPlan(data).then(function (res) {
          let data = res.plan_data[0]
          if (data.base_formulary) data.base_formulary = data.base_formulary.replace(/\s/g, '')
          store.commit('UPDATE_SELECTED_PLAN', data)
          that.info = that.$store.state.selectedPlan
          that.setValues()
        })

        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      }
    }
  }
</script>
<style lang="stylus">
</style>
