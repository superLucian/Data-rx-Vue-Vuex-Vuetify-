<template>
  <main>
    <v-form ref="form">
      <v-card-text class="py-0">
        <v-layout row>
          <v-flex xs12 class="text-xs-center">
            <v-card-text class="pb-0">
              <p>{{planFormularyRestrictions['Formulary']}}</p>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs8 class="px-2">
            <v-select
              v-bind:items="networkList"
              v-model="planFormularyRestrictions['network_id']"
              label="Network"
              singleLine
              bottom
              :item-text="'Network Desc'"
              :item-value="'Network ID'"
            >
            </v-select>
          </v-flex>
          <v-flex xs4>
            <v-card-text>
              <v-checkbox color="primary-color" true-value="Yes" false-value="No" label="Prior Authorization required"
                          v-model="planFormularyRestrictions['PA Required']"></v-checkbox>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4>
            <date-picker
              v-model="planFormularyRestrictions['Start Date']"
              label="Start Date"
            ></date-picker>
          </v-flex>
          <v-flex xs4 v-if="hasEndDate">
            <date-picker
              v-model="planFormularyRestrictions['End Date']"
              label="End Date"
            ></date-picker>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="hasEndDate-container">
              <v-checkbox label="Include 'End Date'" v-model="hasEndDate"></v-checkbox>
            </v-card-text>

          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs3 class="px-2">
            <v-text-field label="Min QTY" name="MinQTY" type="number"
                          v-model="planFormularyRestrictions['Min QTY']" :rules="[rules.qtyRules, rules.lqTMax]"
                          :counter="7"></v-text-field>
          </v-flex>
          <v-flex xs3 class="px-2">
            <v-text-field name="MaxQTY" label="Max QTY" type="number"
                          v-model="planFormularyRestrictions['Max QTY']" :rules="[rules.qtyRules, rules.gqTMin]"
                          :counter="7"></v-text-field>
          </v-flex>
          <v-flex xs3 class="px-2">
            <v-text-field name="MinDays" label="Min Days" type="number"
                          v-model="planFormularyRestrictions['Min Days']" :rules="[rules.dayRules, rules.ldTMax]"
                          :counter="4"></v-text-field>
          </v-flex>
          <v-flex xs3 class="px-2">
            <v-text-field name="maxDays" label="Max Days" type="number"
                          v-model="planFormularyRestrictions['Max Days']" :rules="[rules.dayRules, rules.gdTMin]"
                          :counter="4"></v-text-field>
          </v-flex>
          <v-flex xs3 class="px-2">
            <v-text-field name="minAge" label="Min Age" type="number"
                          v-model="planFormularyRestrictions['Min Age']" :rules="[rules.ageRules, rules.laTMax]"
                          :counter="5"></v-text-field>
          </v-flex>
          <v-flex xs3 class="px-2">
            <v-text-field name="maxAge" label="Max Age" type="number"
                          v-model="planFormularyRestrictions['Max Age']" :rules="[rules.ageRules, rules.gaTMin]"
                          :counter="5"></v-text-field>
          </v-flex>
          <v-flex xs3 class="px-2">
            <v-select
              v-bind:items="genderList"
              v-model="planFormularyRestrictions['Gender']"
              label="Gender"

              item-text="desc_new_txt"
              item-value="field_value"
              bottom>
            </v-select>
          </v-flex>
          <v-flex xs3 class="px-2">
            <v-text-field name="MaxQTYPerDays" label="Max QTY Per Day" type="number"
                          v-model="planFormularyRestrictions['Days QTY Limit']" :rules="[rules.perDayRules]"
                          :counter="3"></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout row>
          <v-flex xs4 class="px-2">
            <v-select
              v-bind:items="termCdList"
              v-model="planFormularyRestrictions['QTY Term']"
              label="Period"

              item-text="desc_txt"
              item-value="field_value"
              bottom>
            </v-select>
          </v-flex>
          <v-flex xs8 class="px-2">
            <v-text-field name="message" label="Message:"
                          v-model="planFormularyRestrictions['Message Text']"></v-text-field>
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-divider></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn color="primary-color" :disabled="isDisabledSave" @click.native="save">Save<i v-if="saveLoading"
                                                                                      class="fa fa-circle-o-notch fa-spin fa-fw"></i>
        </v-btn>
        <v-btn @click.native="close">Close</v-btn>
      </v-card-actions>
    </v-form>
  </main>
</template>

