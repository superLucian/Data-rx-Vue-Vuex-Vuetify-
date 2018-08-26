<template>
  <main>
    <v-form ref="form">
      <v-layout row wrap>
        <v-tabs v-model="activedTab">
          <v-tabs-bar class="white">
            <v-tabs-slider class="active-line"></v-tabs-slider>
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab.name"
              :href="tab.path">
              {{ tab.name }}
            </v-tabs-item>
          </v-tabs-bar>
        </v-tabs>
        <!-- Provider tab-->
        <v-container fluid v-if="activedTab=='provider'">
          <v-layout row wrap>
            <v-flex xs4 class="pr-3">
              <v-text-field label="NABP" v-model="networkProviderData['nabp']" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-3 pr-3">
              <v-text-field label="NPI" v-model="networkProviderData['npi']" required :rules="npiRules" :counter="10">
              </v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-3">
              <v-text-field label="Name" v-model="networkProviderData['name_txt']" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3></v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-text-field label="Store" v-model="networkProviderData['store_id']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-checkbox label="Open 24 hrs" v-model="networkProviderData['open_24_hours_ind']" light></v-checkbox>
            </v-flex>
            <v-flex xs3></v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3 class="pr-3">
              <v-text-field label="Phone" v-model="networkProviderData['phone_num']" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-text-field label="Fax" v-model="networkProviderData['fax_num']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-text-field label="Email" v-model="networkProviderData['email_addr_txt']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3">
              <v-text-field label="Web" v-model="networkProviderData['web_url_txt']">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3 class="pr-3">
              <v-text-field label="Fed License" v-model="networkProviderData['fed_license_txt']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-text-field label="Tax" v-model="networkProviderData['fed_tax_id']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-text-field label="State License" v-model="networkProviderData['state_license_txt']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3">
              <v-text-field label="Tax" v-model="networkProviderData['state_tax_id']">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3></v-flex>
            <v-flex xs5 class="pl-3 pr-3">
              <v-select
                label="Contract"
                v-bind:items="contractList"
                v-model="selectedContract"
                item-value="contract_id"
                item-text="desc_txt"
                return-object>
              </v-select>
            </v-flex>
            <v-flex xs4 class="pl-3 pr-3">
              <v-subheader>Status</v-subheader>
              <v-card class="elevation-0">
                <v-card-text>
                  <v-layout row wrap class="pl-3">
                    <v-flex xs12>
                      <v-radio-group row v-model="networkProviderData['status_cd']">
                        <v-radio value="A" label="Active" light></v-radio>
                        <v-radio value="I" label="Inactive" light></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Price it! tab-->
        <v-container fluid v-if="activedTab=='price'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12>
              <networkPrice
                :pid="networkProvider['pid']"
                :name="networkProvider['Provider Name']">
              </networkPrice>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Location tab-->
        <v-container fluid v-if="activedTab=='location'">
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs7 class="pr-3">
                  <v-text-field label="Address" v-model="networkProviderData['loc_addr1_txt']">
                  </v-text-field>
                </v-flex>
                <v-flex xs5 class="pl-3">
                  <v-text-field v-model="networkProviderData['loc_addr2_txt']">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs5 class="pr-3">
                  <v-text-field label="City" v-model="networkProviderData['loc_city_txt']">
                  </v-text-field>
                </v-flex>
                <v-flex xs2 class="pl-3 pr-3">
                  <v-select v-bind:items="stateList" v-model="networkProviderData['loc_state_cd']">
                  </v-select>
                </v-flex>
                <v-flex xs5 class="pl-3">
                  <v-text-field label="Zipe Code" v-model="networkProviderData['loc_zip_cd']">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Mail Address tab-->
        <v-container fluid v-if="activedTab=='mail'">
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs7 class="pr-3">
                  <v-text-field label="Address" v-model="networkProviderData['mail_addr1_txt']">
                  </v-text-field>
                </v-flex>
                <v-flex xs5 class="pl-3">
                  <v-text-field v-model="networkProviderData['mail_addr2_txt']">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs5 class="pr-3">
                  <v-text-field label="City" v-model="networkProviderData['mail_city_txt']">
                  </v-text-field>
                </v-flex>
                <v-flex xs2 class="pl-3 pr-3">
                  <v-select v-bind:items="stateList" v-model="networkProviderData['mail_state_cd']">
                  </v-select>
                </v-flex>
                <v-flex xs5 class="pl-3">
                  <v-text-field label="Zipe Code" v-model="networkProviderData['mail_zip_cd']">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Contact tab-->
        <v-container fluid v-if="activedTab=='contact'">
          <v-layout row wrap>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs6 class="pr-3">
                  <v-text-field label="First Name" v-model="networkProviderData['contact_fname']" required
                                :rules="[rules.required]">
                  </v-text-field>
                </v-flex>
                <v-flex xs6 class="pl-3">
                  <v-text-field label="Last Name" v-model="networkProviderData['contact_lname']" required
                                :rules="[rules.required]">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs7 class="pr-3">
                  <v-text-field label="Address" v-model="networkProviderData['contact_addr1_txt']">
                  </v-text-field>
                </v-flex>
                <v-flex xs5 class="pl-3">
                  <v-text-field v-model="networkProviderData['contact_addr2_txt']">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs5 class="pr-3">
                  <v-text-field label="City" v-model="networkProviderData['contact_city_txt']">
                  </v-text-field>
                </v-flex>
                <v-flex xs2 class="pl-3 pr-3">
                  <v-select v-bind:items="stateList" v-model="networkProviderData['contact_state_cd']">
                  </v-select>
                </v-flex>
                <v-flex xs5 class="pl-3">
                  <v-text-field label="Zipe Code" v-model="networkProviderData['contact_zip_cd']">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs4 class="pr-3">
                  <v-text-field label="Phone" v-model="networkProviderData['contact_phone_num']">
                  </v-text-field>
                </v-flex>
                <v-flex xs4 class="pl-3 pr-3">
                  <v-text-field label="Fax" v-model="networkProviderData['contact_fax_num']">
                  </v-text-field>
                </v-flex>
                <v-flex xs4 class="pl-3">
                  <v-text-field label="Cell" v-model="networkProviderData['contact_cell_num']">
                  </v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs4 class="pr-3">
                  <v-text-field label="Page" v-model="networkProviderData['contact_pager_num']">
                  </v-text-field>
                </v-flex>
                <v-flex xs8 class="pl-3">
                  <v-text-field label="Email" v-model="networkProviderData['contact_email_addr_txt']">
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Comments tab-->
        <v-container fluid v-if="activedTab=='comment'">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label="Comment" v-model="networkProviderData['comment_txt']" multi-line>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-layout>
      <v-divider class="mt-2"></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn class="primary" @click.native="update()" :disabled="updateBtnDisabled">Save</v-btn>
        <v-btn @click.native="cancel()">Cancel</v-btn>
      </v-card-actions>
    </v-form>
  </main>
