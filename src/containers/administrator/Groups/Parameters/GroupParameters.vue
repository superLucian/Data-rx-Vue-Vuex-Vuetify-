<template>
  <v-layout row>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs6 class="pr-3">
          <date-picker v-model="group_info.calendar_period_start_dt" label="Start Date"></date-picker>
        </v-flex>
        <v-flex xs6 class="pl-3">
          <date-picker v-model="group_info.calendar_period_end_dt" label="End Date"></date-picker>
        </v-flex>
        <v-flex xs12>
          <v-select
            v-bind:items="spec_program_list"
            v-model="group_info.spec_program_id"
            label="Special Program"
            single-line
            item-text="desc_txt"
            item-value="program_id"
            bottom
          ></v-select>
          <v-checkbox label="Validate Diagnosis Code" v-model="group_info.validate_dx_cd_flg" true-value="T"
                      false-value="F" light></v-checkbox>
          <v-layout row wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field label="Minimum Claim Amount, $" v-model="group_info.min_charge_amt" type="number"
                            :rules="[rules.authRules, rules.required]"></v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field label="Admin Fee, $" v-model="group_info.admin_fee_amt" type="number"
                            :rules="[rules.authRules, rules.required]"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field label="Max Days To Reverse Claim" v-model="group_info.reversal_time_limit"
                            type="number" :rules="[rules.maxDayRules, rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field label="Future Fill Date Day Limit" type="number"
                            v-model="group_info.future_fill_time_limit" :rules="[rules.maxDayRules, rules.required]">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-text-field
            name="input-7-1"
            label="Required Fields"
            v-model="group_info.required_fields"
            multi-line
          ></v-text-field>
          <v-text-field
            name="input-7-1"
            label="Response Message"
            v-model="group_info.response_msg_txt"
            multi-line
          ></v-text-field>
          <v-text-field
            name="input-7-1"
            label="Reject Message"
            v-model="group_info.reject_msg_txt"
            multi-line
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import services from '../../../../services/group/groupService'
  import store from '../../../../store'
  import DatePicker from "../../../../components/common/DatePicker.vue"

  export default {
    name: 'group-parameters',
    props: ['type', 'group_info', 'spec_program_list', 'tab'],
    components: {
      DatePicker
    },
    data() {
      return {
        rules: {
          required: (value) => !!value || 'Required.',
          priceRules: (v) => v < 10000 || 'Price Discount cannot be greater than 9999.90',
          priceDiscountPctRules: (v) => v < 100 || 'Price Discount Pct cannot be greater than 99.90',
          feeRules: (v) => v < 1000 || 'Fee cannot be greater than 999.99',
          consumeRules: (v) => v < 100000 || 'This field Limit must be less more than 99999.9',
          authRules: (v) => v < 1000000 || 'This field Limit must be less more than 999999.9',
          authRules: (v) => v < 1000000 || 'This field Limit must be less more than 999999.9',
          maxDayRules: (v) => v < 10000 || 'This field Limit must be less more than 9999',
        },
      }
    },
    watch: {
      group_info: {
        handler: function () {
          this.tab['validated'] = parseFloat(this.group_info['min_charge_amt']) < 1000000 && parseFloat(this.group_info['admin_fee_amt']) < 1000000 && parseFloat(this.group_info['reversal_time_limit']) < 10000 && parseFloat(this.group_info['future_fill_time_limit']) < 10000
        },
        deep: true
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>

<style>
</style>
