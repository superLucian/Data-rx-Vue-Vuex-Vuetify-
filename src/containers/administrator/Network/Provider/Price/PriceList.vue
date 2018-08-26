<template>
  <main>
    <v-layout row wrap>
      <v-flex xs2>
        <v-text-field append-icon="search" label="Search" single-line v-model="search">
        </v-text-field>
      </v-flex>
      <v-spacer></v-spacer>
      <v-btn fab dark color="primary-color" small="" @click.native="add()">
        <v-icon dark>add</v-icon>
      </v-btn>
      <v-flex xs12>
        <v-data-table
          v-bind:headers="priceHeaders"
          v-bind:items="priceList"
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
                  <span>Price Edit</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left handCell">
                <delete-confirm v-on:confirmed="del(props.item)" :message="'Delete'"></delete-confirm>
              </td>
              <td class="text-xs-left">{{ props.item['Group Name'] }}</td>
              <td class="text-xs-left">{{ props.item['NABP'] }}</td>
              <td class="text-xs-left">{{ props.item['NPI'] }}</td>
              <td class="text-xs-left">{{ props.item['Provider Name'] }}</td>
              <td class="text-xs-left">{{ props.item['Pricing Zip'] }}</td>
              <td class="text-xs-left">{{ props.item['Price Code'] }}</td>
              <td class="text-xs-left">{{ props.item['Markup'] }}</td>
              <td class="text-xs-left">{{ props.item['Fee'] }}</td>
              <td class="text-xs-left">{{ props.item['Min Amount'] }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <Vodal
      :show="showPriceDialog"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="false"
      :width="900"
      :height="500"
      :closeOnClickMask="true">
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text" v-if="type=='add'">Provider Pricing Add</v-toolbar-title>
        <v-toolbar-title class="white--text" v-if="type=='edit'">Provider Pricing Edit</v-toolbar-title>
      </v-toolbar>
      <v-container fluid v-if="type=='add'" class="pr-0 pb-0">
        <priceAdd
          :name="name"
          :pid="pid"
          :refresh="getPriceList"
          :cancel="cancel">
        </priceAdd>
      </v-container>
      <v-container fluid v-if="type=='edit'" class="pr-0 pb-0">
        <priceEdit
          :item="selectedPrice"
          :refresh="getPriceList"
          :cancel="cancel">
        </priceEdit>
      </v-container>
    </Vodal>
  </main>
</template>
<script>
  import services from '../../../../../services/services'
  import networkServices from '../../../../../services/network/networkServices'
  import store from '../../../../../store'
  import priceAdd from './PriceAdd.vue'
  import priceEdit from './PriceEdit.vue'
  import Vodal from '../../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import DeleteConfirm from '../../../../../components/common/deleteConfirm'

  export default {
    props: ['pid', 'name'],
    components: {
      DeleteConfirm, priceAdd,
      priceEdit,
      Vodal
    },
    data() {
      return {
        priceHeaders: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Group Name', align: 'left', sortable: true, value: 'Group Name'},
          {text: 'NABP', align: 'left', sortable: true, value: 'NABP'},
          {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
          {text: 'Provider Name', align: 'left', sortable: true, value: 'Provider Name'},
          {text: 'Pricing Zip', align: 'left', sortable: true, value: 'Pricing Zip'},
          {text: 'Pricing Code', align: 'left', sortable: true, value: 'Price Code'},
          {text: 'Markup', align: 'left', sortable: true, value: 'Markup'},
          {text: 'Fee', align: 'left', sortable: true, value: 'Fee'},
          {text: 'Min Amount', align: 'left', sortable: true, value: 'Min Amount'}
        ],
        priceList: [],
        selectedPrice: {},
        showPriceDialog: false,
        type: '',
        search: '',
        loading: true,
        pagination: {
          rowsPerPage: 10
        },
      }
    },
    mounted() {
      this.getPriceList()
    },
    methods: {
      getPriceList: function () {
        const that = this
        const pcc = that.$store.state.pcn.pcc
        that.loading = true
        networkServices.getProviderMppList(pcc, that.pid).then(function (res) {
          that.priceList = res.mpp_list
        })
        that.loading = false
      },
      add: function () {
        this.type = 'add'
        this.showPriceDialog = true
      },
      edit: function (price) {
        this.type = 'edit'
        this.showPriceDialog = true
        this.selectedPrice = {...price}
      },
      del: function (price) {
        const that = this
        const groupId = price.group_id
        const pid = price.pid
        networkServices.deleteProviderMpp(groupId, pid).then(function (res) {
          if (res !== "E") {
            window.Vue.$emit('snackbar', 'success', 'Mpp Deleted !')
            that.getPriceList()
          } else {
            console.log(res)
            window.Vue.$emit('snackbar', 'warning', res)
          }
        }).catch(function (res) {

        })
      },
      cancel: function () {
        this.showPriceDialog = false
      }
    }
  }
</script>
<style lang="stylus">
</style>
