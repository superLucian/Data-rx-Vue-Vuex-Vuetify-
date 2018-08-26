<template>
  <v-card-text>
    <v-layout row>
      <v-flex xs4>
        <v-subheader>*Plan ID:</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          name="plan-id"
          label="Plan ID"
          v-model="planFormulary.plan_id"
          :rules="[rules.required]"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>*Provider ID:</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          name="provider-id"
          label="Provider ID"
          v-model="planFormulary.provider_id"
          :rules="[rules.required]"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>*Drug ID:</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          name="drug-id"
          label="Drug ID"
          v-model="planFormulary.drug_id"
          :rules="[rules.required]"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>*Member ID:</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          name="member-id"
          label="Member ID"
          v-model="planFormulary.member_id"
          :rules="[rules.required]"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>Invoice Number:</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-text-field
          name="invoice-number"
          label="Invoice Number"
          v-model="planFormulary.invoice_number"
        ></v-text-field>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>Fill Date:</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-menu
          lazy
          :close-on-content-click="true"
          v-model="fill_menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-left="40"
          max-width="290px">
          <v-text-field slot="activator"
                        label="Fill Date"
                        v-model="planFormulary.fill_dt"
                        prepend-icon="event"
                        readonly
          ></v-text-field>

          <v-date-picker v-model="planFormulary.fill_dt" no-title scrollable actions />

        </v-menu>
      </v-flex>
    </v-layout>

    <v-layout row>
      <v-flex xs4>
        <v-subheader>Date Received:</v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-menu
          lazy
          :close-on-content-click="true"
          v-model="received_menu"
          transition="scale-transition"
          offset-y
          full-width
          :nudge-left="40"
          max-width="290px">
          <v-text-field slot="activator"
                        label="Date Received"
                        v-model="planFormulary.date_received"
                        prepend-icon="event"
                        readonly></v-text-field>
          <v-date-picker v-model="planFormulary.date_received" no-title scrollable actions />
        </v-menu>
      </v-flex>
    </v-layout>

  </v-card-text>
</template>


<script>

  import { convertDate } from '../../../../components/utils/DateMethods'
//  import MacService from '../../../../services/pbmsys/MacService'

  export default {
    name: 'plan-view-details',
    props: ['planFormulary'],
    data() {
      return {
        description: '',
        received_menu: '',
        fill_menu: '',
        headers: [
          { text: 'Mac ID', value: 'MacID' },
          { text: 'Plan Description', value: 'Description' },
          { text: 'PCN', value: 'PCN' },
          { text: 'Is 340B MAC', value: 'Is340B' },
          { text: 'Created By', value: 'CreatedBy' },
          { text: 'Created Date', value: 'CreatedDate' },
          { text: 'Updated By', value: 'UpdatedBy' },
          { text: 'Updated Date', value: 'UpdatedDate' }
        ],
        search: '',
        pagination: {
          rowsPerPage: 50
        },
        isDisabledSelect: false,
        searchResult: [],
        selectedMac: [],
        // oldSelectedMac: [],
        loading: false
      }
    },
    components: {},
    // watch: {
    //   selectedMac: function(v) {
    //     if(v.length > 0) {
    //       this.isDisabledSelect = false
    //       if(v.length > 1) {
    //         this.oldSelectedMac = this.selectedMac.filter((item) => item.MacID != this.oldSelectedMac[0].MacID)
    //         this.selectedMac = this.oldSelectedMac
    //         return false;
    //       }
    //     } else {
    //       this.isDisabledSelect = true
    //     }
    //
    //     this.oldSelectedMac = v
    //   }
    // },
    mounted() {
      console.log('----- Administrator / Plan / Plan Mac /Form mounted -----')
    },
    methods: {
      convertDate: convertDate,
      find() {
        const dataWithPcc = {
          "search": {
            "Pcc": this.$store.state.pcn.pcc,
            "DescriptionContains": this.description
          },
          "orderBy":"Id",
          "includeProperties":""
        }
        const dataWithoutPcc = {
          "search": {
            "PccIsNull": "true",
            "DescriptionContains": this.description
          },
          "orderBy":"Id",
          "includeProperties":""
        }
        const macService = new MacService()
        const that = this
        that.searchResult = []

        macService.get(dataWithPcc).then(function (res) {
          that.searchResult = that.searchResult.concat(that.convertObjectToGroupMac(res))
          macService.get(dataWithoutPcc).then(function (res) {
            that.searchResult = that.searchResult.concat(that.convertObjectToGroupMac(res))
          })
        })
      },
      convertObjectToGroupMac(macList){
        let result = []
        for(let i=0; i<macList.length; i++){
          const {__type, Id, Pcc, ...temp} = macList[i]
          result.push({...temp, MacID: Id, PCN: Pcc})
        }
        return result
      }
    },
    events: {
    }
  }
</script>

<style lang="stylus">

</style>
