<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">HMAC Pricing</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search" dark light single-line append-icon="search"
        placeholder="Search..."
        class="white--text"
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-container fluid class="my-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="HMACList"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-center handCell">
                  <v-tooltip top>
                    <v-btn icon @click="clickRow(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit HMAC Pricing</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left"> {{ props.item['Generic DID']}}</td>
                <td class="text-xs-left"> {{ props.item.GCN }}</td>
                <td class="text-xs-left">{{ props.item.Name }}</td>
                <td class="text-xs-left">{{ props.item.Strength }}</td>
                <td class="text-xs-left">{{ props.item.Price }}</td>
                <td class="text-xs-left">{{ props.item.Status }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <edit-hmac></edit-hmac>
    </v-container>
  </main>
</template>
<script>
  import drugServices from '../../../services/drug/drugServices'
  import planServices from '../../../services/plan/planServices'
  import store from '../../../store'
  import EditHmac from './EditHMAC.vue'

  export default {
    name: 'hmac-pricing',
    data() {
      return {
        HMACList: [],
        pagination: {
          rowsPerPage: 10
        },
        isDisableFind: true,
        search: '',
        loading: false,
        headers: []
      }
    },
    components: {
      EditHmac
    },
    mounted() {
      console.log('----- Drugs / HMAC Pricing mounted -----')
      const that = this
      drugServices.getHmacList({pcc: this.$store.state.pcn.pcc}).then(function (res) {
        that.HMACList = res.hmac_list;
      })
      this.headers = [
        {text: '', align: 'left', sortable: true, value: ''},
        {text: 'Generic DID', align: 'left', sortable: true, value: 'Generic DID'},
        {text: 'GCN', align: 'left', sortable: true, value: 'GCN'},
        {text: 'Name', align: 'left', sortable: true, value: 'Name'},
        {text: 'Strength', align: 'left', sortable: true, value: 'Strength'},
        {text: 'Price', align: 'left', sortable: false, value: 'Price'},
        {text: 'Status', align: 'left', sortable: false, value: 'Status'},
      ]
      window.Vue.$on('reloadHMACList', function () {
        drugServices.getHmacList({pcc: this.$store.state.pcn.pcc}).then(function (res) {
          that.HMACList = res.hmac_list;
        })
      })
    },
    methods: {
      clickRow(cellinfo) {
        window.Vue.$emit('openEditHMAC', {...cellinfo})
      }
    },
    events: {}
  }
</script>
<style lang="stylus">
</style>
