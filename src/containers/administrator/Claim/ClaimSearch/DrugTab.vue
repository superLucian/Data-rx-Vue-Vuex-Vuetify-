<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-layout column wrap>
          <v-flex xs12>
            <h5>Find claim(s) using:</h5>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs6>
            <v-text-field
              required
              v-model.trim="drug"
              label="Drug (GPI, NDC, Name)"
            ></v-text-field>
          </v-flex>
          <v-btn icon @click="openFindDrugModal">
            <v-icon>search</v-icon>
          </v-btn>
        </v-layout>
        <v-layout row wrap>
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
    <find-drug-modal
      @hide="hide"
      :isShow="findDrugModalIsVisible"
    ></find-drug-modal>
  </v-card>
</template>

<script>
  import FindDrugModal from './Modals/FindDrugModal.vue'
  import DatePicker from '../../../../components/common/DatePicker.vue'
  import { convertStringToPickerFormat } from '../../../../components/utils/DateMethods'

  export default {
    name: 'drug-tab',
    components: {
      DatePicker,
      FindDrugModal,
    },
    data() {
      return {
        drug: '',
        dateTo: (new Date()).toLocaleDateString(),
        dateFrom: (new Date()).toLocaleDateString(),
        useDateRange: false,
        findDrugModalIsVisible: false,
        disabled: true
      }
    },
    watch: {
      drug: function (val) {
        if(val !== '') this.disabled = false
        else this.disabled = true
      }
    },
    mounted() {
      const that = this

      window.Vue.$on('drugSelected', function({NDC}) {
        that.drug = NDC
        that.findDrugModalIsVisible = false
      })
    },
    methods: {
      hide: function() {
        this.findDrugModalIsVisible = false
      },
      submit () {
        const {
          drug,
          useDateRange,
          dateTo: ClaimDateTo,
          dateFrom: ClaimDateFrom,
        } = this
        const date = {
          ClaimDateFrom: convertStringToPickerFormat(ClaimDateFrom) + ' 00:00:00.000',
          ClaimDateTo: useDateRange ? convertStringToPickerFormat(ClaimDateTo) + ' 23:59:59.000' : convertStringToPickerFormat(ClaimDateFrom) + ' 23:59:59.000'
        }
        const searches = [
          { Ndc: drug, ...date },
          { Gpi: drug, ...date },
          { ProductNameContains: drug, ...date }
        ]

        window.Vue.$emit('checkClaimsCount', searches)
      },
      openFindDrugModal () {
        this.findDrugModalIsVisible = true
      },
    }
  }
</script>

<style lang="stylus">
</style>
