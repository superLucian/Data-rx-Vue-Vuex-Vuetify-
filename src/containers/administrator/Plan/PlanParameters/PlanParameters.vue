<template>
  <v-form ref="form">
  <main>
    <v-container fluid class="my-sub-scroll-enabled px-0 py-0">
      <v-layout row wrap>
        <v-flex xs6>
          <v-card-text>
            <p>Claim Paid On - Lower Of:</p>
            <v-divider></v-divider>
            <v-card-text class="pb-0">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-divider></v-divider>
                  <v-layout row wrap>
                    <v-flex xs12>
                      <v-radio-group v-model="info.use_lower_of_logic_flg" row>
                        <v-radio label="First Available" value="F"></v-radio>
                        <v-radio label="Lower Of" value="T"></v-radio>
                      </v-radio-group>
                    </v-flex>
                    <v-flex xs6>
                      <v-checkbox label="Plan MAC" v-model="info.uc_lower_mac_disc_ind"
                                  color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                    </v-flex>
                    <v-flex xs6>
                      <v-checkbox label="Brand MAC" v-model="info.uc_lower_awp_disc_ind"
                                  color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                    </v-flex>
                    <v-flex xs6>
                      <v-checkbox label="Generic MAC" v-model="info.uc_lower_generic_awp_disc_ind"
                                  color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                    </v-flex>
                    <v-flex xs6>
                      <v-checkbox label="Use Pricing Parameters" v-model="info.uc_lower_ingred_cost_ind"
                                  color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                    </v-flex>
                  </v-layout>
                  <v-divider></v-divider>
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-checkbox label="Usual and Customary" v-model="info.uc_lower_uc_ind"
                                  color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                    </v-flex>
                    <v-flex xs6>
                      <v-checkbox label="Gross Amount Due" v-model="info.uc_lower_gad_ind"
                                  color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
          </v-card-text>
        </v-flex>
        <v-flex xs6>
          <v-card-text>
            <p>Age Limits</p>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <v-checkbox label="Apply Dependent Age Restrictions" v-model="info.dependent_age_restrict_ind"
                              color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Student Age Limit:" v-model="info.student_age_limit" type="Number"
                                :disabled="info.dependent_age_restrict_ind === 'N'" :rules="[rules.ageRules]" :counter="3"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Non-Student Age Limit:" v-model="info.nonstudent_age_limit" type="Number"
                                :disabled="info.dependent_age_restrict_ind === 'N'" :rules="[rules.ageRules]" :counter="3"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Disabled Age Limit:" v-model="info.disabled_age_limit" type="Number"
                                :disabled="info.dependent_age_restrict_ind === 'N'" :rules="[rules.ageRules]" :counter="3"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Dependent Adult Age Limit:" v-model="info.dep_adult_age_limit" type="Number"
                                :disabled="info.dependent_age_restrict_ind === 'N'" :rules="[rules.ageRules]" :counter="3"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
          <v-card-text class="py-0">
            <p>CoPay</p>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout row wrap>
                <v-flex v-bind:class="(info.copay_type_cd === 'F' || info.copay_type_cd === 'T') ? 'xs8' : 'xs12'">
                  <v-select
                    v-bind:items="coPay_items"
                    v-model="info.copay_type_cd"
                    label="Provider Reimbursement:"
                    item-text="text"
                    item-value="cd"
                    bottom
                  ></v-select>
                </v-flex>
                <v-flex xs3 offset-xs1 v-if="info.copay_type_cd === 'F' || info.copay_type_cd === 'T'">
                  <v-text-field label="Pct:" v-model="info.fixed_copay_pct" prefix="%" :rules="[rules.supplyRules]" :counter="2"></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider></v-divider>
          </v-card-text>
        </v-flex>
        <v-flex xs6>
          <v-card-text class="pb-0">
            <p>Mail Order</p>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <v-checkbox label="Mandatory Mail Order" v-model="info.mandatory_mail_ind"
                              color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Max Retail Refills:" v-model="info.retail_script_cnt_limit"
                                type="Number" :disabled="info.mandatory_mail_ind === 'N'" :rules="[rules.refillsRules]" :counter="3"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="term_cd_items"
                    v-model="info.retail_script_cnt_term_cd"
                    label="Per:"
                    item-text="desc_txt"
                    item-value="field_value"
                    bottom
                    :disabled="info.mandatory_mail_ind === 'N'"
                  ></v-select>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
        </v-flex>
        <v-flex xs6>
          <v-card-text>
            <p>Max Scripts Covered</p>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Max Scripts Covered:" v-model="info.script_cnt_limit"
                                type="Number" :rules="[rules.coverRules]" :counter="4"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="term_cd_items"
                    v-model="info.script_cnt_term_cd"
                    label="Per:"
                    item-text="desc_txt"
                    item-value="field_value"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
        </v-flex>
        <v-flex xs6>
          <v-card-text>
            <p>Member Deductibles / Plan Limits</p>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs6>
                <v-card-text class="pb-0">
                  <v-text-field label="Max Deductible: (Member)" hint="'Max Deductible: (Member)' is less than 999999.99 !" v-model="info.max_member_deduct_amt"
                                type="Number" :rules="[rules.memberRules]" ></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="pb-0">
                  <v-text-field label="Max Deductible: (Family)" hint="'Max Deductible: (Family)' is less than 999999.99 !" v-model="info.max_family_deduct_amt"
                                type="Number" :rules="[rules.memberRules]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Plan Maximum: (Member)" hint="'Plan Maximum: (Member)' is less than 999999.99 !" v-model="info.max_member_claim_amt"
                                type="Number" :rules="[rules.memberRules]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Plan Maximum: (Family)" hint="'Plan Maximum: (Family)' is less than 999999.99 !" v-model="info.max_family_claim_amt"
                                type="Number" :rules="[rules.memberRules]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Max Out-of-Pocket: (Member)" hint="'Max Out-of-Pocket: (Member)' is less than 999999.99 !" v-model="info.max_member_oop_amt"
                                type="Number" :rules="[rules.memberRules]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="pt-0">
                  <v-text-field label="Max Out-of-Pocket: (Family)" hint="'Max Out-of-Pocket: (Family)' is less than 999999.99 !" v-model="info.max_family_oop_amt"
                                type="Number" :rules="[rules.memberRules]"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </v-card-text>
        </v-flex>
        <v-flex xs6>
          <v-card-text>
            <p>Transparency</p>
            <v-divider></v-divider>
            <v-card-text class="pb-0">
              <v-checkbox label="Transparent" v-model="info.transparency_flg"
                          color="primary-color" true-value="T" false-value="F"></v-checkbox>
            </v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Max Spread:" hint="'Max Spread' is less than 999999.99 !" v-model="info.delta_cap_diff" :rules="[rules.spreedRules, rules.gsTMin]"
                                type="Number" prefix="$" :disabled="info.transparency_flg === 'T'"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Max Spread:" hint="'Max Spread' is less than 999999.99 !"  v-model="info.delta_cap_pct" :rules="[rules.spreedRules]"
                                type="Number" prefix="%" :disabled="info.transparency_flg === 'T'"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-card-text class="pt-0">
              <v-text-field label="Min Spread:" hint="'Min Spread' is less than 999999.99 !" v-model="info.delta_cap_min"  :rules="[rules.spreedRules, rules.lsTMax]"
                            type="Number" prefix="$" :disabled="info.transparency_flg === 'T'"></v-text-field>
            </v-card-text>
            <v-divider></v-divider>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-card-text class="py-0">
          <p>Rebates</p>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs3>
              <v-card-text class="pb-0">
                <v-select
                  v-bind:items="$store.state.planSetupData.rebate_level_1_syscode"
                  v-model="info.rebate_level_1"
                  label="Rebate Category:"
                  item-text="desc_txt"
                  item-value="field_value"
                  bottom
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="pb-0">
                <v-select
                  v-bind:items="rebate_items"
                  v-model="info.rebate_copay_diff_flg"
                  label="$15 between brand copays:"
                  item-text="text"
                  item-value="cd"
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="pb-0">
                <v-text-field label="Rebate Plan Ref #:" v-model="info.rebate_level_3"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="py-4">
                <v-checkbox label="Prebate" v-model="info.prebate_flg"
                            color="primary-color" true-value="T" false-value="F"></v-checkbox>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card-text>
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
        <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      </v-card-actions>
    </template>
  </main>
  </v-form>
