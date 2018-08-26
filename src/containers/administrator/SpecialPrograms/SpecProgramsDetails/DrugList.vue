<template>
  <main>
    <v-card flat>
      <v-card-text class="pb-0 pr-0">
        <v-layout row wrap >
        <v-flex md4 xs12>
          <v-text-field
            append-icon="search"
            label="Search"
            single-line
            hide-details
            v-model="search"
          ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn fab dark class="primary" small @click.native="add">
          <v-icon dark>add</v-icon>
        </v-btn>
        </v-layout>
      </v-card-text>
      <v-card-text class="pr-0">
        <v-layout row wrap>
          <v-data-table
            :items="items"
            :headers="headers"
            :pagination.sync="pagination"
            class="my-sub-scroll-enabled"
            :search="search"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left">
                  <v-tooltip top>
                    <v-btn icon @click="clickRow(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit Drug</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left" :key="header.text" v-for="header in headers" v-if="header.text !== ''">{{ props.item[header.text] }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-layout>
      </v-card-text>

    </v-card>
    <spec-drug-form :show="showModal" :close="closeModal" :type="formType" :drug-data="selectedDrug" :redraw-table="redrawTable"></spec-drug-form>
  </main>
</template>

<script>
  import { convertDate } from '../../../../components/utils/DateMethods'
  import SpecDrugForm from './SPDrugForm.vue'
  import services from '../../../../services/specialPrograms/specProgramsServices'

  export default {
    components: {SpecDrugForm},
    name: 'special-druglist-edit',
    props: ['data', 'onUpdate'],
    data() {
      return {
        items: [],
        search: '',
        headers: [],
        pagination: {rowsPerPage: 10},
        showModal: false,
        formType: 'add',
        selectedDrug: {}
      }
    },
    mounted() {
      this.getDrugList()
    },
    methods: {
      getDrugList() {
        const that = this
        const programId = this.$route.params.spid
        services.getSpecProgramDrugList({ program_id: programId}).then(function (data) {
          that.items = data.spec_program_drug_list.map(item => Object.assign({}, {...item},
            {'Created Date': convertDate(item['Created Date']), 'Updated Date': convertDate(item['Updated Date'])}
          ))
          that.headers = that.setHeaders(data.spec_program_drug_list)
        });
      },
      setHeaders(data) {
        let newHeader = Object.keys(data[0]).map(el => ({ text: el,  align: 'left', sortable: true, value: el }))
        newHeader.unshift({text: '',  align: 'left', sortable: false, value: ''})
        return newHeader
      },
      clickRow(item) {
        this.selectedDrug = Object.assign({}, {...this.data}, {...item})
        this.formType = 'edit'
        this.showModal = true
      },
      add() {
        this.selectedDrug = Object.assign({}, {desc_txt: this.data['desc_txt']})
        this.formType = 'add'
        this.showModal = true
      },
      redrawTable() {
        this.getDrugList()
      },
      closeModal() {
        this.showModal = false
      }
    }
  }
</script>
