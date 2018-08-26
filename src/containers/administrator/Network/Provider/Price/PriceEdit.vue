<template>
  <main>
    <v-layout row wrap>
      <v-flex xs12>
        <priceForm
          :type="type"
          :item="item"
          :refresh="refresh"
          :cancel="cancel">
        </priceForm>
      </v-flex>
    </v-layout>
  </main>
</template>
<script>
  import priceForm from './PriceForm'
  export default {
    props: ['item', 'refresh', 'cancel'],
    components: {
      priceForm
    },
    data() {
      return {
        type: "edit"
      }
    },
    mounted() {
    },
    methods: {}
  }
</script>
<style lang="stylus">
</style>
