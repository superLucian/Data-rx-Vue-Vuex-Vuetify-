<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Manage Plans and Parameters</v-toolbar-title>
      <v-menu offset-y>
        <v-btn flat slot="activator" class="status">
          {{filter}}
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in listFilterItems" :key="item" @click="changeFilter(item)">
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>

    <v-layout class="my-scroll-enabled">
      <tree-view
        ref='tree'
        :treeData="items"
        :options="treeOptions"
        @add-node="addNode"
        @edit-node="editNode"
      ></tree-view>
    </v-layout>
  </main>
</template>

<script>
  import planServices from '../../../services/plan/planServices'
  import store from '../../../store'
  import TreeView from '../../../components/common/TreeView/tree.vue'

  export default {
    name: 'Plan-list',
    data() {
      return {
        fullData: [],
        filter: 'Active',
        listFilterItems: ['Active', 'Inactive', 'All'],
        selected: [],
        items: [],
        treeOptions: {
          dynamicAdd: true,
          dynamicAddFilter: (node) => {
            if (node.type === 'group') {
              return true
            }
            return false
          },
          dynamicAddNode: this.addNode
        },
      }
    },
    components: {
      TreeView
    },
    watch: {
      filter() {
        this.setItems()
      }
    },
    mounted() {

      console.log('----- Administrator / Plan mounted -----')
      const that = this
      const data = {
        session_uid: this.$store.state.user.session_uid,
        session_id: this.$store.state.user.session_id,
        pcc: this.$store.state.pcn.pcc,
        groups: '*'
      }

      planServices.getAllPlanLists(data).then(function (res) {
        that.fullData = res.plan_data
        that.setItems()
      })
    },
    methods: {
      setItems() {
        const that = this
        let filteredData = []
        let previous = {
          children: []
        }
        this.items = []

        switch (that.filter) {
          case 'All':
            filteredData = that.fullData
            break
          case 'Active':
            that.fullData.map(function (item) {
              if (item.plan_status === 'A')
                filteredData.push(item)
            })
            break
          case 'Inactive':
            that.fullData.map(function (item) {
              if (item.plan_status === 'I')
                filteredData.push(item)
            })
            break
        }
//        Make the group list
        filteredData.map(function (item) {
          if (previous.group_id === item.group_id) {
            item.label = item.plan_id + ' - ' + item.plan_desc_txt
            that.items[that.items.length - 1].children.push(item)
          } else {
            previous = {
              children: []
            }
            previous.type = 'group'
            previous.label = item.group_cd + ' - ' + item.group_name_desc_txt
            previous.group_id = item.group_id
            item.label = item.plan_id + ' - ' + item.plan_desc_txt
            previous.children.push(item)
            that.items.push(previous)
          }
        })
      },
      changeFilter: function (filter) {
        this.filter = filter
      },
      addNode(item) {
        this.info = {
          group_id: item.group_id,
          plan_id: '',
          plan_desc_txt: '',
          plan_type_cd: '2',
          plan_type_desc_txt: '',
          effect_start_dt: (new Date()).toLocaleDateString(),
          effect_end_dt: '12/31/9998',
          contract_dt: (new Date()).toLocaleDateString(),
          status_cd: 'A',
          open_member: 'F',
          open_enrollment_flg: 'F',
          open_enrollment_cd: null,
          open_prescriber_flg: 'T',
          open_provider_flg: 'F',
          external_pa_ind: 'N',
          person_cd_lookup_ind: 'N',
          off_pdl_warning_flg: 'F',
          track_benefits_flg: 'T',
          allow_repacks_flg: 'F',
          max_claim_file_day_cnt: 30,
          max_refills_covered_cnt: 9999,
          member_id_prefix: '',
          narcotic_refill_pct: '',
          benefit_tier: '1',
          compound_covered_ind: 'Y',
          compound_dispense_fee_amt: 0,
          compound_max_amt: 0,
          compound_copay_type_cd: 'N',
          compound_use_group_mac_ind: 'N',
          compound_use_lower_uc_ind: 'Y',
          compound_use_lower_gad_ind: 'N',
          compound_use_pricing_params_ind: 'N',
          compound_copay_amt: 0,
          compound_copay_pct: 0,
          compound_copay_tier: 0,
          use_lower_of_logic_flg: 'F',
          uc_lower_ingred_cost_ind: 'N',
          uc_lower_awp_disc_ind: 'N',
          uc_lower_generic_awp_disc_ind: 'N',
          uc_lower_mac_disc_ind: 'N',
          uc_lower_uc_ind: 'Y',
          uc_lower_gad_ind: 'N',
          dependent_age_restrict_ind: 'N',
          student_age_limit: '',
          nonstudent_age_limit: '',
          disabled_age_limit: '',
          dep_adult_age_limit: '',
          copay_type_cd: 'N',
          fixed_copay_pct: 0,
          max_family_deduct_amt: 0,
          max_member_deduct_amt: 0,
          max_family_claim_amt: 0,
          max_member_claim_amt: 0,
          max_family_oop_amt: 0,
          max_member_oop_amt: 0,
          mandatory_mail_ind: 'N',
          retail_script_cnt_limit: '',
          retail_script_cnt_term_cd: '-1',
          script_cnt_limit: '',
          script_cnt_term_cd: '-1',
          transparency_flg: 'T',
          delta_cap_pct: '',
          delta_cap_diff: '',
          delta_cap_min: '',
          rebate_level_1: 'CASH',
          rebate_copay_diff_flg: null,
          rebate_level_3: '',
          prebate_flg: 'F',
          daw_cd: '',
          member_pay_cd: 'N',
          reimbursement_cd: 'X',
          off_form_action: 'R',
          base_formulary: null,
          formulary_mgr: null,
          open_formulary: 'T',
          generic_required: 'N',
          required_fields: '',
          field_edits: '',
          support_uid: '',
          comment_txt: '',
          member_card_report_id: -1,
          rollover_period_cd: 'X',
          rollover_period_desc_txt: 'Not applicable',
          use_senior_disc_flg: 'F',
          use_group_mpp_ind: 'N'
        }
        store.commit('UPDATE_STATUS', true)
        store.commit('UPDATE_SELECTED_PLAN', this.info)
        const data = {
          uid: this.$store.state.user.session_uid,
          pcc: this.$store.state.pcn.pcc,
          group_id: item.group_id,
          plan_id: "",
          network_id: 0,
          groups: '*'
        }
        const that = this
        planServices.getSetupPlan(data).then(function (res) {
          store.commit('UPDATE_PLAN_SETUP_DATA', res)
          that.$router.push({path: `add`})
        })
      },
      editNode(item) {
        store.commit('UPDATE_STATUS', true)
        store.commit('UPDATE_SELECTED_PLAN_DATA', item)
        this.$router.push({path: `edit/${item.plan_id }`})
      }
    }
  }
</script>
<style lang="stylus">
</style>
