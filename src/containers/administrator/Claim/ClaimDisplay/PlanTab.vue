<template>
  <v-form ref="form">
    <v-container fluid class="form-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Plan Id" :disabled="true" v-model="claim['Plan Id']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Plan Desc" :disabled="true" v-model="claim['Plan Name']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Plan Type" :disabled="true" v-model="claim['Plan Type Desc']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Plan Price Code" :disabled="true" v-model="claim['Plan Price Code']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Plan Price Desc" :disabled="true" v-model="claim['Plan Price Desc']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Reimbursement Desc" :disabled="true" v-model="claim['Plan Reimbursement Desc']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Authorization Req Amt" :disabled="true" v-model="claim['Authorization Required Amt']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Max Days Supply" :disabled="true" v-model="claim['Max Days Supply']"></v-text-field>
        </v-flex>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Network Type" :disabled="true" v-model="claim['Network Type Desc']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Max Qty Amt" :disabled="true" v-model="claim['Max Qty Dispensable']"></v-text-field>
        </v-flex>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Network Desc" :disabled="true" v-model="claim['Network Desc']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Max Rx Fill Type" :disabled="true" v-model="claim['Max Rx Fill Type Desc']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Max Rx Fill Count" :disabled="true" v-model="claim['Max Rx Fill Count']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Mac Rx Fill Days" :disabled="true" v-model="claim['Max Rx Fill Days Count']"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: 'plan-tab',
    props: ['data'],
    computed: {
      claim: function() {
        return this.data || {}
      }
    },
    data() {
      return {
      }
    },
  }
</script>

<style lang="stylus">
</style>
