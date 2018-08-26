<template>
  <v-layout row justify-center>
    <Vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="true"
      :closeOnClickMask="true"
      :width="1100"
      :height="800"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          Edit Network
        </v-toolbar-title>
      </v-toolbar>
      <div v-if="isProviderFind">
        <v-card-text>
          <plan-network-providers-find :onBack="backToProviders" :networkId="network_id"></plan-network-providers-find>
        </v-card-text>
      </div>
      <div v-else>
        <v-card-text>
          <v-tabs v-model="active">
            <v-tabs-bar class="transparent">
              <v-tabs-slider class="active-line"></v-tabs-slider>
              <v-tabs-item
                v-for="tab in tabs"
                :key="tab.name"
                :href="tab.path"
                ripple
              >
                {{ tab.name }}
              </v-tabs-item>
            </v-tabs-bar>
          </v-tabs>
        </v-card-text>

        <template v-if="active=='network'">
          <plan-network v-bind:networkValue="selectedValue" v-bind:networkObj="selectedObject"
                        :onBack="back"></plan-network>
        </template>
        <template v-if="active=='providers'">
          <plan-network-providers v-bind:networkObj="selectedObject" :onBack="back"></plan-network-providers>
        </template>
        <template v-if="active=='chains'">
          <plan-network-chains v-bind:networkValue="selectedValue" v-bind:networkObj="selectedObject"
                               :onBack="back"></plan-network-chains>
        </template>
        <template v-if="active=='overrides'">
          <plan-network-overrides v-bind:networkValue="selectedValue" v-bind:networkObj="selectedObject"
                                  :onBack="back"></plan-network-overrides>
        </template>
      </div>
    </Vodal>
  </v-layout>
</template>

<script>
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'

  import PlanNetwork from './Network/network.vue'
  import PlanNetworkChains from './Chains/chains.vue'
  import PlanNetworkChainsForm from './Chains/ChainsForm.vue'

  import PlanNetworkOverrides from './Overrides/overrides.vue'
  import PlanNetworkProviders from './Providers/providers.vue'
  import PlanNetworkProvidersFind from './Providers/providerFind.vue'

  //  import ProviderFind from '../../Provider/ProviderFind.vue'

  export default {
    name: 'edit-net',
    data() {
      return {
        selectedValue: {},
        selectedObject: {},
        tabs: [{
          name: 'network',
          path: 'network'
        }, {
          name: 'providers',
          path: 'providers'
        }, {
          name: 'chains',
          path: 'chains'
        }, {
          name: 'overrides',
          path: 'overrides'
        }],
        active: null,
        show: false,
        isProviderFind: false,
        network_id: 0
      }
    },
    watch: {},
    components: {
      Vodal,
      PlanNetwork,
      PlanNetworkProviders,
      PlanNetworkProvidersFind,
      PlanNetworkChains,
      PlanNetworkChainsForm,
      PlanNetworkOverrides,
//      ProviderFind
    },
    mounted() {
      console.log('-------------Administrator / Plan / Networks / Edit Network mounted --------------------')
      const that = this
      window.Vue.$on('openEditNetwork', function (value, obj) {
        that.selectedValue = value
        that.selectedObject = obj
        that.open()
      })
      window.Vue.$on('findProviderOpen', function (value) {
        that.isProviderFind = true
        that.network_id = value
      })
    },
    methods: {
      open: function () {
        this.active = 'network'
        this.show = true
      },
      back: function () {
        this.type = null
        this.show = false
      },
      backToProviders: function () {
        this.active = 'providers'
        this.isProviderFind = false
      }
    }
  }
</script>

<style lang="scss">
</style>
