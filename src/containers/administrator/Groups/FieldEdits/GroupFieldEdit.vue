<template>
  <main>
    <v-layout row wrap>
      <v-flex xs12>
        <GroupFieldInformation :type="'edit'" :group_id="group_id" :fieldInfo="item" :refresh="refresh"
                               :cancel="cancel"></GroupFieldInformation>
      </v-flex>
    </v-layout>
  </main>
</template>

<script>
  import GroupFieldInformation from './GroupFieldInformation.vue'

  export default {
    name: 'group-field-edit',
    props: ['group_id', 'item', 'refresh', 'cancel'],
    components: {
      GroupFieldInformation
    },
    data() {
      return {}
    },
    watch: {},
    mounted() {
    },
    methods: {}
  }
</script>

<style>
</style>
