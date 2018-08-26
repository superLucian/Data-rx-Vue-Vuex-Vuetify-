<template>
  <main>
    <v-container fluid class="my-sub-scroll-enabled">
      <v-layout>
        <v-flex xs4>
          <v-select
            v-bind:items="networkItems"
            v-model="info.network_id"
            label="Default Network:"
            item-text="Network Desc"
            item-value="Network ID"
            bottom
          ></v-select>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex xs4>
          <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4 class="text-xs-right mt-3">
          <div class="subAdd">
            <v-btn fab dark color="primary-color" small="" @click.native="add()">
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="items"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-left handCell">
                  <v-tooltip top>
                    <v-btn icon @click="editRow(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit</span>
                  </v-tooltip>
                  <delete-confirm v-on:confirmed="confirmDelete(props.item)" :message="'Delete'"></delete-confirm>
                </td>
                <td class="text-xs-left"> {{ props.item['Network Type Desc'] }}</td>
                <td class="text-xs-left"> {{ props.item['Network Desc'] }}</td>
                <td class="text-xs-left">{{ props.item.Status }}</td>
                <td class="text-xs-left">{{ props.item.Comments }}</td>
                <td class="text-xs-left">{{ props.item['Group ID'] }}</td>
                <td class="text-xs-left">{{ props.item['Plan ID'] }}</td>
                <td class="text-xs-center">{{ props.item['type_cd'] }}</td>
                <td class="text-xs-center">{{ props.item.network_id }}</td>
                <td class="text-xs-center">{{ props.item.desc_txt }}</td>
                <td class="text-xs-left">{{ props.item.rank }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
      <add-network-form></add-network-form>
      <edit-network-form></edit-network-form>
    </v-container>
    <v-divider class="mt-2"></v-divider>
    <v-flex xs12>
      <small class="red--text">*indicates required field</small>
    </v-flex>
    <v-card-actions>
      <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update <i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
    </v-card-actions>
  </main>
</template>
<script>
  import AddNetworkForm from './AddNetwork.vue'
  import EditNetworkForm from './EditNetwork.vue'
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'

  export default {
    name: 'networks',
    data() {
      return {
        info: {},
        search: '',
        pagination: {
          rowsPerPage: 500
        },
        selectedRowData: {},
        loading: false,
        select: {text: 'default network'},
        headers: [],
        items: [],
        networkItems: [],
        isDisabledSave: true,
        saveLoading: false
      }
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
    },
    components: {
      DeleteConfirm, AddNetworkForm,
      EditNetworkForm,
    },
    mounted() {
      console.log('-----------Administrator / plan/ Networks mounted ---------------')
      this.headers = [
        {text: '', align: 'left', sortable: false, value: ''},
        {text: 'Network Type Desc', align: 'left', sortable: true, value: 'Network Type Desc'},
        {text: 'Network Desc', align: 'left', sortable: true, value: 'Network Desc'},
        {text: 'Status', align: 'left', sortable: true, value: 'Status'},
        {text: 'Comments', align: 'left', sortable: true, value: 'Comments'},
        {text: 'Group ID', align: 'left', sortable: true, value: 'Group ID'},
        {text: 'Plan ID', align: 'left', sortable: true, value: 'Plan ID'},
        {text: 'type_cd', align: 'left', sortable: true, value: 'type_cd'},
        {text: 'network_id', align: 'left', sortable: true, value: 'network_id'},
        {text: 'desc_txt', align: 'center', sortable: true, value: 'desc_txt'},
        {text: 'rank', align: 'left', sortable: true, value: 'rank'}
      ]

      const data = {
        pcc: this.$store.state.pcn.pcc,
        group_id: this.$store.state.selectedPlan.group_id,
        plan_id: this.$store.state.selectedPlan.plan_id
      }
      const that = this
      this.loading = true
      planServices.getGroupPlanNetworkList(data).then(function (res) {
        that.loading = false
        that.items = res.network_data
        that.networkItems = [...res.network_data]
        that.networkItems.unshift({'Network ID': 0, 'Network Desc': 'Please Select...'})
        that.info = that.$store.state.selectedPlan
      })

      planServices.getNetworkList({pcc: this.$store.state.pcn.pcc}).then(function (res) {
        const networkList = [...res.network_list]
        that.network_data_list = networkList;
        store.commit('UPDATE_PLAN_SETUP_DATA', {network_list: networkList})
      }).catch(function (e) {

      })

      window.Vue.$on('reloadPlanNetwork', function () {
        that.loading = true
        const data = {
          pcc: that.$store.state.pcn.pcc,
          group_id: that.$store.state.selectedPlan.group_id,
          plan_id: that.$store.state.selectedPlan.plan_id
        }
        planServices.getGroupPlanNetworkList(data).then(function (res) {
          that.loading = false
          that.items = res.network_data
          that.networkItems = [...res.network_data]
          that.networkItems.unshift({'Network ID': 0, 'Network Desc': 'Please Select...'})
          that.info = that.$store.state.selectedPlan
        })

        const datas = {
          uid: this.$store.state.user.session_uid,
          pcc: this.$store.state.pcn.pcc,
          group_id: this.$store.state.selectedPlan.group_id,
          plan_id: this.$store.state.selectedPlan.plan_id,
          network_id: this.$store.state.selectedPlan.network_id,
          groups: '*'
        }
        planServices.getSetupPlan(datas).then(function (res) {
          store.commit('UPDATE_PLAN_SETUP_DATA', res)
        })
      })

      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      add() {
        window.Vue.$emit('openAddNetworkForm')
      },
      editRow(cellinfo) {
        const data = {
          group_id: cellinfo['Group ID'],
          plan_id: cellinfo['Plan ID'],
          network_id: cellinfo.network_id
        }
        planServices.getGroupPlanNetwork(data).then(function (res) {
          window.Vue.$emit('openEditNetwork', res, cellinfo)
        })
      },
      confirmDelete: function(item) {
        const that = this
        const data = {
          plan_id: item['Plan ID'],
          group_id: item['Group ID'],
          network_id: item.network_id,
          deleted_by: this.$store.state.user.session_uid
        }
        planServices.deletePlanNetwork(data).then(function (res) {
          if (res === '0') {
            window.Vue.$emit('reloadPlanNetwork')
            window.Vue.$emit('snackbar', 'success', 'Removed Network!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
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
              window.Vue.$emit('snackbar', 'success', 'Plan Networks Saved!')
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
          if(data.base_formulary) data.base_formulary = data.base_formulary.replace(/\s/g, '')
          store.commit('UPDATE_SELECTED_PLAN', data)
          that.info = that.$store.state.selectedPlan
        })

        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      }
    }
  }
</script>
<style lang="stylus">
</style>

