<template>
  <main>
    <v-card-text class="pb-0">
      <v-layout row>
        <v-flex xs6 offset-xs4>
          <v-subheader>{{planFormulary['Formulary']}}</v-subheader>
        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs8>
          <v-card-text>
            <v-select
              v-bind:items="networkList"
              v-model="planFormulary['new_network_id']"
              label="Network"
              bottom
              :item-text="'Network Desc'"
              :item-value="'Network ID'"
            >
            </v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text>
            <v-select
              v-bind:items="tierList"
              v-model="planFormulary['Tier']"
              label="Tier"
              item-text="title"
              item-value="value"
              bottom>
            </v-select>
          </v-card-text>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs4 class="px-3">
          <date-picker
            v-model="planFormulary['Start Date']"
            label="Start Date"
          ></date-picker>
        </v-flex>
        <v-flex xs4 v-if="hasEndDate">
          <date-picker
            v-model="planFormulary['End Date']"
            label="End Date"
          ></date-picker>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-card-text class="hasEndDate-container">
            <v-checkbox label="Include 'End Date'" v-model="hasEndDate"></v-checkbox>
          </v-card-text>

        </v-flex>
      </v-layout>

      <v-layout row>
        <v-flex xs6>
          <v-card-text class="hasEndDate-container pb-0">
            <v-checkbox color="primary-color" true-value="Exclude" false-value="Include" label="Exclude from plan"
                        v-model="planFormulary['Include/Exclude']"></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs6>
          <v-card-text class="hasEndDate-container pb-0">
            <v-checkbox color="primary-color" true-value="Yes" false-value="No" label="Prior Authorization required"
                        v-model="planFormulary['PA Required']"></v-checkbox>
          </v-card-text>
        </v-flex>
      </v-layout>

    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-block text-xs-center">

      <v-btn color="primary-color" :disabled="isDisabledSave" @click.native="save">Save<i v-if="saveLoading"
                                                                                    class="fa fa-circle-o-notch fa-spin fa-fw"></i>
      </v-btn>
      <v-btn @click.native="close">Close</v-btn>

    </v-card-actions>
  </main>
</template>

<script>

  import {convertDate} from '../../../../components/utils/DateMethods'
  import planServices from '../../../../services/plan/planServices'
  import DatePicker from "../../../../components/common/DatePicker.vue";

  export default {
    name: 'formulary-edit',
    props: [
      'close',
      'mode',
      'planFormulary'
    ],
    data() {
      return {
        start_date: null,
        end_date: null,
        hasEndDate: !!this.planFormulary['End Date'] && this.planFormulary['End Date'] != '12/31/9998',
        isDisabledSave: false,
        loading: false,
        saveLoading: false,
        networkList: [],
        tierList: [{value: -1, title: 'NA'}, {value: 0, title: 0}, {value: 1, title: 1}, {
          value: 2,
          title: 2
        }, {value: 3, title: 3},
          {value: 4, title: 4}, {value: 5, title: 5}, {value: 6, title: 6}, {value: 7, title: 7}, {
            value: 8,
            title: 8
          }, {value: 9, title: 9}]
      }
    },
    components: {DatePicker},
    mounted() {
      console.log('----- Administrator / Plan / Plan formulary /Formulary Edit -----')

      this.networkList = this.$store.state.planSetupData.network_list || []
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

        planServices.getFormularyListing(data).then(function (res) {
          that.searchResult = res.formulary
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
      save: function () {
        if(!this.hasEndDate) {
          this.planFormulary['End Date'] = '12/31/9998'
        }
        const that = this
        if (this.mode == 'edit') {
          that.saveLoading = true
          planServices.updatePlanFormulary(this.planFormulary, this.$store.state.user).then(function (res) {
            if (res == 0) {
              that.saveLoading = false
              window.Vue.$emit('snackbar', 'success', 'Plan Formulary Updated Successfully!')
              that.close(true)
            } else {
              that.saveLoading = false
            }
          })
        } else if (this.mode == 'add') {
          that.saveLoading = true
          planServices.addPlanFormulary(this.planFormulary, this.$store.state.user).then(function (res) {
            if (res == 0) {
              that.saveLoading = false
              window.Vue.$emit('snackbar', 'success', 'Plan Formulary Saved Successfully!')
              that.close(true)
            } else {
              that.saveLoading = false
            }
          })
        }
      }
    },
    events: {}
  }
</script>

<style lang="stylus">
</style>
