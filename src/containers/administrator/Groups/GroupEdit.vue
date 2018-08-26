<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Edit Group</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-tabs v-model="active">
        <v-tabs-bar class="transparent">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.path">
            {{ tab.name }}
          </v-tabs-item>
        </v-tabs-bar>
      </v-tabs>
      <v-form ref="form">
        <v-container fluid v-if="active=='information'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-information :type="'edit'" :group_info="group_info" :tab="tabs[0]">
              </group-information>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='parameters'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-parameters :type="'edit'" :group_info="group_info" :tab="tabs[1]"
                                :spec_program_list="spec_program_list">
              </group-parameters>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='invoice-address'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-invoice-address :type="'edit'" :group_info="group_info">
              </group-invoice-address>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='mail-address'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-mail-address :type="'edit'" :group_info="group_info">
              </group-mail-address>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='field-edit'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <GroupField :group_id="group_info['group_id']">
              </GroupField>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='contacts'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-contacts :type="'edit'" :group_info="group_info">
              </group-contacts>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='comments'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-comments :type="'edit'" :group_info="group_info">
              </group-comments>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-divider class="mt-2"></v-divider>
      <small class="red--text">*indicates required field</small>
      <v-card-actions>
        <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click="save()" :disabled="isDisabledSave">Update</v-btn>
      </v-card-actions>
    </v-card-text>
  </main>
</template>

<script>
  import services from '../../../services/group/groupService'
  import store from '../../../store'
  import GroupInformation from './Information/GroupInformation.vue'
  import GroupParameters from './Parameters/GroupParameters.vue'
  import GroupInvoiceAddress from './InvoiceAddress/GroupInvoiceAddress.vue'
  import GroupMailAddress from './MailAddress/GroupMailAddress.vue'
  import GroupContacts from './Contacts/GroupContacts.vue'
  import GroupComments from './Comments/GroupComments.vue'
  import GroupField from './FieldEdits/GroupFieldEditList.vue'

  export default {
    name: 'group-edit',
    components: {
      GroupInformation,
      GroupParameters,
      GroupInvoiceAddress,
      GroupMailAddress,
      GroupContacts,
      GroupComments,
      GroupField
    },
    data() {
      return {
        tabs: [
          {name: 'Group', path: 'information', validated: true},
          {name: 'Parameters', path: 'parameters', validated: true},
          {name: 'Invoice Address', path: 'invoice-address'},
          {name: 'Mail Address', path: 'mail-address'},
          {name: 'Field Edits', path: 'field-edit'},
          {name: 'Contacts', path: 'contacts'},
          {name: 'Comments', path: 'comments'}],
        active: 'information',
        group_info: {},
        group_list: [],
        group_id: this.group_id = this.$route.params.group_id,
        spec_program_list: [],
        isDisabledSave: true,
        startWatch: false
      }
    },
    watch: {
      group_info: {
        handler: function (newData, oldData) {
          if (newData && oldData && (newData === oldData)) {
            this.isDisabledSave = false
          } else {
            this.isDisabledSave = true
          }
        },
        deep: true
      },
      startWatch: function (v) {
        if (v === true) this.isDisabledSave = true
      }
    },
    mounted() {
      console.log('--------- Group / information / GroupInformation mounted!---------------')
      this.setValues()
    },
    methods: {
      setValues() {

        this.group_info = {...this.$store.state.groupInformation[0]}
        this.group_info['type_cd'] = this.group_info['type_cd'] === null ? '' : this.group_info['type_cd'].toString()
        this.group_info['min_charge_amt'] = this.group_info['min_charge_amt'] === null ? '' : this.group_info['min_charge_amt'].toString()
        this.group_info['admin_fee_amt'] = this.group_info['admin_fee_amt'] === null ? '' : this.group_info['admin_fee_amt'].toString()
        this.group_info['reversal_time_limit'] = this.group_info['reversal_time_limit'] === null ? '' : this.group_info['reversal_time_limit'].toString()
        this.group_info['future_fill_time_limit'] = this.group_info['future_fill_time_limit'] === null ? '' : this.group_info['future_fill_time_limit'].toString()


        this.group_list = this.$store.state.allGroups.filter(function (item) {
          return item['Status Code'] === "Active"
        })
        this.group_list.unshift({name:'None', group_id:-1})
        this.group_info['group_list'] = this.group_list
        this.group_info.calendar_period_start_dt = this.dateFormat(this.group_info.calendar_period_start_dt)
        this.group_info.calendar_period_end_dt = this.dateFormat(this.group_info.calendar_period_end_dt)
        this.spec_program_list = [...this.$store.state.allSpecialPrograms]
        this.spec_program_list.push({program_id: 0, desc_txt: 'No Special Program Assigned'})
        this.startWatch = true
      },
      dateFormat(strDate) {
        const year = strDate.split("/")[2]
        const mon = strDate.split("/")[0]
        const day = strDate.split("/")[1]
        return year + "-" + mon + "-" + day
      },
      save() {
        if (this.validate()) {
          const that = this
          const info = this.group_info
          const user = that.$store.state.user
          const pcc = that.$store.state.pcn.pcc
          services.updateGroupInfo(info, user, pcc).then(function (res) {
            if (res === "0") {
              window.Vue.$emit('snackbar', 'success', 'Group updated !')
              window.Vue.$emit('loadGroups')
              store.commit('CLEAR', 'groupInformation')
              that.isDisabledSave = true
              that.back()
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          }).catch(function (res) {
          })
        }
      },
      validate() {
        const that = this
        let tabForValidation = that.tabs.filter(function (tab) {
          return tab.hasOwnProperty('validated') && !tab['validated']
        })[0]
        if (tabForValidation) {
          that.active = tabForValidation['path']
          setTimeout(function () {
            that.$refs.form.validate()
          }, 200)
          return false
        }
        return true
      },
      cancel() {
        this.isDisabledSave = true
        store.commit('CLEAR', 'groupInformation')
      },
      back: function () {
        this.$router.push({name: 'groups'})
      },
      clear: function () {
        this.setValues()
      }
    }
  }
</script>

<style>
</style>
