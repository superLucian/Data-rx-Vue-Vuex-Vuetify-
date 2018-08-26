<template>
  <main>
    <v-container fluid>
      <v-layout row>
        <v-flex xs4>
          <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4 class="text-xs-right">
          <div class="subAdd">
            <v-btn fab dark class="primary mt-3" small="" @click.native="addPlan">
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="info"
            v-bind:search="search"
            :loading="loading"
            :pagination.sync="pagination"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left handCell">
                  <v-tooltip top>
                    <v-btn icon @click="editRow(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit</span>
                  </v-tooltip>
                  <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
                </td>
                <td class="text-xs-left">{{ getPlanDesc(props.item['PlanId'])}}</td>
                <td class="text-xs-left">{{ props.item['PlanId'] }}</td>
                <td class="text-xs-left">{{ convertDate(props.item['EffectiveStartDate']) }}</td>
                <td class="text-xs-left">{{ convertDate(props.item['EffectiveEndDate']) }}</td>
                <td class="text-xs-left">{{ props.item.Pcc }}</td>
                <td class="text-xs-left">{{ props.item['CreatedBy'] }}</td>
                <td class="text-xs-left">{{ convertDateTime(props.item['CreatedDate']) }}</td>
                <td class="text-xs-left">{{ props.item['UpdatedBy'] }}</td>
                <td class="text-xs-left">{{ convertDateTime(props.item['UpdatedDate']) }}</td>
                <td class="text-xs-left">
                  <v-tooltip top>
                    <v-btn icon slot="activator">
                      <v-icon v-if="props.item['IsActive']" color="green">fiber_manual_record</v-icon>
                      <v-icon v-else color="grey">fiber_manual_record</v-icon>
                    </v-btn>
                    <span v-if="props.item['IsActive']">Active</span>
                    <span v-else>Inactive</span>
                  </v-tooltip>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <edit-assign :updateItems="updateItems"></edit-assign>
    </v-container>
  </main>
</template>
<script>
  import store from '../../../../store'
  import memberServices from '../../../../services/member/memberServices'
  import {
    convertDate,
    convertDateTime,
    pickerFormat,
    convertStringToPickerFormat
  } from '../../../../components/utils/DateMethods'
  import EditAssign from './EditAssign.vue'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'

  export default {
    name: 'assign',
    data() {
      return {
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Plan Description', align: 'left', sortable: false, value: 'Plan Description'},
          {text: 'Plan ID', align: 'left', sortable: true, value: 'PlanId'},
          {text: 'Start Date', align: 'left', sortable: true, value: 'EffectiveStartDate'},
          {text: 'End Date', align: 'left', sortable: true, value: 'EffectiveEndDate'},
          {text: 'PCN', align: 'left', sortable: true, value: 'Pcc'},
          {text: 'Created By', align: 'left', sortable: false, value: 'CreatedBy'},
          {text: 'Created Date', align: 'left', sortable: false, value: 'CreatedDate'},
          {text: 'Last Updated By', align: 'left', sortable: false, value: 'UpdatedBy'},
          {text: 'Last Updated Date', align: 'left', sortable: false, value: 'UpdatedDate'},
          {text: 'Active', align: 'left', sortable: false, value: 'Active'},
        ],
        search: '',
        loading: false,
        info: this.$store.state.selectedPlanMembers,
        pagination: {
          rowsPerPage: 20
        },
        assignList: []
      }
    },
    components: {
      DeleteConfirm, EditAssign
    },
    mounted() {
      console.log('----- Administrator / Member / Edit / assign to plans mounted -----')
    },
    methods: {
      convertDate: convertDate,
      convertDateTime: convertDateTime,
      getPlanDesc: function (planId) {
        let desc = ''
        this.$store.state.memberPlanLists.some(function (i) {
          if (i.PlanId === planId) {
            desc = i.Description
            return true
          }
        })
        return desc
      },
      deleteRow(item) {
        const that = this
        const temp = Object.assign({}, {...item}, {
          ActiveDate: convertDate(item.ActiveDate),
          EffectiveStartDate: convertDate(item.EffectiveStartDate),
          EffectiveEndDate: convertDate(item.EffectiveEndDate),
          CreatedDate: convertDate(item.CreatedDate),
          UpdatedDate: convertDate(item.UpdatedDate)
        })
        memberServices.deletePlanMember(temp).then(function () {
          const data = that.info.filter(v => (v.Id !== temp.Id))
          store.commit('UPDATE_SELECTED_PLAN_MEMBER', data)
          that.info = data
        })
      },
      addPlan() {
        window.Vue.$emit('openEditAssign', {data: {}, mode: 'add'})
      },
      editRow(cellinfo) {
        window.Vue.$emit('openEditAssign', {data: {...cellinfo}, mode: 'edit'})
      },
      updateItems(data, mode) {
        const that = this
        if (mode === 'edit') {
          const dataTemp = that.$store.state.selectedPlanMembers.map(v => (v && (v.Id === data.Id ? data : v)))
          store.commit('UPDATE_SELECTED_PLAN_MEMBER', dataTemp)
          that.info = dataTemp
        } else {
          const dataTemp = [...that.$store.state.selectedPlanMembers]
          dataTemp.push(data)
          store.commit('UPDATE_SELECTED_PLAN_MEMBER', dataTemp)
          that.info = dataTemp
        }
      }
    }
  }
</script>
<style lang="stylus">
</style>
