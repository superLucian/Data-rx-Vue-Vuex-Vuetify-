<template>
  <main>
    <v-layout row wrap>
      <v-tabs v-model="activedTab">
        <v-tabs-bar class="white">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.path">
            {{ tab.name }}
          </v-tabs-item>
        </v-tabs-bar>
      </v-tabs>
      <!-- PCN tab-->
      <v-container fluid v-if="activedTab=='pcn'" class="form-scroll-enabled">
        <pcn :pcn="pcn" :medicaidEditTypeList="medicaidEditTypeList" :pcnDisabled="pcnDisabled" :tab="tabs[0]"
             :valid="valid"></pcn>
      </v-container>
      <!-- Wholesaler tab -->
      <v-container fluid v-if="activedTab=='wholesaler'" class="form-scroll-enabled ">
        <edi :type="type" :pcc="pcc" :pcn="pcn" :wholesalerList="wholesalerList" :wholesaler="pcn['wholesaler_id']"
             :tab="tabs[1]" :valid="valid"></edi>
      </v-container>
      <!-- Save / Cancel Button -->
      <v-flex xs12>
        <v-divider class="mt-2"></v-divider>
        <small class="red--text">*indicates required field</small>
        <v-card-actions>
          <v-btn @click.native="clear" :disabled="disablePCNSaveBtn">Clear</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary-color" @click="save()" :disabled="disablePCNSaveBtn" v-if="type === 'new'">Create<i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
          <v-btn color="primary-color" @click="save()" :disabled="disablePCNSaveBtn" v-else>Update<i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </main>
