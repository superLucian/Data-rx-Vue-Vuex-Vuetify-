<template>
  <main>
    <v-layout row wrap>
      <v-tabs v-model="finderMode">
        <v-tabs-bar class="white">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in finderTabs"
            :key="tab.name"
            :href="tab.path">
            {{ tab.name }}
          </v-tabs-item>
        </v-tabs-bar>
      </v-tabs>
      <v-container fluid class="form-scroll-enabled">
        <div style="max-height: 500px">
          <!-- Provider Name tab-->
          <v-layout row wrap v-if="finderMode=='provider_name'">
            <v-flex xs12>
              <v-card-text class="text-xs-center">
                You can search for a provider or list of providers using any or all of the selection options below:
              </v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-card-text class="text-xs-left">
                Enter the name of the provider. You can use the full name or the first few signification letters of the Provider name.
              </v-card-text>
              <v-flex xs12>
                <v-text-field label="Provider Name" v-model="finderKey['provider_name']">
                </v-text-field>
              </v-flex>
            </v-flex>
            <v-flex xs4 class="pr-3">
              <v-text-field label="City" v-model="finderKey['city']">
              </v-text-field>
            </v-flex>
            <v-flex xs4 class="pr-3 pl-3">
              <v-select label="State" v-bind:items="stateList" v-model="finderKey['selectedState']">
              </v-select>
            </v-flex>
            <v-flex xs4 class="pl-3">
              <v-text-field v-model="finderKey['zip']" label="Zip Code">
              </v-text-field>
            </v-flex>
          </v-layout>
          <!-- NABP/NPI tab-->
          <v-layout row wrap v-if="finderMode=='nabp_npi'">
            <v-flex xs12>
              <v-card-text class="text-xs-center">
                You can search for a specific provider or a list of providers using the selection option below.
              </v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Enter the NABP or NPI of the provider" v-model="finderKey['nabp_npi']">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-card-text class="text-xs-center">
                You can use the full NABP/NPI of the first few significant digits. After entering NABP or NPI, select 'Find'.
              </v-card-text>
            </v-flex>
          </v-layout>
          <!-- Store# tab-->
          <v-layout row wrap v-if="finderMode=='store'">
            <v-flex xs12>
              <v-card-text class="text-xs-center">
                You can search for a specific provider or a list of providers using the selection option below.
              </v-card-text>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Enter the store number" v-model="finderKey['store']">
              </v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-card-text class="text-xs-center">
                You can use the full store number of the first few significant digits. After entering the store number, select 'Find'.
              </v-card-text>
            </v-flex>
          </v-layout>
          <!-- Find Result -->
          <v-data-table
            v-bind:headers="foundWholesalerProviderHeaders"
            v-bind:items="foundWholesalerProviderList"
            v-bind:pagination.sync="pagination"
            :loading="loading">
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left handCell" @click="select(props.item)">
                  <v-btn icon>
                    <v-tooltip top>
                      <span slot="activator"><v-icon>present_to_all</v-icon></span>
                      <span>Provider Add</span>
                    </v-tooltip>
                  </v-btn>
                </td>
                <td class="text-xs-left">{{ props.item['NPI'] }}</td>
                <td class="text-xs-left">{{ props.item['NABP'] }}</td>
                <td class="text-xs-left">{{ props.item['Name'] }}</td>
                <td class="text-xs-left">{{ props.item['Status'] }}</td>
                <td class="text-xs-left">{{ props.item['Store Number'] }}</td>
                <td class="text-xs-left">{{ props.item['Address'] }}</td>
                <td class="text-xs-left">{{ props.item['City'] }}</td>
                <td class="text-xs-left">{{ props.item['State'] }}</td>
                <td class="text-xs-left">{{ props.item['Zip Code'] }}</td>
                <td class="text-xs-left">{{ props.item['Phone Number'] }}</td>
                <td class="text-xs-left">{{ props.item['Fax Number'] }}</td>
              </tr>
            </template>
          </v-data-table>
        </div>
      </v-container>
      <v-layout row wrap>
        <v-flex xs12>
          <v-divider class="mt-2"></v-divider>
          <v-card-actions class="d-block text-xs-center">
            <v-btn class="primary" @click.native="find()" :disabled="disableFindBtn">Find</v-btn>
            <v-btn @click.native="cancel()">Cancel</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-layout>
  </main>
</template>
<script>
  import providerServices from '../../../../../services/provider/providerServices'

  export default {
    props: ['select', 'cancel'],
    components: {},
    data() {
      return {
        stateList: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
          'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
          'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
          'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
          'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'
        ],
        finderTabs: [
          {name: 'Provider Name', path: 'provider_name'},
          {name: 'NABP / NPI', path: 'nabp_npi'},
          {name: 'Store#', path: 'store'}
        ],
        finderMode: 'provider_name',
        finderKey: {
          provider_name: '',
          city: '',
          selectedState: '',
          zip: '',
          nabp_npi: '',
          store: ''
        },
        disableFindBtn: true,
        foundWholesalerProviderHeaders: [
          {text: '', align: 'left', sortable: false, value: ''},
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
        foundWholesalerProviderList: [],
        loading: false,
        pagination: {
          rowsPerPage: 5
        }
      }
    },
    mounted() {
    },
    methods: {
      find: function () {
        const that = this
        let data
        switch (that.finderMode) {
          case 'provider_name':
            this.loading = true
            data = {
              name_txt: that.finderKey['provider_name'],
              city_txt: that.finderKey['city'],
              state_cd: that.finderKey['selectedState'],
              zip_cd: that.finderKey['zip']
            }
            providerServices.getNCSZProviderList(data).then(function (res) {
              if (res.provider_list.length > 0) {
                that.foundWholesalerProviderList = res.provider_list
              }
            })
            that.loading = false
            return
          case 'nabp_npi':
            this.loading = true
            data = {
              provider_id: that.finderKey['nabp_npi']
            }
            providerServices.getNABPProviderList(data).then(function (res) {
              if (res.provider_list.length > 0) {
                that.foundWholesalerProviderList = res.provider_list
              }
              that.loading = false
            })
            that.loading = false
            return
          case 'store':
            this.loading = true
            data = {
              store_id: that.finderKey['store'],
              plan_id: " "
            }
            providerServices.getStoreProviderList(data).then(function (res) {
              if (res.provider_list.length > 0) {
                that.foundWholesalerProviderList = res.provider_list
              }
            })
            that.loading = false
            return
        }
      }
    },
    watch: {
      finderMode: function () {
        this.disableFindBtn = true
        switch (this.finderMode) {
          case "provider_name":
            this.disableFindBtn = (this.finderKey['provider_name'] + this.finderKey['city'] + this.finderKey['selectedState'] + this.finderKey['zip']).length < 1
            break
          case "nabp_npi":
            this.disableFindBtn = this.finderKey['nabp_npi'].length < 1
            break
          case "store":
            this.disableFindBtn = this.finderKey['store'].length < 1
            break
        }
      },
      finderKey: {
        handler(newVal, oldVal) {
          switch (this.finderMode) {
            case "provider_name":
              this.disableFindBtn = (this.finderKey['provider_name'] + this.finderKey['city'] + this.finderKey['selectedState'] + this.finderKey['zip']).length < 1
              break
            case "nabp_npi":
              this.disableFindBtn = this.finderKey['nabp_npi'].length < 1
              break
            case "store":
              this.disableFindBtn = this.finderKey['store'].length < 1
              break
          }
        },
        deep: true,
      }
    }
  }
</script>
<style lang="stylus">
</style>
