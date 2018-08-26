<template>
  <main>
    <v-layout row justify-space-between>
      <v-flex xs4>
        <v-text-field label="Search" v-model="search" append-icon="search" single-line>
        </v-text-field>
      </v-flex>
      <v-btn fab dark class="primary mt-3" small="" @click.native="add()">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table
          v-bind:headers="wholesalerProviderHeaders"
          v-bind:items="wholesalerProviderList"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading">
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center handCell">
                <v-tooltip top>
                  <v-btn icon @click="edit(props.item)" slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Edit</span>
                </v-tooltip>
                <delete-confirm v-on:confirmed="del(props.item)" :message="'Delete'"></delete-confirm>
              </td>
              <td class="text-xs-left">{{ props.item['Provider Name'] }}</td>
              <td class="text-xs-left">{{ props.item['Account#'] }}</td>
              <td class="text-xs-left">{{ props.item['NABP'] }}</td>
              <td class="text-xs-left">{{ props.item['NPI'] }}</td>
              <td class="text-xs-left">{{ props.item['Name'] }}</td>
              <td class="text-xs-left">{{ props.item['Address1'] }}</td>
              <td class="text-xs-left">{{ props.item['Address2'] }}</td>
              <td class="text-xs-left">{{ props.item['City'] }}</td>
              <td class="text-xs-left">{{ props.item['State'] }}</td>
              <td class="text-xs-left">{{ props.item['Zip'] }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <Vodal
      :show="showWholesalerProviderDialog"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="false"
      :width="1200"
      :height="500"
      :closeOnClickMask="true">
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text" v-if="type=='add'">Wholesaler Provider Add</v-toolbar-title>
        <v-toolbar-title class="white--text" v-if="type=='edit'">Wholesaler Provider Edit</v-toolbar-title>
      </v-toolbar>
      <!-- Add Wholesaler Provider Dialog -->
      <providerAdd
        v-if="type=='add'"
        :pcc="pcc"
        :item="{}"
        :refresh="getWholesalerProviderList"
        :cancel="cancel">
      </providerAdd>
      <!-- Edit Wholesaler Provider Dialog -->
      <providerEdit
        v-if="type=='edit'"
        :pcc="pcc"
        :item="selectedWholesalerProvider"
        :refresh="getWholesalerProviderList"
        :cancel="cancel">
      </providerEdit>
    </Vodal>
  </main>
</template>
<script>
  import pcnServices from '../../../../services/pcn/pcnServices'
  import providerServices from '../../../../services/provider/providerServices'
  import providerAdd from './providerAdd.vue'
  import providerEdit from './providerEdit.vue'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'

  export default {
    props: ['pcc'],
    components: {
      DeleteConfirm, providerAdd,
      providerEdit,
      Vodal
    },
    data() {
      return {
        wholesalerProviderHeaders: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Provider Name', align: 'left', sortable: true, value: 'Provider Name'},
          {text: 'Account#', align: 'left', sortable: true, value: 'Account#'},
          {text: 'NABP', align: 'left', sortable: true, value: 'NABP'},
          {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
          {text: 'Name', align: 'left', sortable: true, value: 'Name'},
          {text: 'Address1', align: 'left', sortable: true, value: 'Address1'},
          {text: 'Address2', align: 'left', sortable: true, value: 'Address2'},
          {text: 'City', align: 'left', sortable: true, value: 'City'},
          {text: 'State', align: 'left', sortable: true, value: 'State'},
          {text: 'Zip', align: 'left', sortable: true, value: 'Zip'}
        ],
        wholesalerProviderList: [],
        selectedWholesalerProvider: {},
        showWholesalerProviderDialog: false,
        type: '',
        search: '',
        loading: true,
        pagination: {
          rowsPerPage: 5
        }
      }
    },
    mounted() {
      this.getWholesalerProviderList()
    },
    methods: {
      getWholesalerProviderList: function () {
        const that = this
        that.loading = true
        pcnServices.getWholesalerProviderList(that.pcc).then(function (res) {
          that.wholesalerProviderList = res.wholesaler_provider_list
        })
        that.loading = false
      },
      add: function () {
        this.type = 'add'
        this.showWholesalerProviderDialog = true
      },
      edit: function (wholesalerProvider) {
        this.type = 'edit'
        this.showWholesalerProviderDialog = true
        this.selectedWholesalerProvider = {...wholesalerProvider}
      },
      del: function (provider) {
        const that = this
        const info = Object.assign({}, provider)
        const user = that.$store.state.user
        const pcc = that.pcc
        pcnServices.deleteProviderWholesaler(info, user, pcc).then(function (res) {
          if (res === "0") {
            window.Vue.$emit('snackbar', 'success', 'Wholesaler Deleted !')
            that.getWholesalerProviderList()
          } else {
          }
        }).catch(function (res) {
          window.Vue.$emit('snackbar', 'warning', res)
        })
      },
      cancel: function () {
        this.showWholesalerProviderDialog = false
      }
    }
  }
</script>
<style lang="stylus">
</style>
