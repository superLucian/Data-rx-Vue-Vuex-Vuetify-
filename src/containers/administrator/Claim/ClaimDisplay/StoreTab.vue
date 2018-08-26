<template>
  <v-form ref="form">
  <v-container fluid class="form-scroll-enabled">
    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Claim Id" :disabled="true" v-model="claim['Claim Id']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Claim Date" :disabled="true" v-model="claimDate"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Claim Status" :disabled="true" v-model="claim['Claim Type Desc']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Reject Cd-Msg" :disabled="true" v-model="claim['Reject Code'] + ' \n' + claim['Reject Desc']" multi-line auto-grow rows="4" hide-details></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Authorization #" :disabled="true" v-model="claim['Authorization Number']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Claim Amt Submitted" :disabled="true" v-model="claim['Provider Claim Amt']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Fee Submitted" :disabled="true" v-model="claim['Dispense Fee Submit Amt']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Gross Amt Due Submitted" :disabled="true" v-model="claim['Gross Amt Due Submit']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Other Payor Amt Submitted" :disabled="true" v-model="claim['Other Payor Submit Amt']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Price Source" :disabled="true" v-model="claim['Pricing Source']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Ingredient Cost" :disabled="true" v-model="claim['Store Ingred Cost Amt']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Sales Tax" :disabled="true" v-model="claim['Sales Tax Amt']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Dispense Fee" :disabled="true" v-model="claim['Store Dispense Fee Amt']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Admin Fee" :disabled="true" v-model="claim['Store Admin Fee Amt']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Claim Paid Amt" :disabled="true" v-model="claim['Store Claim Amt']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Member Paid Amt" :disabled="true" v-model="claim['Member Paid Amt']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Copay" :disabled="true" v-model="claim['Member Copay Amt']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Deductible Amt" :disabled="true" v-model="claim['Deductible Amt']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Copay Tier" :disabled="true" v-model="claim['Tier']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Submission Clarification Code" :disabled="true" value="8"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Unit Price Amt" :disabled="true" v-model="claim['Store Unit Price Amt']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Discount" :disabled="true" v-model="claim['Store Price Disc Pct']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Mac" :disabled="true" v-model="claim['Store MAC ID']"></v-text-field>
      </v-flex>
    </v-layout>

  </v-container>
  </v-form>
</template>

<script>
  export default {
    name: 'store-tab',
    props: ['data'],
    computed: {
      claimDate: function () {
        return this.claim['Claim Date'] ? new Date(parseInt(this.claim['Claim Date'].substring(6, 19))).toUTCString() : ''
      },
      claim: function() {
        return this.data || {}
      }
    }
  }
</script>

<style lang="stylus">
</style>
