<template>
  <main>
    <v-layout row justify-space-between>
      <v-flex xs4>
        <v-text-field label="Search" v-model="search" append-icon="search" single-line>
        </v-text-field>
      </v-flex>
      <v-btn fab dark class="primary mt-3" small="" @click.native="add()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table
          v-bind:headers="prescriberHeaders"
          v-bind:items="prescriberList"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading">
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-left handCell" @click="edit(props.item)" style="width: 40px">
                <v-tooltip top>
                  <v-btn icon slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Prescriber Edit</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left">{{ props.item['NPI'] }}</td>
              <td class="text-xs-left">{{ props.item['First Name'] }}</td>
              <td class="text-xs-left">{{ props.item['Last Name'] }}</td>
              <td class="text-xs-left">{{ props.item['Start Date'] }}</td>
              <td class="text-xs-left">{{ props.item['End Date'] }}</td>
              <td class="text-xs-left">{{ props.item['Network ID'] }}</td>
              <td class="text-xs-left">{{ props.item['Created By'] }}</td>
              <td class="text-xs-left">{{ formatDateVaule(props.item['Created Date']) }}</td>
              <td class="text-xs-left">{{ props.item['Updated By'] }}</td>
              <td class="text-xs-left">{{ formatDateVaule(props.item['Updated Date']) }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <Vodal
      :show="showPrescriberDialog"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="false"
      :width="1200"
      :height="800"
      :closeOnClickMask="true">
      <v-toolbar class="primary">
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text" v-if="type=='add'">Add Prescriber</v-toolbar-title>
        <v-toolbar-title class="white--text" v-if="type=='edit'">Edit Prescriber</v-toolbar-title>
      </v-toolbar>
      <v-container fluid v-if="type=='add'" class="pb-0">
        <prescriberAdd
          :select="edit"
          :cancel="cancel">
        </prescriberAdd>
      </v-container>
      <v-container fluid v-if="type=='edit'" class="pb-0">
        <prescriberEdit
          :type="type"
          :netid="netid"
          :item="selectedPrescriber"
          :refresh="getNetworkPrescriberList"
          :cancel="cancel">
        </prescriberEdit>
      </v-container>
    </Vodal>
  </main>
</template>
<script>
  import networkServices from '../../../../services/network/networkServices'
  import prescriberAdd from './prescriberAdd.vue'
  import prescriberEdit from './prescriberEdit.vue'
  import store from '../../../../store'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'

  export default {
    props: ['netid', 'desc'],
    components: {
      prescriberAdd,
      prescriberEdit,
      Vodal
    },
    data() {
      return {
        prescriberHeaders: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
          {text: 'First Name', align: 'left', sortable: true, value: 'First Name'},
          {text: 'Last Name', align: 'left', sortable: true, value: 'Last Name'},
          {text: 'Start Date', align: 'left', sortable: true, value: 'Start Date'},
          {text: 'End Date', align: 'left', sortable: true, value: 'End Date'},
          {text: 'Network ID', align: 'left', sortable: true, value: 'Network ID'},
          {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
          {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'},
          {text: 'Updated By', align: 'left', sortable: true, value: 'Updated By'},
          {text: 'Updated Date', align: 'left', sortable: true, value: 'Updated Date'},
        ],
        prescriberList: [],
        selectedPrescriber: {},
        showPrescriberDialog: false,
        type: '',
        search: '',
        loading: true,
        pagination: {
          rowsPerPage: 5
        }
      }
    },
    mounted() {
      this.getNetworkPrescriberList()
    },
    methods: {
      getNetworkPrescriberList: function () {
        const that = this
        that.loading = true
        networkServices.getNetworkPrescriberList(that.netid).then(function (res) {
          that.prescriberList = res.prescriber_list
        })
        that.loading = false
      },
      add: function () {
        this.type = 'add'
        this.showPrescriberDialog = true
      },
      edit: function (prescriber) {
        this.type = 'edit'
        this.showPrescriberDialog = true
        this.selectedPrescriber = {...prescriber}
      },
      cancel: function () {
        this.showPrescriberDialog = false
      },
      formatDateVaule: function (dateStr) {
        if (dateStr) {
          let timestamp = /\(([^}]+)\)/.exec(dateStr)[1]
          let date = new Date(Number(timestamp))
          let yyyy = date.getFullYear()
          let mm = date.getMonth() + 1
          let dd = date.getDate()
          let hours = date.getHours() > 10 ? date.getHours() : "0" + date.getHours()
          let minutes = date.getMinutes() > 10 ? date.getMinutes() : "0" + date.getMinutes()
          return (mm < 10 ? "0" + mm : mm) + "/" + (dd < 0 ? "0" + dd : dd) + "/" + yyyy + " " + hours + ":" + minutes
        } else {
          return null
        }
      }
    }
  }
</script>
<style lang="stylus">
</style>
