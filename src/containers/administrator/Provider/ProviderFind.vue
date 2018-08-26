<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Manager Providers</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="add" v-if="!selectable">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="my-scroll-enabled-2">
      <v-layout row wrap>
        <v-container fluid>
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
                <v-btn color="primary-color" @click.native="find" :disabled="isDisableFind">Find<i v-if="loading"
                                                                                             class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                </v-btn>
              </v-card-actions>
            </v-tabs-items>
          </v-tabs>
        </v-container>
      </v-layout>
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
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-left handCell">
                    <v-btn small v-if="selectable" color="primary-color" @click="selectProvider(props.item)">select</v-btn>
                    <v-tooltip top v-else>
                      <v-btn icon @click="clickRow(props.item)" slot="activator">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <span>Provider Edit</span>
                    </v-tooltip>
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
    </div>
  </main>
</template>

<script>
  import providerServices from '../../../services/provider/providerServices'
  import store from '../../../store'

  export default {
    name: 'Provider-find',
    props: ['selectable', 'methodName'],
    data() {
      return {
        headers: [],
        tabs: ['Provider Name', 'NABP/NPI', 'Store#'],
        active: null,
        provider_name: '',
        state_item: '',
        state: '',
        city: '',
        zip_code: '',
        address: '',
        stateItems: ['AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP', 'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'],
        NABP_NPI: '',
        NABP: '',
        NAPB: '',
        NPI: '',
        chain: '',
        search: '',
        storeSearch: '',
        items: [],
        ncszData: [],
        storeData: [],
        nabpData: [],
        store_number: '',
        loading: false,
        tableData: [],
        isDisableFind: true,
        isFindResult: false,
        pid: ''
      }
    },
    component: {},
    computed: {
      values: function () {
        return this.provider_name + this.city + this.state_item + this.zip_code + this.NABP_NPI + this.store_number
      }
    },
    watch: {
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
    mounted() {
      console.log('----- Administrator / Provider Find mounted -----')
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
        const that = this
        let data
        this.isFindResult = true
        switch (this.active) {
          case 'Provider Name':
            data = {
              name_txt: that.provider_name,
              city_txt: that.city,
              state_cd: that.state_item,
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
      add() {
        const data = {
          pid: '',
          nabp: '',
          npi: '',
          type_cd: '0',
          status_cd: 'A',
          store_id: '',
          name_txt: '',
          chain_value: 0,
          loc_addr1_txt: '',
          loc_addr2_txt: '',
          loc_city_txt: '',
          loc_state_cd: '',
          loc_zip_cd: '',
          mail_addr1_txt: '',
          mail_addr2_txt: '',
          mail_city_txt: '',
          mail_state_cd: '',
          mail_zip_cd: '',
          phone_num: '',
          fax_num: '',
          email_addr_txt: '',
          web_url_txt: '',
          fed_license_txt: '',
          fed_tax_id: '',
          state_license_txt: '',
          state_tax_id: '',
          medicad_id: '',
          open_24_hours_ind: 'N',
          contact_lname: '',
          contact_fname: '',
          contact_addr1_txt: '',
          contact_addr2_txt: '',
          contact_city_txt: '',
          contact_state_cd: '',
          contact_zip_cd: '',
          contact_phone_num: '',
          contact_cell_num: '',
          contact_fax_num: '',
          contact_pager_num: '',
          contact_email_addr_txt: '',
          comment_txt: '',
          created_dt: '',
        }
        store.commit('UPDATE_SELECTED_PROVIDER', data)
        this.$router.push({path: 'add'})
      },
      clickRow(item) {
        const that = this
        providerServices.getProvider({pid: item.pid}).then(function (res) {
          store.commit('UPDATE_SELECTED_PROVIDER', res.provider[0])
          store.commit('UPDATE_STATUS', true)
          that.$router.push({path: `edit/${item.pid}`})
        })
      },
      selectProvider(item) {
        window.Vue.$emit(this.methodName, item)
      }
    }
//    <i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i>
//    saveLoading: false,
//    that.saveLoading = true   that.saveLoading = false
  }
</script>
<style lang="stylus">

</style>
