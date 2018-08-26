<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Manage Networks</v-toolbar-title>
      <v-menu offset-y>
        <v-btn flat slot="activator" class="status">
          {{filter}}
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in listFilterItems" :key="item" @click="changeFilter(item)">
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        dark
        light
        single-line
        append-icon="search"
        placeholder="Search..."
        class="white--text"
        hide-details>
      </v-text-field>
      <v-btn icon @click.native="add">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid class="my-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="items"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading">
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left handCell" @click="edit(props.item)">
                  <v-tooltip top>
                    <v-btn icon slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Network Edit</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left">{{ props.item['Network Type Desc'] }}</td>
                <td class="text-xs-left">{{ props.item['Network Desc'] }}</td>
                <td class="text-xs-left">{{ props.item['Status'] }}</td>
                <td class="text-xs-left">{{ props.item['Comments'] }}</td>
                <td class="text-xs-left">{{ props.item['Network ID'] }}</td>
                <td class="text-xs-left">{{ props.item['type_cd'] }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>
<script>
  import services from '../../../services/services'
  import networkServices from '../../../services/network/networkServices'
  import store from '../../../store'
  export default {
    data() {
      return {
        search: '',
        filter: 'Active',
        listFilterItems: ['Active', 'Inactive', 'All'],
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Network Type Desc', align: 'left', sortable: true, value: 'Network Type Desc'},
          {text: 'Network Desc', align: 'left', sortable: true, value: 'Network Desc'},
          {text: 'Status', align: 'left', sortable: true, value: 'Status'},
          {text: 'Comments', align: 'left', sortable: true, value: 'Comments'},
          {text: 'Network ID', align: 'left', sortable: true, value: 'Network ID'},
          {text: 'type_cd', align: 'left', sortable: true, value: 'type_cd'}
        ],
        items: [],
        fullItems: [],
        loading: true,
        pagination: {
          rowsPerPage: 10
        },
      }
    },
    mounted() {
      const that = this
      that.getNetworkList()
      window.Vue.$on('loadNetworkList', function () {
        that.loading = true
        that.getNetworkList()
      })
    },
    methods: {
      getNetworkList: function () {
        const that = this
        const currentPCN = that.$store.state.pcn.pcc
        networkServices.getNetworkList(currentPCN).then(function (res) {
          that.fullItems = res.network_list
          that.filterNetworkList()
          that.loading = false
        })
      },
      filterNetworkList: function () {
        const that = this
        switch (that.filter) {
          case 'All':
            that.items = that.fullItems
            break
          case 'Active':
            that.items = that.fullItems.filter(function (item) {
              return item['Status'] === "Active"
            })
            break
          case 'Inactive':
            that.items = that.fullItems.filter(function (item) {
              return item['Status'] === "Inactive"
            })
            break
        }
      },
      changeFilter: function (filter) {
        this.filter = filter
      },
      add: function () {
        this.$router.push({path: `add`})
      },
      edit: function (network) {
        const that = this
        const netid = network['Network ID']
        that.$router.push({path: `edit/${netid}`})
      }
    },
    watch: {
      filter: function () {
        this.filterNetworkList()
      }
    }
  }
</script>
<style lang="stylus">
</style>
