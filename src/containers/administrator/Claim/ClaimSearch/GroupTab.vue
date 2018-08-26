<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <h5>Find claim(s) using:</h5>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6 class="pr-2">
            <v-select
              label="Group"
              v-bind:items="groups"
              v-model="groupId"
              item-text="Code"
              item-value="Id"
            ></v-select>
          </v-flex>
          <v-flex xs6 class="pl-2">
            <v-select
              label="Plans"
              v-bind:items="plans"
              v-model="planId"
              item-text="Desc"
              item-value="PlanId"
            ></v-select>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6 class="pr-2">
            <date-picker
              v-model="dateFrom"
              label="Claim Date"
            ></date-picker>
          </v-flex>
          <v-flex xs6>
            <v-card-text>
              <v-checkbox label="Use Date Range" v-model="useDateRange" light></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs6 class="pr-2">
            <date-picker
              v-model="dateTo"
              v-if="useDateRange"
              label="Thru Claim Date"
            ></date-picker>
          </v-flex>
        </v-layout>
        <v-btn @click="submit" color="primary-color" :disabled="false || $store.state.claimSetupData.callingApi">Find</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>


<script>
  import store from '../../../../store'
  import services from '../../../../services/claim/claimServices'
  import DatePicker from '../../../../components/common/DatePicker.vue'
  import { convertStringToPickerFormat } from '../../../../components/utils/DateMethods'
  export default {
    name: 'group-tab',
    components: {
      DatePicker,
    },
    data() {
      return {
        groups: [],
        planId: '*',
        groupId: 0,
        dateTo: (new Date()).toLocaleDateString(),
        dateFrom: (new Date()).toLocaleDateString(),
        useDateRange: false
      }
    },
    computed: {
      plans: function () {
        this.planId = '*'

        return this.groupId !== null && this.groupId != 0
          ? this.groups.filter(({Id}) => Id === this.groupId)[0].Plans.map((d) => (d.PlanId == "*" ? {PlanId: d.PlanId, Desc: "All Plans"} : {PlanId: d.PlanId, Desc: d.PlanId + ' - ' + d.Description}))
          : [{GroupId: 0, PlanId: "*", Desc: "All Plans"}]
      }
    },
    mounted: function () {
      const that = this
      const data = {
        search: {
          Pcc: store.state.pcn.pcc,
          Plans: {IsActive: true},
        },
        orderBy: 'Code',
        includeProperties: 'Plans'
      }
      services.getGroupsList(data).then(function (groups) {
        let groupList = []
        if(groups.length > 0) {
          groupList = groups
        }
        groupList.unshift({Id: 0, Code: "All Groups"})

        const grps = groupList.map(g => {
          if (!g.Plans) {
            g.Plans = []
          }
          const plans = g.Plans
          plans.unshift({GroupId: 0, PlanId: "*", Desc: "All Plans"})
          g.Plans = plans
          return g
        })

        that.groups = grps
      })
    },
    methods: {
      submit() {
        const {
          useDateRange,
          planId: PlanId,
          groupId: GroupId,
          dateTo: ClaimDateTo,
          dateFrom: ClaimDateFrom,
        } = this;
        const searches = [
          {
            PlanId, GroupId,
            ClaimDateFrom: convertStringToPickerFormat(ClaimDateFrom) + ' 00:00:00.000',
            ClaimDateTo: useDateRange ? convertStringToPickerFormat(ClaimDateTo) + ' 23:59:59.000' : convertStringToPickerFormat(ClaimDateFrom) + ' 23:59:59.000'
          }
        ]

        window.Vue.$emit('checkClaimsCount', searches)
      },
    }
  }
</script>
<style lang="stylus">
</style>
