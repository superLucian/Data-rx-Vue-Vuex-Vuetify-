<template>
  <v-form ref="form">
    <v-container fluid class="my-sub-scroll-enabled px-0">
      <v-layout row wrap>
        <template v-if="type !== 'add'">
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Member Id" v-model="info.MemberId" :disabled="true"
                            :rules="[rules.required]"
                            required></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Person Code" v-model="info.PersonCode" :disabled="true"
                            :rules="[rules.required]" required></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-radio-group v-model="info.IsActive" row>
                <v-radio label="Active" :value="true"></v-radio>
                <v-radio label="Inactive" :value="false"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-flex>
        </template>
        <template v-else>
          <v-flex xs3>
            <v-card-text class="py-0">
              <v-text-field label="Member Id" v-model="info.MemberId" :rules="[rules.required]"
                            required></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text>
              <v-btn @click.native="generate" block :disabled="generateDisable">Generate ID</v-btn>
            </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="py-0">
              <v-text-field label="Person Code" v-model="info.PersonCode" :rules="[rules.required]"
                            required></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="py-0">
              <v-radio-group v-model="info.IsActive" row>
                <v-radio label="Active" :value="true"></v-radio>
                <v-radio label="Inactive" :value="false"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-flex>
        </template>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field label="First Name" v-model="info.FirstName" :rules="[rules.required]" required></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field label="Middle Name" v-model="info.MiddleName"></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field label="Last Name" v-model="info.LastName" :rules="[rules.required]" required></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <date-picker label="Birthdate" v-model="info.DateOfBirth"
                         :required="[rules.required, rules.birthdayRules]"></date-picker>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-select
              v-bind:items="genderList"
              v-model="info.Gender"
              label="Sex"
              item-value="field_value"
              item-text="desc_txt"
            ></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field label="SSN" v-model="info.SocialSecurityNumber"></v-text-field>
          </v-card-text>
        </v-flex>
        <template v-if="formType === 0">
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="relationship_items"
                v-model="info.Relationship"
                label="RelationShip"
                item-text="text"
                item-value="code"
              ></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="pb-0">
              <v-checkbox v-bind:label="`Head of Household:`" v-model="household" hide-details></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="person_items"
                :value="info.PrimaryPersonCode"
                label="HOH Member"
                :disabled="household"
                item-text="name"
                item-value="PersonCode"
              ></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Reporting Subplan" v-model="info.SubPlanId"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="pb-0">
              <v-checkbox v-bind:label="`Member requires Diagnosis Drug List:`"
                          v-model="drugList" hide-details></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="drug_items"
                v-model="info.DrugTemplateId"
                label="Diagnosis Drug List"
                item-text="text"
                item-value="code"
                :disabled="!drugList"
              ></v-select>
            </v-card-text>
          </v-flex>
        </template>
        <template v-else>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Alternate ID" v-model="info.AlternateMemberId"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Diagnosis" v-model="info.Diagnosis.Diagnosis"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Allergies" v-model="info.Allergy.Allergy"></v-text-field>
            </v-card-text>
          </v-flex>
        </template>
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
        <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update</v-btn>
      </v-card-actions>
    </template>
  </v-form>
