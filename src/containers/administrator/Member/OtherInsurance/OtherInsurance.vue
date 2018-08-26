<template>
  <main>
    <v-container fluid class="my-scroll-enabled">
      <v-layout row>
        <v-flex xs4>
          <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4 class="text-xs-right">
          <div class="subAdd">
            <v-btn fab dark class="primary mt-3" small="" @click.native="add">
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-data-table
          v-bind:headers="headers"
          :items="insuranceList"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading"
          item-key="key"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center">

                <v-tooltip top v-if="props.expanded">
                  <v-btn icon @click="props.expanded = !props.expanded" slot="activator">
                    <v-icon>expand_less</v-icon>
                  </v-btn>
                  <span>Close</span>
                </v-tooltip>
                <v-tooltip top v-else>
                  <v-btn icon @click="props.expanded = !props.expanded" slot="activator">
                    <v-icon>expand_more</v-icon>
                  </v-btn>
                  <span>View details</span>
                </v-tooltip>
                <v-tooltip top>
                  <v-btn icon @click="editRow(props.item)" slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Edit</span>
                </v-tooltip>

                <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
              </td>
              <td class="text-xs-left">{{ getOtherInsuranceType(props.item.OtherInsuranceType) }}</td>
              <td class="text-xs-left">{{ props.item.ExternalPlanId }}</td>
              <td class="text-xs-left">{{ convertDate(props.item.EffectiveStartDate) }}</td>
              <td class="text-xs-left">{{ convertDate(props.item.EffectiveEndDate) }}</td>
              <td class="text-xs-left">{{ props.item.CreatedBy }}</td>
              <td class="text-xs-left">{{ convertDate(props.item.CreatedDate) }}</td>
              <td class="text-xs-left">{{ props.item.UpdatedBy }}</td>
              <td class="text-xs-left">{{ convertDate(props.item.UpdatedDate) }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-layout row wrap>
              <v-flex xs3>
                <v-card-text>
                  <p><span>Other Insurance Type:</span> getOtherInsuranceType(props.item.OtherInsuranceType)</p>
                  <p><span>Plan ID:</span> {{ props.item['ExternalPlanId'] }}</p>
                  <p><span>Plan Description:</span> {{ props.item['PlanDescription'] }}</p>
                  <p><span>BIN:</span> {{ props.item['ExternalRxBIN'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p><span>PCN:</span> {{ props.item['ExternalRxPCN'] }}</p>
                  <p><span>Member Id:</span> {{ props.item['ExternalMemberId'] }}</p>
                  <p><span>RxGroup:</span> {{ props.item['ExternalRxGroup'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p><span>Start Date:</span> {{ convertDate(props.item.EffectiveStartDate) }}</p>
                  <p><span>End Date:</span> {{ convertDate(props.item.EffectiveEndDate) }}</p>
                  <p><span>Created By:</span> {{ props.item['Created By'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p><span>Created:</span> {{ convertDate(props.item.CreatedDate) }}</p>
                  <p><span>Last Updated By:</span> {{ props.item['Last Updated By'] }}</p>
                  <p><span>Last Updated:</span> {{ convertDate(props.item.UpdatedDate) }}</p>
                </v-card-text>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
    <member-other-insurance-form></member-other-insurance-form>
  </main>
</template>
<script>
  import memberServices from '../../../../services/member/memberServices'
  import {convertDate} from '../../../../components/utils/DateMethods'
  import MemberOtherInsuranceForm from "./MemberOtherInsuranceForm.vue";
  import DeleteConfirm from "../../../../components/common/deleteConfirm.vue";

  export default {
    name: 'member-other-insurance',
    data() {
      return {
        type: '',
        headers: [],
        loading: false,
        isDisabledSave: false,
        insuranceList: [],
        pagination: {},
        search: '',
      }
    },
    components: {
      DeleteConfirm,
      MemberOtherInsuranceForm},
    mounted() {
      console.log('----- Administrator / Member / Edit / otherInsurance mounted -----')
      this.headers = [
        {text: '', align: 'left', sortable: true, value: ''},
        {text: 'Other Insurance Type', align: 'left', sortable: true, value: 'OtherInsuranceType'},
        {text: 'Plan ID', align: 'left', sortable: true, value: 'ExternalPlanId'},
        {text: 'Start Date', align: 'left', sortable: true, value: 'EffectiveStartDate'},
        {text: 'End Date', align: 'left', sortable: true, value: 'EffectiveEndDate'},
        {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
        {text: 'Created', align: 'left', sortable: true, value: 'CreatedDate'},
        {text: 'Last Updated By', align: 'left', sortable: true, value: 'Last Updated By'},
        {text: 'Last Updated', align: 'left', sortable: true, value: 'UpdatedDate'}
      ]

      const that = this
      window.Vue.$on('reloadMemberOtherInsurance', function () {
        const data = {
          pcc: this.$store.state.selectedMember.pcc,
          MemberId: this.$store.state.selectedMember.MemberId,
          PersonCode: this.$store.state.selectedMember.PersonCode
        }
        memberServices.getMemberOtherInsurance(data).then(function (res) {
          that.insuranceList = res.map(function (d, k) {
            d.key = k
            return d
          })
        })
      })

      const data = {
        pcc: this.$store.state.selectedMember.Pcc,
        MemberId: this.$store.state.selectedMember.MemberId,
        PersonCode: this.$store.state.selectedMember.PersonCode
      }
      memberServices.getMemberOtherInsurance(data).then(function (res) {
        that.insuranceList = res.map(function (d, k) {
          d.key = k
          return d
        })
      })
    },
    methods: {
      convertDate: convertDate,
      getOtherInsuranceType: function (val) {
        const otherInsuranceType = ['Medicaid', 'MedicarePartD', 'HICP', 'Other']
        return otherInsuranceType[Number(val)]
      },
      add: function () {
        const data = {
          Id: 0,
          MemberId: this.$store.state.selectedMember.MemberId,
          PersonCode: this.$store.state.selectedMember.PersonCode,
          Pcc: this.$store.state.selectedMember.Pcc,
          ExternalRxBIN: '',
          ExternalRxPCN: '',
          ExternalRxGroup: '',
          ExternalPlanId: '',
          ExternalMemberId: '',
          ExternalPersonCode: '',
          OtherInsuranceType: 0,
          PlanDescription: '',
          EffectiveStartDate: (new Date()).toLocaleDateString(),
          EffectiveEndDate: (new Date()).toLocaleDateString(),
          Member: null
        }
        window.Vue.$emit('openMemberOtherInsuranceForm', 'Add', data)
      },
      editRow: function (item) {
        window.Vue.$emit('openMemberOtherInsuranceForm', 'Edit', item)
      },
      deleteRow: function (item) {
        memberServices.deleteMemberOtherInsurance(item).then(function (res) {
          if (res === null) {
            window.Vue.$emit('reloadMemberOtherInsurance')
            window.Vue.$emit('snackbar', 'success', 'Member Other Insurance Deleted!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
