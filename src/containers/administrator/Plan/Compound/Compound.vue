<template>
  <v-form ref="form">
    <main>
      <v-container fluid class="my-sub-scroll-enabled">
        <v-layout row wrap>
          <v-flex xs12>
            <v-checkbox label="Allow Compounds" v-model="info.compound_covered_ind"
                        color="primary-color" true-value="Y" false-value="N"></v-checkbox>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-card-text>
                    <v-text-field
                      label="Dispensing Fee:"
                      hint="'Dispensing Fee' is less than 999999.99 !"
                      v-model="info.compound_dispense_fee_amt"
                      prefix="$"
                      type="Number"
                      :disabled="checked"
                      :rules="[rules.required, rules.feeRules]"
                    ></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-card-text>
                    <v-text-field
                      label="Max Compound Amt:"
                      hint="'Max Compound Amt' is less than 999999.99 !"
                      v-model="info.compound_max_amt"
                      prefix="$"
                      type="Number"
                      :disabled="checked"
                      :rules="[rules.required, rules.feeRules]"
                    ></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex xs6 sm6>
                  <v-card-text>
                    <v-select
                      v-bind:items="copay_type_cd_list"
                      v-model="info.compound_copay_type_cd"
                      label="Copay/Coinsurance:"
                      item-text="desc_txt"
                      item-value="field_value"
                      bottom
                      :disabled="checked"
                    ></v-select>
                  </v-card-text>
                </v-flex>
                <v-flex xs6 sm6>
                  <v-card-text>
                    <v-select
                      v-if="info.compound_copay_type_cd == 'T' "
                      v-bind:items="copay_list"
                      v-model="info.compound_copay_tier"
                      label="Copay Tier:"
                      item-text="desc_num"
                      item-value="field_value"
                      bottom
                      :disabled="checked">
                    </v-select>
                    <v-text-field
                      v-if="info.compound_copay_type_cd == 'F'"
                      label="Copay Amount:"
                      v-model="info.compound_copay_pct"
                      prefix="%"
                      type="Number"
                      :disabled="checked"
                      :rules="[rules.coinRules]"
                      :counter="2"
                    ></v-text-field>
                    <v-text-field
                      v-if="info.compound_copay_type_cd == 'D'"
                      label="Copay Amount:"
                      v-model="info.compound_copay_amt"
                      prefix="$"
                      type="Number"
                      :disabled="checked"
                      :rules="[rules.feeRules]"
                      :counter="6"
                    ></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card-text>
                    <p>Calculate Ingred Cost By</p>
                    <v-divider></v-divider>
                    <v-checkbox label="Apply MAC on Ingredients" v-model="info.compound_use_group_mac_ind"
                                color="primary-color" true-value="Y" false-value="N" :disabled="checked"></v-checkbox>
                    <v-checkbox label="Use Plan Pricing Params" v-model="info.compound_use_pricing_params_ind"
                                color="primary-color" true-value="Y" false-value="N" :disabled="checked"></v-checkbox>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 sm6>
                  <v-card-text>
                    <p>Compare Totals to</p>
                    <v-divider></v-divider>
                    <v-checkbox label="Usual and Customary" v-model="info.compound_use_lower_uc_ind"
                                color="primary-color" true-value="Y" false-value="N" :disabled="checked"></v-checkbox>
                    <v-checkbox label="Gross Amount Due" v-model="info.compound_use_lower_gad_ind"
                                color="primary-color" true-value="Y" false-value="N" :disabled="checked"></v-checkbox>
                  </v-card-text>
                </v-flex>
                <small class="red--text" v-if="isError">
                  *Please select at least one in the "Calculate Ingred Cost By" or "Compare Totals to"
                </small>
              </v-layout>
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
  </v-form>

</template>
<script>
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'

  export default {
    name: 'plan-compound',
    props: ['type', 'data'],
    data() {
      return {
        info: {...this.$store.state.selectedPlan},
        checked: this.$store.state.selectedPlan.compound_covered_ind === 'N',
        copay_type_cd_list: this.$store.state.planSetupData.compound_syscode,
        snackbar: false,
        isDisabledSave: true,
        isError: true,
        rules: {
          required: (value) => !!value || 'Required.',
          feeRules: (v) => v < 1000000 || 'This Limit must be less more than 999999.',
          coinRules: (v) => v < 100 || 'Coinsurance Limit must be less more than 100%',
        },
        copay_list: [
          {desc_num: 'Not Application', field_value: -1},
          {desc_num: '0', field_value: 0},
          {desc_num: '1', field_value: 1},
          {desc_num: '2', field_value: 2},
          {desc_num: '3', field_value: 3},
          {desc_num: '4', field_value: 4},
          {desc_num: '5', field_value: 5},
          {desc_num: '6', field_value: 6},
          {desc_num: '7', field_value: 7},
          {desc_num: '8', field_value: 8},
          {desc_num: '9', field_value: 9}
        ],
        loading: false
      }
    },
    components: {},
    computed: {
      error: function () {
        return (this.info.compound_use_group_mac_ind === 'Y'
          || this.info.compound_use_pricing_params_ind === 'Y'
          || this.info.compound_use_lower_uc_ind === 'Y'
          || this.info.compound_use_lower_gad_ind === 'Y')
      }
    },
    watch: {
      error: function (val) {
        if (val && this.info.compound_covered_ind) {
          this.isError = false
        } else
          this.isError = true
      },
      'info.compound_covered_ind': function (val) {
        if (val === 'Y') {
          this.checked = false
          if (!this.error)
            this.isError = true
        }
        else {
          this.checked = true
          this.isError = false
        }
      },
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
          }
        }, deep: true
      }
    },
    mounted() {
      console.log('----- Administrator / Plan / Plan-Compound mounted -----')
      this.setValues()
      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      setValues: function () {
        if (this.info.compound_covered_ind === 'Y') {
          if (!this.error) this.isError = true
          else this.isError = false
        } else {
          this.isError = false
        }
        this.info = Object.assign({}, {...this.info}, {
          compound_max_amt: parseFloat(this.info.compound_max_amt).toFixed(2),
          compound_dispense_fee_amt: parseFloat(this.info.compound_dispense_fee_amt).toFixed(2)
        })
        store.commit('UPDATE_SELECTED_PLAN', this.info)
      },
      save() {
        const that = this
        if (that.$refs.form.validate()) {
          if (this.info.compound_covered_ind === 'Y'
            && this.info.compound_use_group_mac_ind === 'N'
            && this.info.compound_use_pricing_params_ind === 'N'
            && this.info.compound_use_lower_uc_ind === 'N'
            && this.info.compound_use_lower_gad_ind === 'N') {

          } else if (this.info.plan_id === ''
            || this.info.plan_type_cd === ''
            || this.info.plan_desc_txt === ''
            || this.info.effect_start_dt === ''
            || this.info.max_claim_file_day_cnt === ''
            || this.info.max_refills_covered_cnt === ''
          ) {
            this.$router.push({path: 'plan'})
          } else if (this.info.daw_cd === '') {
            this.$router.push({path: 'daw_codes'})
          } else {
            planServices.updatePlan(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
              that.loading = true
              if (res === "0") {
                that.loading = false
                that.isDisabledSave = true
                store.commit('UPDATE_STATUS', true)
                window.Vue.$emit('snackbar', 'success', 'Plan Compound Saved!')
                store.commit('UPDATE_SELECTED_PLAN', that.info)
              } else {
                that.loading = false
                window.Vue.$emit('snackbar', 'warning', res)
              }
            })
          }
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
