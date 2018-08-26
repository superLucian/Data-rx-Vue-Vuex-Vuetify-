<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">EDI Order List</v-toolbar-title>
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
            :items="ediList"
            :loading="loading"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left"> {{ props.item['PCN']}}</td>
                <td class="text-xs-left"> {{ props.item['NABP'] }}</td>
                <td class="text-xs-center">{{ props.item['NPI'] }}</td>
                <td class="text-xs-left">{{ props.item['Pharmacy Name'] }}</td>
                <td class="text-xs-left">{{ props.item['NDC'] }}</td>
                <td class="text-xs-left">{{ props.item['QTY'] }}</td>
                <td class="text-xs-left">{{ convertDate(props.item['Created Date']) }}</td>
                <td class="text-xs-left">{{ props.item['Created By'] }}</td>
                <td class="text-xs-left">{{ props.item['Comments'] }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>

    <edi-add :show="showAddModal" :close="closeAddModal" :reload-table="getEdiList"></edi-add>
  </main>
</template>
<script>
  import ediServices from '../../../services/edi/ediServices'
  import { convertDate } from '../../../components/utils/DateMethods'
  import EdiAdd from './EdiAdd.vue'
  import store from '../../../store'

  export default {
    name: 'edi-list',
    data() {
      return {
        search: '',
        ediList:[],
        loading: false,
        headers: [],
        showAddModal: false,
      }
    },
    components: {EdiAdd},
    mounted() {
      console.log('----- Administrator / EDI mounted -----')

      this.headers = [
        {text: '  PCN', align: 'left', sortable: true, value: 'PCN'},
        {text: 'NABP', align: 'left', sortable: true, value: 'NABP'},
        {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
        {text: 'Pharmacy Name', align: 'left', sortable: true, value: 'Pharmacy Name'},
        {text: 'NDC', align: 'left', sortable: true, value: 'NDC'},
        {text: 'QTY', align: 'left', sortable: true, value: 'QTY'},
        {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'},
        {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
        {text: 'Comments', align: 'left', sortable: true, value: 'Comments'},
      ]
      this.getEdiList()
    },
    methods: {
      convertDate: convertDate,
      add() {
        this.showAddModal = true
      },
      closeAddModal() {
        this.showAddModal = false
      },
      getEdiList() {
        const that = this
        ediServices.getEdiList({pcc: this.$store.state.pcn.pcc || ''}).then(function (res) {
          that.ediList = res.orders
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
