<template>
  <main>
    <edit-prescriber type="add"></edit-prescriber>
  </main>
</template>
<script>
  import services from '../../../services/services'
  import EditPrescriber from "./EditPrescriber.vue";

  export default {
    name: 'prescriber-add',
    data() {
      return {
        isDisabledSave: true,
        info: {}
      }
    },
    components: {EditPrescriber},
    watch: {},
    mounted() {
      console.log('--------- Administrator / Prescriber Add mounted ---------')
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
