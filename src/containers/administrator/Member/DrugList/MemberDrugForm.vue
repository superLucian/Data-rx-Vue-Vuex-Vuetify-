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
              Member Drug {{type}}
            </v-toolbar-title>
          </v-toolbar>
          <div class="my-scroll-enabled">
            <v-layout row wrap>
              <template v-if="type === 'add'">
                <v-flex xs8>
                  <v-card-text>
                    <v-text-field label="Drug Id" v-model="info['Drug Id']" :disabled="true" hide-details required
                                  :rules="[rules.required]"></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text>
                    <v-btn color="primary-color" @click.native="find" block>Find</v-btn>
                  </v-card-text>
                </v-flex>
              </template>
              <template v-if="type === 'edit'">
                <v-flex xs12>
                  <v-card-text>
                    <v-text-field label="Drug Id" v-model="info['Drug Id']" disabled hide-details required
                                  :rules="[rules.required]"></v-text-field>
                  </v-card-text>
                </v-flex>
              </template>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Drug Desc" v-model="info['Drug Name']" required
                                :rules="[rules.required]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="drugListType"
                    v-model="info.drug_type_code"
                    label="Drug Type"
                    item-text="text"
                    item-value="code"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="tierList"
                    v-model="info['*Tier']"
                    label="Tier"
                    item-text="text"
                    item-value="code"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Supply Limit" v-model="info['*Supply Limit']" type="Number"
                                suffix="% of Days Supply" :rules="[rules.supplyRules]" :counter="5"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-text-field label="Min Days:" v-model="info['*Min Days']" type="Number"
                                :rules="[rules.dayRules, rules.ldTMax]" :counter="4"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-text-field label="Max Days:" v-model="info['*Max Days']" type="Number"
                                :rules="[rules.dayRules, rules.gdTMin]" :counter="4"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-text-field label="Min Quantity:" v-model="info['*Min Qty']" type="Number"
                                :rules="[rules.qtyRules, rules.lqTMax]" :counter="5"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-text-field label="Max Quantity:" v-model="info['*Max Qty']" type="Number"
                                :rules="[rules.qtyRules, rules.gqTMin]" :counter="5"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="termList"
                    v-model="info.qty_term_cd"
                    label="Per"
                    item-text="desc_txt"
                    item-value="field_value"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <date-picker label="Start Date" v-model="info['*Start Dt']"></date-picker>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <v-checkbox label="Include 'End Date'" v-model="isIncludeEnd"
                              color="primary-color"></v-checkbox>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0" v-if="isIncludeEnd">
                  <date-picker label="End Date" v-model="info['*End Dt']"></date-picker>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs3>
                <v-card-text>
                  <v-checkbox label="Exclude from plan?" v-model="info['*Inc/Ex']"
                              color="primary-color" true-value="E" false-value="I"></v-checkbox>
                </v-card-text>
              </v-flex>
              <v-flex xs9>
                <v-card-text class="py-0">
                  <v-text-field label="Response Message" v-model="info['*Response Message']"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field label="Sig" v-model="info['*Sig']"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
          </div>
          <v-divider></v-divider>
          <v-card-actions class="d-block text-xs-center">
            <v-btn color="primary-color" @click.native="save">Save</v-btn>
            <v-btn @click.native="close">Close</v-btn>
          </v-card-actions>
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
  import drugServices from '../../../../services/drug/drugServices'
  import formularyServices from '../../../../services/formulary/formularyServices'
  import memberServices from '../../../../services/member/memberServices'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import {convertDate, convertStringDate, stringToDate} from '../../../../components/utils/DateMethods'
  import DatePicker from "../../../../components/common/DatePicker.vue";
  import DrugFind from "../../../drugs/DrugsDatabase/DrugDatabase.vue";
  import VForm from "vuetify/es5/components/VForm/VForm";

  export default {
    name: 'member-drug-form',
    data() {
      return {
        info: {},
        show: false,
        active: 'main',
        type: '',
        width: 1000,
        height: 0,
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
        drugListType: [
          {'code': '', 'text': 'All'},
          {'code': 'B', 'text': 'Brand'},
          {'code': 'G', 'text': 'Generic'}
        ],
        termList: [],
        isIncludeEnd: false,
        drug_name: '',
        isDisableFind: true,
        headers: [
          {text: '', align: 'left', sortable: true, value: ''},
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
        searchResult: [],
        pagination: {
          rowsPerPage: 10
        },
        search: '',
        loading: false,
        isDisabledSelect: true,
        isDisabled: true,
        rules: {
          required: (value) => !!value || 'Required.',
          ldTMax: (v) => {
            if (this.info['*Max Days']) {
              return v <= this.info['*Max Days'] || 'Should be less than Max Days Value'
            }
            return true
          },
          gdTMin: (v) => {
            return v >= this.info['*Min Days'] || 'Should be more than Min Days Value'
          },
          lqTMax: (v) => {
            if (this.info['*Max Qty']) {
              return v <= this.info['*Max Qty'] || 'Should be less than Max Quantities Value'
            }
            return true
          },
          gqTMin: (v) => {
            return v >= this.info['*Min Qty'] || 'Should be more than Min Quantities Value'
          },
          supplyRules: (v) => v < 100000 || 'Supply Limit must be less more than 99999 .',
          dayRules: (v) => v < 9999 || 'Day Limit must be less more than 9999.',
          qtyRules: (v) => v <= 99999 || 'Quantity Limit must be less more than 99999.',
        }
      }
    },
    watch: {
      drug_name: function (val) {
        if (val.length > 0)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      },
    },
    components: {
      VForm,
      DrugFind,
      DatePicker,
      Vodal
    },
    mounted() {
      const that = this
//      Open Member Drug Edit Form signal
      window.Vue.$on('openMemberDrugForm', function (type, object) {
        that.type = type
        that.info = {...object}
        that.setValues()
        that.open()
      })

      window.Vue.$on('drugSelected', function (item) {
        if (item.NDC) {
          that.info['Drug Id'] = item.NDC
          item['Product Name'] = item['Product Name'] === null ? '' : item['Product Name']
          item['Form Desc'] = item['Form Desc'] === null ? '' : item['Form Desc']
          item['Strength'] = item['Strength'] === null ? '' : item['Strength']
          that.info['Drug Name'] = item['Product Name'] + ' ' + item['Form Desc'] + ' ' + item['Strength']
        } else {
          that.info['Drug Id'] = item.GPI
          item['Brand Name'] =  item['Brand Name'] === null ? '' : item['Brand Name']
          item['Form'] =  item['Form'] === null ? '' : item['Form']
          that.info['Drug Name'] = item['Brand Name'] + ' ' + item['Form']
        }
        that.back()
      })
    },
    methods: {
      setValues() {
        this.info['*Start Dt'] = convertDate(this.info['*Start Dt'])
        this.info['*End Dt'] = convertDate(this.info['*End Dt'])
        if (this.info['*Supply Limit'] === null || this.info['*Supply Limit'] === undefined) this.info['*Supply Limit'] = ''
        else this.info['*Supply Limit'] = (this.info['*Supply Limit']).toString()

        if (this.info['*End Dt'] !== '12/31/9998') {
          this.isIncludeEnd = true
        } else {
          this.isIncludeEnd = false
        }
        if (this.info['*Drug Type'] === null) this.info['*Drug Type'] = ''
        if (this.info['*Tier'] === '') this.info['*Tier'] = '-1'

        if (this.info['*Drug Type'] === 'All') this.info.drug_type_code = ''
        else if (this.info['*Drug Type'] === 'Brand') this.info.drug_type_code = 'B'
        else if (this.info['*Drug Type'] === 'Generic') this.info.drug_type_code = 'G'

        const that = this
        formularyServices.getTermCodeList({}).then(function (res) {
          that.termList = [...res.term_cd_data]
          that.termList.unshift({'field_value': '', 'desc_txt': 'NA'})
          that.info.qty_term_cd = that.info.qty_term_cd.trim() || ''
        })
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
        this.searchResult = []
        this.selectedDrug = []
      },
      find: function () {
        this.active = 'find'
      },
      drugFind: function () {
        const data = {
          group_id: 0,
          drug_cd: this.drug_name,
          drug_file_cd: 0,
          drug_type_cd: 0,
          drug_list_type_cd: 0,
          strength: '',
          form: '',
          repack_flg: 'T',
          outdated_flg: 'T'
        }
        this.loading = true
        const that = this
        drugServices.getSelectedDrugList(data).then(function (d) {
          that.searchResult = d.selected_drug_list
          that.loading = false
        })
      },
      save: function () {
        if (!this.$refs.form.validate()) return null

        const that = this
        if (this.isIncludeEnd === false) this.info['*End Dt'] = '12/31/9998'
        if (this.type === 'edit') {
          memberServices.updateMemberDrug(this.info, this.$store.state.user).then(function (res) {
            if (res === "0") {
              window.Vue.$emit('reloadMemberDrugs')
              window.Vue.$emit('snackbar', 'success', 'Member Drug Updated!')
              that.back()
              that.close()
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        } else {
          if (this.$store.state.selectedMember.MemberId !== '' || this.$store.state.selectedMember.PersonCode !== '') {
            memberServices.addMemberDrug(this.info, this.$store.state.user, this.$store.state.selectedMember).then(function (res) {
              window.Vue.$emit('reloadMemberDrugs')
              window.Vue.$emit('snackbar', 'success', 'Member Drug Added!')
              that.back()
              that.close()
            })
          } else {
            window.Vue.$emit('snackbar', 'error', 'You need Member Id and Person Code! Please add the member info in first.')
          }
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
