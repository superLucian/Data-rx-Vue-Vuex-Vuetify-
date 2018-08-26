<template>
  <main class="required-fields">
    <v-layout row wrap class="my-sub-scroll-enabled">
      <v-flex xs6>
        <v-card-text>
          <v-text-field
            name="required-fields"
            v-model="info.plan_required_fields"
            label="Required Fields"
            multi-line
            auto-grow
            rows="2"
            hide-details
            v-on:keypress="isValidInput"
          ></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs6>
        <v-card-text>
          <v-text-field
            name="field-edits"
            v-model="info.plan_field_edits"
            label="Field Edits"
            multi-line
            auto-grow
            rows="2"
            hide-details
            v-on:keypress="isValidInput"
          ></v-text-field>
        </v-card-text>
      </v-flex>
    </v-layout>

    <template v-if="type !== 'add'">
      <v-divider class="mt-2"></v-divider>
      <v-flex xs12>
        <small class="red--text">*indicates required field</small>
      </v-flex>
      <v-card-actions>
        <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update <i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      </v-card-actions>
    </template>
  </main>
</template>

<script>
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'

  export default {
    name: 'plan-required-fields',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedPlan,
        isDisabledSave: false,
        saveLoading: false,
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
      console.log('----- Administrator / Plan / RequiredField mounted -----')
      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
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
          this.info.required_fields = this.info.plan_required_fields
          this.info.field_edits = this.info.plan_field_edits
          planServices.updatePlan(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
            that.saveLoading = true
            if (res === "0") {
              that.isDisabledSave = true
              that.saveLoading = false
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
        })

        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      },
      isValidInput: function (evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        let pattern = /[^a-zA-Z0-9]/u

        if (!((charCode > 64 && charCode < 91) || (charCode > 96 && charCode < 123) || charCode === 8 || charCode === 44) && ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46)) {
          evt.preventDefault();
        } else {
          return true;
        }
      }
    }
  }
</script>

<style lang="stylus">
  .required-fields textarea {
    padding-top: 10px !important;
  }
</style>
