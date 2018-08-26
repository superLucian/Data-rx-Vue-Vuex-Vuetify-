<template>
  <main>
    <Vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="true"
      :closeOnClickMask="true"
      :width="1100"
      :height="500"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">Find Provider</v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs4>
          <v-card-text class="text-xs-right">
            <v-subheader>Enter the NABP or NPI of the Provider:</v-subheader>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text>
            <v-text-field
              name="provider-search"
              label="Search"
              v-model="nabp"
              hide-details
            ></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text>
            <v-btn class="primary" @click.native="find" block :disabled="isDisableFind">Find</v-btn>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-card-text class="formulary-find-container">
        <v-layout row wrap>
          <div class="left">
            <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
          </div>
          <v-flex xs12>
            <v-data-table
              v-bind:headers="headers"
              :items="tableData"
              v-bind:search="search"
              :loading="loading"
              item-key="pid"
              v-model="selectedProvider"
              v-bind:pagination.sync="pagination"
              class="dialog-table-scroll-enabled"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td>
                    <v-btn small color="primary-color" @click="select(props.item)">select</v-btn>
                  </td>
                  <td class="text-xs-left"> {{ props.item.NPI}}</td>
                  <td class="text-xs-left"> {{ props.item.NABP }}</td>
                  <td class="text-xs-left">{{ props.item.Name }}</td>
                  <td class="text-xs-left">{{ props.item.Status }}</td>
                  <td class="text-xs-left">{{ props.item['Store Number'] }}</td>
                  <td class="text-xs-left">{{ props.item.Address }}</td>
                  <td class="text-xs-left">{{ props.item.City }}</td>
                  <td class="text-xs-left">{{ props.item.State }}</td>
                  <td class="text-xs-left">{{ props.item['Zip Code'] }}</td>
                  <td class="text-xs-left">{{ props.item['Phone Number'] }}</td>
                  <td class="text-xs-left">{{ props.item['Fax Number'] }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn @click.native="close">Close</v-btn>
      </v-card-actions>
    </Vodal>
  </main>
</template>

<script>
  import providerServices from '../../../../services/provider/providerServices'
  import ChainProviders from './Providers.vue'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'

  export default {
    name: 'chain-provider-find',
    data() {
      return {
        show: false,
        search: '',
        pagination: {
          rowsPerPage: 5
        },
        isDisableFind: true,
        isDisabledSelect: true,
        searchResult: [],
        loading: false,
        nabp: '',
        headers: [
          {text: '', align: '', sortable: false, value: ''},
          {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
          {text: 'NABP', align: 'left', sortable: true, value: 'NABP'},
          {text: 'Name', align: 'left', sortable: true, value: 'Name'},
          {text: 'Status', align: 'left', sortable: true, value: 'Status'},
          {text: 'Store Number', align: 'left', sortable: true, value: 'Store Number'},
          {text: 'Address', align: 'left', sortable: true, value: 'Address'},
          {text: 'City', align: 'left', sortable: true, value: 'City'},
          {text: 'State', align: 'left', sortable: true, value: 'State'},
          {text: 'Zip Code', align: 'left', sortable: true, value: 'Zip Code'},
          {text: 'Phone Number', align: 'left', sortable: true, value: 'Phone Number'},
          {text: 'Fax Number', align: 'left', sortable: true, value: 'Fax Number'}
        ],
        tableData: [],
        selectedProvider: []
      }
    },
    watch: {
      selectedProvider: function (v) {
        if (v.length > 0) {
          this.isDisabledSelect = false
          if (v.length > 1) {
            this.oldSelectedProvider = this.selectedProvider.filter((item) => item['pid'] != this.oldSelectedProvider[0]['pid'])
            this.selectedProvider = this.oldSelectedProvider
            return false;
          }
        } else {
          this.isDisabledSelect = true
        }
        this.oldSelectedProvider = v
      },
      nabp: function (v) {
        if (v.length > 0) this.isDisableFind = false
        else this.isDisableFind = true
      }
    },
    components: {
      Vodal
    },
    mounted() {
      console.log('----- Administrator / Chain / Providers / Provider Find -----')
      const that = this
      window.Vue.$on('openProviderFindForm', function () {
        that.open()
      })
    },
    methods: {
      find: function () {
        this.loading = true
        const data = {
          provider_id: this.nabp
        }
        const that = this
        providerServices.getNABPProviderList(data).then(function (res) {
          that.tableData = res.provider_list
          that.loading = false
        })
      },
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
        this.nabp = ''
        this.tableData = []
        this.selectedProvider = []
      },
      select: function (item) {
        const that = this
        const data = {
          chain_id: Number(that.$route.params.cid),
          provider_id: item.pid,
          created_by: that.$store.state.user.session_uid
        }
        providerServices.addProviderChain(data).then(function (res) {
          if (res === 'No Errors') {
            window.Vue.$emit('reloadChainProvider')
            window.Vue.$emit('snackbar', 'success', 'Chain Provider Added!')
            that.close()
          }
        })
//          .catch(function (res) {
//          window.Vue.$emit('snackbar', 'error', 'This provider added already!')
//        })
      }
    }
  }
</script>

<style lang="stylus"></style>
