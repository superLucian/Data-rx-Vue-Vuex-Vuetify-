<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-layout column wrap>
          <v-flex xs12>
            <h5>Find claim(s) using:</h5>
          </v-flex>
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field
                required
                label="Last Name"
                v-model.trim="lastName"
              ></v-text-field>
            </v-flex>
            <v-btn icon @click="openFindMemberModal">
              <v-icon>search</v-icon>
            </v-btn>
          </v-layout>
          <v-flex xs6>
            <v-text-field
              label="First Name"
              v-model.trim="firstName"
            ></v-text-field>
          </v-flex>
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
    <find-member-modal
      @hide="hide"
      :isShow="findMemberModalIsVisible"
      :methodName="methodName"
    ></find-member-modal>
  </v-card>
</template>

<script>
  import FindMemberModal from './Modals/FindMemberModal.vue'
  import DatePicker from '../../../../components/common/DatePicker.vue'
  import { convertStringToPickerFormat } from '../../../../components/utils/DateMethods'

  export default {
    name: 'name-tab',
    components: {
      DatePicker,
      FindMemberModal,
    },
    data() {
      return {
        dateTo: (new Date()).toLocaleDateString(),
        dateFrom: (new Date()).toLocaleDateString(),
        lastName: '',
        firstName: '',
        useDateRange: false,
        findMemberModalIsVisible: false,
        methodName: 'selectMemberToNameTab'
      }
    },
    mounted () {
      const that = this

      window.Vue.$on(this.methodName, function({ LastName, FirstName }) {
        that.lastName = LastName
        that.firstName = FirstName
        that.findMemberModalIsVisible = false
      })
    },
    computed: {
      disabled: function () {
        return !this.lastName;
      }
    },
    methods: {
      hide: function() {
        this.findMemberModalIsVisible = false
      },
      submit () {
        const {
          useDateRange,
          dateTo: ClaimDateTo,
          dateFrom: ClaimDateFrom,
          lastName: LastNameStartWith,
          firstName:FirstNameStartWith,
        } = this;

        const Member = Object.assign(
          {},
          LastNameStartWith ? { PatientLastNameStartsWith: LastNameStartWith } : null,
          FirstNameStartWith ? { PatientFirstNameStartsWith: FirstNameStartWith } : null,
        )
        const searches = [
          {
            ...Member,
            ClaimDateFrom: convertStringToPickerFormat(ClaimDateFrom) + ' 00:00:00.000',
            ClaimDateTo: useDateRange ? convertStringToPickerFormat(ClaimDateTo) + ' 23:59:59.000' : convertStringToPickerFormat(ClaimDateFrom) + ' 23:59:59.000'
          }
        ]

        window.Vue.$emit('checkClaimsCount', searches)
      },
      openFindMemberModal () {
        this.findMemberModalIsVisible = true
      }
    }
  }
</script>
<style lang="stylus">
</style>