</template>
<script>
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'

  export default {
    name: 'plan-parameters',
    props: ['type', 'data'],
    data() {
      return {
        info: {...this.$store.state.selectedPlan},
        coPay_items: [{
          cd: 'N',
          text: 'Not Applicable'
        }, {
          cd: 'D',
          text: 'Tiered Days Supply'
        }, {
          cd: 'F',
          text: 'Fixed Rate'
        }, {
          cd: 'T',
          text: 'Tiered Rate'
        }],
        rebate_items: [{
          cd: null,
          text: 'Unknown'
        }, {
          cd: 'T',
          text: 'True'
        }, {
          cd: 'N',
          text: 'False'
        }],
        term_cd_items: [],
        isDisabledSave: true,
        rules: {
          required: (value) => !!value || 'Required.',
          ldTMax: (v) => {return v <= this.info.max_days || 'Should be less than Max Days Value'},
          gdTMin: (v) => {return v >= this.info.min_days || 'Should be more than Min Days Value'},
          laTMax: (v) => {return v <= this.info.max_age || 'Should be less than Max Ages Value'},
          gaTMin: (v) => {return v >= this.info.min_age || 'Should be more than Min Ages Value'},
          lqTMax: (v) => {return v <= this.info.max_qty || 'Should be less than Max Quantities Value'},
          gqTMin: (v) => {return v >= this.info.min_qty || 'Should be more than Min Quantities Value'},
          supplyRules: (v) => v <=100 || 'Pct Limit must be less more than 100 %.',
          dayRules: (v) => v <=999 || 'Day Limit must be less more than 999.',
          coverRules: (v) => v <=9999 || 'Max script covers Limit must be less more than 9999.',
          refillsRules: (v) => v <=999 || 'Refills Limit must be less more than 999.',
          ageRules: (v) => v <=999 || 'Age Limit must be less more than 999.',
          qtyRules: (v) => v <=99999 || 'Quantity Limit must be less more than 99999.',
          spreedRules: (v) => v <=1000000 || 'Spreed Limit must be less more than 999999.99',
          memberRules: (v) => v <=1000000 || 'This Limit must be less more than 999999.99',
          lsTMax: (v) => {return v <= this.info.delta_cap_diff || 'Should be less than Max Spreed Value'},
          gsTMin: (v) => {return v >= this.info.delta_cap_min || 'Should be more than Min Spreed Value'},

        },
        loading: false
      }
    },
    components: {},
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
      }
    },
    mounted() {
      console.log('----- Administrator / Plan / Parameters Codes mounted -----')
      this.setValues()
      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      setValues() {
        this.term_cd_items = []
        this.term_cd_items = [...this.$store.state.planSetupData.term_cd_syscode]
        this.term_cd_items.unshift({field_value: '-1', desc_txt: 'Please Select...'})

        this.info = Object.assign({}, {...this.info}, {
          max_member_deduct_amt: parseFloat(this.info.max_member_deduct_amt).toFixed(2),
          max_family_deduct_amt: parseFloat(this.info.max_family_deduct_amt).toFixed(2),
          max_member_claim_amt: parseFloat(this.info.max_member_claim_amt).toFixed(2),
          max_family_claim_amt: parseFloat(this.info.max_family_claim_amt).toFixed(2),
          max_member_oop_amt: parseFloat(this.info.max_member_oop_amt).toFixed(2),
          max_family_oop_amt: parseFloat(this.info.max_family_oop_amt).toFixed(2),
          delta_cap_diff: parseFloat(this.info.delta_cap_diff).toFixed(2),
          delta_cap_pct: parseFloat(this.info.delta_cap_pct).toFixed(2),
          delta_cap_min: parseFloat(this.info.delta_cap_min).toFixed(2),
        })
        store.commit('UPDATE_SELECTED_PLAN', this.info)
      },
      save() {
        const that = this
        if(that.$refs.form.validate()){
          if (this.info.plan_id === ''
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
          } else if (this.info.daw_cd === '') {
            this.$router.push({path: 'daw_codes'})
          } else {
            planServices.updatePlan(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
              that.loading = true
              if (res === "0") {
                that.loading = false
                that.isDisabledSave = true
                store.commit('UPDATE_STATUS', true)
                window.Vue.$emit('snackbar', 'success', 'Plan Parameters Saved!')
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
