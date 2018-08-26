<template>
  <main>
    <v-container fluid class="my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-card-text class="px-0 py-0">
          <p>Address</p>
          <v-divider></v-divider>
        </v-card-text>
        <v-flex xs6>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text class="pb-0">
                <v-text-field label="Address1:" v-model="info.MailingAddress.Street1"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-card-text class="py-0">
                <v-text-field label="Address2:" v-model="info.MailingAddress.Street2"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs9>
              <v-card-text class="py-0">
                <v-text-field label="City" v-model="info.MailingAddress.City"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="py-0">
                <v-select
                  v-bind:items="state_items"
                  v-model="info.MailingAddress.State"
                  label=""
                  item-value="text"
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Zip Code:" v-model="info.MailingAddress.PostalCode"></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs6>
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text class="pb-0">
                <v-text-field label="County:" v-model="info.MailingAddress.County"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-card-text class="py-0">
                <v-text-field label="Email:" v-model="info.EmailAddress"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Phone:" v-model="info.HomePhoneNumber"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Cell:" v-model="info.CellPhoneNumber"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Fax:" v-model="info.HomeFaxNumber"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Work Phone:" v-model="info.WorkPhoneNumber"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Ext:" v-model="info.WorkPhoneNumberExt"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Work Fax:" v-model="info.WorkFaxNumber"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Pager:" v-model="info.PagerNumber"></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-card-text class="px-0 py-0">
          <p>Personal Info</p>
          <v-divider></v-divider>
        </v-card-text>
        <v-flex xs6>
          <v-card-text>
            <v-select
              v-bind:items="material_status"
              v-model="info.MaritalStatus"
              label="Marital Status"
              item-value="field_value"
              item-text="desc_txt"
            ></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs6>
        </v-flex>
        <v-flex xs2>
          <v-card-text>
            <v-checkbox v-bind:label="`Student:`"
                        v-model="info.IsStudent"></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs2>
          <v-card-text>
            <v-checkbox v-bind:label="`Disabled:`"
                        v-model="info.IsDisabled"></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs2>
          <v-card-text>
            <v-checkbox v-bind:label="`Smoker:`"
                        v-model="info.IsSmoker"></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs2>
          <v-card-text>
            <v-checkbox v-bind:label="`Pregnant:`"
                        v-model="info.IsPregnant"></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs2>
          <v-card-text>
            <v-checkbox v-bind:label="`Allergies:`"
                        v-model="info.HasAllergies"></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs2>
          <v-card-text>
            <v-checkbox v-bind:label="'Diabetic'"
                        v-model="info.IsDiabetic"></v-checkbox>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-card-text class="px-0 py-0">
          <p>Benefits</p>
          <v-divider></v-divider>
        </v-card-text>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-select
                    v-bind:items="plan_items"
                    v-model="selectedPlan"
                    label="Plan"
                    item-text="desc"
                    item-value="PlanId"
                    @input="planChanged"
                    return-object
                    disabled
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Benefit Period Start" v-model="bene_peri_sta"
                                :disabled="isDisplayMode"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field label="Benefit Period End" v-model="bene_peri_end"
                                :disabled="isDisplayMode"></v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs8>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-card-text>
                    <v-flex xs12><p>Deductible</p></v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12>
                      <v-card-text>
                        <v-text-field label="Individual" v-model="benefitInfo.AccumulatedDeductibleAmount"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs12>
                      <v-card-text>
                        <v-text-field label="Family" v-model="familyBenefit.AccumulatedDeductibleAmount"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text>
                    <v-flex xs12><p>Max Benefit</p></v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12>
                      <v-card-text>
                        <v-text-field label="Individual" v-model="benefitInfo.AccumulatedClaimAmount"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs12>
                      <v-card-text>
                        <v-text-field label="Family" v-model="familyBenefit.AccumulatedClaimAmount"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text>
                    <v-flex xs12><p>OOP Max</p></v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12>
                      <v-card-text>
                        <v-text-field label="Individual" v-model="benefitInfo.AccumulatedOutOfPocketAmount"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs12>
                      <v-card-text>
                        <v-text-field label="Family" v-model="familyBenefit.AccumulatedOutOfPocketAmount"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
        </v-card-text>
        <v-layout row wrap>
          <v-flex xs4>
            <v-card-text>
              <v-flex xs12><p>Accmulated Medical Deductible</p></v-flex>
              <v-divider></v-divider>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <v-text-field label="Individual" v-model="benefitInfo.AccumulatedMedicalDeductibleAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Family" v-model="familyBenefit.AccumulatedMedicalDeductibleAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Last Updated" v-model="benefitInfo['MedicalDeductibleLastUpdatedDate']"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text>
              <v-flex xs12><p>Accmulated Rx Deductible</p></v-flex>
              <v-divider></v-divider>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <v-text-field label="Individual" v-model="benefitInfo.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Family" v-model="familyBenefit.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text>
              <v-flex xs12><p>Accumulated Combined Deductible</p></v-flex>
              <v-divider></v-divider>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <v-text-field label="Individual" v-model="benefitInfo.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Family" v-model="familyBenefit.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-checkbox v-bind:label="'Deductible Met'" v-model="benefitInfo.DeductibleMet" :disabled="!$store.state.selectedMember.IsActive" disabled
                  ></v-checkbox>
                </v-card-text>
              </v-flex>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-flex xs12><p>Accmulated Medical Out-of-Pocket</p></v-flex>
              <v-divider></v-divider>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <v-text-field label="Individual" v-model="benefitInfo.AccumulatedMedicalOutOfPocketAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Family" v-model="familyBenefit.AccumulatedMedicalOutOfPocketAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Last Updated" v-model="benefitInfo.MedicalOutOfPocketLastUpdatedDate"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-flex xs12><p>Accmulated Rx Out-of-Pocket</p></v-flex>
              <v-divider></v-divider>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <v-text-field label="Individual" v-model="benefitInfo.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Family" v-model="familyBenefit.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-flex xs12><p>Accumulated Combined Out-of-Pocket</p></v-flex>
              <v-divider></v-divider>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <v-text-field label="Individual" v-model="benefitInfo.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Family" v-model="familyBenefit.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-checkbox v-bind:label="'Out-of-Pocket Met'" v-model="benefitInfo.MaxOutOfPocketMet" :disabled="!$store.state.selectedMember.IsActive"
                  disabled></v-checkbox>
                </v-card-text>
              </v-flex>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-card-text class="py-0">
          <v-divider></v-divider>
        </v-card-text>
        <v-layout row wrap>
          <v-flex xs3>
            <v-card-text>
              <v-flex xs12><p>Accum Rx Benefit</p></v-flex>
              <v-divider></v-divider>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <v-text-field label="Individual" v-model="benefitInfo.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Family" v-model="familyBenefit.AccumulatedClaimAmount"
                                :disabled="isDisplayMode"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-card-text>
          </v-flex>
          <v-flex xs9>
            <v-card-text>
              <v-flex xs12><p>Remaining</p></v-flex>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-card-text>
                    <v-flex xs12><p>Deductible</p></v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12>
                      <v-card-text class="pb-0">
                        <v-text-field label="Individual" v-model="remainingDeductible"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs12>
                      <v-card-text class="py-0">
                        <v-text-field label="Family" v-model="remainingDeductible"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text>
                    <v-flex xs12><p>Benefit</p></v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12>
                      <v-card-text class="pb-0">
                        <v-text-field label="Individual" v-model="remainingBenefit"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs12>
                      <v-card-text class="py-0">
                        <v-text-field label="Family" v-model="remainingBenefit"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text>
                    <v-flex xs12><p>OOP</p></v-flex>
                    <v-divider></v-divider>
                    <v-flex xs12>
                      <v-card-text class="pb-0">
                        <v-text-field label="Individual" v-model="remainingOop"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs12>
                      <v-card-text class="py-0">
                        <v-text-field label="Family" v-model="remainingOop"
                                      :disabled="isDisplayMode"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>
        </v-layout>
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
        <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update</v-btn>
      </v-card-actions>
    </template>
  </main>
