<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Edit PCN</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <pcnForm :type="'edit'" :pcc="pcc"></pcnForm>
    </v-card-text>
  </main>
</template>
<script>
  import pcnForm from './PCNForm.vue'
  export default {
    name: 'pcn-edit',
    components: {
      pcnForm
    },
    data () {
      return {
        pcc: this.pcc = this.$route.params.pcc
      }
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
