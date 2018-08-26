<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add Chain</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card-text class="py-0">
      <chain type="add"></chain>
    </v-card-text>
  </main>
</template>
<script>
  import services from '../../../services/services'
  import Chain from "./Chain/Chain.vue";

  export default {
    name: 'chain-add',
    data() {
      return {
        isDisabledSave: true,
        info: {}
      }
    },
    components: {Chain},
    watch: {},
    mounted() {
      console.log('--------- Administrator / Chain Add mounted ---------')
    },
    methods: {
      back: function () {
        this.$router.push({name: 'chain'})
      }
    }
  }
</script>
<style lang="stylus">
</style>
