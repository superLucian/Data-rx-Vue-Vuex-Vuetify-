<template>
  <v-form ref="form">
    <v-container fluid class="form-scroll-enabled">
    <v-layout row wrap>
      <v-flex xs6  class="pr-5">
        <v-text-field label="Rx #" :disabled="true" v-model="claim['PrescriptionReferenceNumber']"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs5  class="pr-5">
        <v-text-field label="Fill #" :disabled="true" v-model="claim['Script Refill Num']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Date Filled" :disabled="true" v-model="claim['Script Fill Date']"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs5 class="pr-5">
        <v-text-field label="Allow Refill Pct" :disabled="true" v-model="claim['Allow Refill Pct']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Date Written" :disabled="true" v-model="claim['Script Written Dt']"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs5 class="pr-5">
        <v-text-field label="Next Fill Date" :disabled="true" v-model="claim['Next Rx Fill Date']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Qty Dispensed" :disabled="true" v-model="claim['Qty Dispensed']"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs5 class="pr-5">
        <v-text-field label="DAW" :disabled="true" v-model="claim['DAW']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Days Supply " :disabled="true" v-model="claim['Days Supply']"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs5 class="pr-5">
        <v-text-field label="Compound" :disabled="true" v-model="compound"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="NDC" :disabled="true" v-model="claim['NDC']"></v-text-field>
      </v-flex>
      <v-flex xs1></v-flex>
      <v-flex xs5 class="pr-5">
        <v-text-field label="Single Source Drug" :disabled="true" v-model="claim['Single Src Ind']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Rx Type Desc" :disabled="true" v-model="claim['Product Type Desc']"></v-text-field>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Brand Name" :disabled="true" v-model="claim['Product Name']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Generic Name" :disabled="true" v-model="claim['Generic Product Name']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Strength" :disabled="true" v-model="claim['Strength']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Form" :disabled="true" v-model="claim['Form']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="GFC" :disabled="true" v-model="claim['GFC']"></v-text-field>
      </v-flex>
      <v-flex xs6 class="pr-5">
        <v-text-field label="TCC" :disabled="true" v-model="claim['Thera Class Code']"></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs6 class="pr-5">
        <v-text-field label="Diagnosis" :disabled="true" v-model="claim['Diagnosis']"></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
  </v-form>
</template>

<script>
  export default {
    name: 'rx-tab',
    props: ['data'],
    computed: {
      compound: function () {
        return this.claim['Compound Drug Code'] === 2 ? 'Yes' : 'No'
      },
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
