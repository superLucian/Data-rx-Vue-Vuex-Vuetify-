<template>
  <main>
    <v-container fluid class="my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs4>
          <v-card-text class="py-0 pl-0">
            <v-select
              v-bind:items="off_formulary"
              v-model="info.off_form_action"
              label="When Drug is off formulary"
              item-text="text"
              item-value="value"
              bottom
            ></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-select
              v-bind:items="base_formulary"
              v-model="info.base_formulary"
              label="Base Formulary:"
              item-text="desc_txt"
              item-value="field_value"
              bottom
            ></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0 pr-0">
            <v-select
              v-bind:items="formulary_manager"
              v-model="info.formulary_mgr"
              label="Formulary Manager:"
              item-text="desc_txt"
              item-value="field_value"
              bottom
            ></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class=" py-3 pl-0">
            <v-checkbox label="Open formulary" v-model="info.open_formulary"
                        color="primary-color" true-value="T" false-value="F"></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text>
            <v-checkbox label="Require generics when available" v-model="info.generic_required"
                        color="primary-color" true-value="T" false-value="F"></v-checkbox>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">

          </v-card-text>
        </v-flex>
      </v-layout>
      <template v-if="type !== 'add'">
        <v-layout row>
          <v-flex xs4>
            <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
          </v-flex>
          <v-flex xs4 class="text-xs-center offset-xs2">
            <v-radio-group row v-model="planDrugsActive" class="text-xs-center">
              <v-radio value="A" label="Active" light></v-radio>
              <v-radio value="" label="All" light></v-radio>
            </v-radio-group>
          </v-flex>
          <v-flex xs2 class="text-xs-right">
            <div class="subAdd">
              <v-btn fab dark class="primary mt-3" small="" @click.native="addDrug()">
                <v-icon dark>add</v-icon>
              </v-btn>
            </div>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              v-bind:headers="headers"
              v-bind:items="items"
              v-bind:search="search"
              v-bind:pagination.sync="pagination"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-left">
                    <v-tooltip top>
                      <v-btn icon @click="edit(props.item)" slot="activator">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <span>Plan Drug Edit</span>
                    </v-tooltip>
                    <delete-confirm v-on:confirmed="deleteItem(props.item)"
                                    :message="'Plan Drug Delete'"></delete-confirm>
                  </td>
                  <td class="text-xs-left">{{ props.item['Drug Id Type'] }}</td>
                  <td class="text-xs-left">{{ props.item['Drug Id'] }}</td>
                  <td class="text-xs-left">{{ props.item['Drug Desc'] }}</td>
                  <td class="text-xs-left">{{ props.item['Effective Start Dt'] }}</td>
                  <td class="text-xs-left">{{ props.item['Effective End Dt'] }}</td>
                  <td class="text-xs-left">{{ props.item['HCPCS'] }}</td>
                  <td class="text-xs-left">{{ props.item['Network ID'] }}</td>
                  <td class="text-xs-left">{{ props.item['Created By'] }}</td>
                  <td class="text-xs-left">{{ convertDate(props.item['Created Dt']) }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
        <plan-drug-form></plan-drug-form>
      </template>
    </v-container>
    <div v-if="type !== 'add'">
      <v-divider class="mt-2"></v-divider>
      <small class="red--text">*indicates required field</small>
      <v-card-actions>
        <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update<i v-if="saveLoading"
                                                                                        class="fa fa-circle-o-notch fa-spin fa-fw"></i>
        </v-btn>
      </v-card-actions>
    </div>
  </main>
</template>
<script>
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'
  import {convertDate} from '../../../../components/utils/DateMethods'
  import PlanDrugForm from "./PlanDrugForm.vue";
  import DeleteConfirm from "../../../../components/common/deleteConfirm.vue";

  export default {
    name: 'plan-drug',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedPlan,
        off_formulary: [
          {'value': 'R', 'text': 'Reject Claim'},
          {'value': 'Z', 'text': 'Pay Zero'},
          {'value': '0', 'text': 'Treat as Tier 0'},
          {'value': '1', 'text': 'Treat as Tier 1'},
          {'value': '2', 'text': 'Treat as Tier 2'},
          {'value': '3', 'text': 'Treat as Tier 3'},
          {'value': '4', 'text': 'Treat as Tier 4'},
          {'value': '5', 'text': 'Treat as Tier 5'},
          {'value': '6', 'text': 'Treat as Tier 6'},
          {'value': '7', 'text': 'Treat as Tier 7'},
          {'value': '8', 'text': 'Treat as Tier 8'},
          {'value': '9', 'text': 'Treat as Tier 9'}
        ],
        base_formulary: [],
        formulary_manager: [],
        search: '',
        saveLoading: false,
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Drug Id Type', align: 'left', sortable: true, value: 'Drug Id Type'},
          {text: 'Drug Id', align: 'left', sortable: true, value: 'Drug Id'},
          {text: 'Drug Desc', align: 'left', sortable: true, value: 'Drug Desc'},
          {text: 'Effective Start Dt', align: 'left', sortable: true, value: 'Effective Start Dt'},
          {text: 'Effective End Dt', align: 'left', sortable: true, value: 'Effective End Dt'},
          {text: 'HCPCS', align: 'left', sortable: true, value: 'HCPCS'},
          {text: 'Network ID', align: 'left', sortable: true, value: 'Network ID'},
          {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
          {text: 'Created Dt', align: 'left', sortable: true, value: 'Created Dt'}
        ],
        items: [],
        pagination: {
          rowsPerPage: 100
        },
        planDrugsActive: 'A',
        loading: true,
        isDisabledSave: true
      }
    },
    components: {
      DeleteConfirm,
      PlanDrugForm
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData && this.type !== 'add') {
            this.isDisabledSave = false
            store.commit('UPDATE_STATUS', false)
          }
        },
        deep: true
      },
      data: {
        handler: function () {
          if (this.data) {
            this.info = this.data
            this.setValues()
          }
        }, deep: true
      },
      planDrugsActive: function (value) {
        this.loading = true
        this.items = []
        let data = {
          group_id: this.$store.state.selectedPlan.group_id,
          plan_id: this.$store.state.selectedPlan.plan_id,
          page_num: "1",
          status: value
        }
        const that = this
        planServices.getPlanDruglist(data).then(function (res) {
          that.loading = false
          that.items = res.plan_drug_data
        })
      }
    },
    mounted() {
      console.log('----- Administrator / Plan / Drugs mounted -----')
      this.setValues()
      const that = this
      const data = {
        group_id: this.$store.state.selectedPlan.group_id,
        plan_id: this.$store.state.selectedPlan.plan_id,
        page_num: "1",
        status: this.planDrugsActive
      }
      if (this.type !== 'add') {
        planServices.getPlanDruglist(data).then(function (res) {
          that.loading = false
          that.items = res.plan_drug_data
        })
      }

      window.Vue.$on('loadDrugList', function () {
        const data = {
          "group_id": that.$store.state.selectedPlan.group_id,
          "plan_id": that.$store.state.selectedPlan.plan_id,
          "page_num": "1",
          "status": that.planDrugsActive
        }
        planServices.getPlanDruglist(data).then(function (res) {
          that.loading = false
          that.items = res.plan_drug_data
        })
      })

      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      convertDate: convertDate,
      setValues() {
        if (this.$store.state.planSetupData) {
          this.base_formulary = [...this.$store.state.planSetupData.base_formulary_syscode]
          this.base_formulary.unshift({field_value: null, desc_txt: 'Please Select...'})
          this.formulary_manager = [...this.$store.state.planSetupData.formulary_mgr_syscode]
          this.formulary_manager.unshift({field_value: null, desc_txt: 'Please Select...'})
        }
      },
      addDrug() {
        window.Vue.$emit('openPlanDrugForm', 'add')
      },
      edit(drug) {
        window.Vue.$emit('openPlanDrugForm', 'edit', drug)
      },
      deleteItem(item) {
        const that = this
        const data = {
          session_uid: this.$store.state.user.session_uid,
          session_id: this.$store.state.user.session_id,
          pcc: this.$store.state.pcn.pcc,
          group_id: this.$store.state.selectedPlan.group_id,
          plan_id: this.$store.state.selectedPlan.plan_id,
          drug_id_type_cd: item.drug_id_type_cd,
          drug_id: item['Drug Id'],
          effect_start_dt: item['Effective Start Dt'],
          all_plans_flg: 'T',
          groups: '*'
        }

        planServices.deletePlanDrug(data).then(function (res) {
          if (res === "0") {
            that.isDisabledSave = true
            window.Vue.$emit('snackbar', 'success', 'Delete Plan Drug!')
            window.Vue.$emit('loadDrugList')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        }).catch(function () {
          window.Vue.$emit('snackbar', 'error', error)
        })
      },
      save() {
        const that = this
        if (this.info.plan_id === ''
          || this.info.plan_type_cd === ''
          || this.info.plan_desc_txt === ''
          || this.info.effect_start_dt === ''
          || this.info.max_claim_file_day_cnt === ''
          || this.info.max_refills_covered_cnt === ''
        ) {
          this.$router.push({path: 'plan'})
        } else if (this.info.compound_covered_ind === 'Y'
          && this.info.compound_use_group_mac_ind === 'N'
          && this.info.compound_use_pricing_params_ind === 'N'
          && this.info.compound_use_lower_uc_ind === 'N'
          && this.info.compound_use_lower_gad_ind === 'N') {
          this.$router.push({path: 'compound'})
        } else if (this.info.daw_cd === '') {
          this.$router.push({path: 'daw_codes'})
        } else {
          planServices.updatePlan(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
            that.saveLoading = true
            if (res === "0") {
              that.saveLoading = false
              that.isDisabledSave = true
              store.commit('UPDATE_STATUS', true)
              window.Vue.$emit('snackbar', 'success', 'Plan Data Saved!')
              store.commit('UPDATE_SELECTED_PLAN', that.info)
            } else {
              that.saveLoading = false
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      clear: function () {
        const that = this
        const data = {
          session_uid: this.$store.state.user.session_uid,
          session_id: this.$store.state.user.session_id,
          pcc: this.$store.state.pcn.pcc,
          group_cd: this.$store.state.selectedPlan.group_cd,
          plan_id: this.$store.state.selectedPlan.plan_id
        }
        planServices.getPlan(data).then(function (res) {
          let data = res.plan_data[0]
          if (data.base_formulary) data.base_formulary = data.base_formulary.replace(/\s/g, '')
          store.commit('UPDATE_SELECTED_PLAN', data)
          that.info = that.$store.state.selectedPlan
          that.setValues()
        })

        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      }
    }
  }
</script>
<style lang="stylus">
</style>
