<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">MAC Pricing</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field v-model="search" dark light single-line append-icon="search" placeholder="Search..."
                    class="white--text" hide-details></v-text-field>
    </v-toolbar>
    <v-container fluid class="my-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="planMacList"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
            item-key="key"
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
                <td class="text-xs-left">
                  <v-tooltip top>
                    <v-btn icon @click="editRow(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit Mac Pricing</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left">{{ props.item['Group'] }}</td>
                <td class="text-xs-left">{{ props.item['Plan ID'] }}</td>
                <td class="text-xs-left">{{ props.item['Group ID'] }}</td>
                <td class="text-xs-left">{{ props.item['MAC ID'] }}</td>
                <td class="text-xs-left">{{ props.item['Network'] }}</td>
                <td class="text-xs-left">{{ props.item['MAC Description'] }}</td>
                <td class="text-xs-center">
                  <v-tooltip top>
                    <span slot="activator">
                      <v-icon v-if="props.item['Status'] === 'A'" color="green">fiber_manual_record</v-icon>
                      <v-icon v-else color="grey">fiber_manual_record</v-icon>
                    </span>
                    <span>{{ props.item['Status'] === 'A' ? 'Active' : 'Inactive' }}</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-layout row wrap>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Group:</span> {{ props.item['Group'] }}</p>
                    <p><span>Plan ID:</span> {{ props.item['Plan ID'] }}</p>
                    <p><span>Network:</span> {{ props.item['Network'] }}</p>
                    <p><span>MAC Description:</span> {{ props.item['MAC Description'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Status:</span> {{ props.item['Status'] }}</p>
                    <p><span>MAC Fee:</span> {{ props.item['MAC Fee'] }}</p>
                    <p><span>Dispense Fee:</span> {{ props.item['Dispense Fee'] }}</p>
                    <p><span>Group ID:</span> {{ props.item['Group ID'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>MAC ID:</span> {{ props.item['MAC ID'] }}</p>
                    <p><span>Created By:</span> {{ props.item['Created By'] }}</p>
                    <p><span>Created Date:</span> {{ convertDate(props.item['Created Date']) }}</p>
                    <p><span>Updated By:</span> {{ props.item['Updated By'] }}</p>
                    <p><span>Updated Date:</span> {{ convertDate(props.item['Updated Date'])}}</p>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>

    <drug-mac-form :show="show" :close="closeModal" :mode="mode" :planMac="planMac"
                   :selectedMP="selectedMP"></drug-mac-form>
  </main>
</template>
<script>
  import drugServices from '../../../services/drug/drugServices'
  import GroupMacService from '../../../services/pbmsys/GroupMacService'
  import store from '../../../store'
  import {convertDate, convertStringToPickerFormat} from '../../../components/utils/DateMethods'
  import DrugMacForm from './MACForm'

  export default {
    name: 'mac-pricing',
    data() {
      return {
        mode: null,
        planMac: {},
        planMacList: [],
        search: '',
        pagination: {
          rowsPerPage: 25
        },
        headers: [],
        show: false,
        loading: false,
        rules: {
          required: (value) => {
            return !!value || 'Required'
          }
        },
        selectedMP: {}
      }
    },
    components: {DrugMacForm},
    mounted() {
      console.log('----- Drugs / Mac Pricing mounted -----')
      this.getGroupMacList()
      this.headers = [
        {text: '', align: 'left', sortable: false, value: ''},
        {text: '', align: 'left', sortable: false, value: ''},
        {text: 'Group', align: 'left', sortable: true, value: 'Group'},
        {text: 'Plan ID', align: 'left', sortable: true, value: 'Plan ID'},
        {text: 'Group ID', align: 'left', sortable: true, value: 'Group ID'},
        {text: 'MAC ID', align: 'left', sortable: true, value: 'MAC ID'},
        {text: 'Network', align: 'left', sortable: true, value: 'Network'},
        {text: 'MAC Description', align: 'left', sortable: true, value: 'MAC Description'},
        {text: 'Status', align: 'left', sortable: true, value: 'Status'}
      ]
    },
    methods: {
      convertDate: convertDate,
      getGroupMacList: function () {
        const that = this
        that.planMacList = []
        const param = {
          pcc: this.$store.state.pcn.pcc,
          uid: this.$store.state.user.session_uid
        }
        drugServices.getGroupMacList(param).then(function (v) {
          that.planMacList = v.mac_list
          that.planMacList.forEach(function (d, i) {
            d.key = i
          })
        })
      },
      closeModal: function () {
        this.planMac = {}
        this.show = false
        this.planMacList = []
        this.getGroupMacList()
      },
      editRow: function (item) {
        this.mode = 'edit'
        this.show = true
        this.selectedMP = item
        const gMacService = new GroupMacService();
        const param = {
          groupId: parseInt(item['Group ID']),
          planId: item['Plan ID'],
          networkId: parseInt(item['network_id']),
          macId: parseInt(item['MAC ID']),
          includeProperties: ''
        }
        const that = this
        gMacService.getByKey(param).then(function (v) {
          const {Group, UpdatedDate, ...filteredData} = v
          that.planMac = Object.assign({}, {...filteredData}, {
            EffectiveStartDate: filteredData['EffectiveStartDate'] ? convertStringToPickerFormat(filteredData['EffectiveStartDate']) : (new Date()).toLocaleDateString(),
            EffectiveEndDate: filteredData['EffectiveEndDate'] ? convertStringToPickerFormat(filteredData['EffectiveEndDate']) : '12/31/9998'
          })
          window.Vue.$emit('loadGroupMac', v)
        })
      }
    },
    events: {}
  }
</script>
<style lang="stylus">
</style>
