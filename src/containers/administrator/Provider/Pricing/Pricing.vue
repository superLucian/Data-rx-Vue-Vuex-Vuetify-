<template>
  <main>
    <v-card-text class="my-sub-scroll-enabled-1">
      <v-layout row wrap>
        <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        <v-spacer></v-spacer>
        <v-btn fab dark class="primary mt-3" small @click.native="addPricing()">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="priceData"
            v-bind:search="search"
            :loading="loading"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-center">
                  <v-tooltip top>
                    <v-btn icon @click="editPriceRow(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Price Edit</span>
                  </v-tooltip>
                  <delete-confirm v-on:confirmed="deletePriceRow(props.item)"
                                  :message="'Price Delete'"></delete-confirm>
                </td>
                <td class="text-xs-left"> {{ props.item['Group Name']}}</td>
                <td class="text-xs-left"> {{ props.item.NABP }}</td>
                <td class="text-xs-left">{{ props.item.NPI }}</td>
                <td class="text-xs-left">{{ props.item['Provider Name'] }}</td>
                <td class="text-xs-left">{{ props.item['Pricing Zip'] }}</td>
                <td class="text-xs-left">{{ props.item['Price Code'] }}</td>
                <td class="text-xs-left">{{ props.item.Markup }}</td>
                <td class="text-xs-left">{{ props.item.Fee }}</td>
                <td class="text-xs-left">{{ props.item['Min Amount'] }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <edit-pricing :groupList="groupList" :mppData="mppData" :zipData="zipList"></edit-pricing>
    </v-card-text>
  </main>
</template>
<script>
  import providerServices from '../../../../services/provider/providerServices'
  import store from '../../../../store'
  import EditPricing from './EditPricing.vue'
  import DeleteConfirm from "../../../../components/common/deleteConfirm.vue";

  export default {
    name: 'Provider-price-it',
    data() {
      return {
        info: this.$store.state.selectedProvider,
        headers: [
          {text: '', align: '', sortable: false, value: ''},
          {text: 'Group Name', align: 'left', sortable: true, value: 'Group Name'},
          {text: 'NABP', align: 'left', sortable: true, value: 'NABP'},
          {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
          {text: 'Provider Name', align: 'left', sortable: true, value: 'Provider Name'},
          {text: 'Pricing Zip', align: 'left', sortable: true, value: 'Pricing Zip'},
          {text: 'Price Code', align: 'left', sortable: true, value: 'Price Code'},
          {text: 'Markup', align: 'left', sortable: true, value: 'Markup'},
          {text: 'Fee', align: 'left', sortable: true, value: 'Fee'},
          {text: 'Min Amount', align: 'left', sortable: true, value: 'Min Amount'},
        ],
        search: '',
        loading: '',
        priceData: [],
        groupList: [],
        mppData: [],
        zipList:[],
      }
    },
    components: {
      DeleteConfirm,
      EditPricing,
    },
    mounted() {
      console.log('----------- Administrator / Provider / Edit / Pricing_tab mounted! -----------')
      const that = this
      providerServices.getPricingList(this.info, this.$store.state.pcn.pcc).then(function (res) {
        that.priceData = res.mpp_list
        that.loading = false
      })
      providerServices.getGroupList(this.$store.state.user, this.$store.state.pcn.pcc, '*').then(function (res) {
        that.groupList = res.group_list
        that.groupList.map(function (val) {
          val.group_name = val['Group Code'] + ' - ' + val.name
        })
      })
      window.Vue.$on('reloadPrice', function () {
        providerServices.getPricingList(that.info, that.$store.state.pcn.pcc).then(function (res) {
          that.priceData = res.mpp_list
          that.loading = false
        })
      })
    },
    methods: {
      addPricing() {
        const that = this
        providerServices.getMppData({}).then(function (res) {
          that.mppData = res
          that.zipList = []
          res.mpp_id.forEach(function (d) {
            that.zipList.push({desc_txt: d.mpp_id + ' ' + '-' + ' ' + d.desc_txt, mpp_id: d.mpp_id})
          })
          that.mppData.price_cd.unshift({field_value: '-1', desc_txt: 'Please Select...'})
          window.Vue.$emit('openEditPrice', {'Provider Name': that.info['name_txt']}, 'add')
        })
      },
      editPriceRow(cellinfo) {
        const that = this
        const data = {
          group_id: cellinfo.group_id,
          pid: cellinfo.pid
        }
        providerServices.getMppList(data).then(function (res) {
          that.mppData = res
          that.zipList = []
          res.mpp_id.forEach(function (d) {
            that.zipList.push({desc_txt: d.mpp_id + ' ' + '-' + ' ' + d.desc_txt, mpp_id: d.mpp_id})
          })
          that.mppData.price_cd.unshift({field_value: '-1', desc_txt: 'Please Select...'})
          window.Vue.$emit('openEditPrice', cellinfo, 'edit')
        })
      },
      deletePriceRow(cellinfo) {
        const data = {
          group_id: cellinfo.group_id,
          pid: cellinfo.pid
        }
        providerServices.deletePriceRow(data).then(function (res) {
          window.Vue.$emit('reloadPrice')
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
