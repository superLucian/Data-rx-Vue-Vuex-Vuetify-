<template>
  <main>
    <v-card-text class="py-0 px-0 my-scroll-enabled-1">
      <v-tabs v-model="active">
        <v-tabs-bar class="transparent">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab"
            :href="'#' + tab"
            ripple
            flat
          >
            {{ tab }}
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="Provider Name">
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12>
                  <p>
                    You can search for a provider or list of providers using any or all of the selection option below:</p>
                </v-flex>
                <v-flex xs12>
                  <p>
                    Enter the name of the provider. You can use the full name or the first few signification letters of the Provider name.</p>
                </v-flex>
                <v-flex xs8>
                  <v-text-field label="Provider Name" v-model="provider_name"></v-text-field>
                </v-flex>
                <v-flex xs5>
                  <v-text-field label="CITY" v-model="city"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs2>
                  <v-select v-bind:items="stateItems" v-model="state_item" label="State"
                            value="text"></v-select>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs4>
                  <v-text-field label="Zip Code" v-model="zip_code"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <p>
                    You can use the full city name or the first few signification letters of the city name. After entering the selection option,select 'Find'.</p>
                </v-flex>
              </v-layout>
            </v-card-text>

          </v-tabs-content>
          <v-tabs-content id="NABP/NPI">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text>
                  <p>
                    You can search for a specific provider or a list of providers using the selection option below.</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p>Enter the NABP or NPI of the provider. </p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-text-field label="NABP/NPI" v-model="NABP_NPI"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-card-text>
                  <p>
                    You can use the full NABP/NPI of the first few significant digits. After entering NABP or NPI, select 'Find'.</p>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-tabs-content id="Store#">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text>
                  <p>
                    You can search for a specific provider or a list of providers using the selection option below.</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p>Enter the store number. </p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-text-field label="Store Number" v-model="store_number"></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-card-text>
                  <p>
                    You can use the full store number of the first few significant digits. After entering the store number, select 'Find'.</p>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-card-actions class="d-block text-xs-center">
            <v-card-actions class="d-block text-xs-center">
            <v-btn color="primary-color" :disabled="isDisableFind" @click.native="find">find</v-btn>
            </v-card-actions>
          </v-card-actions>
        </v-tabs-items>
      </v-tabs>
      <v-divider></v-divider>
        <v-card-text class="px-4" style="background-color: white" v-if="isFindResult">

        <v-layout row wrap>
          <v-flex xs4>
            <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-data-table
              v-bind:headers="headers"
              :items="tableData"
              v-bind:search="search"
              :loading="loading"
              selected-key="pid"
              v-model="selectedProvider"
              v-bind:pagination.sync="pagination"
              class="scrollable-table"
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
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-block text-xs-center pb-0">
      <v-btn @click.native="close">Back</v-btn>
    </v-card-actions>
  </main>
</template>

<script>
  import providerServices from '../../../../../services/provider/providerServices'
  import providers from './providers.vue'
  import Vodal from '../../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import store from '../../../../../store'

  export default {
    name: 'plan-network-providers-find',
    props: ['onBack', 'networkId'],
    data() {
      return {
        show: false,
        search: '',
        provider_name: '',
        state_item: '',
        state: '',
        city: '',
        zip_code: '',
        stateItems: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'],
        tabs: ['Provider Name', 'NABP/NPI', 'Store#'],
        active: null,
        pagination: {
          rowsPerPage: 50
        },
        isDisabledSelect: true,
        searchResult: [],
        store_number: '',
        loading: false,
        NABP_NPI: '',
        headers: [],
        tableData: [],
        selectedProvider: [],
        isDisableFind: true,
        isFindResult: false,
      }
    },
    computed: {
      values: function () {
        return this.provider_name + this.city + this.state_item + this.zip_code + this.NABP_NPI + this.store_number
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
      active: function () {
        this.provider_name = ''
        this.city = ''
        this.state_item = ''
        this.zip_code = ''
        this.NABP_NPI = ''
        this.store_number = ''
        this.isFindResult = false
        this.tableData = []
      },
      values: function (d) {
        if (d.length > 0)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      }
    },
    components: {Vodal, providers},
    mounted() {
      console.log('----- Administrator / Plan / Edit / Networks / Providers / Provider Find-----')

      this.headers = [
        {text: '', align: 'left', sortable: false, value: ''},
        {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
        {text: 'NABP', align: 'left', sortable: true, value: 'NABP'},
        {text: 'Name', align: 'left', sortable: true, value: 'Name'},
        {text: 'Status', align: 'left', sortable: true, value: 'Status'},
        {text: 'Store Number', align: 'left', sortable: true, value: 'Store Number'},
        {text: 'Address', align: 'left', sortable: true, value: 'Address'},
        {text: 'City', align: 'left', sortable: false, value: 'City'},
        {text: 'State', align: 'left', sortable: false, value: 'State'},
        {text: 'Zip Code', align: 'left', sortable: false, value: 'Zip Code'},
        {text: 'Phone Number', align: 'left', sortable: false, value: 'Phone Number'},
        {text: 'Fax Number', align: 'left', sortable: false, value: 'Fax Number'}
      ]
    },
    methods: {
      find: function () {
        this.loading = true
        let data
        this.isFindResult = true
        const that = this
        switch (this.active) {
          case 'Provider Name':
            data = {
              name_txt: that.provider_name,
              city_txt: that.city,
              state_cd: that.state,
              zip_cd: that.zip_code
            }
            providerServices.getNCSZProviderList(data).then(function (res) {
              if (res.provider_list.length > 0) {
                that.ncszData = res.provider_list
                that.tableData = that.ncszData
                that.loading = false
              } else {
                window.Vue.$emit('snackbar', 'success', 'No results found!')
                that.loading = false
                that.tableData = []
              }
            })
            return
          case 'NABP/NPI':
            data = {
              provider_id: this.NABP_NPI
            }
            providerServices.getNABPProviderList(data).then(function (res) {
              if (res.provider_list.length > 0) {
                that.nabpData = res.provider_list
                that.tableData = that.nabpData
                that.loading = false
              } else {
                window.Vue.$emit('snackbar', 'success', 'No results found!')
                that.loading = false
                that.tableData = []
              }
            })
            return
          case 'Store#':
            data = {
              store_id: this.store_number,
              plan_id: " "
            }
            providerServices.getStoreProviderList(data).then(function (res) {
              if (res.provider_list.length > 0) {
                that.storeData = res.provider_list
                that.tableData = that.storeData
                that.loading = false
              } else {
                window.Vue.$emit('snackbar', 'success', 'No results found!')
                that.loading = false
                that.tableData = []
              }
            })
            return
        }
      },
      close: function () {
        this.onBack()
      },
      select: function (item) {
        const that = this
        const data = {
          session_uid: this.$store.state.user.session_uid,
          session_id: this.$store.state.user.session_id,
          pcc: this.$store.state.pcn.pcc,
          network_id: this.networkId,
          pid: item.pid.toString()
        }
        providerServices.addNetworkProvider(data).then(function (res) {
          if (res === '0') {
            window.Vue.$emit('reloadNetworkProvider')
            window.Vue.$emit('snackbar', 'success', 'Plan Network Provider Added!')
            that.onBack()
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        }).catch(function (res) {
          window.Vue.$emit('snackbar', 'error', 'This provider added already!')
        })
      }
    }
  }
</script>

<style lang="stylus"></style>
