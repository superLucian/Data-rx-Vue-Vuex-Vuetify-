<template>
  <main>
    <v-form ref="form">
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
        <!-- Prescriber tab-->
        <v-container fluid v-if="activedTab=='prescriber'">
          <v-layout row wrap>
            <v-flex xs4></v-flex>
            <v-flex xs4>
              <v-text-field label="NPI" v-model="prescriberData['npi']" disabled>
              </v-text-field>
            </v-flex>
            <v-flex xs4></v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs4 class="pr-3">
              <v-text-field label="First Name" v-model="prescriberData['fname']" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-3 pr-3">
              <v-text-field label="Middle Name" v-model="prescriberData['mname']">
              </v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-3">
              <v-text-field label="Last Name" v-model="prescriberData['lname']" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3 class="pr-3">
              <v-text-field label="Title" v-model="prescriberData['title_txt']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-text-field label="Phone" v-model="prescriberData['phone_num']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-text-field label="Fax" v-model="prescriberData['fax_num']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3">
              <v-text-field label="Email" v-model="prescriberData['email_addr_txt']">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs3 class="pr-3">
              <v-text-field label="UPIN" v-model="prescriberData['upin']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-text-field label="Feed License" v-model="prescriberData['fed_license_num']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3 pr-3">
              <v-text-field label="SPIN" v-model="prescriberData['spin']">
              </v-text-field>
            </v-flex>
            <v-flex xs3 class="pl-3">
              <v-text-field label="State License" v-model="prescriberData['state_license_num']">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs4 class="pr-3">
              <date-picker v-model="startDate" label="Network Start Date"></date-picker>
            </v-flex>
            <v-flex xs4 class="pl-3 pr-3">
              <v-checkbox label="Apply end date" v-model="prescriberData['end_date_cb']" light></v-checkbox>
            </v-flex>
            <v-flex xs4 class="pl-3">
              <date-picker v-model="endDate" label="Network End Date"></date-picker>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Address tab-->
        <v-container fluid v-if="activedTab=='address'">
          <v-layout row wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field label="Address" v-model="prescriberData['addr1_txt']">
              </v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field v-model="prescriberData['addr2_txt']">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs5 class="pr-3">
              <v-text-field label="City" v-model="prescriberData['city_txt']">
              </v-text-field>
            </v-flex>
            <v-flex xs2 class="pr-3 pl-3">
              <v-select label="State" v-bind:items="stateList" v-model="prescriberData['state_cd']">
              </v-select>
            </v-flex>
            <v-flex xs5 class="pl-3">
              <v-text-field label="ZipCode" v-model="prescriberData['zip_cd']">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Comment tab-->
        <v-container fluid v-if="activedTab=='comment'">
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label="Comment" v-model="prescriberData['comment_txt']" multi-line>
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Save / Cancel Button -->
        <v-flex xs12>
          <v-divider class="mt-2"></v-divider>
          <small class="red--text">*indicates required field</small>
          <v-card-actions class="d-block text-xs-center">
            <v-btn class="primary" :disabled="isDisabledSave" @click="save()">Save<i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
            <v-btn @click="cancel()">Cancel</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-form>
  </main>
</template>
<script>
  import networkServices from '../../../../services/network/networkServices'
  import store from '../../../../store'
  import {pickerFormat} from '../../../../components/utils/DateMethods'
  import DatePicker from "../../../../components/common/DatePicker.vue"

  export default {
    props: ['type', 'netid', 'item', 'refresh', 'cancel'],
    components: {
      DatePicker
    },
    data() {
      return {
        tabs: [
          {name: 'Prescriber', path: 'prescriber', validated: true},
          {name: 'Address', path: 'address'},
          {name: 'Comment', path: 'comment'}],
        activedTab: '',
        prescriber: {},
        saveLoading: false,
        prescriberData: {},
        isDisabledSave: true,
        stateList: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
          'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
          'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
          'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
          'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'],
        startDate: '',
        endDate: '',
        rules: {
          required: (value) => !!value || 'Required.'
        },
      }
    },
    watch: {
      item: function () {
        this.getPrescriber()
      },
      prescriberData: {
        handler(newVal, oldVal) {
          if (newVal && oldVal && newVal === oldVal)
            this.isDisabledSave = false
        },
        deep: true,
      }
    },
    mounted() {
      this.getPrescriber()
    },
    methods: {
      getPrescriber: function () {
        const that = this
        that.prescriber = {...that.item}
        const did = that.prescriber['did']
        networkServices.getPrescriber(did).then(function (res) {
          that.prescriberData = res.prescriber[0]
          that.setValue()
        })
      },
      setValue: function () {
        const that = this
        that.activedTab = "prescriber"
        that.prescriberData['end_date_cb'] = true
        that.startDate = pickerFormat((new Date()).toDateString())
        that.endDate = pickerFormat((new Date()).toDateString())
      },
      save: function () {
        const that = this
//        if (this.validate()) {
        if (this.$refs.form.validate()) {
          const user = that.$store.state.user
          const pcc = that.$store.state.pcn.pcc
          const did = that.prescriber['did']
          const info = Object.assign({}, that.prescriberData, {did: did}, {network_id: that.netid}, {start_dt: that.startDate}, {end_dt: that.endDate})
          networkServices.updatePrescriber(info, user, pcc).then(function (res) {
            that.saveLoading = true
            if (res === "0") {
              networkServices.updateNetworkPrescriber(info, user, pcc).then(function (res) {
                if (res === "0") {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'success', 'Prescribe Updated !')
                  that.refresh()
                  that.cancel()
                } else {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'warning', res)
                }
              }).catch(function (res) {
                that.saveLoading = false
              })
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
          that.activedTab = tabForValidation['path']
          setTimeout(function () {
            that.$refs.form.validate()
          }, 200)
          return false
        }
        return true
      }
    }
  }
</script>
<style lang="stylus">
</style>