</template>
<script>
  import {convertDate, convertDateTime, pickerFormat,convertStringToPickerFormat} from '../../../../components/utils/DateMethods'
  import store from '../../../../store'
  import memberServices from '../../../../services/member/memberServices'

  const defaultBenefit = {
    "BenefitPeriod": (new Date()).getFullYear().toString(),
    "DeductibleMet": false,
    "MaxOutOfPocketMet": false,
    "AccumulatedClaimAmount": 0,
    "AccumulatedOutOfPocketAmount": 0,
    "AccumulatedDeductibleAmount": 0,
    "AccumulatedMedicalOutOfPocketAmount": 0,
    "AccumulatedMedicalDeductibleAmount": 0,
    "MedicalDeductibleLastUpdatedDate": null,
    "MedicalOutOfPocketLastUpdatedDate": null
  }
  const currentFullYear = (new Date()).getFullYear().toString()

  export default {
    name: 'miscellaneous',
    props: ['type', 'data'],
    data() {
      return {
        isDisabledSave: true,
        info: this.$store.state.selectedMember,
        state_items: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU',
          'HI', 'ID', 'IL', 'IN', 'IA', 'NC', 'PR', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
          'MI', 'MN', 'MS', 'MO', 'RI', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'XA', 'WV', 'WI', 'WY'
        ],
        rules: {
          required: (value) => !!value || 'Required.',
          DependentCountRule: (v) => v < 100 || 'DependentCount Limit must be less more than 100.',
        },
        screen_repo: false,
        material_status: [
          {field_value: 0, desc_txt: 'Not Specified'},
          {field_value: 1, desc_txt: 'Married'},
          {field_value: 2, desc_txt: 'Single'},
          {field_value: 3, desc_txt: 'Discovered'},
          {field_value: 4, desc_txt: 'Widowed'}
        ],
        isDisplayMode: true,
        plan_items: this.getPlanItems() || [],
        selectedPlan: {},
        benefitInfo: {...defaultBenefit},
        benefitsList: [],
        familyBenefit: {
          "AccumulatedClaimAmount": 0,
          "AccumulatedOutOfPocketAmount": 0,
          "AccumulatedDeductibleAmount": 0,
          "AccumulatedMedicalOutOfPocketAmount": 0,
          "AccumulatedMedicalDeductibleAmount": 0,
        },
        bene_peri_sta: "1/1/" + (new Date()).getFullYear(),
        bene_peri_end: "12/31/" + (new Date()).getFullYear(),
        remainingDeductible: "N/A",
        remainingBenefit: "N/A",
        remainingOop: "N/A",
      }
    },
    components: {},
    watch: {
      '$store.state.memberPlanLists': {
        handler(newData, oldData) {
          if (newData.length > 0) {
            this.plan_items = this.getPlanItems()
          } else {
            this.plan_items = []
          }
        }, deep: true
      },
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
            this.isDisabledSave = false
            store.commit('UPDATE_STATUS', false)
          }
        },
        deep: true
      },
      benefitInfo: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
            if (newData['PlanId']) {
              this.isDisabledSave = false
            }
          }
        }, deep: true
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
      console.log('----- Administrator / Member / Edit / Miscellaneous mounted -----')
      if(this.type !== 'add') {
        this.showBenefits()
        if (this.plan_items.length > 0) {
          this.selectedPlan = this.plan_items[0]
        }
      } else {
        this.benefitInfo = {}
        this.familyBenefit = {}
        this.bene_peri_sta = ''
        this.bene_peri_end = ''
      }
    },
    methods: {
      save() {
        const that = this
        if (this.info.FirstName === ''
          || this.info.LastName === ''
          || this.info.PersonCode === ''
          || this.info.MemberId === ''
          || (new Date(this.info.DateOfBirth)) > (new Date())
        ) {
          this.$router.push({path: 'patient'})
        } else {
          const {__type, UpdatedDate, ...update} = {...this.info}
          memberServices.updateMember(update, this.$store.state.user).then(function (res) {
            that.isDisabledSave = true
            store.commit('UPDATE_STATUS', true)
            window.Vue.$emit('snackbar', 'success', 'Miscellaneous Data Saved!')
            store.commit('UPDATE_SELECTED_PLAN_MEMBER', res.PlanMembers)
            res.PlanMembers = []
            store.commit('UPDATE_SELECTED_MEMBER', res)
          })
          const {CreatedDate, ...updateBenefit} = this.benefitInfo
          const reqData = {
            entity: Object.assign({}, {...updateBenefit}, {CreatedDate: convertDate(CreatedDate)})
          }
          memberServices.updatePlanMemberBenefit(reqData).then(function (res) {
            that.isDisabledSave = true
            window.Vue.$emit('snackbar', 'success', 'Miscellaneous Data Updated!')
          })
        }
      },
      clear: function () {
        this.benefitInfo = {...defaultBenefit}
        const data = {
          pcc: this.$store.state.pcn.pcc,
          memberId: this.$store.state.selectedMember.MemberId,
          personCode: this.$store.state.selectedMember.PersonCode,
          includeProperties: 'PlanMembers,Allergy,Diagnosis'
        }
        const that = this
        memberServices.getMember(data).then(function (res) {
          store.commit('UPDATE_SELECTED_PLAN_MEMBER', res.PlanMembers)
          res.PlanMembers = []
          store.commit('UPDATE_SELECTED_MEMBER', res)
          that.info = that.$store.state.selectedMember
        })

        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      },
      getPlanDesc: function (planId) {
        let desc = ''
        this.$store.state.memberPlanLists.some(function (i) {
          if (i.PlanId === planId) {
            desc = i.Description
            return true
          }
        })
        return desc
      },
      getPlanItems: function () {
        // return this.$store.state.memberPlanLists.filter(item => (
        return this.$store.state.selectedPlanMembers.filter(item => (
          convertStringToPickerFormat(item.EffectiveStartDate).substring(0, 4) <= currentFullYear && convertStringToPickerFormat(item.EffectiveStartDate).substring(0, 4) >= currentFullYear
        )).map(item => (Object.assign({}, {...item}, {
          desc: item.PlanId + ' - ' + this.getPlanDesc(item.PlanId)
        }))) || []
      },
      showBenefits: function (v = null) {
        const that = this
        const data = {
          "search": {
            "Pcc": this.$store.state.pcn.pcc,
            "BenefitPeriod": currentFullYear,
            "PersonCode": this.$store.state.selectedMember.PersonCode,
            "MemberId": this.$store.state.selectedMember.MemberId
          },
          "orderBy": "",
          "includeProperties": ""
        }

        memberServices.getPlanMemberBenefit(data).then(function (res) {
          const planId = v ? v.PlanId : (that.plan_items.length > 0 ? that.plan_items[0].PlanId : '0')
          if (res.length > 0) {
            let sumedObj = {
              "AccumulatedClaimAmount": 0,
              "AccumulatedOutOfPocketAmount": 0,
              "AccumulatedDeductibleAmount": 0,
              "AccumulatedMedicalOutOfPocketAmount": 0,
              "AccumulatedMedicalDeductibleAmount": 0,
            }, currentObj = res[0]
            for (let i = 0; i < res.length; i++) {
              sumedObj['AccumulatedClaimAmount'] += res[i]['AccumulatedClaimAmount']
              sumedObj['AccumulatedOutOfPocketAmount'] += res[i]['AccumulatedOutOfPocketAmount']
              sumedObj['AccumulatedDeductibleAmount'] += res[i]['AccumulatedDeductibleAmount']
              sumedObj['AccumulatedMedicalOutOfPocketAmount'] += res[i]['AccumulatedMedicalOutOfPocketAmount']
              sumedObj['AccumulatedMedicalDeductibleAmount'] += res[i]['AccumulatedMedicalDeductibleAmount']

              if (res.PlanId == planId) {
                currentObj = res
              }
            }
            that.benefitsList = res
            that.benefitInfo = that.convertToStringObj(Object.assign({}, {...defaultBenefit}, {...currentObj}, {
              MedicalDeductibleLastUpdatedDate: convertDate(currentObj.MedicalDeductibleLastUpdatedDate),
              MedicalOutOfPocketLastUpdatedDate: convertDate(currentObj.MedicalOutOfPocketLastUpdatedDate),
            }))
            that.familyBenefit = that.convertToStringObj(Object.assign({}, {...defaultBenefit}, {...sumedObj}))
          } else {
            const newData = Object.assign({}, {...that.benefitInfo}, {
              "Pcc": that.$store.state.pcn.pcc,
              "BenefitPeriod": currentFullYear,
              "PersonCode": that.$store.state.selectedMember.PersonCode,
              "MemberId": that.$store.state.selectedMember.MemberId,
              "PlanId": planId
            })
            memberServices.addPlanMemberBenefit({entity: newData}).then(function (res) {
              // window.Vue.$emit('snackbar', 'success', 'New Plan-Member Benefit Added!')
            })
          }
        })
      },
      convertToStringObj(obj) {
        let newObj = {...obj}
        for (let k in obj) {
          if (obj[k] !== false && obj[k] !== true)
            newObj[k] = obj[k] != null ? obj[k].toString() : ''
        }
        return newObj
      },
      planChanged: function (v) {
        if (this.benefitsList.length > 0) {
          const currentObj = this.benefitsList.filter((item) => (item.PlandId == v.PlanId))
          const newObj = currentObj.length > 0 ? currentObj[0] : this.benefitsList[0]
          this.benefitInfo = this.convertToStringObj(Object.assign({}, {...defaultBenefit}, {...newObj}, {
            MedicalDeductibleLastUpdatedDate: convertDate(newObj.MedicalDeductibleLastUpdatedDate),
            MedicalOutOfPocketLastUpdatedDate: convertDate(newObj.MedicalOutOfPocketLastUpdatedDate),
          }))
        }
      },
    }
  }
</script>
<style lang="stylus">
</style>
