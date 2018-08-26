<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <h5>Find claim(s) using:</h5>
          </v-flex>
          <v-flex xs6>
            <date-picker
              :required="true"
              v-model="dateFrom"
              label="Claim Date"
            ></date-picker>
          </v-flex>
          <v-flex xs6>
            <v-card-text>
              <v-checkbox label="Use Date Range" v-model="useDateRange" light></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <date-picker
              v-model="dateTo"
              v-if="useDateRange"
              label="Thru Claim Date"
            ></date-picker>
          </v-flex>
        </v-layout>
        <v-btn @click="submit" color="primary-color" :disabled="disabled || $store.state.claimSetupData.callingApi">Find</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
  import DatePicker from '../../../../components/common/DatePicker.vue'
  import { convertStringToPickerFormat } from '../../../../components/utils/DateMethods'

  export default {
    name: 'date-tab',
    components: {
      DatePicker,
    },
    data() {
      return {
        dateTo: (new Date()).toLocaleDateString(),
        dateFrom: (new Date()).toLocaleDateString(),
        useDateRange: false
      }
    },
    computed: {
      disabled: function () {
        return !this.dateFrom
      }
    },
    mounted() {

    },
    methods: {
      submit() {
        const {
          useDateRange,
          dateTo: ClaimDateTo,
          dateFrom: ClaimDateFrom,
        } = this;
        const searches = [{
          ClaimDateFrom: convertStringToPickerFormat(ClaimDateFrom) + ' 00:00:00.000',
          ClaimDateTo: useDateRange ? convertStringToPickerFormat(ClaimDateTo) + ' 23:59:59.000' : convertStringToPickerFormat(ClaimDateFrom) + ' 23:59:59.000'
        }]
        window.Vue.$emit('checkClaimsCount', searches)
      },
    }
  }
</script>
<style lang="stylus">
</style>
