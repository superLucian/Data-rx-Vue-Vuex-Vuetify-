<template>
  <v-layout row justify-center>
    <Vodal
      :show="show"
      animation="zoom"
      :closeButton="false"
      :width="1200"
      :height="0"
      :closeOnClickMask="true"
      v-on:hide="close"
    >
      <div v-if="listOrEdit == 'list'">
        <v-toolbar>
          <v-icon class="white--text">fa-archive</v-icon>
          <v-toolbar-title class="white--text">
            {{ showFind ? 'MAC Find' : 'Group MAC' }}
          </v-toolbar-title>
        </v-toolbar>
        <v-form ref="form">
          <v-container row wrap class="my-sub-scroll-enabled px-0">
            <v-layout row wrap>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field
                    name="plan-id"
                    label="Plan ID"
                    v-model="planMac['PlanId']"
                    disabled
                  ></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field
                    name="network"
                    label="Network"
                    v-model="selectedMP.Network"
                    disabled
                  ></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field
                    name="description"
                    label="MAC Description"
                    v-model="planMac['Description']"
                    disabled
                  ></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-text-field
                    name="mac-fee"
                    label="MAC Fee($)"
                    v-model="planMac['MacFee']"
                    type="number"
                    step="0.01"
                    min="0"
                    :rules="[rules.required, rules.feeRules]" :counter="3"
                  ></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text class="py-0">
                  <v-text-field
                    name="dispense-fee"
                    label="Dispense Fee($)"
                    v-model="planMac['DispenseFee']"
                    type="number"
                    step="0.01"
                    min="0"
                    :rules="[rules.feeRules]" :counter="3"
                  ></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs4>
                <v-card-text class="py-0">
                  <date-picker
                    v-model="planMac['EffectiveStartDate']"
                    label="Start Date"
                  ></date-picker>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text>
                  <v-checkbox label="Group Mac has an end date?" v-model="hasEndDate" hide-details></v-checkbox>
                </v-card-text>
              </v-flex>
              <v-flex xs4 v-if="hasEndDate">
                <v-card-text class="py-0">
                  <date-picker
                    v-model="planMac['EffectiveEndDate']"
                    label="End Date"
                  ></date-picker>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-radio-group v-model="planMac['IsActive']" row>
                    <v-radio label="Active" :value="true"></v-radio>
                    <v-radio label="Inactive" :value="false"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text>
                  <v-checkbox label="340B MAC?" v-model="planMac['Is340B']" hide-details></v-checkbox>
                </v-card-text>
              </v-flex>
            </v-layout>
            <v-card-text class="pt-4 pb-0">
              <v-layout row wrap>
                <v-flex xs3 class="pl-5">
                  <v-subheader class="right">Please Enter the Drug ID or Drug Description</v-subheader>
                </v-flex>
                <v-flex xs6>
                  <v-text-field label="Drug ID or Description" v-model="drug_cd"></v-text-field>
                </v-flex>
                <v-flex xs3>
                  <v-btn color="primary-color" @click.native="find(planMac['MacId'], drug_cd)"
                         :disabled="isDisableFind">find
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-card-text class="py-0">
              <v-layout row wrap>
                <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-btn fab dark class="primary mt-3" small @click.native="add()">
                  <v-icon dark>add</v-icon>
                </v-btn>
                <v-flex xs12>
                  <v-data-table
                    v-bind:headers="headers"
                    :items="items"
                    v-bind:search="search"
                    v-bind:pagination.sync="pagination"
                    :total-items="totalItems"
                    :rows-per-page-items="[100]"
                    :loading="loading"
                  >
                    <template slot="items" slot-scope="props">
                      <tr>
                        <td class="text-xs-center px-0">
                          <v-tooltip top>
                            <v-btn icon @click="editRow(props.item)" slot="activator">
                              <v-icon>edit</v-icon>
                            </v-btn>
                            <span>Edit</span>
                          </v-tooltip>
                          <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
                        </td>
                        <td class="text-xs-center"> {{ props.item['Drug ID'] }}</td>
                        <td class="text-xs-center"> {{ props.item['Drug ID Type'] }}</td>
                        <td class="text-xs-center">{{ props.item['Drug Desc'] }}</td>
                        <td class="text-xs-center">{{ props.item['Unit Price'] }}</td>
                        <td class="text-xs-center">{{ props.item['Quantity'] }}</td>
                        <td class="text-xs-center">{{ props.item['Drug Type Code'] }}</td>
                        <td class="text-xs-center">{{ props.item['Status'] }}</td>
                        <td class="text-xs-center">{{ props.item['mac_id'] }}</td>
                      </tr>
                    </template>
                  </v-data-table>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-container>
          <v-divider></v-divider>
          <v-card-actions class="d-block text-xs-center">
            <div v-show="!showFind">
              <v-btn color="primary-color" @click.native="save(planMac)" :disabled="isDisabledSave">Save</v-btn>
              <v-btn @click.native="close">Close</v-btn>
            </div>
          </v-card-actions>
        </v-form>
      </div>
      <div v-else>
        <drug-mac-edit-form :on-back="back" :drug="selectedDrug"
                            :drugType="drugEditOrAdd"></drug-mac-edit-form>
      </div>
    </Vodal>
  </v-layout>
</template>

