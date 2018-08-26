<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Diagnosis Codes</v-toolbar-title>
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
    <v-container fluid class="my-scroll-enabled px-0 py-0">
      <v-layout row wrap>
        <v-flex xs6>
          <v-card-text>
          <v-text-field
            label="Diagnosis Code"
            v-model="diagnosis_code"
          >
          </v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs6>
          <v-card-text>
          <v-text-field
            label="Diagnosis"
            v-model="diagnosis"
          >
          </v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-card-actions class="d-block text-xs-center">
            <v-btn color="primary-color" @click.native="find" :disabled="isDisableFind">Find
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
      <v-card-text class="" style="background-color: white" v-if="isFindResult">
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              v-bind:headers="headers"
              :items="tableData"
              v-bind:search="search"
              :loading="loading"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-center">
                    <v-tooltip top>
                      <v-btn icon @click="clickRow(props.item)" slot="activator">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <span>Price Edit</span>
                    </v-tooltip>
                    <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
                  </td>
                  <td class="text-xs-left"> {{ props.item['Diagnosis Code']}}</td>
                  <td class="text-xs-left"> {{ props.item.Diagnosis }}</td>
                  <td class="text-xs-left">{{ props.item.Comments }}</td>
                  <td class="text-xs-left">{{ props.item['Created By'] }}</td>
                  <td class="text-xs-left">{{ convertDate(props.item['Created Date']) }}</td>
                  <td class="text-xs-left">{{ props.item['Updated By'] }}</td>
                  <td class="text-xs-left">{{ convertDate(props.item['Updated Date']) }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
        <diagnosis-codes-edit></diagnosis-codes-edit>
      </v-card-text>
    </v-container>
  </main>
</template>

<script>
  import DiagnosisCodesEdit from './DiagnosisCodesEdit.vue'
  import diagnoseServices from '../../../services/diagnose/diagnoseService'
  import {convertDate} from '../../../components/utils/DateMethods'
  import DeleteConfirm from '../../../components/common/deleteConfirm'

  export default {
    name: 'diagnosis-codes',
    components: {
      DiagnosisCodesEdit, DeleteConfirm
    },
    data() {
      return {
        diagnosis_code: '',
        diagnosis: '',
        diagnosisCodesList: [],
        search: '',
        isDisableFind: true,
        headers: [],
        loading: false,
        isFindResult: false,
        tableData: [],
      }
    },
    computed: {
      values: function () {
        return this.diagnosis_code + this.diagnosis
      }
    },
    watch: {
      active: function () {
        this.diagnosis_code = ''
        this.diagnosis = ''
        this.isFindResult = false
        this.tableData = []
      },
      values: function (d) {
        if (d.length > 0)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      }
    },
    mounted() {
      console.log('----- Administrator / Diagnosis Code mounted -----')
      this.headers = [
        {text: '', align: 'left', sortable: false, value: ''},
        {text: 'Diagnosis Code', align: 'left', sortable: true, value: 'Diagnosis Code'},
        {text: 'Diagnosis', align: 'left', sortable: true, value: 'Diagnosis'},
        {text: 'Comments', align: 'left', sortable: true, value: 'Comments'},
        {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
        {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'},
        {text: 'Updated By', align: 'left', sortable: true, value: 'Updated By'},
        {text: 'Updated Date', align: 'left', sortable: true, value: 'Updated Date'},
      ]
      const that = this
      window.Vue.$on('reloadDiagnosisCodeList', function () {
        that.find()
      })
    },
    methods: {
      convertDate: convertDate,
      find: function () {
        this.loading = true
        const that = this
        let data = {
          diagnosis_code: this.diagnosis_code,
          diagnosis: this.diagnosis
        }
        this.isFindResult = true
        diagnoseServices.getDiagnosisCodesList(data).then(function (res) {
          if (res.diagnosis_codes.length > 0) {
            that.tableData = res.diagnosis_codes
            that.loading = false
          } else {
            window.Vue.$emit('snackbar', 'success', 'No results found!')
            that.loading = false
            that.tableData = []
          }
        })
        return
      },

      clickRow(cellinfo) {
        window.Vue.$emit('openEditDiagnosis', cellinfo)
      },
      deleteRow(cellinfo) {
        const that = this
        const data = {
          diagnosis_code: cellinfo['Diagnosis Code']
        }
        diagnoseServices.deleteDiagnosisCode(data).then(function (res) {
          if (res === "0") {
            that.find()
            window.Vue.$emit('snackbar', 'success', 'Deleted   Diagnosis Code!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      },
      add() {
        this.$router.push({path: 'add'})
      }
    }
  }
</script>
