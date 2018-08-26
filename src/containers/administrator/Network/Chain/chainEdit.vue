<template>
  <main>
    <div style="max-height: 700px; overflow: auto">
      <v-layout row wrap>
        <v-flex xs12>
          <chainForm
            :type="type"
            :netid="netid"
            :desc="desc"
            :item="item"
            :refresh="refresh"
            :cancel="cancel">
          </chainForm>
        </v-flex>
      </v-layout>
    </div>
  </main>
</template>
<script>
  import chainForm from './chainForm'
  export default {
    props: ['netid', 'desc', 'item', 'refresh', 'cancel'],
    components: {
      chainForm
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
