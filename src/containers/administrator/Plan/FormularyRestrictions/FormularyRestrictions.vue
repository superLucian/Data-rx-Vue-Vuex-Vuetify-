<template>
  <main>
    <v-card-text class="my-scroll-enabled-1">
      <v-layout row>
        <v-flex xs4>
          <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4 class="text-xs-right">
          <div class="subAdd">
            <v-btn fab dark small class="primary mt-3" @click.native="add()">
              <v-icon>add</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="planFormularyRestrictionsList"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
            item-key="Form ID"
          >
            <template slot="items" slot-scope="props">
              <tr>

                <td @click="props.expanded = !props.expanded" class="text-xs-center px-0">
                  <v-tooltip top v-if="props.expanded">
                    <v-btn icon slot="activator">
                      <v-icon>expand_less</v-icon>
                    </v-btn>
                    <span>Close</span>
                  </v-tooltip>
                  <v-tooltip top v-else>
                    <v-btn icon slot="activator">
                      <v-icon>expand_more</v-icon>
                    </v-btn>
                    <span>View details</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left">
                  <v-tooltip top>
                    <v-btn icon @click="editRow(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit Formulary_restrictions</span>
                  </v-tooltip>
                  <delete-confirm v-on:confirmed="deleteItem(props.item)" :message="'Delete'"></delete-confirm>
                </td>

                <td class="text-xs-left">{{ props.item['Plan'] }}</td>
                <td class="text-xs-left">{{ convertNetwork(props.item['network_id']) }}</td>
                <td class="text-xs-left">{{ props.item['Formulary'] }}</td>
                <td class="text-xs-left">{{ props.item['Start Date'] }}</td>
                <td class="text-xs-left">{{ props.item['End Date'] }}</td>
                <td class="text-xs-left">{{ props.item['Rank'] }}</td>
                <td class="text-xs-left">{{ props.item['Form ID'] }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-layout row wrap class="px-5">
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Plan :</span> {{ props.item['Plan'] }}</p>
                    <p><span>Network :</span> {{ convertNetwork(props.item['network_id']) }}</p>
                    <p><span>Start Date:</span> {{ props.item['Start Date'] }}</p>
                    <p><span>End Date:</span> {{ props.item['End Date'] }}</p>
                    <p><span>Max QTY :</span> {{ props.item['Max QTY'] }}</p>
                    <p><span>Min QTY :</span> {{ props.item['Min QTY'] }}</p>

                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Max Days :</span> {{ props.item['Max Days'] }}</p>
                    <p><span>QTY Term :</span> {{ props.item['QTY Term'] }}</p>
                    <p><span>Rank:</span> {{ props.item['Rank'] }}</p>
                    <p><span>Form ID:</span> {{ props.item['Form ID'] }}</p>
                    <p><span>PCN :</span> {{ props.item['PCN'] }}</p>
                    <p><span>QTY Term :</span> {{ props.item['QTY Term'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Created By :</span> {{ props.item['Created By'] }}</p>
                    <p><span>Created Date:</span> {{ convertDate(props.item['Created Date']) }}</p>
                    <p><span>Updated By:</span> {{ props.item['Updated By'] }}</p>
                    <p><span>Updated Date:</span> {{ convertDate(props.item['Updated Date']) }}</p>
                    <p><span>Min Age :</span> {{ props.item['Min Age'] }}</p>
                    <p><span>Max Age :</span> {{ props.item['Max Age'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Days QTY Limit:</span> {{ props.item['Days QTY Limit'] }}</p>
                    <p><span>Gender:</span> {{ props.item['Gender'] }}</p>
                    <p><span>Message Text :</span> {{ props.item['Message Text'] }}</p>
                    <p><span>Formulary :</span> {{ props.item['Formulary'] }}</p>
                    <p><span>PA Required :</span> {{ props.item['PA Required'] }}</p>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <Vodal
      :show="showModal"
      animation="zoom"
      :closeButton="false"
      :width="900"
      :height="500"
      :closeOnClickMask="true"
      v-on:hide="close"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">

          <div v-if="mode==='find'">Formulary Find</div>
          <div v-else-if="mode==='add'">Add Plan Formulary Restrictions</div>
          <div v-else-if="mode==='edit'">Edit Plan Formulary Restrictions</div>
          <div v-else-if="mode==='view'">Formulary Drug List</div>

        </v-toolbar-title>
      </v-toolbar>

      <v-layout row wrap class="plan-formulary-form">
        <v-flex xs12>

          <formulary-find v-if="mode==='find' || mode==='add'" :close="close" :mode="mode"
                          :changeMode="changeMode"></formulary-find>

          <formulary-edit v-if="mode==='edit'" :close="close" :mode="mode"
                          :planFormularyRestrictions="planFormularyRestrictions"></formulary-edit>

          <formulary-view-details v-if="mode==='view'" :close="close" :mode="mode"
                                  :planFormularyRestrictions="planFormularyRestrictions"></formulary-view-details>

        </v-flex>
      </v-layout>
    </Vodal>
  </main>
</template>

<script>
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import store from '../../../../store'
  import {convertDate} from '../../../../components/utils/DateMethods'
  import planServices from '../../../../services/plan/planServices'

  import FormularyEdit from './FormularyRestrictionsEdit.vue'
  import FormularyFind from './FormularyFind.vue'
  import FormularyViewDetails from './FormularyViewDetails.vue'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'

  export default {
    name: 'plan-formularay',
    data() {
      return {
        fill_menu: null,
        received_menu: null,
        mode: 'root',
        planFormularyRestrictions: {},
        planFormularyRestrictionsList: [],
        network_data_list: [],
        genderList: [],
        search: '',
        filter: 'Active',
        pagination: {
          rowsPerPage: 30,
          sortBy: 'Rank'
        },
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Plan', align: 'left', sortable: true, value: 'Plan'},
          {text: 'Network', align: 'left', sortable: true, value: 'Network'},
          {text: 'Formulary', align: 'left', sortable: true, value: 'Formulary'},
          {text: 'Start Date', align: 'left', sortable: true, value: 'Start Date'},
          {text: 'End Date', align: 'left', sortable: true, value: 'End Date'},
          {text: 'Rank', align: 'left', sortable: true, value: 'Rank'},
          {text: 'Form ID', align: 'left', sortable: true, value: 'Form ID'},
        ],
        showModal: false,
        loading: false,
        isDisabledSave: false,
        rules: {
          required: (value) => {
            return !!value || 'Required'
          }
        }
      }
    },
    components: {DeleteConfirm, Vodal, FormularyEdit, FormularyFind, FormularyViewDetails},
    mounted() {
      console.log('----- Administrator / Plan / Plan Formulary mounted -----')

      const that = this
      this.getList();

      planServices.getNetworkList({pcc: this.$store.state.pcn.pcc}).then(function (res) {
        const networkList = [...res.network_list]
        networkList.unshift({'Network ID': -1, 'Network Desc': 'All Networks'})
        that.network_data_list = networkList;
        store.commit('UPDATE_PLAN_SETUP_DATA', {network_list: networkList})
      }).catch(function (e) {

      })

      planServices.getGenderList({}).then(function (res) {
        const genderData = res.sex_cd_data
        genderData.unshift({'field_value': -1, 'desc_txt': 'All'})
        that.genderList = genderData;
        store.commit('UPDATE_PLAN_SETUP_DATA', {gender_data: genderData})
      }).catch(function (e) {

      })

    },
    methods: {
      convertDate: convertDate,
      getList: function () {
        const that = this
        const data = {
          "group_id": this.$store.state.selectedPlan.group_id,
          "plan_id": this.$store.state.selectedPlan.plan_id
        }
        planServices.getPlanFormularyRestrictionsList(data).then(function (res) {
          that.planFormularyRestrictionsList = res.plan_formulary_restrict;
        }).catch(function (e) {

        })
      },
      add: function () {
        this.mode = 'find'
        this.showModal = true
      },
      close: function (refetching = false) {
        this.showModal = false
        const that = this
        setTimeout(function () {
          that.mode = 'root'
        }, 500)
        if (refetching) {
          this.getList();
        }
      },
      editRow: function (item) {
        this.mode = 'edit'
        this.showModal = true;

        const genderValue = this.genderList.filter((v) => (v.desc_txt.toUpperCase() == item['Gender']))
        const selectedItem = Object.assign({}, {...item},
          {
            'Gender': genderValue.length > 0 ? genderValue[0]['field_value'] : -1,
            'QTY Term': item['QTY Term'] ? item['QTY Term'] : "-1"
          }
        )

        this.planFormularyRestrictions = selectedItem
      },

      deleteItem: function (item) {
        const that = this
        const data = {
          "group_id": this.$store.state.selectedPlan.group_id,
          "plan_id": this.$store.state.selectedPlan.plan_id,
          "form_id": item['Form ID'],
          "effect_start_dt": item['Start Date'],
          "session_uid": this.$store.state.user.session_uid
        }
        planServices.deletePlanFormularyRestrictions(data).then(function (res) {
          window.Vue.$emit('snackbar', 'success', 'Deleted Item Successfully!')
          that.getList()
        }).catch(function (e) {
          window.Vue.$emit('snackbar', 'error', 'Delete Failed!')
        })
      },
      viewFormulary: function (item) {
        this.mode = 'edit'
        this.showModal = true;
        this.planFormularyRestrictions = item
      },
      changeMode: function (v) {
        this.mode = v
      },
      convertNetwork: function (networkId) {
        const networkObj = this.network_data_list.filter((v) => (v['Network ID'] === networkId))
        if (networkObj.length > 0) {
          return networkObj[0]['Network Desc']
        } else {
          return ''
        }
      }
    }
  }
</script>
<style lang="stylus">
  .plan-formulary-container {
    td.handCell {
      padding: 0 !important;
      margin: 0;
    }
  }
</style>
