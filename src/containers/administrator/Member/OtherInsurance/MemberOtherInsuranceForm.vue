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
      <v-card-text class="px-0 my-scroll-enabled-2">
        <v-layout row wrap>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="OtherInsuranceTypeList"
                v-model="info.OtherInsuranceType"
                label="Other Insurance Type"
                item-text="text"
                item-value="code"
                bottom
              ></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Plan ID" v-model="info.ExternalPlanId"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Plan Description" v-model="info.PlanDescription"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="BIN" v-model="info.ExternalRxBIN"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="PCN" v-model="info.ExternalRxPCN"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Member Id" v-model="info.ExternalMemberId"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="RxGroup" v-model="info.ExternalRxGroup"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <date-picker label="Start Date" v-model="info.EffectiveStartDate"></date-picker>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <date-picker label="End Date" v-model="info.EffectiveEndDate"></date-picker>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn color="primary-color" @click.native="save">Save</v-btn>
        <v-btn @click.native="close()">Close</v-btn>
      </v-card-actions>
    </vodal>
  </v-layout>
</template>

<script>
  import memberServices from '../../../../services/member/memberServices'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import {convertDate, pickerFormat} from '../../../../components/utils/DateMethods'
  import DatePicker from "../../../../components/common/DatePicker.vue";

  export default {
    name: 'member-other-insurance-form',
    data() {
      return {
        info: {},
        OtherInsuranceTypeList: [
          {code: 0, text: 'Medicaid'},
          {code: 1, text: 'MedicarePartD'},
          {code: 2, text: 'HICP'},
          {code: 3, text: 'Other'}
        ],
        show: false,
        type: '',
        width: 1000,
        height: 0,
        isDisabled: true
      }
    },
    watch: {},
    components: {
      DatePicker,
      Vodal
    },
    mounted() {
      const that = this
//      Open Member Other Insurance Edit Form signal
      window.Vue.$on('openMemberOtherInsuranceForm', function (type, object) {
        that.type = type
        that.info = {...object}
        that.setValues()
        that.open()
      })
    },
    methods: {
      setValues() {
        this.info.EffectiveStartDate = pickerFormat(convertDate(this.info.EffectiveStartDate))
        this.info.EffectiveEndDate = pickerFormat(convertDate(this.info.EffectiveEndDate))
      },
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      },
      save: function () {
        const that = this
        if (this.info.OtherInsuranceType !== '') {
          if (this.type === 'Edit') {
            const {UpdatedDate, ...update} = this.info
            memberServices.updateMemberOtherInsurance(update, this.$store.state.user).then(function (res) {
              window.Vue.$emit('reloadMemberOtherInsurance')
              window.Vue.$emit('snackbar', 'success', 'Member Other Insurance Updated!')
              that.close()
            })
          } else {
            if (this.$store.state.selectedMember.MemberId !== '' || this.$store.state.selectedMember.PersonCode !== '') {
              const {CreatedDate, UpdatedBy, UpdatedDate, ...update} = this.info
              memberServices.addMemberOtherInsurance(update, this.$store.state.user).then(function (res) {
                window.Vue.$emit('reloadMemberOtherInsurance')
                window.Vue.$emit('snackbar', 'success', 'Member Other Insurance Added!')
                that.close()
              })
            } else {
              window.Vue.$emit('snackbar', 'error', 'You need Member Id and Person Code! Please add the member info in first.')
            }
          }
        } else {
          window.Vue.$emit('snackbar', 'warning', 'Need the Other Insurance Type!')
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
