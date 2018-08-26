<template>
  <v-layout row justify-center>
    <vodal
      :show="show"
      animation="zoom"
      :closeButton="false"
      :width="width"
      :height="height"
    >
      <v-form ref="form">
        <template v-if="active === 'main'">
          <v-toolbar>
            <v-icon class="white--text">fa-archive</v-icon>
            <v-toolbar-title class="white--text">
              Plan Drug {{ type }}
            </v-toolbar-title>
          </v-toolbar>
          <v-card-text class="my-scroll-enabled py-0 px-0">
            <v-layout row wrap>
              <template v-if="type === 'add'">
                <v-flex xs9>
                  <v-card-text class="pb-0">
                    <v-text-field label="Drug Id" v-model="info['Drug ID']" :disabled="type === 'edit'" required
                                  :rules="[rules.required]"></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text class="pb-0">
                    <v-btn color="primary-color" block @click.native="find">Find</v-btn>
                  </v-card-text>
                </v-flex>
                <v-flex xs12>
                  <v-card-text class="py-0">
                    <v-text-field label="Drug Desc" v-model="info['Drug Desc']" required
                                  :rules="[rules.required]"></v-text-field>
                  </v-card-text>
                </v-flex>
              </template>
              <template v-else>
                <v-flex xs6>
                  <v-card-text class="pb-0">
                    <v-text-field label="Drug Id" v-model="info['Drug ID']" :disabled="type === 'edit'" required
                                  :rules="[rules.required]"></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-card-text class="pb-0">
                    <v-text-field label="Drug Desc" v-model="info['Drug Desc']" required
                                  :rules="[rules.required]"></v-text-field>
                  </v-card-text>
                </v-flex>
              </template>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="networkList"
                    v-model="network_id"
                    label="Network"
                    item-text="desc_txt"
                    item-value="network_id"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="drugListType"
                    v-model="info['Drug Type']"
                    label="Drug Type"
                    item-text="text"
                    item-value="code"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="product_type_data"
                    v-model="info['Product Type Code']"
                    label="Product Type"
                    item-text="product_type_desc_txt"
                    item-value="product_type_cd"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="tierList"
                    v-model="info['Tier']"
                    label="Tier"
                    item-text="text"
                    item-value="code"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text class="py-0">
                  <v-text-field label="Supply Limit" v-model="info['Supply Limit']" type="Number"
                                suffix="% of Days Supply" :rules="[rules.supplyRules]" :counter="2"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs2>
                <v-card-text class="py-0">
                  <v-text-field label="Age Max" v-model="info['Max Age']" type="Number"
                                :rules="[rules.ageRules, rules.gaTMin]" :counter="3"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs2>
                <v-card-text class="py-0">
                  <v-text-field label="Age Min" v-model="info['Min Age']" type="Number"
                                :rules="[rules.ageRules, rules.laTMax]" :counter="3"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs2>
                <v-card-text class="py-0">
                  <v-text-field label="Quantity Min" v-model="info['Min Qty']" type="Number"
                                :rules="[rules.qtyRules, rules.lqTMax]" :counter="5"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs2>
                <v-card-text class="py-0">
                  <v-text-field label="Quantity Max" v-model="info['Max Qty']" type="Number"
                                :rules="[rules.qtyRules, rules.gqTMin]" :counter="5"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="termList"
                    v-model="info['Max Qty Term']"
                    label="Per:"
                    item-text="desc_txt"
                    item-value="field_value"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <date-picker
                    label="Start Date"
                    v-model="info['Start Date']">
                  </date-picker>
                </v-card-text>
              </v-flex>
              <v-flex xs3 class="py-3 px-4">
                <v-checkbox label="Include 'End Date'" v-model="isIncludeEnd"
                            color="primary-color"></v-checkbox>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0" v-if="isIncludeEnd">
                  <date-picker
                    label="End Date"
                    v-model="info['End Date']">
                  </date-picker>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-checkbox label="Exclude from plan?" v-model="info['Include/Exclude']"
                              color="primary-color" true-value="E" false-value="I"></v-checkbox>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text class="py-0">
                  <v-checkbox label="Prior Authorization Required" v-model="info['PA Req']"
                              color="primary-color" true-value="Y" false-value="N"></v-checkbox>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text class="py-0">
                  <v-checkbox label="Add this drug to all plans?" v-model="info['all_plans_flg']" true-value="T"
                              false-value="F" color="primary-color"></v-checkbox>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Response Message" v-model="info['Response Message']"></v-text-field>
                </v-card-text>
              </v-flex>

              <v-flex xs12 v-if="type === 'edit'">
                <v-card-text class="pt-0">
                  <v-btn dark class="primary mx-0 my-0" @click.native="removeDrug">Remove From Plan</v-btn>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-flex xs12>
            <v-divider class="mt-2"></v-divider>
            <small class="red--text pl-3">*indicates required field</small>
            <v-card-actions class="d-block text-xs-center pt-0">
              <v-btn color="primary-color" @click.native="add" v-if="type === 'add'">Add<i v-if="saveLoading"
                                                                                           class="fa fa-circle-o-notch fa-spin fa-fw"></i>
              </v-btn>
              <v-btn color="primary-color" @click.native="save" :disabled="isDisabledSave" v-else>Save<i
                v-if="saveLoading"
                class="fa fa-circle-o-notch fa-spin fa-fw"></i>
              </v-btn>
              <v-btn @click.native="close">Close</v-btn>
            </v-card-actions>
          </v-flex>
        </template>
        <template v-if="active === 'find'">
          <drug-find :selectable="true"></drug-find>
          <v-card-text class="py-0 px-1">
            <v-divider class="mt-2"></v-divider>
            <v-card-actions class="d-block text-xs-center">
              <v-btn @click.native="back">Back</v-btn>
            </v-card-actions>
          </v-card-text>
        </template>
      </v-form>
    </vodal>
  </v-layout>
