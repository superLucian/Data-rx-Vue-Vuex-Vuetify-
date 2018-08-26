<template>
  <main>
    <v-toolbar class="primary" dark v-if="!claimData">
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add Prior Auth</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-layout row wrap>
        <v-tabs v-model="activeTab">
          <v-tabs-bar class="white">
            <v-tabs-slider class="active-line"></v-tabs-slider>
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab.name"
              :href="tab.path">
              {{ tab.name }}
            </v-tabs-item>
          </v-tabs-bar>
          <v-form ref="form">

            <v-container fluid v-if="activeTab=='authParams'" class="form-scroll-enabled">
              <v-layout row wrap>
                <v-flex xs4 class="pr-5">
                  <date-picker v-model="auth['effect_dt']" label="Effective Date"></date-picker>
                </v-flex>
                <v-flex xs4 class="pr-5">
                  <date-picker v-model="auth['exp_dt']" label="Expiration Date"></date-picker>
                </v-flex>
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs8>
                      <v-text-field label="Provider id" v-model="auth['provider_id']" required
                                    :rules="[rules.required]">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn icon @click="openAddProvider">
                        <v-icon>search</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs8>
                      <v-text-field label="Prescriber Id" v-model="auth['did']">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn icon @click="openAddPrescriber">
                        <v-icon>search</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs8>
                      <v-text-field label="Member Id" v-model="auth['member_id']" required :rules="[rules.required]">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn icon @click="openAddMember">
                        <v-icon>search</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs6>
                  <v-layout row wrap>
                    <v-flex xs8>
                      <v-text-field label="NDC" v-model="auth['ndc']" required :rules="[rules.required]">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2>
                      <v-btn icon @click="openAddNDC">
                        <v-icon>search</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs2 class="pr-3">
                      <v-text-field label="Qty Dispensed" v-model="auth['max_qty_dispense_amt']" required
                                    :rules="[rules.dispensedRules]" :counter="5" type="number">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="pl-3 pr-3">
                      <v-text-field label="Days Supply" v-model="auth['max_days_supply_amt']" required
                                    :rules="[rules.supplyRules]" :counter="3" type="number">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs2 class="pl-3 pr-3">
                      <v-text-field label="Total Cost" v-model="auth['totalCost']" :rules="[rules.costRules]"
                                    :counter="6" type="number">
                      </v-text-field>
                    </v-flex>
                  </v-layout>
                </v-flex>
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs4 class="pr-3">
                      <v-text-field label="Person Code" v-model="auth['person_cd']" :counter="3"
                                    v-on:keypress="isValidInput">
                      </v-text-field>
                    </v-flex>
                    <v-flex xs3 class="pl-3 pr-3">
                      <v-select
                        v-bind:items="tierItems"
                        v-model="auth['tier']"
                        label="Process at Tier">
                      </v-select>
                    </v-flex>
                    <v-flex xs5 class="pl-3">
                      <v-card-text>
                        <v-checkbox label="Allow Any NDC" v-model="auth['allowAnyNdc']" light></v-checkbox>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
            </v-container>
            <v-container fluid v-if="activeTab=='overrides'" class="form-scroll-enabled">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-checkbox v-for="(override, index) in overrides" v-bind:label="override['desc_txt']"
                              v-model="override['checked']" :key="override['field_value']" light>
                  </v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
            <v-container fluid v-if="activeTab=='comments'" class="form-scroll-enabled px-0 py-0">
              <v-flex xs12>
                <v-text-field textarea label="Comments" v-model="auth['comments']" required :rules="[rules.required]">
                </v-text-field>
              </v-flex>
            </v-container>
            <v-flex xs12>
              <v-divider class="mt-2"></v-divider>
              <small class="red--text">*indicates required field</small>
              <v-card-actions>
                <v-btn @click="clear()" :disabled="disableSaveBtn">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn color="primary-color" @click="save()" :disabled="disableSaveBtn">create<i v-if="loading"
                                                                                           class="fa fa-circle-o-notch fa-spin fa-fw"></i>
                </v-btn>
              </v-card-actions>
            </v-flex>
          </v-form>
        </v-tabs>
      </v-layout>
    </v-container>
    <PriorAuthAddProvider :isShow="isShowAddProvider" :methodName="methodNameProvider" :close="close">
    </PriorAuthAddProvider>
    <PriorAuthAddPrescriber :isShow="isShowAddPrescriber" :methodName="methodNamePrescriber" :close="close">
    </PriorAuthAddPrescriber>
    <PriorAuthAddMember :isShow="isShowAddMember" :methodName="methodNameMember" :close="close">
    </PriorAuthAddMember>
    <PriorAuthAddNDC :isShow="isShowAddNDC" :close="close">
    </PriorAuthAddNDC>
  </main>
