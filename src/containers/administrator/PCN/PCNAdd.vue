<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add PCN</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <pcnForm :type="'new'"></pcnForm>
    </v-card-text>
  </main>
</template>
<script>
  import pcnForm from './PCNForm.vue'
  export default {
    name: 'pcn-add',
    components: {
      pcnForm
    },
    data () {
      return {}
    },
    mounted() {
    },
    methods: {
      back() {
        this.$router.push({name: 'pcns'})
      }
    }
  }
</script>
<style lang="stylus">
</style>
