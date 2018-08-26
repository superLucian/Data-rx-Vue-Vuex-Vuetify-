<template>
  <main>
      <v-container fluid class="pt-0 my-sub-scroll-enabled">
        <v-card-text class="pt-0 px-0 py-0">
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
                    <td class="text-xs-left handCell">
                      <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
                    </td>
                    <td class="text-xs-center"> {{ props.item.NABP }}</td>
                    <td class="text-xs-center"> {{ props.item.NPI }}</td>
                    <td class="text-xs-center">{{ props.item['Provider Name'] }}</td>
                    <td class="text-xs-center">{{ props.item['Store ID'] }}</td>
                    <td class="text-xs-center">{{ props.item.Address }}</td>
                    <td class="text-xs-center">{{ props.item.City }}</td>
                    <td class="text-xs-center">{{ props.item.State }}</td>
                    <td class="text-xs-center">{{ props.item['Zip Code'] }}</td>
                    <td class="text-xs-center">{{ props.item['Phone Number'] }}</td>
                    <td class="text-xs-center">{{ props.item['Spec Pgm Ind'] }}</td>
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
  </main>
</template>
<script>
  import planServices from '../../../../../services/plan/planServices'
  import PlanNetworkProvidersFind from "./providerFind.vue";
  import DeleteConfirm from '../../../../../components/common/deleteConfirm'

  export default {
    name: 'plan-network-providers',
    props: ['networkObj', 'onBack'],
    data() {
      return {
        items: [],
        headers: [],
        search: '',
        pagination: {},
        loading: false,
        listOrFind: 'list',
      }
    },
    watch: {},
    mounted() {
      console.log('----- Administrator / Plan / Networks / Edit / Provider mounted -----')
      this.loading = true
      const data = {
        network_id: this.networkObj['Network ID'],
        page_num: 1
      }

      const that = this
      planServices.getNetworkProviderList(data).then(function (res) {
        that.loading = false
        that.items = res.network_provider_list
      })

      window.Vue.$on('reloadNetworkProvider', function () {
        const data = {
          network_id: that.networkObj['Network ID'],
          page_num: 1
        }
        planServices.getNetworkProviderList(data).then(function (res) {
          that.loading = false
          that.items = res.network_provider_list
        })
      })

      this.headers = [
        {text: '', align: '', sortable: false, value: ''},
        {text: 'NABP', align: 'center', sortable: true, value: 'NABP'},
        {text: 'NPI', align: 'center', sortable: true, value: 'NPI'},
        {text: 'Provider Name', align: 'center', sortable: true, value: 'Provider Name'},
        {text: 'Store ID', align: 'center', sortable: true, value: 'Store ID'},
        {text: 'Address', align: 'center', sortable: true, value: 'Address'},
        {text: 'City', align: 'center', sortable: true, value: 'City'},
        {text: 'State', align: 'center', sortable: true, value: 'State'},
        {text: 'Zip Code', align: 'center', sortable: true, value: 'Zip Code'},
        {text: 'Phone Number', align: 'center', sortable: true, value: 'Phone Number'},
        {text: 'Spec Pgm Ind', align: 'center', sortable: true, value: 'Spec Pgm Ind'}
      ]
    },
    components: {DeleteConfirm,
      PlanNetworkProvidersFind
    },
    methods: {
      deleteRow: function (item) {
        const that = this
        const data = {
          session_uid: this.$store.state.user.session_uid,
          session_id: this.$store.state.user.session_id,
          pcc: this.$store.state.pcn.pcc,
          network_id: this.networkObj['Network ID'],
          pid: item.pid
        }
        planServices.deletePlanNetworkProvider(data).then(function (res) {
          if (res === "0") {
            window.Vue.$emit('reloadNetworkProvider')
            window.Vue.$emit('snackbar', 'success', 'Removed Provider!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      },
      close: function () {
        this.onBack()
      },
      add: function () {
        this.listOrFind = 'find'
        window.Vue.$emit('findProviderOpen', this.networkObj['Network ID'])
      },
      back: function () {
        this.listOrFind = 'list'
      }
    }
  }
</script>

<style lang="scss">
</style>
