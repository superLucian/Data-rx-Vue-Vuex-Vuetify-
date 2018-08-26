<template>
  <v-layout row justify-center>
    <Vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="true"
      :closeOnClickMask="true"
      :width="800"
      :height="500"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          Assign to plans {{type}}
        </v-toolbar-title>
      </v-toolbar>
      <v-container fluid class="px-0">
        <v-layout row wrap class>
          <v-flex xs12>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="plan_items"
                v-model="info.PlanId"
                label="Plan"
                item-text="desc"
                item-value="PlanId"
              ></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <date-picker label="Start Date" v-model="info.EffectiveStartDate"></date-picker>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text>
              <v-checkbox label="Plan has an end date?" v-model="isEndDate"
                          light></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs4 v-if="isEndDate">
            <v-card-text class="py-0">
              <date-picker label="End Date" v-model="info.EffectiveEndDate"></date-picker>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs4 class="offset-xs4">
            <v-card-text class="py-0">
              <v-radio-group row v-model="info.IsActive" hide-details>
                <v-radio :value="true" label="Active"></v-radio>
                <v-radio :value="false" label="Inactive"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn color="primary-color" @click.native="save" :disabled="isDisabledSave">Save</v-btn>
        <v-btn @click.native="close()">Close</v-btn>
      </v-card-actions>
    </Vodal>
  </v-layout>
</template>

<script>
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import store from '../../../../store'
  import memberServices from '../../../../services/member/memberServices'
  import {convertDate, convertDateTime, pickerFormat} from '../../../../components/utils/DateMethods'
  import DatePicker from "../../../../components/common/DatePicker.vue";

  export default {
    name: 'edit-assign',
    props: ['updateItems'],
    data() {
      return {
        type: null,
        show: false,
        search: [],
        filter: 'Active',
        isDisabledSave: true,
        row: null,
        menu: false,
        info: {},
        startDate: '',
        endDate: '',
        isEndDate: false,
        planItem: {},
        plan_items: this.$store.state.memberPlanLists.map(item => (
          {
            GroupId: item.GroupId,
            PlanId: item.PlanId,
            desc: item.PlanId + ' - ' + item.Description
          }
        )) || []
      }
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
            this.isDisabledSave = false
          }
        },
        deep: true
      },
      isEndDate: function () {
        this.isDisabledSave = false
      }
    },
    components: {
      DatePicker,
      Vodal
    },
    mounted() {
      console.log('------  Drugs / HMACPricing / Edit HMAC mounted ------')
      const that = this
      window.Vue.$on('openEditAssign', function (val) {
        that.info = val.data
        that.type = val.mode
        if (that.type === 'edit') {
          if (convertDate(that.info.EffectiveEndDate) === '12/31/9998')
            that.isEndDate = false
          else that.isEndDate = true
        } else {
          that.isEndDate = false;
          that.info = {
            PlanId: that.plan_items[0].PlanId,
            EffectiveStartDate: pickerFormat(new Date()),
            EffectiveEndDate: '12/31/9998',
            IsActive: true
          }
        }
        that.open()
      })
    },
    methods: {
      setValues: function (data) {

      },
      open: function () {
        this.show = true
        const that = this
        setTimeout(function () {
          that.isDisabledSave = true
        }, 100)
      },
      close: function () {
        this.show = false
        this.isDisabledSave = true
      },
      save: function () {
        const planData = this.plan_items.filter(item => (
          item.PlanId === this.info.PlanId
        ))[0]
        const that = this
        if (this.type === 'edit') {
          const data = {
            Pcc: this.$store.state.pcn.pcc,
            GroupId: planData.GroupId,
            PlanId: planData.PlanId,
            MemberId: this.$store.state.selectedMember.MemberId,
            PersonCode: this.$store.state.selectedMember.PersonCode,
            EffectiveStartDate: convertDate(this.info.EffectiveStartDate),
            EffectiveEndDate: this.isEndDate ? convertDate(this.info.EffectiveEndDate) : '12/31/9998',
            ActiveDate: convertDate(this.info.ActiveDate),
            CreatedDate: convertDate(this.info.CreatedDate)
          }
          const {ActiveDate, CreatedDate, UpdatedDate, ...filteredData} = this.info
          const updatedData = Object.assign({}, {...filteredData}, {...data})
          memberServices.updatePlanMember({"entity": updatedData}).then(function (res) {
            that.updateItems(res, 'edit')
            that.isDisabledSave = true
            that.show = false
          })
        } else {
          if (this.$store.state.selectedMember.MemberId !== '' || this.$store.state.selectedMember.PersonCode !== '') {
            const data = {
              pcc: this.$store.state.pcn.pcc,
              groupId: planData.GroupId,
              planId: planData.PlanId,
              memberId: this.$store.state.selectedMember.MemberId,
              personCode: this.$store.state.selectedMember.PersonCode,
              effectiveStartDate: convertDate(this.info.EffectiveStartDate),
              effectiveEndDate: this.isEndDate ? convertDate(this.info.EffectiveEndDate) : '12/31/9998'
            }
            memberServices.addPlanMember(data).then(function (res) {
              const {CreatedDate, ...filtered} = res
              const temp = Object.assign({}, {...filtered}, {
                ActiveDate: convertDate(res.ActiveDate),
                EffectiveStartDate: convertDate(res.EffectiveStartDate),
                EffectiveEndDate: convertDate(res.EffectiveEndDate),
                CreatedDate: convertDate(res.CreatedDate),
                IsActive: that.info.IsActive
              })
              memberServices.addNewPlanMember({"entity": temp}).then(function (r) {
                that.updateItems(r, 'add')
                window.Vue.$emit('snackbar', 'success', 'Assign to Plans Success!')
                that.show = false
                that.isDisabledSave = true
              }).catch(err => (window.Vue.$emit('snackbar', 'error', 'This Plan added already!')))
            }).catch(err => (window.Vue.$emit('snackbar', 'error', err)))
          } else {
            window.Vue.$emit('snackbar', 'error', 'You need Member Id and Person Code! Please add the member info in first.')
          }
        }

      },
    }
  }
</script>

<style lang="scss">
</style>
