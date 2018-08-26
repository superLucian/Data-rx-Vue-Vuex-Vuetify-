<template>
  <main>
    <v-container fluid class="pb-0">
      <v-layout row wrap>
        <v-flex xs12>
          <p>DAW Codes Accepted</p>
          <v-divider></v-divider>
          <v-card-text class="py-0">
            <v-layout row wrap>
              <v-flex xs12>
                <small class="red--text" v-if="isError">
                  *Please select at least one in the "DAW Codes"
                </small>
                <v-card-text>
                  <v-checkbox label="(0) - No Product Selection Indicated" v-model="check0"
                              color="primary-color" true-value="0" false-value="" hide-details></v-checkbox>
                  <v-checkbox label="(1) - Substitution Not Allowed by Prescriber" v-model="check1"
                              color="primary-color" true-value="1" false-value="" hide-details></v-checkbox>
                  <v-checkbox label="(2) - Patient Requested Product Dispensed" v-model="check2"
                              color="primary-color" true-value="2" false-value="" hide-details></v-checkbox>
                  <v-checkbox label="(3) - Pharmacist Selected Product Dispensed" v-model="check3"
                              color="primary-color" true-value="3" false-value="" hide-details></v-checkbox>
                  <v-checkbox label="(4) - Generic Drug Not in Stock" v-model="check4"
                              color="primary-color" true-value="4" false-value="" hide-details></v-checkbox>
                  <v-checkbox label="(5) - Brand Drug Dispensed as a Generic" v-model="check5"
                              color="primary-color" true-value="5" false-value="" hide-details></v-checkbox>
                  <v-checkbox label="(6) - Override" v-model="check6"
                              color="primary-color" true-value="6" false-value="" hide-details></v-checkbox>
                  <v-checkbox label="(7) - Brand Drug Mandated by Law" v-model="check7"
                              color="primary-color" true-value="7" false-value="" hide-details></v-checkbox>
                  <v-checkbox label="(8) - Generic Drug Not Available in Marketplace"
                              v-model="check8" color="primary-color" true-value="8" false-value="" hide-details></v-checkbox>
                  <v-checkbox label="(9) - Other" v-model="check9" color="primary-color" true-value="9" false-value=""
                              hide-details></v-checkbox>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs6>
          <v-card-text class="px-0 pb-0 pt-4">
            <v-checkbox label="Patient Pays difference between brand and generic" v-model="info.member_pay_cd"
                        color="primary-color" true-value="Y" false-value="N"></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs6>
          <v-card-text class="pb-0">
            <v-select
              v-bind:items="items"
              v-model="reimbursement_cd"
              label="Provider Reimbursement:"
              item-text="reimbursement_desc_txt"
              item-value="reimbursement_cd"
              returnObject
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
  </main>
</template>
<script>
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'

  export default {
    name: 'plan-daw-codes',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedPlan,
        check0: '',
        check1: '',
        check2: '',
        check3: '',
        check4: '',
        check5: '',
        check6: '',
        check7: '',
        check8: '',
        check9: '',
        isError: true,
        reimbursement_cd: {},
        items: this.$store.state.planSetupData.reimbursement_data,
        isDisabledSave: true,
        loading: false,
        rules: {
          required: (value) => !!value || 'Required.',
        }
      }
    },
    components: {},
    computed: {
      values: function () {
        return this.check0 + this.check1 + this.check2 + this.check3 + this.check4 + this.check5 + this.check6 + this.check7 + this.check8 + this.check9
      }
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData && this.type !== 'add') {
            this.isDisabledSave = false
            store.commit('UPDATE_STATUS', false)
          }
        },
        deep: true
      },
      data: {
        handler: function () {
          if (this.data) {
            this.info = this.data
            this.setValues()
          }
        }, deep: true
      },
      values: function (val) {
        if (this.type === 'add') {
          this.info.daw_cd = this.check0 + this.check1 + this.check2 + this.check3 + this.check4 + this.check5 + this.check6 + this.check7 + this.check8 + this.check9
        } else {
          if (val !== this.$store.state.selectedPlan.daw_cd) {
            this.info.daw_cd = this.check0 + this.check1 + this.check2 + this.check3 + this.check4 + this.check5 + this.check6 + this.check7 + this.check8 + this.check9
            this.isDisabledSave = false
            if (val === '') {
              this.isError = true
            } else {
              this.isError = false
            }
          }
        }
      },
      reimbursement_cd: function (val) {
        this.info.reimbursement_cd = val.reimbursement_cd
        this.info.reimbursement_desc_txt = val.reimbursement_desc_txt
      }
    },
    mounted() {
      console.log('----- Administrator / Plan / DAW Codes mounted -----')
      this.isDisabledSave = this.$store.state.isUpdateStatus
      this.setValues()
    }
    ,
    methods: {
      setValues() {
        this.check0 = ''
        this.check1 = ''
        this.check2 = ''
        this.check3 = ''
        this.check4 = ''
        this.check5 = ''
        this.check6 = ''
        this.check7 = ''
        this.check8 = ''
        this.check9 = ''

        const that = this
        const checks = this.info.daw_cd.split('')
        checks.forEach(function (d) {
          if (d === '0') that.check0 = d
          else if (d === '1') that.check1 = d
          else if (d === '2') that.check2 = d
          else if (d === '3') that.check3 = d
          else if (d === '4') that.check4 = d
          else if (d === '5') that.check5 = d
          else if (d === '6') that.check6 = d
          else if (d === '7') that.check7 = d
          else if (d === '8') that.check8 = d
          else if (d === '9') that.check9 = d
        })

        this.reimbursement_cd = {
          reimbursement_cd: this.info.reimbursement_cd,
          reimbursement_desc_txt: this.info.reimbursement_desc_txt
        }

        if (this.info.daw_cd === '') {
          this.isError = true
        } else {
          this.isError = false
        }
      },
      save() {
        const that = this
        if (this.info.daw_cd === '') {

        } else if (this.info.plan_id === ''
          || this.info.plan_type_cd === ''
          || this.info.plan_desc_txt === ''
          || this.info.effect_start_dt === ''
          || this.info.max_claim_file_day_cnt === ''
          || this.info.max_refills_covered_cnt === ''
        ) {
          this.$router.push({path: 'plan'})
        } else if (this.info.compound_covered_ind === 'Y'
          && this.info.compound_use_group_mac_ind === 'N'
          && this.info.compound_use_pricing_params_ind === 'N'
          && this.info.compound_use_lower_uc_ind === 'N'
          && this.info.compound_use_lower_gad_ind === 'N') {
          this.$router.push({path: 'compound'})
        } else {
          planServices.updatePlan(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
            that.loading = true
            if (res === "0") {
              that.loading = false
              that.isDisabledSave = true
              store.commit('UPDATE_STATUS', true)
              window.Vue.$emit('snackbar', 'success', 'Plan DAW Codes Saved!')
              store.commit('UPDATE_SELECTED_PLAN', that.info)
            } else {
              that.loading = false
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      clear: function () {
        const that = this
        const data = {
          session_uid: this.$store.state.user.session_uid,
          session_id: this.$store.state.user.session_id,
          pcc: this.$store.state.pcn.pcc,
          group_cd: this.$store.state.selectedPlan.group_cd,
          plan_id: this.$store.state.selectedPlan.plan_id
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
