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
          v-bind:headers="providerHeaders"
          v-bind:items="providerList"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading">
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-left handCell" style="width: 40px">
                <v-tooltip top>
                  <v-btn icon @click="edit(props.item)" slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Provider Edit</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left handCell" style="width: 40px">
                <delete-confirm v-on:confirmed="del(props.item)" :message="'Delete'"></delete-confirm>
              </td>
              <td class="text-xs-left">{{ props.item['NABP'] }}</td>
              <td class="text-xs-left">{{ props.item['NPI'] }}</td>
              <td class="text-xs-left">{{ props.item['Provider Name'] }}</td>
              <td class="text-xs-left">{{ props.item['Store ID'] }}</td>
              <td class="text-xs-left">{{ props.item['Address'] }}</td>
              <td class="text-xs-left">{{ props.item['City'] }}</td>
              <td class="text-xs-left">{{ props.item['State'] }}</td>
              <td class="text-xs-left">{{ props.item['Zip Code'] }}</td>
              <td class="text-xs-left">{{ props.item['Phone Number'] }}</td>
              <td class="text-xs-left">{{ props.item['Spec Pgm Ind'] }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <Vodal
      :show="showProviderDialog"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="false"
      :width="1200"
      :height="800"
      :closeOnClickMask="true">
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text" v-if="type=='add'">Network Provider Add</v-toolbar-title>
        <v-toolbar-title class="white--text" v-if="type=='edit'">Network Provider Edit</v-toolbar-title>
      </v-toolbar>
      <v-container fluid v-if="type=='add'" class="pb-0">
        <providerAdd
          :netid="netid"
          :item="{}"
          :refresh="getNetworkProviderList"
          :cancel="cancel">
        </providerAdd>
      </v-container>
      <v-container fluid v-if="type=='edit'" class="pb-0">
        <providerEdit
          :netid="netid"
          :item="selectedProvider"
          :refresh="getNetworkProviderList"
          :cancel="cancel">
        </providerEdit>
      </v-container>
    </Vodal>
  </main>
</template>
<script>
  import networkServices from '../../../../services/network/networkServices'
  import providerServices from '../../../../services/provider/providerServices'
  import providerAdd from './providerAdd.vue'
  import providerEdit from './providerEdit.vue'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'

  export default {
    props: ['netid'],
    components: {
      DeleteConfirm, providerAdd,
      providerEdit,
      Vodal
    },
    data() {
      return {
        providerHeaders: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'NABP', align: 'left', sortable: true, value: 'NABP'},
          {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
          {text: 'Provider Name', align: 'left', sortable: true, value: 'Provider Name'},
          {text: 'Store ID', align: 'left', sortable: true, value: 'Store ID'},
          {text: 'Address', align: 'left', sortable: true, value: 'Address'},
          {text: 'City', align: 'left', sortable: true, value: 'City'},
          {text: 'State', align: 'left', sortable: true, value: 'State'},
          {text: 'Zip Code', align: 'left', sortable: true, value: 'Zip Code'},
          {text: 'Phone Number', align: 'left', sortable: true, value: 'Phone Number'},
          {text: 'Spec Pgm Ind', align: 'left', sortable: true, value: 'Spec Pgm Ind'},
        ],
        providerList: [],
        selectedProvider: {},
        showProviderDialog: false,
        type: '',
        search: '',
        loading: true,
        pagination: {
          rowsPerPage: 5
        }
      }
    },
    mounted() {
      this.getNetworkProviderList()
    },
    methods: {
      getNetworkProviderList: function () {
        const that = this
        that.loading = true
        networkServices.getNetworkProviderList(that.netid, 0).then(function (res) {
          that.providerList = res.network_provider_list
        })
        that.loading = false
      },
      add: function () {
        this.type = 'add'
        this.showProviderDialog = true
      },
      edit: function (provider) {
        this.type = 'edit'
        this.showProviderDialog = true
        this.selectedProvider = {...provider}
      },
      del: function (provider) {
        const that = this
        const info = Object.assign({}, provider, {network_id: that.netid})
        const user = that.$store.state.user
        const pcc = that.$store.state.pcn.pcc
        networkServices.deleteNetworkProvider(info, user, pcc).then(function (res) {
          if (res !== "E") {
            window.Vue.$emit('snackbar', 'success', 'Provider Deleted !')
            that.getNetworkProviderList()
          } else {
            console.log(res)
            window.Vue.$emit('snackbar', 'warning', res)
          }
        }).catch(function (res) {

        })
      },
      cancel: function () {
        this.showProviderDialog = false
      }
    }
  }
</script>
<style lang="stylus">
</style>
