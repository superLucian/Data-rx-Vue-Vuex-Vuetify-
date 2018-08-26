<template>
  <v-form ref="form">
    <v-container fluid class="form-scroll-enabled">
      <v-layout column wrap>
        <v-flex xs12>
          <v-text-field
            multi-line
            label="Claim"
            :disabled="true"
            v-model="claim['Claim Msg']"
          ></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field
            multi-line
            label="Response"
            :disabled="true"
            v-model="claim['Response']"
          ></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
  export default {
    name: 'claim-message-tab',
    props: ['data'],
    computed: {
      claim: function() {
        return this.data || {}
      }
    },
    data() {
      return {}
    },
  }
</script>

<style lang="stylus">
</style>
