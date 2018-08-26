<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Find Claim</v-toolbar-title>
    </v-toolbar>
    <v-layout row wrap class="my-scroll-enabled">
      <v-card-text>
        <claim-search></claim-search>
      </v-card-text>
      <v-card-text class="py-0">
        <v-divider class="mb-3"></v-divider>
        <v-layout row wrap>
          <v-flex xs3>
            <v-checkbox label="Paid" v-model="filters" :value="1" light></v-checkbox>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Rejected" v-model="filters" :value="4" light></v-checkbox>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Captured" v-model="filters" :value="2" light></v-checkbox>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Duplicate Reversal" v-model="filters" :value="8" light></v-checkbox>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Duplicates" v-model="filters" :value="3" light></v-checkbox>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Reversal" v-model="filters" :value="6" light></v-checkbox>
          </v-flex>
          <v-flex xs3>
            <v-checkbox label="Reverse of Captured" v-model="filters" :value="9" light></v-checkbox>
          </v-flex>
          <div class="hidden">
            <v-checkbox label="5" v-model="filters" :value="5" light></v-checkbox>
            <v-checkbox label="7" v-model="filters" :value="7" light></v-checkbox>
            <v-checkbox label="0" v-model="filters" :value="0" light></v-checkbox>
          </div>
          <v-flex xs3>
            <v-btn @click="refresh" class="primary mt-0" :disabled="!items.length">Refresh</v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              v-bind:headers="headers"
              v-bind:items="items"
              v-bind:search="search"
              v-bind:pagination.sync="pagination"
              :total-items="totalItems"
              :rows-per-page-items="[5, 10, 25]"
              :loading="loading"
              item-key="ClaimId"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td @click="props.expanded = !props.expanded" class="text-xs-center px-0">
                    <v-tooltip top v-if="props.expanded">
                      <v-btn icon slot="activator">
                        <v-icon>expand_less</v-icon>
                      </v-btn>
                      <span>Close</span>
                    </v-tooltip>
                    <v-tooltip top v-else>
                      <v-btn icon slot="activator">
                        <v-icon>expand_more</v-icon>
                      </v-btn>
                      <span>View details</span>
                    </v-tooltip>
                  </td>
                  <td class="text-xs-left handCell" @click="showMore(props.item)">
                    <v-tooltip top>
                      <v-btn icon slot="activator">
                        <v-icon>view_module</v-icon>
                      </v-btn>
                      <span>View Claim</span>
                    </v-tooltip>
                  </td>
                  <td class="text-xs-left">{{ props.item["ClaimId"] }}</td>
                  <td class="text-xs-left">{{ props.item['ClaimDate']}}</td>
                  <td class="text-xs-left">{{ props.item["ServiceProviderId"] }}</td>
                  <td class="text-xs-left">{{ props.item["ProviderName"] }}</td>
                  <td class="text-xs-left">{{ props.item["PrescriptionReferenceNumber"] }}</td>
                  <td class="text-xs-left">{{ props.item["ClaimTypeCode"] }}</td>
                </tr>
              </template>
              <template slot="expand" slot-scope="props">
                <v-layout row wrap class="pl-4">
                  <v-flex xs3>
                    <v-card-text>
                      <p><span>Claim Id:</span> {{ props.item['ClaimId'] }}</p>
                      <p><span>Claim Date:</span> {{ props.item['ClaimDate'] }}</p>
                      <p><span>Provider Id:</span> {{  props.item['ServiceProviderId'] }}</p>
                      <p><span>Provider Name:</span> {{  props.item["Provider"] ? props.item["Provider"]["Name"] : '' }}</p>
                      <p><span>Script Id:</span> {{ props.item['PrescriptionReferenceNumber'] }}</p>
                      <p><span>Claim Type Code:</span> {{ props.item["ClaimTypeCode"] }}</p>
                      <p><span>Reject Desc:</span> {{ props.item['RejectMessage'] }}</p>
                      <p><span>Reject Code:</span> {{ props.item['RejectCode'] }}</p>
                      <p><span>Authorization Number:</span> {{ props.item['PriorAuthorizationNumber'] }}</p>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs3>
                    <v-card-text>
                      <p><span>Group Name:</span> {{ props.item["Group"] && props.item["Group"]["Name"] }}</p>
                      <p><span>Plan Name:</span> {{props.item["Plan"] && props.item["Plan"]["Description"] }}</p>
                      <p><span>Member Id:</span> {{ props.item['MemberId'] }}</p>
                      <p><span>Person Code:</span> {{ props.item['PersonCode'] }}</p>
                      <p><span>Last Name:</span> {{ props.item['PatientLastName'] }}</p>
                      <p><span>First Name:</span> {{ props.item['PatientFirstName'] }}</p>
                      <p><span>DOB:</span> {{ convertDate(props.item['PatientDateOfBirth']) }}</p>
                      <p><span>Script Fill Date:</span> {{  convertDate(props.item['PrescriptionFillDate'])  }}</p>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs3>
                    <v-card-text>
                      <p><span>Script Refill Num:</span> {{ props.item['RefillNumber'] }}</p>
                      <p><span>Qty Dispensed:</span> {{ props.item['QuantityDispensed'] }}</p>
                      <p><span>Days Supply:</span> {{ props.item['DaysSupplyAmount'] }}</p>
                      <p><span>NDC:</span> {{ props.item['Ndc'] }}</p>
                      <p><span>Strength:</span> {{ props.item['Strength'] }}</p>
                      <p><span>Form:</span> {{ props.item['FormCodeDescription'] }}</p>
                      <p><span>Product Name:</span> {{ props.item['ProductName'] }}</p>
                      <p><span>Product Type:</span> {{ props.item['ProductTypeDescription'] }}</p>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs3>
                    <v-card-text>
                      <p><span>Member Copay Amt:</span> {{ convertToDollar(props.item['CopayAmount']) }}</p>
                      <p><span>Deductible Amt:</span> {{ convertToDollar(props.item['AmountAppliedToPeriodicDeductible']) }}</p>
                      <p><span>Member Paid Amt:</span> {{ convertToDollar(props.item['PatientPayAmount']) }}</p>
                      <p><span>Plan Paid Amt:</span> {{ convertToDollar(props.item['ClaimAmount']) }}</p>
                      <p><span>PricingSource:</span> {{ props.item['PricingSourceDescription'] }}</p>
                      <p><span>Tier:</span> {{ props.item['CopayTier'] }}</p>
                      <p><span>PlanId:</span> {{ props.item['PlanId'] }}</p>
                      <p><span>Diagnosis:</span> {{ props.item['Diagnosis'] }}</p>
                      <p><span>Response:</span> {{ props.item['ResponseMessage'] }}</p>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-layout>

    <claim-display-modal :isShow="show" :data="selectedClaim" :close="close" :reload="reload"></claim-display-modal>
  </main>
