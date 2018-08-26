<template>
  <main>
    <v-container fluid class="pb-0">
        <v-layout row wrap>
          <v-flex xs12>
            <finder
              :select="select"
              :cancel="cancel">
            </finder>
          </v-flex>
        </v-layout>
    </v-container>
  </main>
</template>
<script>
  import store from '../../../../store'
  import finder from './Finder/Finder.vue'
  export default {
    props: ['select', 'cancel'],
    components: {
      finder
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
    }
  }
</script>
<style lang="stylus">
</style>