<script>
  import {convertDate} from '../../../../components/utils/DateMethods'
  import planServices from '../../../../services/plan/planServices'
  import DatePicker from "../../../../components/common/DatePicker.vue";

  export default {
    name: 'formulary-edit',
    props: [
      'close',
      'mode',
      'planFormularyRestrictions'
    ],
    data() {
      return {
        start_date: null,
        end_date: null,
        saveLoading: false,
        hasEndDate: !!this.planFormularyRestrictions['End Date'] && this.planFormularyRestrictions['End Date']!=="12/31/9998" ,
        isDisabledSave: false,
        loading: false,
        networkList: [],
        termCdList: [],
        genderList: [],
        rules: {
          required: (value) => !!value || 'Required.',
          ldTMax: (v) => {
            return v <= this.planFormularyRestrictions['Max Days'] || 'Should be less than Max Days Value'
          },
          gdTMin: (v) => {
            return v >= this.planFormularyRestrictions['Min Days'] || 'Should be more than Min Days Value'
          },
          laTMax: (v) => {
            return v <= this.planFormularyRestrictions['Max Age'] || 'Should be less than Max Ages Value'
          },
          gaTMin: (v) => {
            return v >= this.planFormularyRestrictions['Min Age'] || 'Should be more than Min Ages Value'
          },
          lqTMax: (v) => {
            return v <= this.planFormularyRestrictions['Max QTY'] || 'Should be less than Max Quantities Value'
          },
          gqTMin: (v) => {
            return v >= this.planFormularyRestrictions['Min QTY'] || 'Should be more than Min Quantities Value'
          },
          perDayRules: (v) => v <= 999 || 'Max QTY Per Day must be less more than 1000.',
          dayRules: (v) => v <= 9999 || 'Day Limit must be less more than 9999.',
          ageRules: (v) => v <= 99999 || 'Age Limit must be less more than 99999.',
          qtyRules: (v) => v <= 9999999 || 'Quantity Limit must be less more than 9999999.',
        },
      }
    },
    components: {DatePicker},
    // watch: {
    //   planFormularyRestrictions: {
    //     handler: function (newVal, oldVal) {
    //       if (newVal && oldVal && newVal === oldVal)
    //         this.isDisabledSave = false
    //     }, deep: true
    //   }
    // },
    mounted() {
      console.log('----- Administrator / Plan / Plan formulary /Formulary Edit -----')
      this.networkList = this.$store.state.planSetupData.network_list || []
      this.termCdList = [...this.$store.state.planSetupData.term_cd_syscode] || []
      this.genderList = this.$store.state.planSetupData.gender_data || []
      this.genderList = this.genderList.map(v => ( Object.assign({}, {...v}, {desc_new_txt: v.desc_txt.toUpperCase()}) ))
      this.termCdList.unshift({'desc_txt': 'NA', 'field_value': "-1"})
    },
    methods: {
      convertDate: convertDate,
      find() {
        const data = {
          "pcc": this.$store.state.pcn.pcc,
          "desc_txt": this.description
        }
        const that = this
        that.searchResult = []

        planServices.getFormularyListing(data).then(function (res) {
          that.searchResult = res.formulary
        })
      },
      convertObjectToGroupformulary(formularyList) {
        let result = []
        for (let i = 0; i < formularyList.length; i++) {
          const {__type, Id, Pcc, ...temp} = formularyList[i]
          result.push({...temp, formularyID: Id, PCN: Pcc})
        }
        return result
      },
      save: function () {
        const that = this
        if (this.$refs.form.validate()) {
          if(!this.hasEndDate) {
            this.planFormularyRestrictions['End Date'] = '12/31/9998'
          }
          if (this.mode === 'edit') {
            planServices.updatePlanFormularyRestrictions(this.planFormularyRestrictions, this.$store.state.user).then(function (res) {
              that.saveLoading = true
              if (res == 0) {
                that.saveLoading = false
                window.Vue.$emit('snackbar', 'success', 'Plan Formulary Restrictions Updated Successfully!')
                that.close(true)
              }
            })
          } else if (this.mode === 'add') {
            planServices.addPlanFormularyRestrictions(this.planFormularyRestrictions, this.$store.state.user).then(function (res) {
              that.saveLoading = true
              if (res == 0) {
                that.saveLoading = false
                window.Vue.$emit('snackbar', 'success', 'Plan Formulary Restrictions Saved Successfully!')
                that.close(true)
              }
            })
          }
        }
      }
    },
    events: {}
  }
</script>

<style lang="stylus">
  .formulary-restrictions-form {
    max-height: calc(100vh - 120px);
    overflow: auto;
  }
</style>
