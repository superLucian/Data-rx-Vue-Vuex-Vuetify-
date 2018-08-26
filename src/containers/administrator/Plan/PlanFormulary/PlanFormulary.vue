<template>
  <main>
    <v-card-text class="my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs4>
          <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs class="text-xs-right">
          <v-btn fab dark small class="primary mt-3" @click.native="add()">
            <v-icon dark>add</v-icon>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="planFormularyList"
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
                    <span>Edit</span>
                  </v-tooltip>
                  <delete-confirm v-on:confirmed="confirmDelete(props.item)" :message="'Delete'"></delete-confirm>
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
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Tier :</span> {{ props.item['Tier'] }}</p>
                    <p><span>Include/Exclude :</span> {{ props.item['Include/Exclude'] }}</p>
                    <p><span>Rank:</span> {{ props.item['Rank'] }}</p>
                    <p><span>Form ID:</span> {{ props.item['Form ID'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Created By :</span> {{ props.item['Created By'] }}</p>
                    <p><span>Created Date:</span> {{ convertDate(props.item['Created Date']) }}</p>
                    <p><span>Updated By:</span> {{ props.item['Updated By'] }}</p>
                    <p><span>Updated Date:</span> {{ convertDate(props.item['Updated Date']) }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Formulary:</span> {{ props.item['Formulary'] }}</p>
                    <p><span>PA Required:</span> {{ props.item['PA Required'] }}</p>
                    <p><span>PCN :</span> {{ props.item['PCN'] }}</p>
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
          <div v-else-if="mode==='add'">Add Plan Formulary</div>
          <div v-else-if="mode==='edit'">Edit Plan Formulary</div>
          <div v-else-if="mode==='view'">Formulary Drug List</div>

        </v-toolbar-title>
      </v-toolbar>

      <v-layout row wrap class="plan-formulary-form">
        <v-flex xs12>

          <formulary-find v-if="mode==='find' || mode==='add'" :close="close" :mode="mode"
                          :changeMode="changeMode"></formulary-find>

          <formulary-edit v-if="mode==='edit'" :close="close" :mode="mode"
                          :planFormulary="planFormulary"></formulary-edit>

          <formulary-view-details v-if="mode==='view'" :close="close" :mode="mode"
                                  :planFormulary="planFormulary"></formulary-view-details>

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

  import FormularyEdit from './FormularyEdit.vue'
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
        planFormulary: {
          "group_id": null,
          "Plan": '',
          "network_id": -1,
          "plan_id": '',
          "Network": '',
          "Formulary": '',
          "Start Date": '',
          "End Date": '',
          "Tier": null,
          "Include/Exclude": '',
          "PA Required": '',
          "Rank": null,
          "Form ID": null,
          "PCN": '',
          "Created By": '',
          "Created Date": '',
          "Updated By": '',
          "Updated Date": ''
        },
        planFormularyList: [],
        network_data_list: [],
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

      this.getPlanFormularyListFunc()
      const that = this

      planServices.getNetworkList({pcc: this.$store.state.pcn.pcc}).then(function (res) {
        const networkList = [...res.network_list]
        networkList.unshift({'Network ID': -1, 'Network Desc': 'All Networks'})
        that.network_data_list = networkList;
        store.commit('UPDATE_PLAN_SETUP_DATA', {network_list: networkList})
      }).catch(function (e) {

      })
    },
    methods: {
      convertDate: convertDate,
      getPlanFormularyListFunc: function () {
        const data = {
          "group_id": this.$store.state.selectedPlan.group_id,
          "plan_id": this.$store.state.selectedPlan.plan_id
        }
        const that = this
        planServices.getPlanFormularyList(data).then(function (res) {
          that.planFormularyList = res.plan_formulary.map(v => (Object.assign({}, {...v}, {new_network_id: v['network_id']})))
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
        if (refetching)
          this.getPlanFormularyListFunc()
      },

      editRow: function (item) {
        this.mode = 'edit'
        this.showModal = true;
        this.planFormulary = item
      },

      confirmDelete: function (item) {
        const that = this
        const data = {
          "group_id": this.$store.state.selectedPlan.group_id,
          "plan_id": this.$store.state.selectedPlan.plan_id,
          "network_id": item['network_id'],
          "form_id": item['Form ID'],
          "session_uid": this.$store.state.user.session_uid
        }
        planServices.deletePlanFormulary(data).then(function (res) {
          window.Vue.$emit('snackbar', 'success', 'Deleted Item Successfully!')
          that.getPlanFormularyListFunc()
        }).catch(function (e) {
          window.Vue.$emit('snackbar', 'error', 'Delete Failed!')
        })
      },
      viewFormulary: function (item) {
        this.mode = 'edit'
        this.showModal = true;
        this.planFormulary = item
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
