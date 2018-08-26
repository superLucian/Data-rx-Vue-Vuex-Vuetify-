<template>
  <transition name="slide-y-transition">
    <router-view class="full-height"></router-view>
  </transition>
</template>
<script>
  import networkServices from '../../../services/network/networkServices'
  import store from '../../../store'

  export default {
    components: {},
    data() {
      return {}
    },
    mounted() {
      this.getNetworkParamData()
    },
    methods: {
      getNetworkParamData: function () {
        networkServices.getContractList().then(function (res) {  // Contract List
          let contractList = res.contract_list
          contractList.push({contract_id: -1, desc_txt: "No Contract"}) // item for default
          store.commit('UPDATE_NETWORK_SETUP_DATA', {contract_list: contractList})
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
