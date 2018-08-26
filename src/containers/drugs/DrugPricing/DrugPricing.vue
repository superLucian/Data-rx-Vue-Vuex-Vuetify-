<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Drug Pricing</v-toolbar-title>
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
    <v-container fluid class="my-sub-scroll-enabled px-0">
      <v-layout row wrap>
        <v-flex xs6 class="px-3 py-3">
          <v-select v-bind:items="planItems" v-model="selectedPlan" label="Plan"
                    item-text="text" item-value="plan_id" required></v-select>
        </v-flex>
        <v-flex xs4>
          <v-card-text>
            <v-card-text>
              <v-checkbox v-bind:label="'Display non formulary NDCs?'" v-model="checkFormulary"
                          true-value="T" false-value="F"></v-checkbox>
            </v-card-text>
          </v-card-text>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field label="NDC or Drug Name" v-model="drugName"></v-text-field>
        </v-flex>
        <v-flex xs3 class="px-3">
          <v-text-field label="Strength" v-model="strengthVal"></v-text-field>
        </v-flex>
        <v-flex xs3 class="px-3">
          <v-text-field label="Form" v-model="formVal"></v-text-field>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-text-field label="*Quantity" v-model="quantityVal" type="number"></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4>
          <v-card-text>
            <v-checkbox label="Display out-dated NDCs?" v-model="checkOut_dated"
                        true-value="T" false-value="F" hide-details></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text>
            <v-checkbox label="Display repackaged NDCs?" v-model="checkRepackaged"
                        true-value="T" false-value="F" hide-details></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-select v-bind:items="networkItems" v-model="selectedNetwork" label="Network"
                      item-text="Network Desc" item-value="Network ID" hide-details required></v-select>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-card-text class="py-0">
            <p>*Please consider these prices as estimates. Actual prices may vary based on NDC, package size,
              date of dispensing, and manufacturer price changes. The price displayed is the total price that the store
              receives for the prescription. Prices are based on generic if available</p>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-card-actions class="d-block text-xs-center">
        <v-btn class="primary mx-0 my-0" @click.native="find" :disabled="isDisableFind">Find <i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      </v-card-actions>
      <v-layout row wrap v-if="showTable">
        <v-card-text class="py-0">
          <v-data-table
            v-bind:headers="headers"
            :items="tableItems"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left"> {{ props.item['NDC']}}</td>
                <td class="text-xs-left"> {{ props.item['Product Name'] }}</td>
                <td class="text-xs-left">{{ props.item.Strength }}</td>
                <td class="text-xs-left">{{ props.item['Form Desc'] }}</td>
                <td class="text-xs-left">{{ props.item['Product Type Desc'] }}</td>
                <td class="text-xs-left">{{ props.item['Price Source'] }}</td>
                <td class="text-xs-left">Plan params not set up for this product type</td>
              </tr>
            </template>
          </v-data-table>
        </v-card-text>
      </v-layout>
    </v-container>
  </main>
</template>
<script>
  import drugServices from '../../../services/drug/drugServices'
  import planServices from '../../../services/plan/planServices'

  export default {
    name: 'mac-pricing',
    data() {
      return {
        planItems: [],
        selectedPlan: '',
        checkFormulary: 'F',
        drugName: '',
        formVal: '',
        saveLoading: false,
        strengthVal: '',
        quantityVal: 1,
        checkOut_dated: 'F',
        checkRepackaged: 'F',
        networkItems: [],
        selectedNetwork: '',
        tableItems: [],
        showTable: false,
        pagination: {
          rowsPerPage: 5
        },
        isDisableFind: true,
        search: '',
        loading: false
      }
    },
    components: {},
    watch: {
      selectedPlan() {
        this.isDisableFind = false
      },
      checkFormulary() {
        this.isDisableFind = false
      },
      drugName() {
        this.isDisableFind = false
      },
      strengthVal() {
        this.isDisableFind = false
      },
      formVal() {
        this.isDisableFind = false
      },
      quantityVal() {
        this.isDisableFind = false
      },
      checkOut_dated() {
        this.isDisableFind = false
      },
      checkRepackaged() {
        this.isDisableFind = false
      },
      selectedNetwork() {
        this.isDisableFind = false
      }
    },
    mounted() {
      console.log('----- Drugs / Drug Pricing mounted -----')
      const that = this
      const data = {
        session_uid: this.$store.state.user.session_uid,
        session_id: this.$store.state.user.session_id,
        pcc: this.$store.state.pcn.pcc,
        groups: '*'
      }

      planServices.getAllPlanLists(data).then(function (res) {
        that.planItems = res.plan_data.filter((d) => !!d.plan_id && d.plan_status =='A').map((d) => Object.assign({}, {...d}, {
          text: d.plan_id + ' - ' + d.plan_desc_txt
        }))
        if (res.plan_data.length > 0)
          that.selectedPlan = that.planItems[0].plan_id
      })

      planServices.getNetworkList({pcc: this.$store.state.pcn.pcc}).then(function (res) {
        that.networkItems = [...res.network_list]
        if (res.network_list.length > 0)
          that.selectedNetwork = res.network_list[0]['Network ID']
      })

      this.headers = [
        {text: 'NDC', align: 'left', sortable: true, value: 'NDC'},
        {text: 'DRUG Desc', align: 'left', sortable: true, value: 'Product Name'},
        {text: 'Strength', align: 'left', sortable: true, value: 'Strength'},
        {text: 'Form', align: 'left', sortable: true, value: 'Form Desc'},
        {text: 'Product Type', align: 'left', sortable: true, value: 'Product Type Desc'},
        {text: 'Price Source', align: 'left', sortable: true, value: 'Price Source'},
        {text: 'Price', align: 'left', sortable: false, value: 'Plan params not set up for this product type'},
      ]
    },
    methods: {
      find: function () {
        this.showTable = true
        this.loading = true
        const that = this
        const data = {
          pcc: this.$store.state.pcn.pcc,
          planId: this.selectedPlan,
          pid: 0,
          zip_cd: '0',
          price_cd: '0',
          searchTxt: this.drugName,
          quantity: this.quantityVal || 1,
          strength: this.strengthVal,
          form: this.formVal,
          repack_flg: this.checkRepackaged,
          outdated_flg: this.checkOut_dated,
          off_form_flg: this.checkFormulary,
          network_id: this.selectedNetwork || 0,
        }
        drugServices.getDrugData(data).then(function (res) {
          that.saveLoading = true
          if (res.selected_drug_list && res.selected_drug_list.length > 0) {
            that.tableItems = res.selected_drug_list
            that.loading = false
            that.saveLoading = false
            that.isDisableFind = true
          }
          else {
            that.saveLoading = false
            window.Vue.$emit('snackbar', 'warning', 'Can`t find the data!')
          }
        })
      }
    },
    events: {}
  }
</script>
<style lang="stylus">
</style>
