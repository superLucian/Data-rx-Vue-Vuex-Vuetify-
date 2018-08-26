<template>
  <v-container fluid>
    <v-layout column wrap>
      <v-flex xs12>
        <h5>Find claim using:</h5>
      </v-flex>
      <v-flex xs6>
        <v-text-field
          required
          type="number"
          v-model.number="claimId"
          label="Ref-Claim Num"
        ></v-text-field>
      </v-flex>
    </v-layout>
    <v-btn @click="submit" color="primary-color" :disabled="disabled || $store.state.claimSetupData.callingApi">Find</v-btn>
  </v-container>
</template>

<script>
  export default {
    name: 'ref-claim-number-tab',
    data() {
      return {
        claimId: null
      }
    },
    computed: {
      disabled: function () {
        return !this.claimId
      }
    },
    methods: {
      submit () {
        const { claimId: ClaimId } = this
        const searches = [{ ClaimId }]

        window.Vue.$emit('checkClaimsCount', searches)
      },
    }
  }
</script>
<style lang="stylus">
</style>
