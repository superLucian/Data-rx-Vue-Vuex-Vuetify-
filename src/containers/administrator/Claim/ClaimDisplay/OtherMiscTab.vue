<template>
  <v-form ref="form">
    <v-container fluid class="form-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Service Provider Id" :disabled="true" v-model="claim['Provider ID']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Provider Name" :disabled="true" v-model="claim['Provider Name']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Network Type" :disabled="true" v-model="claim['Network Type Desc']"></v-text-field>
        </v-flex>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Network Desc" :disabled="true" v-model="claim['Network Desc']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Agent Id" :disabled="true" v-model="claim['Agent Id']"></v-text-field>
        </v-flex>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Commission" :disabled="true" v-model="claim['Agent Commission Amt']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Agent Name" :disabled="true" v-model="claim['Agent Name']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Prescriber Id" :disabled="true" v-model="claim['Prescriber Id']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Bin Number" :disabled="true" v-model="claim['Bin Number']"></v-text-field>
        </v-flex>
        <v-flex xs6>
          <v-text-field label="PCN" :disabled="true" v-model="claim['Process Control Code']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Group Code" :disabled="true" v-model="claim['Org Code']"></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs6 class="pr-5">
          <v-text-field label="Group Name" :disabled="true" v-model="claim['Group Name']"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: 'other-misc-tab',
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
