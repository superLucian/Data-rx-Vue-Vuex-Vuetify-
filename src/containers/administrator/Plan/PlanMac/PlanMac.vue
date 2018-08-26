<template>
  <main>
    <v-card-text class="my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn fab dark class="primary mt-3" small @click.native="add()">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="planMacList"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
            item-key="Description"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td @click="props.expanded = !props.expanded" class="text-xs-center px-0 pl-0 pr-0">
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
                    <span>Plan Mac Edit</span>
                  </v-tooltip>
                </td>
                <!--<td class="text-xs-left">{{ props.item['GroupId'] }}</td>-->
                <td class="text-xs-left">{{ props.item['PlanId'] }}</td>
                <td class="text-xs-left">{{ props.item['Network'] }}</td>
                <td class="text-xs-left">{{ props.item['Description'] }}</td>
                <td class="text-xs-left">{{ convertDate(props.item['EffectiveStartDate']) }}</td>
                <td class="text-xs-left">{{ convertDate(props.item['EffectiveEndDate']) }}</td>
                <td class="text-xs-left">{{ props.item['Rank'] }}</td>
                <!--<td class="text-xs-left">{{ props.item['CreatedBy'] }}</td>-->
                <!--<td class="text-xs-left">{{ convertDate(props.item['CreatedDate']) }}</td>-->
                <!--<td class="text-xs-left">{{ props.item['UpdatedBy'] }}</td>-->
                <!--<td class="text-xs-left">{{ convertDate(props.item['UpdatedDate']) }}</td>-->
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-layout row wrap class="px-5">
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Group :</span> {{ props.item['GroupId'] }}</p>
                    <p><span>Plan Id :</span> {{ props.item['PlanId'] }}</p>
                    <p><span>Network :</span> {{ props.item['Network'] }}</p>
                    <p><span>Rank :</span> {{ props.item['Rank'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>MAC Description :</span> {{ props.item['Description'] }}</p>
                    <p><span>Active :</span> {{ props.item['IsActive'] }}</p>
                    <p><span>Start Date :</span> {{ convertDate(props.item['EffectiveStartDate']) }}</p>
                    <p><span>End Date :</span> {{ convertDate(props.item['EffectiveEndDate']) }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Mac Fee :</span> {{ props.item['MacFee'] }}</p>
                    <p><span>Dispense Fee :</span> {{ props.item['DispenseFee'] }}</p>
                    <p><span>Group ID :</span> {{ props.item['GroupId'] }}</p>
                    <p><span>MAC ID :</span> {{ props.item['MacId'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Created By :</span> {{ props.item['CreatedBy'] }}</p>
                    <p><span>Created Date :</span> {{ convertDate(props.item['CreatedDate']) }}</p>
                    <p><span>Updated By :</span> {{ props.item['UpdatedBy'] }}</p>
                    <p><span>Updated Date :</span> {{convertDate(props.item['UpdatedDate']) }}</p>
                  </v-card-text>
                </v-flex>

              </v-layout>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <MACForm :show="show" :save="saveModal" :close="closeModal" :mode="mode" :planMac="planMac"
             :loading="modalLoading"></MACForm>
  </main>
</template>
<script>
  import MACForm from './MACForm.vue'
  import planServices from '../../../../services/plan/planServices'
  import GroupMacService from '../../../../services/pbmsys/GroupMacService'
  import MacService from '../../../../services/pbmsys/MacService'
  import store from '../../../../store'
  import {convertDate, convertStringDate, stringToDate} from '../../../../components/utils/DateMethods'
  import drugServices from '../../../../services/drug/drugServices'


  export default {
    name: 'plan-mac',
    data() {
      return {
        mode: null,
        planMac: {
          "GroupId": null,
          "PlanId": '',
          "NetworkId": null,
          "MacId": null,
          "Description": '',
          "IsActive": true,
          "EffectiveStartDate": null,
          "EffectiveEndDate": null,
          "MacFee": null,
          "DispenseFee": null,
          "Rank": null,
          "DeletedBy": null,
          "DeletedDate": null,
          "Group": null,
          "Mac": {
            Is340B: false
          },
          "CreatedBy": '',
          "CreatedDate": '',
          "UpdatedBy": '',
          "UpdatedDate": ''
        },
        planMacList: [],
        search: '',
        pagination: {
          rowsPerPage: 10,
          sortBy: 'Rank',
        },
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Plan ID', align: 'left', sortable: true, value: 'PlanId'},
          {text: 'Network', align: 'left', sortable: true, value: 'Network'},
          {text: 'MAC Description', align: 'left', sortable: true, value: 'Description'},
          {text: 'Start Date', align: 'left', sortable: true, value: 'EffectiveStartDate'},
          {text: 'End Date', align: 'left', sortable: true, value: 'EffectiveEndDate'},
          {text: 'Rank', align: 'left', sortable: true, value: 'Rank'},
        ],
        show: false,
        loading: false,
        modalLoading: false,
        isDisabledSave: false,
        rules: {
          required: (value) => {
            return !!value || 'Required'
          }
        }
      }
    },
    components: {MACForm},
    mounted() {
      console.log('----- Administrator / Plan / Plan Mac mounted -----')
      const that = this
      window.Vue.$on('reloadPlanMacList', function () {
        that.planMacList = []
        that.getGroupMacList()
      })
      if(!that.$store.state.planSetupData || !that.$store.state.planSetupData.network_list || that.$store.state.planSetupData.network_list.length == 0) {
        planServices.getNetworkList({pcc: that.$store.state.pcn.pcc}).then(function (res) {
          const networkList = [...res.network_list]
          networkList.unshift({'Network ID': -1, 'Network Desc': 'All Networks'})
          store.commit('UPDATE_PLAN_SETUP_DATA', {network_list: networkList})
          that.getGroupMacList()
        }).catch(function (e) {
          console.log(e)
          that.getGroupMacList()
        })
      } else {
        that.getGroupMacList()
      }
    },
    methods: {
      convertDate: convertDate,
      getGroupMacList: function () {
        const that = this

//        const param = {
//          pcc: this.$store.state.pcn.pcc,
//          uid: this.$store.state.user.session_uid
//        }
//        drugServices.getGroupMacList(param).then(function (v) {
//          that.aaList = v.mac_list
//          console.log(that.aaList)
//        })

        const groupMacService = new GroupMacService()
        const data = {
          "search": {
            "PlanId": this.$store.state.selectedPlan.plan_id,
            "GroupId": this.$store.state.selectedPlan.group_id
          },
          "orderBy": "Rank",
          "includeProperties": "Mac"
        }
        groupMacService.get(data).then(function (res) {
          const planMacList = res;
          let temp = [...planMacList];
          for (let i = 0; i < temp.length; i++) {
            temp[i]['EffectiveStartDate'] = convertDate(temp[i]['EffectiveStartDate'])
            temp[i]['EffectiveEndDate'] = convertDate(temp[i]['EffectiveEndDate'])
            temp[i]['Network'] = 'All Networks'

            if(that.$store.state.planSetupData && that.$store.state.planSetupData.network_list && that.$store.state.planSetupData.network_list.length > 0) {
              const networkData = that.$store.state.planSetupData.network_list.filter((v) => v['Network ID'] == temp[i]['NetworkId'])
              if(networkData.length > 0){
                temp[i]['Network'] = networkData[0]['Network Desc']
              }
            }
          }
          that.planMacList = temp
        })
      },
      getMaxRank: function(list) {
        return Math.max(...list.map(a => a.Rank))
      },
      add: function () {
        this.mode = 'add'
        this.planMac = {
          "PlanId": this.$store.state.selectedPlan.plan_id,
          "GroupId": this.$store.state.selectedPlan.group_id,
          "NetworkId": -1,
          "EffectiveStartDate": (new Date()).toLocaleDateString(),
          "EffectiveEndDate": '12/31/9998',
          "IsActive": true
        }
        this.show = true;
      },
      closeModal: function () {
        this.show = false
      },
      saveModal: function (v) {
        this.modalLoading = true
        const MaxRank = this.planMacList.length > 0 ? this.getMaxRank(this.planMacList) + 1 : 0
        const that = this
        const groupMacService = new GroupMacService()
        if (this.mode == 'edit') {
          const {Group, UpdatedDate, ...filteredData} = v
          let data = {
            "entity": {
              ...filteredData,
              EffectiveStartDate: filteredData['EffectiveStartDate'] ? filteredData['EffectiveStartDate'] : (new Date()).toLocaleDateString(),
              EffectiveEndDate: filteredData['EffectiveEndDate'] ? filteredData['EffectiveEndDate'] : '12/31/9998',
              CreatedDate: convertDate(filteredData['CreatedDate']),
              Rank: MaxRank
            }
          }

          data.entity.Mac.CreatedDate = convertDate(data.entity.Mac.CreatedDate)
          data.entity.Mac.UpdatedDate = convertDate(data.entity.Mac.UpdatedDate)
          groupMacService.update(data).then(function (res) {
            that.show = false
            that.modalLoading = false
            if (res.Mac) {
              const mac = res.Mac
              const macData = {
                "entity": {
                  ...mac,
                  CreatedDate: convertDate(mac.CreatedDate),
                  UpdatedDate: convertDate(mac.UpdatedDate)
                }
              }
              const macService = new MacService()
              macService.update(macData).then(res => {
                window.Vue.$emit('reloadPlanMacList')
                window.Vue.$emit('snackbar', 'success', 'Updated Plan Mac Successfully!')
              })
            } else {
              that.modalLoading = false
            }
          }).catch(() => {
            that.modalLoading = false
          })
        } else if (this.mode == 'add') {
          const {CreatedDate, UpdatedDate, DeletedBy, DeletedDate, ...groupMacData} = v
          const data = {
            "entity": {
              ...groupMacData,
              EffectiveStartDate: v['EffectiveStartDate'] ? v['EffectiveStartDate'] : (new Date()).toLocaleDateString(),
              EffectiveEndDate: v['EffectiveEndDate'] ? v['EffectiveEndDate'] : '12/31/9998',
              IsActive: v['IsActive'] ? true : false,
              Rank: MaxRank
            }
          }
          groupMacService.add(data).then(function (res) {
            that.show = false
            that.modalLoading = false
            const {PlanId, GroupId, NetworkId, EffectiveStartDate, EffectiveEndDate, DispenseFee, IsActive, MacFee, MacID, PCN, ...macData} = v
            const mac = {"entity":
              {
                ...macData,
                Id: MacID,
                Pcc: PCN,
                CreatedDate: convertDate( CreatedDate),
                UpdatedDate: convertDate( UpdatedDate)
              }
            }
            const macService = new MacService()
            macService.update(mac).then(res => {
              window.Vue.$emit('snackbar', 'success', 'Saved Group Mac Successfully!')
              that.getGroupMacList()
            }).catch((e) => {
              window.Vue.$emit('snackbar', 'warning', 'Saved Group Mac failed!')
              that.getGroupMacList()
            })
          }).catch((e) => {
            that.show = false
            that.modalLoading = false
            window.Vue.$emit('snackbar', 'warning', 'Saved Group Mac failed!')
          })
        }
      },
      editRow: function (item) {
        this.mode = 'edit'
        this.show = true
        this.planMac = {...item}
      }
    },
    events: {}
  }
</script>
<style lang="stylus">
</style>