</template>
<script>
  import pcnServices from '../../../services/pcn/pcnServices'
  import store from '../../../store'
  import pcn from './PCN/PCN.vue'
  import edi from './EDI/EDI.vue'
  import {pickerFormat} from '../../../components/utils/DateMethods'

  export default {
    name: 'pcn-form',
    props: ['type', 'pcc'],
    components: {
      pcn,
      edi
    },
    data() {
      return {
        tabs: [
          {name: 'PCN', path: 'pcn', validated: false},
          {name: 'Wholesaler', path: 'wholesaler', validated: true}],
        activedTab: 'pcn',
        pcn: {},
        medicaidEditTypeList: [],
        pcnDisabled: false,
        saveLoading: false,
        wholesalerList: [],
        search: '',
        loading: true,
        pagination: {
          rowsPerPage: 5
        },
        disablePCNSaveBtn: true,
        valid: true,
      }
    },
    watch: {
      pcn: {
        handler: function (newData, oldData) {
          if (newData && oldData && (newData === oldData)) {
            this.disablePCNSaveBtn = false
          } else {
            this.disablePCNSaveBtn = true
          }
        },
        deep: true,
      }
    },
    mounted() {
      this.setValues()
    },
    methods: {
      setValues: function () {
        this.getPCNData()
      },
      getPCNData: function () {
        const that = this
        if (that.type === "edit") {
          that.pcnDisabled = true
          pcnServices.getPCN(that.pcc).then(function (res) {
            that.pcn = res.pcn[0]
            that.pcn['edit_form_type_cd'] = that.pcn['edit_form_type_cd'] === "1" ? "Standard" : "340B" // Format Member Edit Screen field value
            that.pcn['track_benefits_flg'] = that.pcn['track_benefits_flg'] === "T"  // Format Track Benefits checkbox value
            if (res.edi_param.length > 0) {
              that.pcn = Object.assign({}, that.pcn, res.edi_param[0])
              if (that.pcn['auto_adj_start_dt'].length > 0) {  // Format Auto Adjustment Start Date value
                let dateString = that.pcn['auto_adj_start_dt'].split("/")
                that.pcn['auto_adj_start_dt'] = dateString[2] + "-" + dateString[0] + "-" + dateString[1]
              }
            }
            that.getPCNParamData()
          })
        } else {
          that.pcn = {
            pcc: '',
            name_txt: '',
            addr1_txt: '',
            addr2_txt: '',
            city_txt: '',
            state_cd: '',
            zip_cd: '',
            fax_num: '',
            phone_num: '',
            email_addr_txt: '',
            web_url_txt: '',
            rebate_level_2: '',
            medicaid_copay_cap: '',
            medicaid_edit_type_cd: "0",
            status_cd: "A",
            edit_form_type_cd: "Standard",
            contact_lname: '',
            contact_fname: '',
            contact_addr1_txt: '',
            contact_addr2_txt: '',
            contact_city_txt: '',
            contact_state_cd: '',
            contact_zip_cd: '',
            contact_fax_num: '',
            contact_phone_num: '',
            contact_pager_num: '',
            contact_cell_num: '',
            contact_email_addr_txt: '',
            comment_txt: '',
            edi_sender_id: '',
            edi_task_name: '',
            reorder_pct: 1,
            retry_count: 3,
            retry_delay: 30,
            order_time_out: 30,
            base_dir: '',
            sent_dir: '',
            auto_adj_start_dt: pickerFormat(new Date())
          }
          that.getPCNParamData()
        }
      },
      getPCNParamData: function () {
        const that = this
        pcnServices.getMedicaidEditTypeList({}).then(function (res) {  // Medicaid Edit Type List
          if (res.medicaid_edit_type_cd_syscode.length > 0) {
            that.medicaidEditTypeList = res.medicaid_edit_type_cd_syscode.map(function (item) {
              return {field_value: item.field_value, desc_txt: item.desc_txt}
            })
            if (that.type === "edit") {
              that.pcn['medicaidEditType'] = that.pcn['medicaid_edit_type_cd'].trim()
            } else {
              that.pcn['medicaidEditType'] = that.medicaidEditTypeList[0]['field_value']
            }
          }
        })
        pcnServices.getWholesalerList().then(function (res) {  // Wholesaler List
          if (res.wholesaler_list.length > 0) {
            that.wholesalerList = res.wholesaler_list.map(function (item) {
              return {wholesaler_id: item.wholesaler_id, wholesaler_name: item.wholesaler_name}
            })
          }
          that.wholesalerList.push({wholesaler_id: -1, wholesaler_name: "No Wholesaler Assigned"})
          if (that.type === "new") {
            that.pcn['wholesaler_id'] = -1
          } else {
            if (!that.pcn['wholesaler_id']) {
              that.pcn['wholesaler_id'] = -1
              that.pcn['edi_sender_id'] = ''
              that.pcn['edi_task_name'] = ''
              that.pcn['reorder_pct'] = 1
              that.pcn['retry_count'] = 3
              that.pcn['retry_delay'] = 30
              that.pcn['order_time_out'] = 30
              that.pcn['base_dir'] = ''
              that.pcn['sent_dir'] = ''
              that.pcn['auto_adj_start_dt'] = pickerFormat(new Date())
            }
          }
          that.pcn = {...that.pcn}
        })
      },
      save: function () {
        if (this.validate()) {
          const that = this
          const user = that.$store.state.user
          const pcc = that.pcc
          that.pcn['track_benefits_flg'] = that.pcn['track_benefits_flg'] ? "T" : "F"
          that.pcn['edit_form_type_cd'] = that.pcn['edit_form_type_cd'] === "Standard" ? "1" : "2"
          const info = Object.assign({}, that.pcn)
          switch (this.type) {
            case 'new':
              pcnServices.addPCN(info, user, pcc).then(function (res) {
                that.saveLoading = true
                if (res === "0") {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'success', 'PCN added !')
                  that.$router.push({name: 'pcns'})
                } else {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'warning', res)
                }
              }).catch(function (res) {
                that.saveLoading = false
              })
              return
            case 'edit':
              pcnServices.updatePCN(info, user, pcc).then(function (res) {
                that.saveLoading = true
                if (res === "0") {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'success', 'PCN updated !')
                  that.$router.push({name: 'pcns'})
                } else {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'warning', res)
                }
              }).catch(function (res) {
                that.saveLoading = false
              })
              return
          }
        }
      },
      validate() {
        const that = this
        let tabForValidation = that.tabs.filter(function (tab) {
          return tab.hasOwnProperty('validated') && !tab['validated']
        })[0]
        if (tabForValidation) {
          that.valid = false
          that.activedTab = tabForValidation['path']
          return false
        }
        return true
      },
      back: function () {
        this.$router.push({name: 'pcns'})
      },
      clear: function () {
        this.setValues()
      }
    }
  }
</script>
<style lang="stylus">
</style>
