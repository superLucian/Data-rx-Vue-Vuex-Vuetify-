<template>
  <v-card-text class="px-3 py-0" id="search_result">
    <v-layout row wrap v-if="show">
      <v-flex xs4>
        <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
      </v-flex>
      <v-flex xs12 v-if="type === 'ndc'">
        <v-data-table
          v-bind:headers="headers"
          :items="tableData"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading"
          item-key="NDC"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td v-if="selectable">
                <v-btn color="primary-color" small @click="selectDrug(props.item)">select</v-btn>
              </td>
              <td v-else>
                <v-tooltip top v-if="props.expanded">
                  <v-btn icon @click="props.expanded = !props.expanded" slot="activator">
                    <v-icon>expand_less</v-icon>
                  </v-btn>
                  <span>Close</span>
                </v-tooltip>
                <v-tooltip top v-else>
                  <v-btn icon @click="props.expanded = !props.expanded" slot="activator">
                    <v-icon>expand_more</v-icon>
                  </v-btn>
                  <span>View details</span>
                </v-tooltip>
                <v-tooltip top>
                  <v-btn icon @click="viewDrug(props.item)" slot="activator">
                    <v-icon>view_module</v-icon>
                  </v-btn>
                  <span>View Drug</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left">{{ props.item['NDC']}}</td>
              <td class="text-xs-left">{{ props.item['Product Name'] }}</td>
              <td class="text-xs-left">{{ props.item['GPI'] }}</td>
              <td class="text-xs-left">{{ props.item['Product Type Desc'] }}</td>
              <td class="text-xs-left">{{ props.item['Thera Class Cd'] }}</td>
              <td class="text-xs-left">{{ props.item['Strength'] }}</td>
              <td class="text-xs-left">{{ props.item['Form Desc'] }}</td>
              <td class="text-xs-left">{{ props.item['ROA'] }}</td>
              <td class="text-xs-left">{{ props.item['Mfg'] }}</td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-layout row wrap>
              <v-flex xs3>
                <v-card-text>
                  <p><span>NDC:</span> {{ props.item['NDC'] }}</p>
                  <p><span>Product Name:</span> {{ props.item['Product Name'] }}</p>
                  <p><span>GPI:</span> {{ props.item['GPI'] }}</p>
                  <p><span>Generic Ref Name:</span> {{ props.item['Generic Ref Name'] }}</p>
                  <p><span>Product Type Desc:</span> {{ props.item['Product Type Desc'] }}</p>
                  <p><span>Thera Class Cd:</span> {{ props.item['Thera Class Cd'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p><span>GFC:</span> {{ props.item['GFC'] }}</p>
                  <p><span>GCR:</span> {{ props.item['GCR'] }}</p>
                  <p><span>GCC:</span> {{ props.item['GCC'] }}</p>
                  <p><span>Strength:</span> {{ props.item['Strength'] }}</p>
                  <p><span>Form Desc:</span> {{ props.item['Form Desc'] }}</p>
                  <p><span>Pack Size:</span> {{ props.item['Pack Size'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p><span>ROA:</span> {{ props.item['ROA'] }}</p>
                  <p><span>UOM:</span> {{ props.item['UOM'] }}</p>
                  <p><span>AWP:</span> {{ props.item['AWP'] }}</p>
                  <p><span>HCFA MAC:</span> {{ props.item['HCFA MAC'] }}</p>
                  <p><span>WAC:</span> {{ props.item['WAC'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p><span>DRX MAC:</span> {{ props.item['DRX MAC'] }}</p>
                  <p><span>Single Source:</span> {{ props.item['Single Source'] }}</p>
                  <p><span>Maintenance Drug:</span> {{ props.item['Maintenance Drug'] }}</p>
                  <p><span>Mfg:</span> {{ props.item['Mfg'] }}</p>
                  <p><span>Status:</span> {{ props.item['Status'] }}</p>
                </v-card-text>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </v-flex>
      <v-flex xs12 v-else-if="type === 'gpi'">
        <v-data-table
          v-bind:headers="headers_gpi"
          :items="tableData"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-left" v-if="selectable">
                <v-btn color="primary-color" small @click="selectDrug(props.item)">select</v-btn>
              </td>
              <td v-else></td>
              <td class="text-xs-left">{{ props.item['GPI'] }}</td>
              <td class="text-xs-left">{{ props.item['Generic Description'] }}</td>
              <td class="text-xs-left">{{ props.item['Brand Name'] }}</td>
              <td class="text-xs-left">{{ props.item['Generic Available'] }}</td>
              <td class="text-xs-left">{{ props.item['Strength'] }}</td>
              <td class="text-xs-left">{{ props.item['Form'] }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-card-text>
</template>
<script>
  export default {
    name: 'drug-find-result',
    props: ['show', 'tableData', 'loading', 'type', 'view', 'add', 'selectable'],
    data() {
      return {
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'NDC', align: 'left', sortable: true, value: 'NDC'},
          {text: 'Product Name', align: 'left', sortable: true, value: 'Product Name'},
          {text: 'GPI', align: 'left', sortable: true, value: 'GPI'},
          {text: 'Product Type Desc', align: 'left', sortable: true, value: 'Product Type Desc'},
          {text: 'Thera Class Cd', align: 'left', sortable: true, value: 'Thera Class Cd'},
          {text: 'Strength', align: 'left', sortable: true, value: 'Strength'},
          {text: 'Form Desc', align: 'left', sortable: true, value: 'Form Desc'},
          {text: 'ROA', align: 'left', sortable: true, value: 'ROA'},
          {text: 'Mfg', align: 'left', sortable: true, value: 'Mfg'},
        ],
        headers_gpi: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'GPI', align: 'left', sortable: true, value: 'GPI'},
          {text: 'Generic Description', align: 'left', sortable: true, value: 'Generic Ref Name'},
          {text: 'Brand Name', align: 'left', sortable: true, value: 'Brand Name'},
          {text: 'Generic Available', align: 'left', sortable: true, value: 'Generic Available'},
          {text: 'Strength', align: 'left', sortable: false, value: 'Strength'},
          {text: 'Form', align: 'left', sortable: false, value: 'Form'}
        ],
        pagination: {
          rowsPerPage: 5,
          sortBy: ''
        },
        search: ''
      }
    },
    watch: {
      values: function (d) {
        this.isDisableFind = d.length <= 0
      },
      show: function (d) {
        if (d === false) this.search = ''
      }
    },
    mounted() {
      console.log('----- Drugs / Drug Find Result mounted -----')
    },
    methods: {
      viewDrug: function (item) {
        this.view({...item})
      },
      selectDrug(item) {
        window.Vue.$emit('drugSelected', item)
      }
    },
  }
</script>
<style lang="stylus">
  .drug-table-scroll-enabled {
    max-height: calc(100vh - 650px);
    max-width: 100%;
    overflow: auto;
  }
</style>
