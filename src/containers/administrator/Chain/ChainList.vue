<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Chain Administration</v-toolbar-title>
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
            :items="chainList"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left handCell" @click="clickRow(props.item)">
                  <v-tooltip top>
                    <v-btn icon slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Chain Edit</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left">{{ props.item['Chain Name']}}</td>
                <td class="text-xs-left">{{ props.item['Chain ID'] }}</td>
                <td class="text-xs-center">{{ props.item['Description'] }}</td>
                <td class="text-xs-left">{{ props.item['Reference ID'] }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>
<script>
  import chainServices from '../../../services/chain/chainServices'

  export default {
    name: 'chain-list',
    data() {
      return {
        chainList: [],
        search: '',
        loading: false,
        pagination: {
          rowsPerPage: 25
        },
        headers: [],
      }
    },
    components: {},
    mounted() {
      console.log('----- Administrator / Chain List mounted -----')
      const that = this
      this.loading = true
      chainServices.getChainList({}).then(function (res) {
        that.loading = false
        that.chainList = res.chain_list
      })

      this.headers = [
        {text: '', align: 'left', sortable: false, value: ''},
        {text: 'Chain Name', align: 'left', sortable: true, value: 'Chain Name'},
        {text: 'Chain ID', align: 'left', sortable: true, value: 'Chain ID'},
        {text: 'Description', align: 'center', sortable: true, value: 'Description'},
        {text: 'Reference ID', align: 'left', sortable: true, value: 'Reference ID'},
      ]
    },
    methods: {
      clickRow(item) {
        this.$router.push({path: `edit/${item['Chain ID']}`})
      },
      add() {
        this.$router.push({path: 'add'})
      }
    }
  }
</script>
<style lang="stylus">
</style>
