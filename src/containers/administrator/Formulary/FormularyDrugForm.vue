<template>
  <v-layout row justify-center>
    <vodal
      :show="show"
      animation="zoom"
      :closeButton="false"
      :width="width"
      :height="height"
    >
      <v-toolbar v-if="active === 'main'">
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          Formulary Drug {{ type }}
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form">
        <template v-if="active === 'main'">
          <v-layout row wrap class="my-sub-scroll-enabled">
            <template v-if="type === 'add'">
              <v-flex xs8>
                <v-card-text class="pb-0">
                  <v-text-field label="Drug Id*" v-model="info.drug_id" :rules="[rules.required]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text class="pb-0">
                  <v-btn color="primary-color" @click.native="find" block>Find</v-btn>
                </v-card-text>
              </v-flex>
            </template>
            <template v-if="type === 'edit'">
              <v-flex xs6>
                <v-card-text class="pb-0">
                  <v-text-field label="Drug Id*" v-model="info.drug_id" :disabled="true" hide-details
                                :rules="[rules.required]"></v-text-field>
                </v-card-text>
              </v-flex>
            </template>
            <v-flex xs6>
              <v-card-text v-if="type === 'edit'" class="pb-0">
                <v-text-field label="Drug Desc*" v-model="info.drug_desc_txt" :rules="[rules.required]"></v-text-field>
              </v-card-text>
              <v-card-text v-else class="py-0">
                <v-text-field label="Drug Desc*" v-model="info.drug_desc_txt" :rules="[rules.required]"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-select
                  v-bind:items="networkList"
                  v-model="info.network_id"
                  label="Network:"
                  item-text="Network Desc"
                  item-value="Network ID"
                  bottom
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-select
                  v-bind:items="drugTypeList"
                  v-model="info.drug_type_cd"
                  label="Drug Type:"
                  item-text="desc_txt"
                  item-value="field_value"
                  bottom
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-select
                  v-bind:items="product_type_data"
                  v-model="info.product_type_cd"
                  label="Product Type:"
                  item-text="product_type_desc_txt"
                  item-value="product_type_cd"
                  bottom
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-select
                  v-bind:items="tierList"
                  v-model="info.tier"
                  label="Tier:"
                  item-text="text"
                  item-value="code"
                  bottom
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-select
                  v-bind:items="genderList"
                  v-model="info.gender"
                  label="Gender:"
                  item-text="desc_txt"
                  item-value="field_value"
                  bottom
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-text-field label="Supply Limit:" v-model="info.ds_qty_limit" type="Number"
                              suffix="% of Days Supply" :rules="[rules.supplyRules]" :counter="2"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs2>
              <v-card-text class="py-0">
                <v-text-field label="Min Days:" v-model="info.min_days" type="number"
                              :rules="[rules.dayRules, rules.ldTMax]" :counter="3"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs2>
              <v-card-text class="py-0">
                <v-text-field label="Max Days:" v-model="info.max_days" type="number"
                              :rules="[rules.dayRules, rules.gdTMin]" :counter="3"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs2>
              <v-card-text class="py-0">
                <v-text-field label="Age Min:" v-model="info.min_age" type="number"
                              :rules="[rules.ageRules, rules.laTMax]" :counter="3"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs2>
              <v-card-text class="py-0">
                <v-text-field label="Age Max:" v-model="info.max_age" type="number"
                              :rules="[rules.ageRules, rules.gaTMin]" :counter="3"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs2>
              <v-card-text class="py-0">
                <v-text-field label="Min Quantity:" v-model="info.min_qty" type="number"
                              :rules="[rules.qtyRules, rules.lqTMax]" :counter="5"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs2>
              <v-card-text class="py-0">
                <v-text-field label="Max Quantity:" v-model="info.max_qty" type="number"
                              :rules="[rules.qtyRules, rules.gqTMin]" :counter="5"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="py-0">
                <v-select
                  v-bind:items="termList"
                  v-model="info.qty_term_cd"
                  label="Per:"
                  item-text="desc_txt"
                  item-value="field_value"
                  bottom
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="py-0">
                <v-menu
                  lazy
                  :close-on-content-click="true"
                  transition="scale-transition"
                  offset-y
                  full-width
                  :nudge-left="40"
                  max-width="290px"
                >
                  <v-text-field
                    slot="activator"
                    label="Start Date"
                    v-model="info.effect_start_dt"
                    prepend-icon="event"
                    readonly
                  ></v-text-field>
                  <v-date-picker v-model="info.effect_start_dt" scrollable no-title></v-date-picker>
                </v-menu>
              </v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-checkbox class="pt-3" label="Include 'End Date'" v-model="isIncludeEnd"
                          color="primary-color"></v-checkbox>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="py-0">
                <v-menu v-if="isIncludeEnd === true"
                        lazy
                        :close-on-content-click="true" transition="scale-transition" offset-y
                        full-width
                        :nudge-left="40" max-width="290px">
                  <v-text-field slot="activator" label="End Date" v-model="info.effect_end_dt" prepend-icon="event"
                                readonly></v-text-field>
                  <v-date-picker v-model="info.effect_end_dt" no-title scrollable></v-date-picker>
                </v-menu>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-checkbox label="Exclude from plan?" v-model="info.include_exclude_ind"
                            color="primary-color" true-value="E" false-value="I"></v-checkbox>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-checkbox label="Prior Authorization Required" v-model="info.pa_req_ind"
                            color="primary-color" true-value="Y" false-value="N"></v-checkbox>
              </v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-card-text class="py-0">
                <v-text-field label="Response Message:" v-model="info.msg_txt" multi-line></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-divider></v-divider>
          <v-card-actions class="d-block text-xs-center">
            <v-btn color="primary-color" @click.native="add" v-if="type === 'add'" :disabled="isDisabled">Add<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
            <v-btn color="primary-color" @click.native="save" v-else :disabled="isDisabled">Save<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
            <v-btn @click.native="close">Close</v-btn>
          </v-card-actions>
        </template>
        <template v-if="active === 'find'">
          <drug-find :selectable="true" ></drug-find>
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
  import formularyServices from '../../../services/formulary/formularyServices'
  import drugServices from '../../../services/drug/drugServices'
  import planServices from '../../../services/plan/planServices'
  import Vodal from '../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import {convertDate, convertStringDate, stringToDate} from '../../../components/utils/DateMethods'
  import DrugFind from '../../drugs/DrugsDatabase/DrugDatabase'

  export default {
    name: 'formulary-drug-form',
    data() {
      return {
        info: {},
        show: false,
        width: 1000,
        height: 0,
        type: null,
        networkList: [],
        genderList: [],
        drugTypeList: [],
        product_type_data: [],
        tierList: [
          {'code': -1, 'text': 'NA'},
          {'code': 0, 'text': '0'},
          {'code': 1, 'text': '1'},
          {'code': 2, 'text': '2'},
          {'code': 3, 'text': '3'},
          {'code': 4, 'text': '4'},
          {'code': 5, 'text': '5'},
          {'code': 6, 'text': '6'},
          {'code': 7, 'text': '7'},
          {'code': 8, 'text': '8'},
          {'code': 9, 'text': '9'}
        ],
        termList: [],
        isIncludeEnd: true,
        old: {},
        active: 'main',
        drug_name: '',
        isDisableFind: true,
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'NDC', align: 'left', sortable: true, value: 'NDC'},
          {text: 'Product Name', align: 'left', sortable: true, value: 'Product Name'},
          {text: 'GPI', align: 'left', sortable: true, value: 'GPI'},
          {text: 'Generic Ref Name', align: 'left', sortable: true, value: 'Generic Ref Name'},
          {text: 'Product Type Desc', align: 'left', sortable: true, value: 'Product Type Desc'},
          {text: 'Thera Class Cd', align: 'left', sortable: true, value: 'Thera Class Cd'},
          {text: 'GFC', align: 'left', sortable: true, value: 'GFC'},
          {text: 'GCR', align: 'left', sortable: true, value: 'GCR'},
          {text: 'GCC', align: 'left', sortable: true, value: 'GCC'},
          {text: 'Strength', align: 'left', sortable: true, value: 'Strength'},
          {text: 'Form Desc', align: 'left', sortable: true, value: 'Form Desc'},
          {text: 'Pack Size', align: 'left', sortable: true, value: 'Pack Size'},
          {text: 'ROA', align: 'left', sortable: true, value: 'ROA'},
          {text: 'UOM', align: 'left', sortable: true, value: 'UOM'},
          {text: 'AWP', align: 'left', sortable: true, value: 'AWP'},
          {text: 'HCFA MAC', align: 'left', sortable: true, value: 'HCFA MAC'},
          {text: 'WAC', align: 'left', sortable: true, value: 'WAC'},
          {text: 'DRX MAC', align: 'left', sortable: true, value: 'DRX MAC'},
          {text: 'Single Source', align: 'left', sortable: true, value: 'Single Source'},
          {text: 'Maintenance Drug', align: 'left', sortable: true, value: 'Maintenance Drug'},
          {text: 'Mfg', align: 'left', sortable: true, value: 'Mfg'},
          {text: 'Status', align: 'left', sortable: true, value: 'Status'},
        ],
        pagination: {
          rowsPerPage: 5
        },
        search: '',
        loading: false,
        isDisabledSelect: true,
        isDisabled: true,
        rules: {
          required: (value) => !!value || 'Required.',
          ldTMax: (v) => {return v <= this.info.max_days || 'Should be less than Max Days Value'},
          gdTMin: (v) => {return v >= this.info.min_days || 'Should be more than Min Days Value'},
          laTMax: (v) => {return v <= this.info.max_age || 'Should be less than Max Ages Value'},
          gaTMin: (v) => {return v >= this.info.min_age || 'Should be more than Min Ages Value'},
          lqTMax: (v) => {return v <= this.info.max_qty || 'Should be less than Max Quantities Value'},
          gqTMin: (v) => {return v >= this.info.min_qty || 'Should be more than Min Quantities Value'},
          supplyRules: (v) => v <=100 || 'Supply Limit must be less more than 100 %.',
          dayRules: (v) => v <=999 || 'Day Limit must be less more than 999.',
          ageRules: (v) => v <=999 || 'Age Limit must be less more than 999.',
          qtyRules: (v) => v <=99999 || 'Quantity Limit must be less more than 99999.',
        },

      }
    },
    watch: {
      drug_name: function (val) {
        if (val.length > 0)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      },
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabled = false
        },
        deep: true
      },
    },
    components: {
      DrugFind, Vodal
    },
    mounted() {
      const that = this
      planServices.getNetworkList({pcc: this.$store.state.pcn.pcc}).then(function (res) {
        that.networkList = [...res.network_list]
        that.networkList.unshift({'Network ID': -1, 'Network Desc': 'All Networks'})
      })

      planServices.getProductTypeList({}).then(function (res) {
        that.product_type_data = [...res.product_type_cd_data]
        that.product_type_data.unshift({'product_type_cd': '-1', 'product_type_desc_txt': 'All'})
      })

      planServices.getGenderList({}).then(function (res) {
        that.genderList = [...res.sex_cd_data]
        that.genderList.unshift({'field_value': '-1', 'desc_txt': 'All'})
      })

      formularyServices.getDrugTypeList({}).then(function (res) {
        that.drugTypeList = [...res.drug_type_cd_data]
      })

      formularyServices.getTermCodeList({}).then(function (res) {
        that.termList = [...res.term_cd_data]
        that.termList.unshift({'field_value': '-1', 'desc_txt': 'NA'})
      })

//      Open Edit Formulary Drug signal
      window.Vue.$on('openFormularyDrugForm', function (type, object) {
        that.type = type
        that.old = object
        if (type === 'edit') {
          const data = {
            form_id: object['Form ID'],
            drug_id_type_cd: object['Drug ID Type'],
            drug_id: object['Drug ID'],
            drug_type_cd: object['drug_type_cd'],
            network_id: object['network_id'],
            effect_start_dt: object['Start Date']
          }
          formularyServices.getFormularyDrug(data).then(function (res) {
            that.info = res.formulary_drug[0]
            that.setValues()
          })
        } else {
          that.setAddInit()
          that.setValues()
        }
        that.open()
      })

      window.Vue.$on('drugSelected', function(item) {
        if (item.NDC) {
          that.info.drug_id = item.NDC
          item['Product Name'] = item['Product Name'] === null ? '' : item['Product Name']
          item['Form Desc'] = item['Form Desc'] === null ? '' : item['Form Desc']
          item['Strength'] = item['Strength'] === null ? '' : item['Strength']
          that.info.drug_desc_txt = item['Product Name'] + ' ' + item['Form Desc'] + ' ' + item['Strength']
        } else {
          that.info.drug_id = item.GPI
          item['Brand Name'] =  item['Brand Name'] === null ? '' : item['Brand Name']
          item['Form'] =  item['Form'] === null ? '' : item['Form']
          that.info.drug_desc_txt = item['Brand Name'] + ' ' + item['Form']
        }
        that.back()
      })
    },
    methods: {
      setAddInit: function () {
        this.info = {
          form_id: this.$route.params.fid,
          drug_id: '',
          drug_id_type_cd: 'N',
          drug_desc_txt: '',
          drug_type_cd: '*',
          network_id: -1,
          product_type_cd: '-1',
          tier: '',
          include_exclude_ind: 'I',
          pa_req_ind: ' ',
          min_days: '',
          max_days: '',
          min_qty: '',
          max_qty: '',
          min_age: null,
          max_age: null,
          ds_qty_limit: '',
          qty_term_cd: '-1',
          gender: '',
          effect_start_dt: (new Date()).toLocaleDateString(),
          effect_end_dt: (new Date('12/31/9998')).toLocaleDateString(),
          msg_txt: ''
        }
      },
      setValues() {
        this.info.product_type_cd = this.info.product_type_cd || '-1'
        this.info.tier = this.info.tier || -1
        this.info.gender = this.info.gender.replace(' ', '') || '-1'
        this.info.qty_term_cd = this.info.qty_term_cd || '-1'

        if (this.info.effect_end_dt !== '12/31/9998') {
          this.isIncludeEnd = true
        } else {
          this.isIncludeEnd = false
        }

        this.info.effect_start_dt = stringToDate(this.info.effect_start_dt)
        this.info.effect_end_dt = stringToDate(this.info.effect_end_dt)
      },
      open: function () {
        this.isDisabled = true
        this.pagination.rowsPerPage = 5
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
        this.pagination.rowsPerPage = 5
        this.active = 'find'
      },
      add: function () {
        const that = this
        if (this.$refs.form.validate()) {
          that.loading = true
          formularyServices.addFormularyDrug(this.info, this.$store.state.user).then(function (res) {
            if (res === '0') {
              that.loading = false
              that.close()
              window.Vue.$emit('reloadFormularyDrug')
              window.Vue.$emit('snackbar', 'success', 'Formulary Drug Added!')
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      save: function () {
        const that = this
        if (this.$refs.form.validate()) {
          that.loading = true
          formularyServices.updateFormularyDrug(this.info, this.old, this.$store.state.user).then(function (res) {
            if (res === '0') {
              that.loading = false
              that.close()
              window.Vue.$emit('reloadFormularyDrug')
              window.Vue.$emit('snackbar', 'success', 'Formulary Drug Update!')
            } else {
              that.loading = false
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