</template>

<script>
  import PriorAuthAddProvider from "./PriorAuthAddProvider.vue"
  import PriorAuthAddPrescriber from "./PriorAuthAddPrescriber.vue"
  import PriorAuthAddMember from "./PriorAuthAddMember.vue"
  import PriorAuthAddNDC from "./PriorAuthAddNDC.vue"
  import priorAuthorizationService from '../../../services/priorauthorization/priorAuthorizationService'
  import {pickerFormat} from '../../../components/utils/DateMethods'
  import store from '../../../store'
  import DatePicker from '../../../components/common/DatePicker.vue'

  export default {
    name: "prior-auth-add",
    components: {
      PriorAuthAddPrescriber,
      PriorAuthAddProvider,
      PriorAuthAddMember,
      PriorAuthAddNDC,
      DatePicker
    },
    props: ['claimData', 'usage'],
    data() {
      return {
        methodNameProvider: 'priorAuthAddProviderSelected',
        methodNamePrescriber: 'priorAuthAddPrescriberSelected',
        methodNameMember: 'priorAuthAddMemberSelected',
        methodNameNDC: 'drugSelected',
        tierItems: [
          "N/A", 0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
        ],
        loading: false,
        tabs: [
          {name: 'Authorization Parameters', path: 'authParams', validated: false},
          {name: 'Overrides', path: 'overrides', validated: false},
          {name: 'Comments', path: 'comments', validated: false}
        ],
        activeTab: "authParams",
        isShowAddProvider: false,
        isShowAddPrescriber: false,
        isShowAddMember: false,
        isShowAddNDC: false,
        auth: {
          auth_type_cd: [],
          provider_id: '',
          member_id: '',
          person_cd: '',
          ndc: '',
          tier: 0,
          effect_dt: pickerFormat(new Date()),
          exp_dt: pickerFormat(new Date()),
          max_days_supply_amt: 0,
          max_claim_amt: '',
          max_qty_dispense_amt: 0,
          static_flg: 'F',
          comment_txt: '',
          did: '',
          totalCost: "0.00",
          personCode: "01",
          comments: "",
          allowAnyNdc: false,
        },
        overrides: {},
        disableSaveBtn: true,
        rules: {
          required: (value) => !!value || 'Required.',
          supplyRules: (v) => v <= 999 || 'Supply Limit must be less more than 999.',
          dispensedRules: (v) => v <= 99999 || 'QTY Dispensed Limit must be less more than 99999.',
          costRules: (v) => v <= 999999 || 'Total Cost Limit must be less more than 999999.',
        },
        numRules: [
          (value) => !!value || 'Required.',
          (value) => parseInt(value) > 0 || 'Must be > 0'
        ]
      }
    },
    watch: {
      auth: {
        handler(newData, oldData) {
          if (newData && oldData && (newData === oldData) || this.usage) {
            this.disableSaveBtn = false
          } else {
            this.disableSaveBtn = true
          }
          this.tabs[0]['validated'] = this.auth['provider_id'].length > 0 && this.auth['member_id'].length > 0 && this.auth['ndc'].length > 0 && this.auth['max_qty_dispense_amt'].length > 0 && this.auth['max_days_supply_amt'].length > 0
          this.tabs[2]['validated'] = this.auth['comments'].length > 0
        },
        deep: true,
      },
      overrides: {
        handler(newData, oldData) {
          if (newData && oldData && (newData === oldData)) {
            this.disableSaveBtn = false
          } else {
            this.disableSaveBtn = true
          }
          if (this.claimData) this.disableSaveBtn = false
          let validated = false
          for (let index in this.overrides) {
            if (this.overrides[index]['checked']) {
              this.tabs[1]['validated'] = true
              validated = true
              break
            }
            if (!validated) this.tabs[1]['validated'] = false
          }
        },
        deep: true,
      }
    },
    mounted() {
      const that = this
      if (this.usage) {
        if (this.claimData) {
          const newData = {
            effect_dt: this.claimData['Script Fill Date'] ? pickerFormat(this.claimData['Script Fill Date']) : pickerFormat(new Date()),
            provider_id: this.claimData['Provider ID'] || '',
            member_id: this.claimData['Member Id'] || '',
            person_cd: this.claimData['Person Code'] || '',
            ndc: this.claimData['NDC'] || '',
            max_qty_dispense_amt: this.claimData['Qty Dispensed'] || '0',
            max_days_supply_amt: this.claimData['Days Supply'] || '0',
            max_claim_amt: this.claimData['Provider Claim Amt'] || '0',
            did: parseInt(this.claimData['DoctorId']) || -1,
            compound_drug_cd: this.claimData['Compound Drug Code'] == '2' ? 'Y' : 'N',
          }
          this.auth = Object.assign({}, {...this.auth}, {...newData})
        }
      }
      that.getAuthTypeCd()
      window.Vue.$on('priorAuthAddProviderSelected', function (item) {
        that.isShowAddProvider = false
        that.auth['provider_id'] = item['NPI']
      })
      window.Vue.$on('priorAuthAddPrescriberSelected', function (item) {
        that.isShowAddPrescriber = false
        that.auth['did'] = item['did']
      })
      window.Vue.$on('priorAuthAddMemberSelected', function (item) {
        that.isShowAddMember = false
        that.auth['member_id'] = item['MemberId']
      })
      window.Vue.$on('drugSelected', function (item) {
        that.isShowAddNDC = false
        that.auth['ndc'] = item['NDC']
      })
    },
    methods: {
      getAuthTypeCd: function () {
        const that = this
        const requestData = {}
        priorAuthorizationService.getAuthTypeCd(requestData).then(function (response) {
          that.overrides = response.auth_type_cd.map(function (item) {
            return {field_value: item.field_value, desc_txt: item.desc_txt, checked: false}
          })
        }).catch(function (error) {
        })
      },
      save: function () {
        if (this.$refs.form.validate()) {
          const that = this
          const user = that.$store.state.user
          const pcc = that.$store.state.pcn.pcc
          for (let index in that.overrides) {
            if (that.overrides[index]['checked']) {
              that.auth['auth_type_cd'].push(that.overrides[index]['field_value'])
            }
          }
          const requestData = {
            session_uid: user.session_uid,
            session_id: user.session_id,
            auth_type_cd: that.auth['auth_type_cd'].toString(),
            pcc: pcc,
            provider_id: that.auth['provider_id'],
            member_id: that.auth['member_id'],
            person_cd: that.auth['person_cd'],
            ndc: that.auth['ndc'],
            tier: parseInt(that.auth['tier']) || 0,
            effect_dt: that.auth['effect_dt'],
            exp_dt: that.auth['exp_dt'],
            max_days_supply_amt: parseInt(that.auth['max_days_supply_amt']),
            max_claim_amt: parseFloat(that.auth['totalCost']) || 0,
            max_qty_dispense_amt: parseInt(that.auth['max_qty_dispense_amt']),
            static_flg: that.auth['allowAnyNdc'] ? "T" : "F",
            comment_txt: that.auth['comments'],
            did: parseInt(that.auth['did']) || -1
          }
          priorAuthorizationService.addPriorAuth(requestData).then(function (response) {
            if (response !== "E") {
              window.Vue.$emit('snackbar', 'success', 'Prior Authorization added!')
              if (that.usage && that.claimData) {
                window.Vue.$emit('addPriorAuthWithClaimSuccess', true)
              } else {
                that.$router.push({path: `edit/${response}`})
              }
            } else {
              window.Vue.$emit('snackbar', 'warning', response)
            }
          }).catch(function (error) {
          })
        }
      },
      openAddPrescriber: function () {
        this.isShowAddPrescriber = true
      },
      openAddProvider: function () {
        this.isShowAddProvider = true
      },
      openAddMember: function () {
        this.isShowAddMember = true
      },
      openAddNDC: function () {
        this.isShowAddNDC = true
      },
      back: function () {
        this.$router.push({name: 'prior-authorization'})

      },
      close: function () {
        this.isShowAddProvider = false
        this.isShowAddPrescriber = false
        this.isShowAddMember = false
        this.isShowAddNDC = false
      },
      validate: function () {
        const that = this
        let tabForValidation = that.tabs.filter(function (tab) {
          return tab.hasOwnProperty('validated') && !tab['validated']
        })[0]
        if (tabForValidation) {
          that.activeTab = tabForValidation['path']
          setTimeout(function () {
            that.$refs.form.validate()
          }, 200)
          return false
        }
        return true
      },
      clear: function () {
        this.auth = {
          auth_type_cd: [],
          provider_id: '',
          member_id: '',
          person_cd: '',
          ndc: '',
          tier: '',
          effect_dt: pickerFormat(new Date()),
          exp_dt: pickerFormat(new Date()),
          max_days_supply_amt: 0,
          max_claim_amt: '',
          max_qty_dispense_amt: 0,
          static_flg: 'F',
          comment_txt: '',
          did: '',
          totalCost: "0.00",
          personCode: "01",
          comments: "",
          allowAnyNdc: false,
        }
        for (let index in this.overrides) {
          this.overrides[index]['checked'] = false
        }
      },
      isValidInput: function (evt) {
        evt = (evt) ? evt : window.event;
        if (this.auth['person_cd'].length >= 3)
          evt.preventDefault();
      }
    }
  }
</script>
<style lang="stylus">
</style>
