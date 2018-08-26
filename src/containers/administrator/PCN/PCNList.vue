<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Manage Groups</v-toolbar-title>
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
        hide-details
      ></v-text-field>
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
                    <span>PCN Edit</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left">{{ props.item['pcc'] }}</td>
                <td class="text-xs-left">{{ props.item['name_txt'] }}</td>
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
  import pcnServices from '../../../services/pcn/pcnServices'
  import store from '../../../store'
  import VTooltip from "vuetify/es5/components/VTooltip/VTooltip";

  export default {
    components: {VTooltip},
    name: 'pcns-list',
    data() {
      return {
        search: '',
        filter: 'Current',
        listFilterItems: ['All', 'Current'],
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'PCC', align: 'left', sortable: true, value: 'pcc'},
          {text: 'PCN Name', align: 'left', sortable: true, value: 'name_txt'},
        ],
        items: [],
        fullItems: [],
        loading: true,
        pagination: {
          rowsPerPage: 10
        },
      }
    },
    watch: {
      filter: function () {
        this.filterPCNData()
      }
    },
    mounted() {
      this.getPCNData()
    },
    methods: {
      getPCNData: function () {
        const that = this
        services.getAllPCN(that.$store.state.user.session_uid).then(function (res) {
          that.fullItems = res.pcc_list
          that.filterPCNData()
          that.loading = false
        })
      },
      filterPCNData: function () {
        const that = this
        const currentPCN = that.$store.state.pcn
        switch (that.filter) {
          case 'All':
            that.items = that.fullItems
            break
          case 'Current':
            that.items = that.fullItems.filter(function (item) {
              return item.name_txt === currentPCN.name_txt
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
      edit: function (pcn) {
        const that = this
        const pcc = pcn.pcc
        that.$router.push({path: `edit/${pcc}`})
      }
    }
  }
</script>
<style lang="stylus">
</style>
