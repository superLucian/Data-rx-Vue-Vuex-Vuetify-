<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">{{formularyName}}</v-toolbar-title>
      <v-menu offset-y>
        <v-btn flat slot="activator" class="status">
          {{filter.text}}
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in listFilterItems" :key="item.code" @click="changeFilter(item)">
            <v-list-tile-title>{{ item.text }}</v-list-tile-title>
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
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="items"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading"
          item-key="Drug ID"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-right px-0" @click="props.expanded = !props.expanded" >
                <v-tooltip top v-if="props.expanded">
                  <v-btn icon slot="activator">
                    <v-icon>expand_less</v-icon>
                  </v-btn>
                  <span>Close</span>
                </v-tooltip>
                <v-tooltip top v-else>
                  <v-btn icon slot="activator">
                    <v-icon>expand_more</v-icon>
                  </v-btn>
                  <span>View details</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left">
                <v-tooltip top>
                  <v-btn icon @click="edit(props.item)" slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Formulary Drug Edit</span>
                </v-tooltip>
                <delete-confirm v-on:confirmed="deleteItem(props.item)"
                                :message="'Formulary Drug Delete'"></delete-confirm>
              </td>
              <td class="text-xs-left">{{ props.item['Drug ID Type'] }}</td>
              <td class="text-xs-left">{{ props.item['Drug ID'] }}</td>
              <td class="text-xs-left">{{ props.item['Drug Description'] }}</td>
              <td class="text-xs-left">{{ props.item['Start Date'] }}</td>
              <td class="text-xs-left">{{ props.item['End Date'] }}</td>
              <td class="text-xs-left">{{ props.item['Created By'] }}</td>
              <td class="text-xs-left">{{ convertDateTime(props.item['Created Date']) }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-layout row wrap>
              <v-flex xs4>
                <v-card-text>
                  <p><span>Drug ID Type:</span> {{ props.item['Drug ID Type'] }}</p>
                  <p><span>Drug ID:</span> {{ props.item['Drug ID'] }}</p>
                  <p><span>Drug Description:</span> {{ props.item['Drug Description'] }}</p>
                  <p><span>Drug Type:</span> {{ props.item['Drug Type'] }}</p>
                  <p><span>Created By:</span> {{ props.item['Created By'] }}</p>
                  <p><span>Created Date:</span> {{ convertDateTime(props.item['Created Date']) }}</p>
                  <p><span>Updated By:</span> {{ props.item['Updated By'] }}</p>
                  <p><span>Updated Date:</span> {{ convertDateTime(props.item['Updated Date']) }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text>
                  <p><span>Network:</span> {{ props.item['Network'] }}</p>
                  <p><span>Tier:</span> {{ props.item['Tier'] }}</p>
                  <p><span>Include/Exclude:</span> {{ props.item['Include/Exclude'] }}</p>
                  <p><span>PA Required:</span> {{ props.item['PA Required'] }}</p>
                  <p><span>% of Days Supply Limit:</span> {{ props.item['% of Days Supply Limit'] }}</p>
                  <p><span>Start Date:</span> {{ props.item['Start Date'] }}</p>
                  <p><span>End Date:</span> {{ props.item['End Date'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text>
                  <p><span>Min Qty:</span> {{ props.item['Min Qty'] }}</p>
                  <p><span>Max Qty:</span> {{ props.item['Max Qty'] }}</p>
                  <p><span>Min Days:</span> {{ props.item['Min Days'] }}</p>
                  <p><span>Max Days:</span> {{ props.item['Max Days'] }}</p>
                  <p><span>Min Age:</span> {{ props.item['Min Age'] }}</p>
                  <p><span>Max Age:</span> {{ props.item['Max Age'] }}</p>
                  <p><span>Message:</span> {{ props.item['Message'] }}</p>
                </v-card-text>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
    <formulary-drug-form></formulary-drug-form>
  </main>
</template>

<script>
  import formularyServices from '../../../services/formulary/formularyServices'
  import {convertDateTime} from '../../../components/utils/DateMethods'
  import FormularyDrugForm from "./FormularyDrugForm.vue";
  import DeleteConfirm from "../../../components/common/deleteConfirm.vue";

  export default {
    name: 'formulary-drugs',
    props: ['fname'],
    data() {
      return {
        formularyName: this.$route.params.fname,
        filter: {code: 'A', text: 'Active'},
        listFilterItems: [
          {code: 'A', text: 'Active'},
          {code: 'I', text: 'Inactive'},
          {code: '', text: 'All'}
        ],
        search: '',
        pagination: {
          rowsPerPage: 25
        },
        headers: this.headers = [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Drug ID Type', align: 'left', sortable: true, value: 'Drug ID Type'},
          {text: 'Drug ID', align: 'left', sortable: true, value: 'Drug ID'},
          {text: 'Drug Description', align: 'left', sortable: true, value: 'Drug Description'},
          {text: 'Start Date', align: 'left', sortable: true, value: 'Start Date'},
          {text: 'End Date', align: 'left', sortable: true, value: 'End Date'},
          {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
          {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'}
        ],
        items: [],
        selected: [],
        loading: false,
      }
    },
    components: {
      DeleteConfirm,
      FormularyDrugForm
    },
    watch: {
      filter: function () {
        this.loadData()
      }
    },
    mounted() {
      console.log('----- Administrator / Formulary Drug mounted -----')
      const that = this
      that.loadData()

      window.Vue.$on('reloadFormularyDrug', function () {
        that.loadData()
      })
    },
    methods: {
      convertDateTime: convertDateTime,
      loadData: function () {
        this.loading = true
        const data = {
          form_id: Number(this.$route.params.fid),
          drug_id: '',
          drug_desc_txt: '',
          status: this.filter.code
        }
        const that = this
        formularyServices.getFormularyDrugList(data).then(function (res) {
          that.loading = false
          that.items = res.formulary_drug_list
        })
      },
      changeFilter: function (filter) {
        this.filter = filter
      },
      add: function () {
        window.Vue.$emit('openFormularyDrugForm', 'add', {})
      },
      edit: function (drug) {
        window.Vue.$emit('openFormularyDrugForm', 'edit', drug)
      },
      deleteItem: function (drug) {
        formularyServices.deleteFormularyDrug(drug).then(function (res) {
          if (res === '0') {
            window.Vue.$emit('reloadFormularyDrug')
            window.Vue.$emit('snackbar', 'success', 'Formulary Drug Removed!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      },
      back: function () {
        this.$router.push({name: 'formulary'})
      }
    }
  }
</script>
<style lang="stylus">
</style>
