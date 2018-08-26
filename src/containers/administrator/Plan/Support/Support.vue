<template>
  <main>
    <v-container fluid class="my-sub-scroll-enabled px-0">
      <v-layout row>
        <v-flex xs12>
          <v-card-text class="py-0">
            <v-select
              label="Support Contact Name"
              v-bind:items="users_list"
              v-model="info.support_uid"
              item-value="uid"
              item-text="name_txt"
              @input="selectSupport"
            ></v-select>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text class="py-0">
            <v-text-field
              label="Address"
              v-model="support.addr1_txt"
              disabled
            ></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field
              label="City"
              v-model="support.city_txt"
              disabled
            ></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field
              label="State"
              v-model="support.state_cd"
              disabled
            ></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field
              label="Zip"
              v-model="support.zip_cd"
              disabled
            ></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field
              label="Phone"
              v-model="support.phone_num"
              disabled
            ></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field
              label="Cell"
              v-model="support.cell_num"
              disabled
            ></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field
              label="Email"
              v-model="support.email_addr_txt"
              disabled
            ></v-text-field>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
    <template v-if="type !== 'add'">
      <v-divider class="mt-2"></v-divider>
      <v-flex xs12>
        <small class="red--text">*indicates required field</small>
      </v-flex>
      <v-card-actions>
        <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update<i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      </v-card-actions>
    </template>
  </main>
</template>
<script>
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'

  export default {
    name: 'plan-support',
    props: ['type', 'data'],
    data() {
      return {
        users_list: this.$store.state.planSetupData.sysuser_data,
        info: this.$store.state.selectedPlan,
        saveLoading: false,
        support: {
          email_addr_txt: '',
          addr1_txt: '',
          cell_num: '',
          name_txt: '',
          phone_num: '',
          state_cd: '',
          uid: '',
          zip_cd: '',
        },
        isDisabledSave: false
      }
    },
    components: {},
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
          }
        }, deep: true
      }
    },
    mounted() {
      console.log('----- Administrator / Plan / Support mounted -----')
      this.setValues()
      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      selectSupport: function (selected) {
        if (selected && selected !== undefined) {
          const filtered = this.users_list.filter((v) => v.uid === selected)[0]
          this.support = filtered;
        }
      },
      setValues: function () {
        if(this.type === 'add') {
          this.info.support_uid = this.users_list[0].uid
        }
        if (this.info && this.info.hasOwnProperty('support_uid')) {
          const that = this
          setTimeout(function () {
            if (that.users_list.length > 0) {
              const filtered = that.users_list.filter((v) => v.uid === that.info.support_uid)[0]
              if (filtered) {
                that.support = filtered
              }
            }
          })
        }
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
          if(data.base_formulary) data.base_formulary = data.base_formulary.replace(/\s/g, '')
          store.commit('UPDATE_SELECTED_PLAN', data)
          that.info = that.$store.state.selectedPlan
          that.setValues()
        })

        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      }
    },
  }
</script>
<style lang="stylus">
</style>