</template>

<script>
  import planServices from '../../../../services/plan/planServices'
  import Vodal from '../../../../components/common/Vodal.vue'
  import {convertDate, convertStringDate, stringToDate} from '../../../../components/utils/DateMethods'
  import {required} from '../../../../components/utils/FormRuleDefinitions'
  import DatePicker from "../../../../components/common/DatePicker.vue";
  import DrugFind from "../../../drugs/DrugsDatabase/DrugDatabase.vue";

  export default {
    name: 'plan-drug-form',
    data() {
      return {
        info: {},
        show: false,
        width: 1000,
        height: 0,
        type: null,
        isDisabledSave: true,
        product_type_data: [],
        saveLoading: false,
        tierList: [
          {'code': '-1', 'text': 'NA'},
          {'code': '0', 'text': '0'},
          {'code': '1', 'text': '1'},
          {'code': '2', 'text': '2'},
          {'code': '3', 'text': '3'},
          {'code': '4', 'text': '4'},
          {'code': '5', 'text': '5'},
          {'code': '6', 'text': '6'},
          {'code': '7', 'text': '7'},
          {'code': '8', 'text': '8'},
          {'code': '9', 'text': '9'}
        ],
        networkList: [],
        network_id: this.$store.state.selectedPlan.network_id,
        cur_network_id: '-1',
        curr_start_dt: '',
        drugListType: [
          {'code': '', 'text': 'All'},
          {'code': 'B', 'text': 'Brand'},
          {'code': 'G', 'text': 'Generic'}
        ],
        termList: [],
        isIncludeEnd: false,
        all_plans_flg: "F",
        active: 'main',
        rules: {
          required: (value) => !!value || 'Required.',
          ldTMax: (v) => {
            return v <= this.info.max_days || 'Should be less than Max Days Value'
          },
          gdTMin: (v) => {
            return v >= this.info.min_days || 'Should be more than Min Days Value'
          },
          laTMax: (v) => {
            return v <= this.info['Max Age'] || 'Should be less than Max Ages Value'
          },
          gaTMin: (v) => {
            return v >= this.info['Min Age'] || 'Should be more than Min Ages Value'
          },
          lqTMax: (v) => {
            return v <= this.info['Max Qty'] || 'Should be less than Max Quantities Value'
          },
          gqTMin: (v) => {
            return v >= this.info['Min Qty'] || 'Should be more than Min Quantities Value'
          },
          supplyRules: (v) => v <= 100 || 'Supply Limit must be less more than 100 %.',
          dayRules: (v) => v <= 999 || 'Day Limit must be less more than 999.',
          ageRules: (v) => v <= 999 || 'Age Limit must be less more than 999.',
          qtyRules: (v) => v <= 99999 || 'Quantity Limit must be less more than 99999.',
        },
      }
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        }, deep: true
      },
      network_id: function () {
        this.isDisabledSave = false
      }
    },
    components: {
      DrugFind,
      DatePicker,
      Vodal
    },
    mounted() {
      const that = this
      window.Vue.$on('openPlanDrugForm', function (type, object) {
        that.type = type
        if (type === 'edit') {
          const data = {
            "session_uid": that.$store.state.user.session_uid,
            "session_id": that.$store.state.user.session_id,
            "group_id": that.$store.state.selectedPlan.group_id,
            "plan_id": that.$store.state.selectedPlan.plan_id,
            "network_id": object['Network ID'],
            "drug_id": object['Drug Id'],
            "drug_id_type_cd": object['drug_id_type_cd'],
            "effect_start_dt": object['Effective Start Dt'],
          }
          planServices.getPlanDrugData(data).then(function (res) {
            if (res.plan_drug.length > 0) {
              that.cur_network_id = object['Network ID']
              that.curr_start_dt = object['Effective Start Dt']
              that.info = res.plan_drug[0]
              that.product_type_data = [...res.product_type_cd_data]
              that.setValues()
              that.setEditInit(object)
            }
          })
        } else {
          planServices.getProductTypeList({}).then(function (res) {
            that.product_type_data = [...res.product_type_cd_data]
            that.setValues()
            that.setAddInit()
          })
        }
        that.open()
      })

      window.Vue.$on('drugSelected', function (item) {
        if (item.NDC) {
          that.info['Drug ID'] = item.NDC
          item['Product Name'] = item['Product Name'] === null ? '' : item['Product Name']
          item['Form Desc'] = item['Form Desc'] === null ? '' : item['Form Desc']
          item['Strength'] = item['Strength'] === null ? '' : item['Strength']
          that.info['Drug Desc'] = item['Product Name'] + ' ' + item['Form Desc'] + ' ' + item['Strength']
        } else {
          that.info['Drug ID'] = item.GPI
          item['Brand Name'] =  item['Brand Name'] === null ? '' : item['Brand Name']
          item['Form'] =  item['Form'] === null ? '' : item['Form']
          that.info['Drug Desc'] = item['Brand Name'] + ' ' + item['Form']
        }
        that.back()
      })
    },
    methods: {
      setAddInit() {
        this.info = {
          "Drug ID Type": '',
          "Drug ID": '',
          "Drug Desc": '',
          "Drug Type": '',
          "Drug ID Type1": '',
          "Product Type Code": '-1',
          "Product Type Desc": '',
          "Tier": '-1',
          "Include/Exclude": 'I',
          "PA Req": 'N',
          "Min Qty": '',
          "Max Qty": '',
          "Max Qty Term": '',
          "Min Age": '',
          "Max Age": '',
          "Supply Limit": '',
          "Start Date": convertDate((new Date()).toLocaleDateString()),
          "End Date": convertDate((new Date('12/31/9998')).toLocaleDateString()),
          "Response Message": '',
        }
        this.network_id = -1
        this.include_exclude_ind = true
        this.all_plans_flg = "F"
        this.info['Max Qty Term'] = (this.info['Max Qty Term']).replace(/\s/g, '') === '' ? '-1' : (this.info['Max Qty Term']).replace(/\s/g, '')
      },
      setEditInit(obj) {
        if (this.info['End Date'] !== '12/31/9998') {
          this.isIncludeEnd = true
        } else {
          this.isIncludeEnd = false
        }
        this.info['Start Date'] = convertDate(this.info['Start Date'])
        this.info['End Date'] = convertDate(this.info['End Date'])
        this.network_id = obj['Network ID']
        if (this.info['Drug Type'] === null || this.info['Drug Type'] === '\u0000') this.info['Drug Type'] = ''
        if (this.info['Tier'] === "") this.info['Tier'] = '-1'
        this.info['Max Qty Term'] = (this.info['Max Qty Term']).replace(/\s/g, '') === '' ? '-1' : (this.info['Max Qty Term']).replace(/\s/g, '')
      },
      setValues() {
        this.networkList = [...this.$store.state.planSetupData.network_data]
        this.networkList.unshift({network_id: -1, desc_txt: 'All Networks'})
        this.product_type_data.unshift({product_type_cd: '-1', product_type_desc_txt: 'NA'})
        this.termList = [...this.$store.state.planSetupData.term_cd_syscode]
        this.termList.unshift({field_value: '-1', desc_txt: 'NA'})
      },
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      },
      back: function () {
        this.active = 'main'
        this.drug_name = ''
      },
      find: function () {
        this.active = 'find'
      },
      removeDrug: function () {
        const that = this
        const data = {
          session_uid: this.$store.state.user.session_uid,
          session_id: this.$store.state.user.session_id,
          pcc: this.$store.state.pcn.pcc,
          group_id: this.$store.state.selectedPlan.group_id,
          plan_id: this.$store.state.selectedPlan.plan_id,
          drug_id_type_cd: this.info['Drug ID Type'],
          drug_id: this.info['Drug ID'],
          effect_start_dt: (new Date(this.info['Start Date'])).toLocaleDateString(),
          all_plans_flg: this.all_plans_flg,
          groups: '*'
        }

        planServices.deletePlanDrug(data).then(function (res) {
          if (res === "0") {
            that.isDisabledSave = true
            window.Vue.$emit('snackbar', 'success', 'Delete Plan Drug!')
            window.Vue.$emit('loadDrugList')
            that.show = false
          }
        })
      },
      add: function () {
        const that = this
        const data = {
          session_uid: this.$store.state.user.session_uid,
          session_id: this.$store.state.user.session_id,
          pcc: this.$store.state.pcn.pcc,
          group_id: this.$store.state.selectedPlan.group_id,
          plan_id: this.$store.state.selectedPlan.plan_id,
          drug_id_type_cd: (this.info['Drug ID']).length === 14 ? 'G' : 'N',
          drug_type_cd: this.info['Drug Type'],
          drug_id: this.info['Drug ID'],
          tier: this.info['Tier'],
          include_exclude_ind: this.info['Include/Exclude'],
          effect_start_dt: (new Date(this.info['Start Date'])).toLocaleDateString(),
          effect_end_dt: this.isIncludeEnd ? (new Date(this.info['End Date'])).toLocaleDateString() : '12/31/9998',
          msg_txt: this.info['Response Message'],
          drug_desc_txt: this.info['Drug Desc'],
          min_age: this.info['Min Age'] || 0,
          max_age: this.info['Max Age'] || 0,
          min_qty: this.info['Min Qty'] || 0,
          max_qty: this.info['Max Qty'] || 0,
          pa_req_ind: this.info['PA Req'],
          ds_qty_limit: this.info['Supply Limit'] || 0,
          all_plans_flg: this.all_plans_flg,
          groups: '',
          product_type_cd: this.info['Product Type Code'],
          network_id: Number(this.network_id),
          qty_term_cd: this.info['Max Qty Term']
        }
        if (this.$refs.form.validate()) {
          planServices.addPlanDrug(data).then(function (res) {
            that.saveLoading = true
            if (res === "0") {
              that.saveLoading = false
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'Plan Drug Data Saved!')
              window.Vue.$emit('loadDrugList')
              that.show = false
            }
          })
        }
      },
      save: function () {
        const that = this
        const data = {
          "session_uid": this.$store.state.user.session_uid,
          "drug_desc": this.info['Drug Desc'],
          "tier": this.info['Tier'],
          "include_exclude_ind": this.info['Include/Exclude'],
          "drug_type_cd": this.info['Drug Type'],
          "curr_start_dt": this.curr_start_dt,
          "start_dt": (new Date(this.info['Start Date'])).toLocaleDateString(),
          "end_dt": this.isIncludeEnd ? (new Date(this.info['End Date'])).toLocaleDateString() : '12/31/9998',
          "msg_txt": this.info['Response Message'],
          "group_id": this.$store.state.selectedPlan.group_id,
          "plan_id": this.$store.state.selectedPlan.plan_id,
          "drug_id": this.info['Drug ID'],
          "drug_id_type_cd": this.info['Drug ID Type'],
          "curr_network_id": this.cur_network_id,
          "network_id": this.network_id,
          "min_age": this.info['Min Age'] || 0,
          "max_age": this.info['Max Age'] || 0,
          "min_qty": this.info['Min Qty'] || 0,
          "max_qty": this.info['Max Qty'] || 0,
          "pa_req_ind": this.info['PA Req'],
          "ds_qty_limit": this.info['Supply Limit'] || 0,
          "all_plans_flg": this.all_plans_flg,
          "pcc": this.$store.state.pcn.pcc,
          "groups": '',
          "product_type_cd": this.info['Product Type Code'],
          "qty_term_cd": this.info['Max Qty Term']
        }

        if (this.$refs.form.validate()) {
          planServices.updatePlanDrug(data).then(function (res) {
            if (res === "0") {
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'Plan Drug Data Saved!')
              window.Vue.$emit('loadDrugList')
              that.show = false
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