<script>
  import Vodal from '../../../components/common/Vodal.vue'
  import MacFind from './MACFindView.vue'
  import DrugMacEditForm from './MACEditForm.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import {stringToDate, convertDate,convertDateTime} from '../../../components/utils/DateMethods'
  import GroupMacService from '../../../services/pbmsys/GroupMacService'
  import drugServices from '../../../services/drug/drugServices'
  import DatePicker from "../../../components/common/DatePicker.vue";
  import DeleteConfirm from '../../../components/common/deleteConfirm'

  export default {
    name: 'drug-mac-form',
    props: ['show', 'close', 'planMac', 'selectedMP'],
    data() {
      return {
        drug_cd: '',
        isDisableFind: true,
        hasEndDate: !!this.planMac['EffectiveEndDate'],
        start_date: null,
        end_date: null,
        Is340B: false,
        saveLoading: false,
        showFind: false,
        isDisabledSave: true,
        rules: {
          required: (value) => !!value || value === 0 || 'Required.',
          feeRules: (v) => {
            return  v < 1000 && v > -1 || 'Should be required "0 =< Mac Fee < 1000"'
          },
        },
        isSaveDisabled: true,
        headers: [
          {text: '', align: '', sortable: false, value: ''},
          {text: 'Drug ID', align: 'center', sortable: true, value: 'Drug ID'},
          {text: 'Drug ID Type', align: 'center', sortable: true, value: 'Drug ID Type'},
          {text: 'Drug Desc', align: 'center', sortable: true, value: 'Drug Desc'},
          {text: 'Unit Price', align: 'center', sortable: true, value: 'Unit Price'},
          {text: 'Quantity', align: 'center', sortable: true, value: 'Quantity'},
          {text: 'Drug Type Code', align: 'center', sortable: true, value: 'Drug Type Code'},
          {text: 'Status', align: 'center', sortable: true, value: 'Status'},
          {text: 'mac_id', align: 'center', sortable: true, value: 'mac_id'}
        ],
        items: [],
        search: '',
        pagination: {
          page: 1,
          rowsPerPage: 100
        },
        loading: false,
        totalItems: 1000,
        listOrEdit: 'list',
        drugListOrAdd: 'edit',
        selectedDrug: {},
        resultDrug: {},
        data: {}
      }
    },
    components: {
      DatePicker,
      Vodal,
      DeleteConfirm,
      DrugMacEditForm
    },
    watch: {
      planMac: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        }, deep: true
      },
      drug_cd: function (d) {
        if (d.length > 0)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      },
      pagination: {
        handler: function () {
          if (this.planMac)
            this.find(this.planMac['MacId'], this.drug_cd)
        }, deep: true
      },
    },
    mounted() {
      console.log('----- Administrator / Plan / Plan Mac /Form mounted -----')
      const that = this
      window.Vue.$on('loadGroupMac', function (item) {
        if(convertDate(item.EffectiveEndDate) === '12/31/9998'){
          that.hasEndDate = false
        }else{
          that.hasEndDate = true
        }
        that.find(item['MacId'], '')
      })
      window.Vue.$on('reloadMacDrugList', function (dItem) {
        that.find(dItem['mac_id'], '')
      })
    },
    methods: {
      find: function (MacId, DrugCd) {
        if (MacId === undefined) return

        this.items = []
        this.loading = true
        const data = {
          mac_id: MacId,
          drug_cd: DrugCd,
          page_num: this.pagination.page - 1
        }
        const that = this
        drugServices.getMacDrugList(data).then(function (res) {
          const {sortBy, descending, page, rowsPerPage} = that.pagination
          let items = res.mac_drug_list

          if (that.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          that.items = items
          that.loading = false
        })
      },
      save(item) {
//        const data = {
//          "entity": {
//            ...item,
//            EffectiveStartDate: item['EffectiveStartDate'] ? stringToDate(item['EffectiveStartDate'], 'yyyy-mm-dd', '-', 'date') : (new Date()).toLocaleDateString(),
//            EffectiveEndDate: item['EffectiveEndDate'] ? stringToDate(item['EffectiveEndDate'], 'yyyy-mm-dd', '-', 'date') : '12/31/9998',
//            CreatedDate: convertDate(item['CreatedDate'])
//          }
//        }
        if (this.hasEndDate) {
          this.data = {
            "entity": {
              ...item,
              CreatedDate: convertDate(item['CreatedDate'])
            }
          }
        } else {
          this.data = {
            "entity": {
              ...item,
              CreatedDate: convertDate(item['CreatedDate']),
              EffectiveEndDate: '12/31/9998'
            }
          }
        }
        const that = this
        const groupMacService = new GroupMacService()
        if (this.$refs.form.validate()) {
          groupMacService.update(this.data).then(function (res) {
            that.saveLoading = true
            that.close()
            that.saveLoading = false
            that.isDisabledSave = true
            window.Vue.$emit('snackbar', 'success', 'Updated Group Mac Successfully!')
          })
        }
      },
      editRow: function (item) {
        this.listOrEdit = 'Edit'
        this.drugEditOrAdd = 'edit'
        const that = this
        drugServices.getMacDrug(item['mac_id'], item['Drug ID'], item['Quantity']).then(function (res) {
          that.selectedDrug = res.mac_drug[0]
        })
      },
      add: function () {
        this.listOrEdit = 'Edit'
        this.drugEditOrAdd = 'add'
        const that = this
        that.selectedDrug = {
          'mac_id': that.planMac['MacId'],
          'drug_type_cd': 'G',
          'status_cd': 'A',
          'drug_tier': -1,
          'quantity': 0,
          'unit_price_amt': 0,
          'msg_txt': ''
        }
      },
      deleteRow: function (item) {
        const data = {
          mac_id: item['mac_id'],
          drug_type_cd: item['Drug Type Code'],
          drug_id: item['Drug ID'],
          quantity: item['Quantity']
        }
        drugServices.deleteMacDrugList(data).then(function (res) {
          if (res === '0') {
            window.Vue.$emit('reloadMacDrugList', data)
            window.Vue.$emit('snackbar', 'success', 'Removed Drug!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      },
      back: function () {
        this.listOrEdit = 'list'
      }
    },
    events: {}
  }
</script>

<style lang="stylus">
</style>
