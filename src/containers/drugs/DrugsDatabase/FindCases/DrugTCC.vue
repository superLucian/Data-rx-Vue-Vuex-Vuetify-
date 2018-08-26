<template>
  <main>
    <v-card-text class="pb-0">
      <v-layout row wrap>
        <v-flex xs6>
          <v-subheader class="px-0"> TCC = Therapeutic Classification </v-subheader>
        </v-flex>
        <v-flex xs6>
          <v-btn class="primary" @click.native="show">Load Therapeutic Class List</v-btn>
        </v-flex>
      </v-layout>

      <v-layout row wrap v-if="showTable">
        <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        <v-spacer></v-spacer>
        <v-spacer></v-spacer>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers_tcc"
            :items="tableData"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
            class="table-max-scroll"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-center" @click="viewDrugList(props.item)">
                  <v-tooltip top>
                    <v-btn icon slot="activator">
                      <v-icon>view_module</v-icon>
                    </v-btn>
                    <span>View DrugList</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left">{{ props.item['Therapeutic Class Cd'] }}</td>
                <td class="text-xs-left">{{ props.item['Therapeutic Desc'] }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
  </main>
</template>

<script>
  import drugServices from '../../../../services/drug/drugServices'

  export default {
    name: 'drug-find-tcc',
    props: ['findDrug', 'typeIndex'],
    data() {
      return {
        showTable: false,
        tableData: [],
        headers_tcc: [
          {text: '', align: 'center', sortable: false, value: ''},
          {text: 'Therapeutic Class Cd', align: 'left', sortable: true, value: 'Therapeutic Class Cd'},
          {text: 'Therapeutic Desc', align: 'left', sortable: true, value: 'Therapeutic Desc'},
        ],
        pagination: {
          rowsPerPage: 5,
          sortBy: ''
        },
        search: '',
        loading: false
      }
    },
    mounted() {

    },
    methods: {
      viewDrugList: function (item) {
        const data = {
          drug_cd: item['Therapeutic Class Cd'],
          drug_file_cd: 0,
          drug_type_cd: parseInt(this.typeIndex),
          drug_list_type_cd: 1
        }
        this.findDrug(data)
      },
      show: function () {
        const that = this
        that.loading = true
        that.showTable = true
        drugServices.getDrugClassNameList().then(function (d) {
          that.tableData = d.drug_class_name_list
          that.loading = false
        }).catch((res) => {
          that.loading = false
        })
      }
    }
  }
</script>
