<template>
  <main>
    <v-layout row wrap>
      <v-flex xs3></v-flex>
      <v-flex xs6>
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field label="Network" v-model="desc" disabled>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs3></v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6 class="pr-3">
        <v-select
          label="Chain"
          v-bind:items="chainList"
          v-model="selectedChain"
          item-value="Chain ID"
          item-text="Chain Name">
        </v-select>
      </v-flex>
      <v-flex xs6 class="pl-3">
        <v-select
          label="Contract"
          v-bind:items="contractList"
          v-model="selectedContract"
          item-value="contract_id"
          item-text="desc_txt">
        </v-select>
      </v-flex>
    </v-layout>
    <v-divider class="mt-2"></v-divider>
    <v-card-actions class="d-block text-xs-center">
      <v-btn class="primary" @click.native="save()">Save</v-btn>
      <v-btn @click.native="cancel()">Cancel</v-btn>
    </v-card-actions>
  </main>
</template>
<script>
  import networkServices from '../../../../services/network/networkServices'
  import store from '../../../../store'
  export default {
    props: ['type', 'netid', 'desc', 'item', 'refresh', 'cancel'],
    components: {},
    data() {
      return {
        contractList: [],
        selectedContract: {},
        chainList: [],
        selectedChain: {},
        chainData: {},
        networkChainData: {},
        disableNetworkSaveBtn: true
      }
    },
    mounted() {
      this.getStoreData()
      this.getNetworkChain()
    },
    methods: {
      getStoreData: function () {
        this.contractList = this.$store.state.networkParamSetupData['contract_list'].map(function (item) {
          return {contract_id: item.contract_id, desc_txt: item.desc_txt}
        })
        this.chainList = this.$store.state.networkParamSetupData['chain_list']
      },
      getNetworkChain: function () {
        const that = this
        if (that.type === "edit") {
          that.chainData = {...this.item}
          const networkId = that.chainData['Network ID']
          const chainId = that.chainData['Chain ID']
          networkServices.getNetworkChain(networkId, chainId).then(function (res) {
            that.networkChainData = res.network_chain[0]
            that.setValue()
          })
        } else {
          that.chainData = {...this.item}
          that.setValue()
        }
      },
      setValue: function () {
        const that = this
        switch (that.type) {
          case "add":
            that.selectedChain = that.chainList[0]['Chain ID']
            that.selectedContract = -1
            break
          case "edit":
            that.selectedContract = that.networkChainData['contract_id']
            that.selectedChain = that.chainData['Chain ID']
            break
        }
      },
      save: function () {
        const that = this
        const user = that.$store.state.user
        const info = Object.assign({}, {network_id: that.netid}, {chain_id: that.selectedChain}, {contract_id: that.selectedContract})
        switch (that.type) {
          case 'add':
            networkServices.addNetworkChain(info, user).then(function (res) {
              if (res === "0") {
                window.Vue.$emit('snackbar', 'success', 'Chain Added !')
                that.cancel()
                that.refresh()
              } else {
                window.Vue.$emit('snackbar', 'warning', res)
              }
            }).catch(function (res) {

            })
            return
          case 'edit':
            networkServices.updateNetworkChain(info, user).then(function (res) {
              if (res === "0") {
                window.Vue.$emit('snackbar', 'success', 'Chain Updated !')
                that.cancel()
                that.refresh()
              } else {
                window.Vue.$emit('snackbar', 'warning', res)
              }
            }).catch(function (res) {

            })
            return
        }
      },
    },
    watch: {
      item: function () {
        this.getNetworkChain()
      }
    }
  }
</script>
<style lang="stylus">
</style>
