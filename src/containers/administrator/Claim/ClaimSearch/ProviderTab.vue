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
                label="Provider Id"
                v-model.trim="providerId"
              ></v-text-field>
            </v-flex>
            <v-btn icon @click="openFindProviderModal">
              <v-icon>search</v-icon>
            </v-btn>
          </v-layout>
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
    <find-provider-modal
      @hide="hide"
      :isShow="addProviderModalIsVisible"
      :methodName="methodName"
    ></find-provider-modal>
  </v-card>
</template>


<script>
  import DatePicker from '../../../../components/common/DatePicker.vue'
  import FindProviderModal from './Modals/FindProviderModal.vue'
  import { convertStringToPickerFormat } from '../../../../components/utils/DateMethods'
  import services from '../../../../services/claim/claimServices'
  export default {
    name: 'provider-tab',
    components: {
      DatePicker,
      FindProviderModal,
    },
    data() {
      return {
        dateTo: (new Date()).toLocaleDateString(),
        dateFrom: (new Date()).toLocaleDateString(),
        providerId: null,
        useDateRange: false,
        addProviderModalIsVisible: false,
        methodName: 'selectProviderToProviderTab'
      }
    },
    mounted () {
      const that = this
      window.Vue.$on(this.methodName, function(item) {
        that.providerId = item.NPI
        that.addProviderModalIsVisible = false
      })
    },
    computed: {
      disabled: function () {
        return !this.providerId
      }
    },
    methods: {
      hide: function() {
        this.addProviderModalIsVisible = false
      },
      submit () {
        const {
          useDateRange,
          dateTo: ClaimDateTo,
          providerId: ProviderId,
          dateFrom: ClaimDateFrom
        } = this;
        const searches = [
            {
              ProviderId: ProviderId,
              ClaimDateFrom: convertStringToPickerFormat(ClaimDateFrom) + ' 00:00:00.000',
              ClaimDateTo: useDateRange ? convertStringToPickerFormat(ClaimDateTo) + ' 23:59:59.000' : convertStringToPickerFormat(ClaimDateFrom) + ' 23:59:59.000'
            }
        ]
        const pSearchData = {
          searches: [
            {Id: parseInt(ProviderId)},
            {NationalProviderId: ProviderId},
            {NCPDPProviderId: ProviderId}
          ],
          orderBy: "Id DESC",
          includeProperties: "",
          pageNumber: 0,
          pageSize: 1
        }
        services.getProviderSearch(pSearchData).then(function (res) {
          if(res.length > 0) {
            searches[0]['ProviderId'] = res[0]['Id']
            window.Vue.$emit('checkClaimsCount', searches)
          } else {
            window.Vue.$emit('loadingClaim', false)
            window.Vue.$emit('snackbar', 'success', 'No claims found!')
          }
        }).catch(() => {
          window.Vue.$emit('snackbar', 'success', 'No claims found!')
        });
      },
      openFindProviderModal () {
        this.addProviderModalIsVisible = true
      }
    }
  }
</script>
<style lang="stylus">
</style>
