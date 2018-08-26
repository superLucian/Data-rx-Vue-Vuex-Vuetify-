<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Manage Formulary</v-toolbar-title>
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
    </v-toolbar>

    <v-container fluid class="my-scroll-enabled">
      <v-layout row wrap>
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="items"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center handCell" @click="clickRow(props.item['Form ID'], props.item['Formulary Desc'])">
                <v-tooltip top>
                  <v-btn icon slot="activator">
                    <v-icon>view_module</v-icon>
                  </v-btn>
                  <span>View Formulary</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left">{{ props.item['Formulary Desc'] }}</td>
              <td class="text-xs-left">{{ props.item['Form ID'] }}</td>
              <td class="text-xs-left">{{ props.item['pcc'] }}</td>
              <td class="text-xs-left">{{ props.item['Created By'] }}</td>
              <td class="text-xs-left">{{ convertDateTime(props.item['Created Date']) }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
  </main>
</template>
<script>
  import formularyServices from '../../../services/formulary/formularyServices'
  import {convertDateTime} from '../../../components/utils/DateMethods'

  export default {
    name: 'formulary-list',
    data() {
      return {
        search: '',
        pagination: {
          rowsPerPage: 25
        },
        headers:  [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Formulary Desc', align: 'left', sortable: true, value: 'Formulary Desc'},
          {text: 'Form ID', align: 'left', sortable: true, value: 'Form ID'},
          {text: 'PCC', align: 'left', sortable: true, value: 'pcc'},
          {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
          {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'}
        ],
        items: [],
        selected: [],
        loading: false
      }
    },
    components: {},
    watch: {},
    mounted() {
      console.log('----- Administrator / Formulary mounted -----')
      const that = this
      const data = {
        pcc: this.$store.state.pcn.pcc,
        desc_txt: ''
      }
      formularyServices.getFormularyList(data).then(function (res) {
        that.items = res.formulary
      })
    },
    methods: {
      convertDateTime: convertDateTime,
      clickRow(fid,name) {
        this.$router.push({path: `${fid}/${name}`})
      }
    }
  }
</script>
<style lang="stylus">
</style>