</template>
<script>
  import networkPrice from './Price/PriceList.vue'
  import networkServices from '../../../../services/network/networkServices'
  import store from '../../../../store'
  export default {
    props: ['netid', 'item', 'refresh', 'cancel'],
    components: {
      networkPrice
    },
    data() {
      return {
        tabs: [
          {name: 'Provider', path: 'provider', validated: true},
          {name: 'Price it!', path: 'price'},
          {name: 'Location', path: 'location'},
          {name: 'Mail Address', path: 'mail'},
          {name: 'Contact', path: 'contact', validated: true},
          {name: 'Comments', path: 'comment'}],
        activedTab: "provider",
        networkProvider: {},
        networkProviderData: {},
        contractList: [],
        selectedContract: {},
        stateList: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
          'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
          'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
          'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
          'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'
        ],
        updateBtnDisabled: false,
        rules: {
          required: (value) => !!value || 'Required.'
        },
        npiRules: [
          (v) => !!v || 'Required.',
          (v) => v === undefined || v.length >= 10 || 'NPI must be more than 10 characters'
        ],
      }
    },
    watch: {
      networkProviderData: {
        handler(newVal, oldVal) {
          this.tabs[0]['validated'] = this.networkProviderData['nabp'].length > 0 && this.networkProviderData['npi'].length >= 10 && this.networkProviderData['name_txt'].length > 0 && this.networkProviderData['phone_num'].length > 0
          this.tabs[4]['validated'] = this.networkProviderData['contact_fname'].length > 0 && this.networkProviderData['contact_lname'].length > 0
        },
        deep: true,
      },
      item: {
        handler(newVal, oldVal) {
          this.networkProvider = {...this.item}
          this.activedTab = "provider"
          this.getNetworkProviderData()
        },
        deep: true,
      }
    },
    mounted() {
      this.networkProvider = {...this.item}
      this.getStoreData()
      this.getNetworkProviderData()
    },
    methods: {
      getStoreData: function () {
        this.contractList = this.$store.state.networkParamSetupData.contract_list.map(function (item) {
          return {contract_id: item.contract_id, desc_txt: item.desc_txt}
        })
      },
      getNetworkProviderData: function () {
        const that = this
        const networkID = that.netid
        const pid = that.networkProvider.pid
        networkServices.getNetworkProviderData(networkID, pid).then(function (res) {
          that.networkProviderData = res.provider[0]
          that.setValue()
        })
      },
      setValue: function () {
        const that = this
        if (that.networkProviderData['contract_id']) {
          that.selectedContract = that.contractList.filter(function (item) {
            return item.contract_id === that.networkProviderData['contract_id']
          })[0]
        } else {
          that.selectedContract = {contract_id: -1, desc_txt: "No Contract"}
        }
        that.networkProviderData['open_24_hours_ind'] = that.networkProviderData['open_24_hours_ind'] === "Y"

      },
      update: function () {
        if (this.validate()) {
          const that = this
          that.networkProviderData['contract_id'] = that.selectedContract['contract_id']
          that.networkProviderData['open_24_hours_ind'] = that.networkProviderData['open_24_hours_ind'] === true ? "Y" : "N"
          if (that.networkProviderData['type_cd'] === null) that.networkProviderData['type_cd'] = "00"
          const pid = that.networkProvider.pid
          const info = Object.assign({}, that.networkProviderData, {network_id: that.netid}, {pid: pid})
          const user = that.$store.state.user
          const pcc = that.$store.state.pcn.pcc
          networkServices.updateProvider(info, user, pcc).then(function (res) {
            if (res === "0") {
              window.Vue.$emit('snackbar', 'success', 'Provider Updated !')
              that.refresh()
              that.cancel()
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      validate() {
        const that = this
        let tabForValidation = that.tabs.filter(function (tab) {
          return tab.hasOwnProperty('validated') && !tab['validated']
        })[0]
        if (tabForValidation) {
          that.activedTab = tabForValidation['path']
          setTimeout(function () {
            that.$refs.form.validate()
          }, 200)
          return false
        }
        return true
      }
    }
  }
</script>
<style lang="stylus">
</style>
