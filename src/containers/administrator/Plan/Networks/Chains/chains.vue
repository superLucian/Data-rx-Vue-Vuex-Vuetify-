<template>
  <main>
    <div v-if="listOrForm == 'list'">
      <v-container fluid class="pt-0 my-sub-scroll-enabled">
        <v-card-text class="py-0 px-0">
          <v-layout row wrap>
            <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
            <v-spacer></v-spacer>
            <v-spacer></v-spacer>
            <v-btn fab dark class="primary mt-3" small @click.native="add()">
              <v-icon dark>add</v-icon>
            </v-btn>
            <v-flex xs12>
              <v-data-table
                v-bind:headers="headers"
                :items="items"
                v-bind:search="search"
                v-bind:pagination.sync="pagination"
                :loading="loading"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-center px-0">
                      <v-tooltip top>
                        <v-btn icon @click="editRow(props.item)" slot="activator">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <span>Edit</span>
                      </v-tooltip>
                      <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
                    </td>
                    <td class="text-xs-center"> {{ props.item['Chain Name'] }}</td>
                    <td class="text-xs-center"> {{ props.item.Description }}</td>
                    <td class="text-xs-center">{{ props.item['Network ID'] }}</td>
                    <td class="text-xs-center">{{ props.item['Chain ID'] }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn @click.native="close">Close</v-btn>
      </v-card-actions>
    </div>
    <div v-else>
      <v-container fluid class="my-sub-scroll-enabled">
        <v-card-text class="py-1 px-0">
          <plan-network-chains-form v-bind:networkObj="networkObj" :onBack="back" :type="listOrForm"
                                    :chain="selectedChain" :chainType="chainEditOrAdd"
                                    :selectedNetwork="networkValue"></plan-network-chains-form>
        </v-card-text>
      </v-container>
    </div>
  </main>
</template>
<script>
  import planServices from '../../../../../services/plan/planServices'
  import PlanNetworkChainsForm from './ChainsForm.vue'
  import DeleteConfirm from '../../../../../components/common/deleteConfirm'

  export default {
    name: 'plan-network-chains',
    props: ['networkObj', 'onBack', 'networkValue'],
    data() {
      return {
        items: [],
        headers: [],
        search: '',
        pagination: {},
        loading: false,
        listOrForm: 'list',
        chainEditOrAdd: 'edit',
        selectedChain: {}
      }
    },
    watch: {},
    mounted() {
      console.log('----- Administrator / Plan / Networks / Edit / Chain mounted -----')
      const data = {
        network_id: this.networkValue.network[0].network_id
      }
      const that = this
      planServices.getNetworkChainList(data).then(function (res) {
        that.items = res.chain_list
        that.loading = false
      })
      window.Vue.$on('reloadNetworkChain', function (v) {
        const data = {
          network_id: v
        }
        planServices.getNetworkChainList(data).then(function (res) {
          that.items = res.chain_list
          that.loading = false
        })
      })
      this.headers = [
        {text: '', align: '', sortable: false, value: ''},
        {text: 'Chain Name', align: 'center', sortable: true, value: 'Chain Name'},
        {text: 'Description', align: 'center', sortable: true, value: 'Description'},
        {text: 'Network ID', align: 'center', sortable: true, value: 'Network ID'},
        {text: 'Chain ID', align: 'center', sortable: true, value: 'Chain ID'},
      ]
    },
    components: {DeleteConfirm, PlanNetworkChainsForm},
    methods: {
      editRow: function (item) {
        this.listOrForm = 'form'
        const that = this
        planServices.getNetworkChain(item['Chain ID'], item['Network ID']).then(function (res) {
          that.selectedChain = Object.assign({}, {...item}, {contract_id: res.network_chain[0].contract_id})
        })
        this.chainEditOrAdd = 'edit'
      },
      deleteRow: function (item) {
        const data = {
          network_id: item['Network ID'],
          chain_id: item['Chain ID']
        }
        planServices.deletePlanNetworkChain(data).then(function (res) {
          if (res === 'No Errors') {
            window.Vue.$emit('reloadNetworkChain', item['Network ID'])
            window.Vue.$emit('snackbar', 'success', 'Removed Chain!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      },
      add: function () {
        this.listOrForm = 'form'
        this.selectedChain = {
          'Chain ID': 0,
          'Description': this.networkObj['Network Desc'],
          'Network ID': this.networkObj['Network ID'],
          'contract_id': -1,
        }
        this.chainEditOrAdd = 'add'
      },
      close: function () {
        this.onBack()
      },
      back: function () {
        this.listOrForm = 'list'
      }
    }
  }
</script>

<style lang="scss">
</style>
