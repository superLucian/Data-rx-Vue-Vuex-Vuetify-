<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add Network</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <networkForm :type="'new'"></networkForm>
    </v-card-text>
  </main>
</template>
<script>
  import networkForm from './NetworkForm.vue'
  export default {
    name: 'network-add',
    components: {
      networkForm
    },
    data () {
      return {}
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
