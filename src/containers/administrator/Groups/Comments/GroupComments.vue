<template>
  <v-layout row>
    <v-flex xs12>
      <v-text-field
        name="input-7-1"
        label="Comments"
        v-model="group_info.comment_txt"
        multi-line
      ></v-text-field>
    </v-flex>
  </v-layout>
</template>

<script>
  import services from '../../../../services/group/groupService'
  import store from '../../../../store'

  export default {
    name: 'group-comments',
    props: ['type', 'group_info'],
    components: {},
    data() {
      return {}
    },
    watch: {},
    mounted() {
    }
  }
</script>

<style>
</style>
