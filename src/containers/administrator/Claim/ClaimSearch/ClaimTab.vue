<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12>
            <h5>Find claim using:</h5>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs6>
            <v-text-field
              required
              label="Provider Id"
              v-model.trim="providerId"
            ></v-text-field>
          </v-flex>
          <v-flex xs1>
            <v-btn icon @click="openFindProviderModal">
              <v-icon>search</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs6>
            <v-text-field
              required
              label="Rx #"
              v-model.trim="rx"
            ></v-text-field>
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
  import FindProviderModal from './Modals/FindProviderModal.vue'
  import { convertStringToPickerFormat } from '../../../../components/utils/DateMethods'
  export default {
    name: 'claim-tab',
    components: {
      FindProviderModal,
    },
    data() {
      return {
        rx: '',
        providerId: '',
        addProviderModalIsVisible: false,
        methodName: 'selectProviderToClaimTab'
      }
    },
    computed: {
      disabled: function() {
        return !this.providerId || !this.rx
      }
    },
    mounted() {
      const that = this

      window.Vue.$on(this.methodName, function(item) {
        that.addProviderModalIsVisible = false
        that.providerId = item.pid
      })
    },
    methods: {
      hide: function() {
        this.addProviderModalIsVisible = false
      },
      submit () {
        const {
          providerId: ProviderId,
          rx: PrescriptionReferenceNumber,
        } = this

        const searches = [
          {
            PrescriptionReferenceNumber,
            NCPDPProviderId: ProviderId,
          },
          {
            PrescriptionReferenceNumber,
            NationalProviderId: ProviderId
          }
        ]
        window.Vue.$emit('checkClaimsCount', searches)
      },
      openFindProviderModal () {
        this.addProviderModalIsVisible = true
      }
    }
  }
</script>

<style lang="stylus">
</style>
