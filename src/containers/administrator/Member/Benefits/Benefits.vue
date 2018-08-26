<template>
  <main>
    <v-container fluid class="px-0 py-0">
      <v-layout row wrap class="my-sub-scroll-enabled">
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
                    class="input-group--focused"
                    return-object
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
                        <v-text-field label="Individual" v-model="info.AccumulatedDeductibleAmount"
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
                        <v-text-field label="Individual" v-model="info.AccumulatedClaimAmount"
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
                        <v-text-field label="Individual" v-model="info.AccumulatedOutOfPocketAmount"
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
                  <v-text-field label="Individual" v-model="info.AccumulatedMedicalDeductibleAmount"
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
                  <v-text-field label="Last Updated" v-model="info['MedicalDeductibleLastUpdatedDate']"
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
                  <v-text-field label="Individual" v-model="info.AccumulatedClaimAmount"
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
                  <v-text-field label="Individual" v-model="info.AccumulatedClaimAmount"
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
                  <v-checkbox v-bind:label="'Deductible Met'" v-model="info.DeductibleMet" :disabled="!$store.state.selectedMember.IsActive"
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
                  <v-text-field label="Individual" v-model="info.AccumulatedMedicalOutOfPocketAmount"
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
                  <v-text-field label="Last Updated" v-model="info.MedicalOutOfPocketLastUpdatedDate"
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
                  <v-text-field label="Individual" v-model="info.AccumulatedClaimAmount"
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
                  <v-text-field label="Individual" v-model="info.AccumulatedClaimAmount"
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
                  <v-checkbox v-bind:label="'Out-of-Pocket Met'" v-model="info.MaxOutOfPocketMet" :disabled="!$store.state.selectedMember.IsActive"
                  ></v-checkbox>
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
                  <v-text-field label="Individual" v-model="info.AccumulatedClaimAmount"
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
      <div v-if="type !== 'add'">
        <v-divider class="mt-2"></v-divider>
        <v-flex xs12>
          <small class="red--text">*indicates required field</small>
        </v-flex>
        <v-card-actions>
          <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update</v-btn>
        </v-card-actions>
      </div>
    </v-container>
  </main>
</template>
<script>
  import {convertStringToPickerFormat, convertDate} from '../../../../components/utils/DateMethods'
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
    name: 'benefits',
    props: ['type'],
    data() {
      return {
        isDisabledSave: true,
        isDisplayMode: true,
        plan_items: this.getPlanItems() || [],
        selectedPlan: {},
        info: {...defaultBenefit},
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
    mounted() {
      console.log('----- Administrator / Member / Edit / Benefits mounted -----')
      if(this.type !== 'add') {
        this.showBenefits()
        if (this.plan_items.length > 0) {
          this.selectedPlan = this.plan_items[0]
        }
      } else {
        this.info = {}
        this.familyBenefit = {}
        this.bene_peri_sta = ''
        this.bene_peri_end = ''
      }
    },
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
            if (newData['PlanId']) {
              this.isDisabledSave = false
            }
          }
        }, deep: true
      }
    },
    methods: {
      convertDate: convertDate,
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
            that.info = that.convertToStringObj(Object.assign({}, {...defaultBenefit}, {...currentObj}, {
              MedicalDeductibleLastUpdatedDate: convertDate(currentObj.MedicalDeductibleLastUpdatedDate),
              MedicalOutOfPocketLastUpdatedDate: convertDate(currentObj.MedicalOutOfPocketLastUpdatedDate),
            }))
            that.familyBenefit = that.convertToStringObj(Object.assign({}, {...defaultBenefit}, {...sumedObj}))
          } else {
            const newData = Object.assign({}, {...that.info}, {
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
      planChanged: function (v) {
        if (this.benefitsList.length > 0) {
          const currentObj = this.benefitsList.filter((item) => (item.PlandId == v.PlanId))
          const newObj = currentObj.length > 0 ? currentObj[0] : this.benefitsList[0]
          this.info = this.convertToStringObj(Object.assign({}, {...defaultBenefit}, {...newObj}, {
            MedicalDeductibleLastUpdatedDate: convertDate(newObj.MedicalDeductibleLastUpdatedDate),
            MedicalOutOfPocketLastUpdatedDate: convertDate(newObj.MedicalOutOfPocketLastUpdatedDate),
          }))
        }
      },
      convertToStringObj(obj) {
        let newObj = {...obj}
        for (let k in obj) {
          if (obj[k] !== false && obj[k] !== true)
            newObj[k] = obj[k] != null ? obj[k].toString() : ''
        }
        return newObj
      },
      clear() {
        this.info = {...defaultBenefit}
      },
      save() {
        const that = this
        const {__type, CreatedDate, ...update} = this.info
        const reqData = {
          entity: Object.assign({}, {...update}, {CreatedDate: convertDate(CreatedDate)})
        }
        memberServices.updatePlanMemberBenefit(reqData).then(function (res) {
          that.isDisabledSave = true
          window.Vue.$emit('snackbar', 'success', 'Plan Member benefit Updated!')
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
