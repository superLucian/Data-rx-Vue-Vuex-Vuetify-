<template>
  <main>
    <v-layout row wrap>
      <finder
        :select="select"
        :cancel="cancel">
      </finder>
    </v-layout>
  </main>
</template>
<script>
  import networkServices from '../../../../services/network/networkServices'
  import store from '../../../../store'
  import finder from './Finder/Finder.vue'
  export default {
    props: ['netid', 'item', 'refresh', 'cancel'],
    components: {
      finder
    },
    data() {
      return {
        networkProvider: {},
      }
    },
    mounted() {
      this.networkProvider = {...this.item}
    },
    methods: {
      addNetworkProvider: function () {
        const that = this
        const info = Object.assign({}, that.networkProvider, {network_id: that.netid})
        const user = that.$store.state.user
        const pcc = that.$store.state.pcn.pcc
        networkServices.addNetworkProvider(info, user, pcc).then(function (res) {
          if (res === "0") {
            window.Vue.$emit('snackbar', 'success', 'Provider Added !')
            that.refresh()
            that.cancel()
          } else {
            console.log(res)
            window.Vue.$emit('snackbar', 'warning', res)
          }
        }).catch(function (res) {

        })
      },
      select: function (provider) {
        this.networkProvider = {...provider}
        this.addNetworkProvider()
      }
    },
  }
</script>
<style lang="stylus">
</style>
