<template>
  <main>
    <v-layout row wrap>
      <v-flex xs12>
        <GroupFieldInformation :type="'add'" :group_id="group_id" :fieldInfo="item" :refresh="refresh"
                               :cancel="cancel"></GroupFieldInformation>
      </v-flex>
    </v-layout>
  </main>
</template>

<script>
  import GroupFieldInformation from './GroupFieldInformation.vue'

  export default {
    name: 'group-field-add',
    props: ['group_id', 'refresh', 'cancel'],
    components: {
      GroupFieldInformation
    },
    data() {
      return {
        item: {
          'Created By': '',
          'Created Dt': '',
          'Deleted By': '',
          'Deleted Dt': '',
          'Edit': '',
          'Field': '',
          'Message': '',
          'Status': 'Active',
          'Updated By': '',
          'Updated Dt': '',
          'field_tag': ''
        },
      }
    },
    watch: {},
    mounted() {
    },
    methods: {}
  }
</script>

<style>
</style>
