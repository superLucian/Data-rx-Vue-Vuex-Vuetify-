<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Drugs Database</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="addDrug" v-if="!selectable">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-layout row wrap class="my-scroll-enabled">
      <v-container fluid>
        <v-tabs v-model="active">
          <v-tabs-bar class="transparent">
            <v-tabs-slider class="active-line"></v-tabs-slider>
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab"
              :href="'#' + tab"
              ripple
            >
              {{ tab }}
            </v-tabs-item>
          </v-tabs-bar>
          <v-tabs-items>
            <v-tabs-content class="px-0 py-0" id="Drug Name">
              <drug-find-name :find-drug="find" :type-index="getTypeIndex('Drug Name')"></drug-find-name>
            </v-tabs-content>
            <v-tabs-content class="px-0 py-0" id="NDC">
              <drug-find-ndc :find-drug="find" :type-index="getTypeIndex('NDC')"></drug-find-ndc>
            </v-tabs-content>
            <v-tabs-content class="px-0 py-0" id="GPI">
              <drug-find-gpi :find-drug="find" :type-index="getTypeIndex('GPI')"></drug-find-gpi>
            </v-tabs-content>
            <v-tabs-content class="px-0 py-0" id="HCPCS">
              <drug-find-hcpcs :find-drug="find" :type-index="getTypeIndex('HCPCS')"></drug-find-hcpcs>
            </v-tabs-content>
            <v-tabs-content class="px-0 py-0" id="GCC">
              <drug-find-gcc :find-drug="find" :type-index="getTypeIndex('GCC')"></drug-find-gcc>
            </v-tabs-content>
            <v-tabs-content class="px-0 py-0" id="GFC">
              <drug-find-gfc :find-drug="find" :type-index="getTypeIndex('GFC')"></drug-find-gfc>
            </v-tabs-content>
            <v-tabs-content class="px-0 py-0" id="GCR">
              <drug-find-gcr :find-drug="find" :type-index="getTypeIndex('GCR')"></drug-find-gcr>
            </v-tabs-content>
            <v-tabs-content class="px-0 py-0" id="TCC">
              <drug-find-tcc :find-drug="find" :type-index="getTypeIndex('TCC')"></drug-find-tcc>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-container>
      <v-card-text class="py-0">
        <drug-find-result :selectable="selectable" :show="showTable" :table-data="tableData" :loading="loading"
                          :type="tableType" :view="viewDrug" :add="addDrug"></drug-find-result>
        <drug-detail-form :data="selectedDrug" :type="drugViewType" :show="showDrugModal" :closeForm="closeForm"
                          :save-drug="saveDrug"></drug-detail-form>
      </v-card-text>
    </v-layout>
  </main>
</template>
<script>
  import drugServices from '../../../services/drug/drugServices'
  import GroupService from '../../../services/pbmsys/GroupService'
  import ROAService from '../../../services/pbmsys/ROAService'
  import store from '../../../store'
  import DrugFindResult from './DrugFindResult'
  import DrugFindName from './FindCases/DrugName'
  import DrugFindGpi from './FindCases/DrugGPI'
  import DrugFindNdc from './FindCases/DrugNDC'
  import DrugFindHcpcs from './FindCases/DrugHCPCS'
  import DrugFindGcc from './FindCases/DrugGCC'
  import DrugFindGfc from './FindCases/DrugGFC'
  import DrugFindGcr from './FindCases/DrugGCR'
  import DrugFindTcc from './FindCases/DrugTCC'
  import DrugDetailForm from './DrugForm'

  export default {
    components: {
      DrugDetailForm, DrugFindTcc, DrugFindGcr,
      DrugFindGfc, DrugFindGcc, DrugFindHcpcs, DrugFindNdc, DrugFindGpi, DrugFindName, DrugFindResult
    },
    name: 'drug-find',
    props: ['selectable'],
    data() {
      return {
        showDrugModal: false,
        drugViewType: 'view',
        selectedDrug: {},
        showTable: false,
        tabs: ['Drug Name', 'NDC', 'GPI', 'HCPCS', 'GCC', 'GFC', 'GCR', 'TCC'],
        drugtTypeCd: ['Drug Name', 'NDC', 'TCC', 'GCR', 'GFC', 'GCC', 'HCPCS', 'GPI'],
        active: null,
        drug_name: '',
        drug_file: '',
        drug_method: '',
        storeSearch: '',
        tableData: [],
        isDisableFind: true,
        loading: false,
        tableType: 'ndc'
      }
    },
    watch: {
      active: function (v) {
        this.showTable = false
        this.tableData = []
      },
    },
    mounted() {
      console.log('----- Administrator / Drug Find mounted -----')
      const that = this

      if (!this.$store.state.drugSetupData || !this.$store.state.drugSetupData.roa_list) {
        const ROAWebService = new ROAService()
        const dataRoa = {
          "search": {},
          "orderBy": "",
          "includeProperties": ""
        }
        ROAWebService.get(dataRoa).then(function (d) {
          that.$store.commit('UPDATE_DRUG_SETUP_DATA', {roa_list: d})
        })
      }
    },
    methods: {
      getTypeIndex: function (value) {
        const index = this.drugtTypeCd.indexOf(value)
        return index > -1 ? index : null
      },
      find: function (data) {
        this.loading = true
        this.showTable = true
        const that = this
        const groupId = 0
        const param = Object.assign({},
          {
            group_id: groupId,
            strength: '',
            form: '',
            repack_flg: 'T',
            outdated_flg: 'T'
          },
          {...data})

        if (data.drug_file_cd === 3) {
          this.tableType = 'gpi'
        } else {
          this.tableType = 'ndc'
        }
        that.tableData = []
        drugServices.getSelectedDrugList(param).then(function (d) {
          that.tableData = d.selected_drug_list
          if (d.selected_drug_list.length > 0) {
            document.getElementById('search_result').scrollIntoView({
              behavior: 'instant',
              block: 'nearest',
              inline: 'nearest'
            })
          } else {
            window.Vue.$emit('snackbar', 'success', 'No Items!')
          }
          that.loading = false
        }).catch(function (res) {
          window.Vue.$emit('snackbar', 'error', res.message)
          that.loading = false
        })
      },
      addDrug() {
        this.selectedDrug = {}
        this.drugViewType = 'add'
        this.showDrugModal = true
      },
      viewDrug: function (item) {
        this.selectedDrug = {...item}
        this.drugViewType = 'view'
        this.showDrugModal = true
      },
      closeForm: function () {
        this.selectedDrug = {}
        this.showDrugModal = false
      },
      saveDrug: function (item) {
      }
    }
  }
</script>

<style lang="stylus">
</style>
