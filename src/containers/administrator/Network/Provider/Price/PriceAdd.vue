<template>
  <main>
    <v-layout row wrap>
      <v-flex xs12>
        <priceForm
          :type="type"
          :pid="pid"
          :name="name"
          :refresh="refresh"
          :cancel="cancel">
        </priceForm>
      </v-flex>
    </v-layout>
  </main>
</template>
<script>
  import priceForm from './PriceForm'
  import networkServices from '../../../../../services/network/networkServices'
  import store from '../../../../../store'
  export default {
    props: ['name', 'pid', 'refresh', 'cancel'],
    components: {
      priceForm
    },
    data() {
      return {
        type: "add"
      }
    },
    mounted() {
      this.getGroupList()
    },
    methods: {
      getGroupList: function () {
        const user = this.$store.state.user
        const pcc = this.$store.state.pcn.pcc
        networkServices.getGroupList(user, pcc).then(function (res) {  // Contract List
          let groupList = res.group_list
          store.commit('UPDATE_NETWORK_SETUP_DATA', {group_list: groupList})
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
