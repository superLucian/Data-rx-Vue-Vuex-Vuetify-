<template>
  <main>
    <v-text-field label="Network:" v-model="networkObj.desc_txt" disabled></v-text-field>
    <v-select
      v-if="chainType == 'edit'"
      v-bind:items="chain_items"
      v-model="chain['Chain ID']"
      label="Chain:"
      item-text="Chain Name"
      item-value="Chain ID"
      disabled
    ></v-select>
    <v-select
      v-else
      v-bind:items="chain_items"
      v-model="chain['Chain ID']"
      label="Chain:"
      item-text="Chain Name"
      item-value="Chain ID"
    ></v-select>
    <v-select
      v-bind:items="contract_items"
      v-model="chain['contract_id']"
      label="Contract:"
      item-text="desc_txt"
      item-value="contract_id"
      bottom
    ></v-select>
    <v-divider></v-divider>
    <v-card-actions class="d-block text-xs-center pb-0">
      <v-btn color="primary-color" :disabled="isDisabledSave" v-if="chainType === 'edit'" @click.native="save">update<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      <v-btn color="primary-color" :disabled="isDisabledSave" v-else @click.native="save">save<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      <v-btn @click.native="close">Back</v-btn>
    </v-card-actions>
  </main>
</template>
<script>
  import planServices from '../../../../../services/plan/planServices'
  import providerServices from '../../../../../services/provider/providerServices'

  export default {
    name: 'plan-network-chains-form',
    props: ['networkObj', 'onBack', 'type', 'onBack', 'chain', 'chainType','selectedNetwork'],
    data() {
      return {
        chain_items: [],
        contract_items: [],
        isDisabledSave: true,
        loading: false
      }
    },
    watch: {
      chain: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        }, deep: true
      },
    },
    components: {},
    mounted() {
      console.log('----- Administrator / Plan / Networks / Edit / Chains / ChainsForm mounted -----')
      const that = this
      providerServices.getChainList({}).then(function (res) {
        that.chain_items = res.chain_list
        if (that.chainType !== 'edit') {
          that.chain['Chain ID'] = res.chain_list[0]['Chain ID']
        }
      })

      planServices.getContractList({}).then(function (res) {
        that.contract_items = res.contract_list
        that.contract_items.unshift({'contract_id': -1, 'desc_txt': 'No Contract'})
      })
    },
    methods: {

      close: function () {
        this.onBack()
      },
      save: function () {
        const that = this
        const data = {
          network_id: this.selectedNetwork.network[0].network_id,
          chain_id: this.chain['Chain ID'],
          contract_id: this.chain['contract_id'],
          uid: this.$store.state.user.session_uid
        }
        if (this.chainType === 'edit') {
          planServices.updateNetworkChain(data).then(function (res) {
            that.loading = true
            if (res === '0') {
              that.loading = false
              that.isDisabledSave = true
              that.close()
              window.Vue.$emit('reloadNetworkChain',that.selectedNetwork.network[0].network_id)
              window.Vue.$emit('snackbar', 'success', 'Updated Chain Successfully!')
            } else {
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        } else {
          planServices.addNetworkChain(data).then(function (res) {
            that.loading = true
            if (res === '0') {
              that.loading = false
              that.isDisabledSave = true
              window.Vue.$emit('reloadNetworkChain',that.selectedNetwork.network[0].network_id)
              window.Vue.$emit('snackbar', 'success', 'Added Chain Successfully!')
              that.close()
            } else {
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      }
    }
  }
</script>
<style lang="scss">
</style>
