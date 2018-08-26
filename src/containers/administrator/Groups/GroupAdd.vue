<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add Group</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card-text>
      <v-tabs v-model="active">
        <v-tabs-bar class="transparent">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.path"
            ripple>
            {{ tab.name }}
          </v-tabs-item>
        </v-tabs-bar>
      </v-tabs>
      <v-form ref="form">
        <v-container fluid v-if="active=='information'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-information :type="'new'" :group_info="group_info" :tab="tabs[0]">
              </group-information>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='parameters'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-parameters :type="'new'" :group_info="group_info" :tab="tabs[1]"
                                :spec_program_list="spec_program_list"></group-parameters>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='invoice-address'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-invoice-address :type="'new'" :group_info="group_info"></group-invoice-address>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='mail-address'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-mail-address :type="'new'" :group_info="group_info"></group-mail-address>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='contacts'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-contacts :type="'new'" :group_info="group_info"></group-contacts>
            </v-flex>
          </v-layout>
        </v-container>
        <v-container fluid v-if="active=='comments'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12 class="pt-3">
              <group-comments :type="'new'" :group_info="group_info"></group-comments>
            </v-flex>
          </v-layout>
        </v-container>
      </v-form>
      <v-divider class="mt-2"></v-divider>
      <small class="red--text">*indicates required field</small>
      <v-card-actions>
        <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click="save()" :disabled="isDisabledSave">Create</v-btn>
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
  import {pickerFormat} from '../../../components/utils/DateMethods'

  export default {
    name: 'add-group-modal',
    components: {
      GroupInformation,
      GroupParameters,
      GroupInvoiceAddress,
      GroupMailAddress,
      GroupContacts,
      GroupComments,
    },
    data() {
      return {
        tabs: [
          {name: 'Group', path: 'information', validated: false},
          {name: 'Parameters', path: 'parameters', validated: true},
          {name: 'Invoice Address', path: 'invoice-address'},
          {name: 'Mail Address', path: 'mail-address'},
          {name: 'Contacts', path: 'contacts'},
          {name: 'Comments', path: 'comments'}],
        active: 'information',
        group_info: {},
        group_list: [],
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
      this.setValues();
    },
    methods: {
      setValues() {
        this.group_info = {
          admin_fee_amt: "0",
          calendar_period_end_dt: "9998-12-31",
          calendar_period_start_dt: pickerFormat(new Date()),
          comment_txt: "",
          contact_addr1_txt: "",
          contact_addr2_txt: "",
          contact_cell_num: "",
          contact_city_txt: "",
          contact_email_addr_txt: "",
          contact_fax_num: "",
          contact_fname: "",
          contact_lname: "",
          contact_pager_num: "",
          contact_phone_num: "",
          contact_state_cd: "",
          contact_zip_cd: "",
          cust_svc_phone_num: "",
          email_addr_txt: "",
          fax_num: "",
          field_edits: "",
          future_fill_time_limit: "7",
          gl_acct_num: "",
          group_cd: "",
          invoice_addr1_txt: "",
          invoice_addr2_txt: "",
          invoice_city_txt: "",
          invoice_state_cd: "TX",
          invoice_zip_cd: "",
          mail_addr1_txt: "",
          mail_addr2_txt: "",
          mail_city_txt: "",
          mail_state_cd: "",
          mail_zip_cd: "",
          min_charge_amt: "0",
          name_txt: "",
          next_inv_num: 1,
          org_cd: "",
          parent_group_id: 0,
          phone_num: "",
          reject_msg_txt: "",
          required_fields: "",
          response_msg_txt: "",
          reversal_time_limit: "30",
          spec_program_id: 0,
          status_cd: "A",
          type_cd: "0",
          updated_by: null,
          updated_dt: null,
          validate_dx_cd_flg: "F",
          web_url_txt: ""
        }
        this.group_list = this.$store.state.allGroups.filter(function (item) {
          return item['Status Code'] === "Active"
        })
        this.group_info['group_list'] = this.group_list
        this.spec_program_list = this.$store.state.allSpecialPrograms.map(function (item) {
          return {program_id: item['Program ID'], desc_txt: item['Program Name']}
        })
        this.group_info['spec_program_id'] = this.spec_program_list[0]['program_id']
        this.startWatch = true
      },
      save() {
        if (this.validate()) {
          const that = this
          const info = that.group_info
          const user = that.$store.state.user
          const pcc = that.$store.state.pcn.pcc
          services.addGroup(info, user, pcc).then(function (res) {
            if (res !== "-1") {
              window.Vue.$emit('snackbar', 'success', 'Group added !')
              window.Vue.$emit('loadGroups')
              that.isDisabledSave = true
              that.redirect(res)
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          }).catch(function () {
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
      },
      redirect(groupID) {
        const that = this
        services.getGroupData(this.$store.state.user, groupID).then(function (res) {
          store.commit('UPDATE_GROUP_INFORMATION', res.group)
          store.commit('UPDATE_ALL_SPECIAL_PROGRAMS', res.spec_program_list)
          that.$router.push({path: `edit/${groupID}`})
        })
      },
      back() {
        this.$router.push({name: 'groups'})
      },
      clear: function () {
        this.setValues()
      }
    }
  }
</script>
<style lang="stylus">
  .errorAddUserMsg {
    color: red;
    text-align: center;
    font-size: 14px;
  }
</style>
