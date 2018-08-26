<template>
  <main>
    <v-card-text>
      <v-layout row>
        <v-flex xs4>
          <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4 class="text-xs-right">
          <div class="subAdd">
            <v-btn fab dark color="primary mt-3" small="" @click.native="add()">
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap class="my-sub-scroll-enabled">
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="providerList"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-center">
                  <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
                </td>
                <td class="text-xs-left"> {{ props.item.Provider}}</td>
                <td class="text-xs-left">{{ props.item.Name }}</td>
                <td class="text-xs-left">{{ props.item['Store ID']}}</td>
                <td class="text-xs-left">{{ props.item['Address 1'] }}</td>
                <td class="text-xs-left">{{ props.item['Address 2'] }}</td>
                <td class="text-xs-left">{{ props.item.City }}</td>
                <td class="text-xs-left">{{ props.item.STATE }}</td>
                <td class="text-xs-left">{{ props.item.Zip }}</td>
                <td class="text-xs-left">{{ props.item.Phone}}</td>
                <td class="text-xs-left">{{ props.item.pid }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <chain-provider-find></chain-provider-find>
  </main>
</template>
<script>
  import chainServices from '../../../../services/chain/chainServices'
  import ChainProviderFind from './ProviderFind.vue'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'


  export default {
    name: 'Chain-providers',
    data() {
      return {
        providerList: [],
        search: '',
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Provider', align: 'left', sortable: true, value: 'Provider'},
          {text: 'Name', align: 'left', sortable: true, value: 'Name'},
          {text: 'Store ID', align: 'left', sortable: true, value: 'Store ID'},
          {text: 'Address 1', align: 'left', sortable: true, value: 'Address 1'},
          {text: 'Address 2', align: 'left', sortable: true, value: 'Address 2'},
          {text: 'City', align: 'left', sortable: true, value: 'City'},
          {text: 'STATE', align: 'left', sortable: true, value: 'STATE'},
          {text: 'Zip', align: 'left', sortable: true, value: 'Zip'},
          {text: 'Phone', align: 'left', sortable: true, value: 'Phone'},
          {text: 'pid', align: 'left', sortable: true, value: 'pid'}
        ],
        loading: false,
        pagination: {
          rowsPerPage: 12
        },
        showModal: false,
      }
    },
    components: {DeleteConfirm, ChainProviderFind},
    mounted() {
      console.log('----------- Administrator / Chain / Edit / Providers_tab mounted! -----------')
      const that = this
      chainServices.getProviders({chain_id: this.$route.params.cid}).then(function (res) {
        that.providerList = res.provider_list
      })

      window.Vue.$on('reloadChainProvider', function () {
        chainServices.getProviders({chain_id: this.$route.params.cid}).then(function (res) {
          that.providerList = res.provider_list
        })
      })
    },
    methods: {
      add: function () {
        window.Vue.$emit('openProviderFindForm')
      },
      deleteRow: function (item) {
        const data = {
          chain_id: Number(this.$route.params.cid),
          pid: item.pid
        }
        chainServices.deleteChain(data).then(function (res) {
          if (res === 'No Errors') {
            window.Vue.$emit('reloadChainProvider')
            window.Vue.$emit('snackbar', 'success', 'Chain Provider Removed!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
