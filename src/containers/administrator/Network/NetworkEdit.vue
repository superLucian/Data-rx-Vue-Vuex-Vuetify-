<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Edit Network</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <networkForm :type="'edit'" :netid="netid"></networkForm>
    </v-card-text>
  </main>
</template>
<script>
  import networkForm from './NetworkForm.vue'
  export default {
    name: 'network-edit',
    components: {
      networkForm
    },
    data () {
      return {
        netid: this.$route.params.netid
      }
    },
    mounted() {
    },
    methods: {
      back() {
        this.$router.push({name: 'network'})
      }
    }
  }
</script>
<style lang="stylus">
</style>