</template>
<script>
  import ClaimSearch from './ClaimSearch/index.vue'
  import services from '../../../services/claim/claimServices'
  import {convertDate} from '../../../components/utils/DateMethods'
  import {decodeXml} from '../../../components/utils/Converter'
  import {PricingSourceTypeDescriptions, ProductTypeDescriptions} from '../../../components/utils/Constants'
  import ClaimDisplayModal from './ClaimDisplay/index'
  import {convertToDollar, convertToPercent} from '../../../components/utils/Converter'

  export default {
    name: 'claims',
    components: {
      ClaimDisplayModal, ClaimSearch
    },
    data() {
      return {
        items: [],
        totalItems: 0,
        search: '',
        loading: false,
        filters: [1, 4, 2, 8, 3, 6, 9, 5, 7, 0],
        pagination: {
          page: 1,
          rowsPerPage: 5
        },
        headers: [],
        selectedClaim: null,
        show: false,
        searchData: {}
      }
    },
    watch: {
      filters(v) {
        if(this.searchData && !this.loading) {
          this.fetchData(this.searchData)
        }
        // this.setItems()
      },
      'pagination.page': function(){
        this.doSearch()
      },
      'pagination.rowsPerPage': function(v){
        this.doSearch()
      },
      'pagination.sortBy': function(v){
        this.doSearch()
      },
      'pagination.descending': function(v){
        this.doSearch()
      }
    },
    mounted() {
      console.log('---------- Administrator / Claim List mounted -----------')
      const that = this;
      window.Vue.$on('checkClaimsCount', function (searches) {
        that.fetchData(searches)
      })

      window.Vue.$on('loadingClaim', function (flag) {
        that.loading = flag;
        if(flag == false) {
          that.reset()
        }
      })

      window.Vue.$on('addPriorAuthWithClaimSuccess', function (v) {
        if(v) {
          that.reload()
        }
      })

      this.headers = [
        {text: '', align: 'left', sortable: false, value: ''},
        {text: '', align: 'left', sortable: false, value: ''},
        {text: 'Claim Id', align: 'left', sortable: true, value: 'ClaimId'},
        {text: 'Claim Date', align: 'left', sortable: true, value: 'ClaimDate'},
        {text: 'Provider Id', align: 'left', sortable: true, value: 'ServiceProviderId'},
        {text: 'Provider Name', align: 'left', sortable: true, value: 'Provider.Name'},
        {text: 'Script Id', align: 'left', sortable: true, value: 'PrescriptionReferenceNumber'},
        {text: 'Claim Type Code', align: 'left', sortable: true, value: 'ClaimTypeCode'},
      ]
    },
    methods: {
      convertDate: convertDate,
      convertToDollar,
      convertToPercent,
      fetchData: function(searches) {
        if( !searches || Object.keys(searches).length == 0)
          return
        let filters = [...this.filters]
        const Pcc = this.$store.state.pcn.pcc
        let newSearches = null
        if(filters.length < 10) {
          newSearches = searches.map(el => {
            if(!filters.includes(6)) {
              if(filters.indexOf(5) > -1) {
                filters.splice(filters.indexOf(5), 1)
              }
            } else {
              if(filters.indexOf(5) == -1) {
                filters.push(5)
              }
            }
            return Object.assign({}, { ...el}, {Pcc, 'ClaimTypeCodeIn': filters })
          })
        } else {
          newSearches = searches.map(el => {
            if(el.hasOwnProperty('ClaimTypeCodeIn'))
              delete el['ClaimTypeCodeIn']
            return Object.assign({}, { ...el}, {Pcc })
          })
        }
        this.$store.commit('UPDATE_CLAIM_SETUP_DATA', {'callingApi': true})
        this.loading = true;
        const that = this
        services.getCountClaims(newSearches).then(function (count) {
          if (count > 0) {
            that.searchData = newSearches
            that.totalItems = count
            that.doSearch(newSearches)
          } else {
            that.reset()
            window.Vue.$emit('snackbar', 'success', 'No claims found!')
          }
        }).catch((e) => {
          that.reset()
        })
      },
      doSearch(searches = null) {
        if( !searches || Object.keys(searches).length == 0) {
          if(!this.searchData || Object.keys(this.searchData).length == 0)
            return
          else
            searches = this.searchData
        }
        const that = this
        if( that.pagination.rowsPerPage * (that.pagination.page - 1) > that.totalItems )
          that.pagination.page = 1
        const sortOrder = that.pagination.descending === true ? 'DESC' : 'ASC'
        const sortBy = that.pagination.sortBy === null ? 'ClaimDate DESC' : that.pagination.sortBy + ' ' + sortOrder

        that.loading = true;
        const data = {
          searches,
          orderBy: sortBy,
          pageNumber: that.pagination.page - 1 < 0 ? 0 : that.pagination.page - 1,
          pageSize: that.pagination.rowsPerPage,
          includeProperties: 'Plan,Group,Member,Provider',
        }
        services.getClaims(data).then(function (claims) {
          that.setItems(claims)
          that.loading = false;
          that.$store.commit('UPDATE_CLAIM_SETUP_DATA', {'callingApi': false})
        }).catch(() => {
          that.reset()
        });
      },
      showMore(data) {
        if (data['ClaimId']) {
          this.selectedClaim = data
          this.show = true
        }
      },
      reload() {
        this.show = false
        this.selectedClaim = null
        this.doSearch()
      },
      close() {
        this.show = false
        this.selectedClaim = null
      },
      setItems(claims) {
        if(claims.length > 0) {
          const that = this
          const updatedClaims = claims.map(item => (
            {
              ...item,
              ClaimDate: convertDate(item['ClaimDate']),
              ClaimTypeCode: that.convertTypeCode(item['ClaimTypeCode']),
              ProviderName: item['Provider'] ? item['Provider']['Name'] : null,
              PlanDescription: item['Plan'] ? item['Plan']['Description'] : null,
              GroupName: item['Group'] ? item['Group']['Name'] : null,
              RejectCode: decodeXml(item['RejectCode']),
              QuantityDispensed: parseFloat(item['QuantityDispensed']).toFixed(3),
              PricingSourceDescription: item['PricingSource'] && (parseInt(item['PricingSource']) === 9) ? (item['GroupMac'] != null) ? item['GroupMac']['Description'] : null : PricingSourceTypeDescriptions[parseInt(item['PricingSource'])],
              ProductTypeDescription: ProductTypeDescriptions[parseInt(item['ProductType'])]
            }
          ))
          // getProductionForClaim
          this.items = updatedClaims
          const reqBody = {
            search: { NdcIn: updatedClaims.map(el => el.Ndc) },
            orderBy: "",
            includeProperties: "FormCode"
          }
          services.getProductionForClaim(reqBody).then(function (res) {
            if(res.length > 0) {
              for(let i=0; i<updatedClaims.length; i++) {
                const filtered = res.filter(el => el.Ndc == updatedClaims[i]['Ndc'])

                that.items[i].Strength = filtered.length > 0 ? filtered[0].MetricStrength : null
                that.items[i].FormCodeDescription = filtered.length > 0 ? filtered[0].FormCode.Description : null
              }
            }
          });
        } else {
          this.items = []
        }
      },
      reset(){
        this.searchData = {}
        this.loading = false
        this.search = ''
        this.loading = false
        this.items = []
        this.pagination.sortBy = null
        this.pagination.page = 1
        this.$store.commit('UPDATE_CLAIM_SETUP_DATA', {'callingApi': false})
      },
      refresh() {
        this.search = ''
        this.filters = [1, 4, 2, 8, 3, 6, 9, 5, 7, 0]
        this.loading = false
        this.pagination.sortBy = null
        this.pagination.page = 1
        this.setItems()
      },
      convertTypeCode(v) {
        const codeArray = ['Unknown', 'Paid', 'Captured', 'Duplicates', 'Rejected', 'Reversed', 'Reversal', 'Benefit', 'Duplicate Reversal', 'Reverse of Captured']
        return codeArray[parseInt(v)]
      }
    }
  }
</script>
<style lang="stylus">
  div.hidden {
    display: none
  }
</style>