</template>
<script>
  import {convertDate, convertDateTime, pickerFormat} from '../../../../components/utils/DateMethods'
  import {required} from '../../../../components/utils/FormRuleDefinitions'
  import store from '../../../../store'
  import memberServices from '../../../../services/member/memberServices'
  import planServices from '../../../../services/plan/planServices'
  import DatePicker from "../../../../components/common/DatePicker.vue";

  export default {
    name: 'member',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedMember,
        formType: this.$store.state.memberFormType,
        relationship_items: [
          {code: 0, text: 'NotSpecified'},
          {code: 1, text: 'Cardholder'},
          {code: 2, text: 'Spouse'},
          {code: 3, text: 'Child'},
          {code: 4, text: 'Other'},
          {code: 5, text: 'Student'},
          {code: 6, text: 'DisabledDependent'},
          {code: 7, text: 'AdultDependent'},
          {code: 8, text: 'SignificantOther'}
        ],
        household: false,
        drugList: true,
        drugItem: '',
        drug_items: [],
        isDisabledSave: true,
        genderList: [],
        person_items: [],
        generateDisable: false,
        rules: {
          required: (value) => !!value || 'Required.',
          birthdayRules: (v) => (new Date()) > (new Date(v)) || 'Must be less than current date'
        },
        isSet: false
      }
    },
    components: {
      DatePicker
    },
    computed: {
      values: function () {
        return this.info.PersonCode + this.info.MemberId
      }
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
            this.isDisabledSave = false
            store.commit('UPDATE_STATUS', false)
          }
        }, deep: true
      },
      values: function (d) {
        if (d.length > 0)
          this.household = false
      },
      household: function (d) {
        if (!this.isSet) {
          this.isSet = true
          return true
        }

        if (d) this.info.PrimaryPersonCode = this.info.PersonCode
        this.isDisabledSave = false
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
      console.log('----- Administrator / Member / Edit / Member mounted -----')
      const that = this
      planServices.getGenderList({}).then(function (res) {
        that.genderList = res.sex_cd_data.map(v => Object.assign({}, {...v}, {field_value: parseInt(v.field_value)}))
        that.genderList.pop()
        that.genderList.unshift({field_value: 0, desc_txt: 'Unspecified'})
        that.setValues()
      })

      this.setHOH()

      this.$refs.form.validate()
      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      setValues: function () {
        if (this.info.PrimaryPersonCode === this.info.PersonCode) {
          this.household = true
        }

        if (this.type === 'add') {
          this.person_items = []
          this.drugList = false
        }

        this.isSet = true
      },
      setHOH: function () {
        const that = this
        const data = {
          "search": {
            "pcc": this.$store.state.pcn.pcc,
            "IsActive": "true",
            "memberID": this.$store.state.selectedMember.MemberId
          },
          "orderBy": "",
          "includeProperties": ""
        }

        memberServices.getHOHMember(data).then(function (res) {
          if (that.type !== 'add') {
            that.person_items = res.map(function (v) {
              return {'name': v.LastName + ' - ' + v.FirstName, 'PersonCode': v.PersonCode}
            })
          }
        })
      },
      save() {
        const that = this
        if (this.info.FirstName === ''
          || this.info.LastName === ''
          || this.info.PersonCode === ''
          || this.info.MemberId === ''
          || (new Date(this.info.DateOfBirth)) > (new Date())
        ) {
          this.$refs.form.validate()
        } else {
          const {__type, UpdatedDate, ...update} = this.info
          memberServices.updateMember(update, this.$store.state.user).then(function (res) {
            that.setHOH()
            that.isDisabledSave = true
            store.commit('UPDATE_STATUS', true)
            window.Vue.$emit('snackbar', 'success', 'Member Data Saved!')
            that.drugList = true
            res.PlanMembers = []
            store.commit('UPDATE_SELECTED_MEMBER', res)
          })
        }
      },
      clear: function () {
        const data = {
          pcc: this.$store.state.pcn.pcc,
          memberId: this.$store.state.selectedMember.MemberId,
          personCode: this.$store.state.selectedMember.PersonCode,
          includeProperties: 'PlanMembers,Allergy,Diagnosis'
        }
        const that = this
        memberServices.getMember(data).then(function (res) {
          store.commit('UPDATE_SELECTED_PLAN_MEMBER', res.PlanMembers)
          res.PlanMembers = []
          store.commit('UPDATE_SELECTED_MEMBER', res)
          that.info = that.$store.state.selectedMember
          that.setValues()
        })

        this.isSet = false
        this.household = false
        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      },
      generate: function () {
        const data = {
          "search": {
            "MemberIdStartsWith": "D124"
          },
          "orderBy": "MemberId DESC",
          "pageNumber": "0",
          "pageSize": "1",
          "includeProperties": ""
        }
        const that = this
        memberServices.getMemberList(data).then(function (res) {
          if (res.length > 0) {
            that.info.MemberId = res[0].MemberId.substring(0, 1) + (parseInt(res[0].MemberId.substring(1)) + 1)
          }
          else window.Vue.$emit('snackbar', 'error', 'Generate ID Error!')
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
