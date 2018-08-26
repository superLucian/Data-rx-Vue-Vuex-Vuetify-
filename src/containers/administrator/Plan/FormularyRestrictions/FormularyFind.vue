<template>
  <main>
    <div v-if="mode==='find'">
      <v-card-text class="py-0 my-scroll-enabled-2">
        <v-container fluid>
          <v-layout row>
            <v-flex xs3>
              <v-subheader>Formulary Description:</v-subheader>
            </v-flex>
            <v-flex xs3>
              <v-text-field
                name="formulary-search"
                label="Search"
                v-model="description"
              ></v-text-field>
            </v-flex>
            <v-flex xs3>
              <v-btn color="primary-color" @click.native="find" class="left">find<i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
            </v-flex>

          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-container fluid class="px-0 py-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
            </v-flex>
            <v-data-table
              v-bind:headers="headers"
              v-bind:items="searchResult"
              v-bind:search="search"
              v-bind:pagination.sync="pagination"
              :loading="loading"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td>
                    <v-btn small color="primary-color" @click="select(props.item)">select</v-btn>
                  </td>
                  <td class="text-xs-left">{{ props.item['Formulary Desc'] }}</td>
                  <td class="text-xs-left">{{ props.item['Form ID'] }}</td>
                  <td class="text-xs-left">{{ props.item['pcc'] }}</td>
                  <td class="text-xs-left">{{ props.item['Created By'] }}</td>
                  <td class="text-xs-left">{{ convertDate(props.item['Created Date']) }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn @click.native="close">Close</v-btn>
      </v-card-actions>
    </div>
    <div v-else-if="mode==='add'">
      <formulary-edit :planFormularyRestrictions="planFormularyRestrictionsData" :close="close"
                      :mode="mode"></formulary-edit>
    </div>
  </main>
</template>

<script>

  import {convertDate} from '../../../../components/utils/DateMethods'
  import planServices from '../../../../services/plan/planServices'

  import FormularyEdit from './FormularyRestrictionsEdit.vue'

  export default {
    name: 'formulary-find',
    props: [
      'close',
      'mode',
      'changeMode'
    ],
    data() {
      return {
        description: '',
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Formulary Desc', align: 'left', sortable: true, value: 'Formulary Desc'},
          {text: 'Form ID', align: 'left', sortable: true, value: 'Form ID'},
          {text: 'PCC', align: 'left', sortable: true, value: 'pcc'},
          {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
          {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'}
        ],
        search: '',
        pagination: {
          rowsPerPage: 5
        },
        saveLoading: false,
        isDisabledSelect: true,
        searchResult: [],
        selectedFormulary: [],
        oldSelectedFormulary: [],
        planFormularyRestrictionsData: {
          "group_id": this.$store.state.selectedPlan.group_id,
          "plan_id": this.$store.state.selectedPlan.plan_id,
          "network_id": -1,
          "Form ID": -1,
          "Formulary": '',
          "QTY Term": "-1",
          "Gender": -1,
          "Days QTY Limit": 0,
          "Start Date": (new Date()).toLocaleDateString(),
          "End Date": '12/31/9998'
        },
        loading: false
      }
    },
    components: {FormularyEdit},
    watch: {
      selectedFormulary: function (v) {
        if (v.length > 0) {
          this.isDisabledSelect = false
          if (v.length > 1) {
            this.oldSelectedFormulary = this.selectedFormulary.filter((item) => item['Form ID'] != this.oldSelectedFormulary[0]['Form ID'])
            this.selectedFormulary = this.oldSelectedFormulary
            return false;
          }
        } else {
          this.isDisabledSelect = true
        }
        this.oldSelectedFormulary = v
      }
    },
    mounted() {
      console.log('----- Administrator / Plan / Plan formulary /Formulary Find -----')
    },
    methods: {
      convertDate: convertDate,
      find() {
        const data = {
          "pcc": this.$store.state.pcn.pcc,
          "desc_txt": this.description
        }
        const that = this
        that.searchResult = []
        that.saveLoading = true
        planServices.getFormularyListing(data).then(function (res) {
          that.searchResult = res.formulary
          that.saveLoading = false
        })
      },
      convertObjectToGroupformulary(formularyList) {
        let result = []
        for (let i = 0; i < formularyList.length; i++) {
          const {__type, Id, Pcc, ...temp} = formularyList[i]
          result.push({...temp, formularyID: Id, PCN: Pcc})
        }
        return result
      },
      select: function (item) {
        this.planFormularyRestrictionsData = Object.assign({}, {...this.planFormularyRestrictionsData}, {
          "Form ID": item['Form ID'],
          "Formulary": item['Formulary Desc']
        })
        this.changeMode('add')
      }
    },
    events: {}
  }
</script>

<style lang="stylus">
  .formulary-find-container {
    .subheader {
      padding-top: 20px
    }
    .inform-text {
      text-align: center;
      margin: 0;
      padding-top: 10px
    }
  }

  .formulary-find-container .scrollable-table {
    max-height: calc(100vh - 620px);
    max-width: 100%;
    overflow: auto;
  }

</style>
