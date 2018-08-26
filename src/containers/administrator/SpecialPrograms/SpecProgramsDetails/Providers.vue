<template>
  <main>
    <v-card-text class="my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-text-field
          append-icon="search"
          label="Search"
          single-line
          v-model="search"
        ></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-btn fab dark class="primary mt-3" small @click.native="add">
          <v-icon dark>add</v-icon>
        </v-btn>
        <v-flex xs12>
          <v-data-table
            :items="items"
            :headers="headers"
            :pagination.sync="pagination"

            :search="search"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left">
                  <v-tooltip top>
                    <v-btn icon @click="clickRow(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit Provider</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left" :key="header.text" v-for="header in headers" v-if="header.text !== ''">
                  {{ props.item[header.text] }}
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <spec-provider-form :show="showModal" :close="closeModal" :type="formType" :provider-data="selectedProvider"
                        :redraw-table="onUpdate"></spec-provider-form>
  </main>
</template>

<script>
  import {convertDate} from '../../../../components/utils/DateMethods'
  import SpecProviderForm from './SPProviderForm'

  export default {
    components: {SpecProviderForm},
    name: 'special-providers-edit',
    props: ['data', 'onUpdate', 'providersList'],
    data() {
      return {
        items: [],
        search: '',
        headers: [],
        pagination: {rowsPerPage: 10},
        showModal: false,
        formType: 'add',
        selectedProvider: {}
      }
    },
    mounted() {
    },
    watch: {
      providersList: function (pl) {
        if (pl.length > 0) {
          this.items = pl.map(item => Object.assign({}, {...item},
            {'Created Date': convertDate(item['Created Date']), 'Updated Date': convertDate(item['Updated Date'])}
          ))
          this.headers = this.setHeaders(pl)
        }
      }
    },
    methods: {
      setHeaders(data) {
        let newHeader = Object.keys(data[0]).map(el => ({text: el, align: 'left', sortable: true, value: el}))
        newHeader.unshift({text: '', align: 'left', sortable: false, value: ''})
        return newHeader
      },
      clickRow(item) {
        this.selectedProvider = Object.assign({}, {...this.data}, {...item})
        this.formType = 'edit'
        this.showModal = true
      },
      add() {
        this.selectedProvider = {desc_txt: this.data['desc_txt']}
        this.formType = 'add'
        this.showModal = true
      },
      redrawTable(newItem) {
        this.selectedProvider = Object.assign({}, {...this.selectedProvider}, {...newItem})
      },
      closeModal() {
        this.showModal = false
      }
    }
  }
</script>
