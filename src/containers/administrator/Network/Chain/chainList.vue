<template>
  <main>
    <v-layout row justify-space-between>
      <v-flex xs2>
        <v-text-field label="Search" v-model="search" append-icon="search" single-line>
        </v-text-field>
      </v-flex>
      <v-btn fab dark color="primary-color" small="" @click.native="add()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table
          v-bind:headers="chainHeaders"
          v-bind:items="chainList"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading">
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-left handCell">
                <v-tooltip top>
                  <v-btn icon @click="edit(props.item)" slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Chain Edit</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left handCell">
                <delete-confirm v-on:confirmed="del(props.item)" :message="'Delete'"></delete-confirm>
              </td>
              <td class="text-xs-left">{{ props.item['Chain Name'] }}</td>
              <td class="text-xs-left">{{ props.item['Description'] }}</td>
              <td class="text-xs-left">{{ props.item['Network ID'] }}</td>
              <td class="text-xs-left">{{ props.item['Chain ID'] }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <Vodal
      :show="showChainDialog"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="false"
      :width="900"
      :height="800"
      :closeOnClickMask="true">
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text" v-if="type=='add'">Network Chain Add</v-toolbar-title>
        <v-toolbar-title class="white--text" v-if="type=='edit'">Network Chain Edit</v-toolbar-title>
      </v-toolbar>
      <v-container fluid v-if="type=='add'" class="pb-0">
        <chainAdd
          :netid="netid"
          :desc="desc"
          :item="{}"
          :refresh="getChainListUsingNetworkid"
          :cancel="cancel">
        </chainAdd>
      </v-container>
      <v-container fluid v-if="type=='edit'" class="pb-0">
        <chainEdit
          :netid="netid"
          :desc="desc"
          :item="selectedChain"
          :refresh="getChainListUsingNetworkid"
          :cancel="cancel">
        </chainEdit>
      </v-container>
    </Vodal>
  </main>
</template>
<script>
  import networkServices from '../../../../services/network/networkServices'
  import chainAdd from './chainAdd.vue'
  import chainEdit from './chainEdit.vue'
  import store from '../../../../store'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'

  export default {
    props: ['netid', 'desc'],
    components: {
      DeleteConfirm, chainAdd,
      chainEdit,
      Vodal
    },
    data() {
      return {
        chainHeaders: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Chain Name', align: 'left', sortable: true, value: 'Chain Name'},
          {text: 'Description', align: 'left', sortable: true, value: 'Description'},
          {text: 'Network ID', align: 'left', sortable: true, value: 'Network ID'},
          {text: 'Chain ID', align: 'left', sortable: true, value: 'Chain ID'},
        ],
        chainList: [],
        selectedChain: {},
        showChainDialog: false,
        type: '',
        search: '',
        loading: true,
        pagination: {
          rowsPerPage: 5
        }
      }
    },
    mounted() {
      this.getAllChainList()
      this.getChainListUsingNetworkid()
    },
    methods: {
      getAllChainList: function () {
        networkServices.getChainList().then(function (res) {
          let chainList = res.chain_list
          store.commit('UPDATE_NETWORK_SETUP_DATA', {chain_list: chainList})
        })
      },
      getChainListUsingNetworkid: function () {
        const that = this
        that.loading = true
        networkServices.getChainListUsingNetworkid(that.netid).then(function (res) {
          that.chainList = res.chain_list
        })
        that.loading = false
      },
      add: function () {
        this.type = 'add'
        this.showChainDialog = true
      },
      edit: function (chain) {
        this.type = 'edit'
        this.showChainDialog = true
        this.selectedChain = {...chain}
      },
      del: function (chain) {
        const that = this
        const netid = that.netid
        const chainid = chain['Chain ID']
        networkServices.deleteChain(netid, chainid).then(function (res) {
          if (res !== "E") {
            window.Vue.$emit('snackbar', 'success', 'Chain Deleted!')
            that.getChainListUsingNetworkid()
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        }).catch(function (res) {
        })
      },
      cancel: function () {
        this.showChainDialog = false
      }
    }
  }
</script>
<style lang="stylus">
</style>
