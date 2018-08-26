<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add Member / {{convertString(active)}} </v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form">
      <v-container fluid>
        <v-layout row wrap>
          <v-tabs v-model="active">
            <v-tabs-bar class="transparent">
              <v-tabs-slider class="active-line"></v-tabs-slider>
              <v-tabs-item
                v-for="tab in tabs"
                :key="tab.name"
                :href="tab.path"
                ripple
              >
                {{ tab.name }}
              </v-tabs-item>
            </v-tabs-bar>
            <v-tabs-items>
              <div v-if="this.formType === 0">
                <v-tabs-content key="member" id="member">
                  <member type="add" :data="info"></member>
                </v-tabs-content>
                <v-tabs-content key="personalInfo" id="personal_info">
                  <member-personal-info type="add" :data="info"></member-personal-info>
                </v-tabs-content>
                <v-tabs-content key="benefits" id="benefits">
                  <member-benefits type="add" :data="info"></member-benefits>
                </v-tabs-content>
                <v-tabs-content key="insurance" id="insurance">
                  <member-insurance type="add" :data="info"></member-insurance>
                </v-tabs-content>
                <v-tabs-content key="address" id="address">
                  <member-address type="add" :data="info"></member-address>
                </v-tabs-content>
                <v-tabs-content key="employer" id="employer">
                  <member-employer type="add" :data="info"></member-employer>
                </v-tabs-content>
                <v-tabs-content key="comments" id="comments">
                  <member-comments type="add" :data="info"></member-comments>
                </v-tabs-content>
              </div>
              <div v-else>
                <v-tabs-content key="patient" id="patient">
                  <member-patient type="add" :data="info"></member-patient>
                </v-tabs-content>
                <v-tabs-content key="miscellaneous" id="miscellaneous">
                  <member-miscellaneous type="add" :data="info"></member-miscellaneous>
                </v-tabs-content>
                <v-tabs-content key="otherInsurance" id="otherInsurance">
                  <member-otherInsurance type="add" :data="info"></member-otherInsurance>
                </v-tabs-content>
              </div>
            </v-tabs-items>
          </v-tabs>
          <v-layout>
            <v-card-text class="py-0 px-1">
              <v-divider class="mt-2"></v-divider>
              <small class="red--text">*indicates required field</small>
              <v-card-actions>
                <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">create</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-layout>
        </v-layout>
      </v-container>
    </v-form>
  </main>
</template>

<script>
  import memberServices from '../../../services/member/memberServices'
  import store from '../../../store'
  import Member from './Member/Member.vue'
  import MemberAssign from './Assign/Assign.vue'
  import MemberDrugList from "./DrugList/DrugList.vue";
  import MemberPersonalInfo from "./PersonalInfo/PersonalInfo.vue";
  import MemberBenefits from "./Benefits/Benefits.vue";
  import MemberInsurance from './Insurance/Insurance.vue'
  import MemberAddress from './Address/Address.vue'
  import MemberEmployer from "./Employer/Employer.vue";
  import MemberComments from "./Comments/Comments.vue";
  import MemberPatient from "./Patient/Patient.vue";
  import MemberMedications from "./Medications/Medications.vue";
  import MemberMiscellaneous from "./Miscellaneous/Miscellaneous.vue";
  import MemberOtherInsurance from "./OtherInsurance/OtherInsurance.vue";

  export default {
    name: 'member-add',
    data() {
      return {
        tabs: [],
        active: '',
        info: this.$store.state.selectedMember,
        isDisabledSave: true,
        rules: {
          required: (value) => !!value || 'Required.',
          birthdayRules: (v) => v <= (new Date()).toLocaleDateString() || 'Must be less than current date'
        },
        formType: '',
      }
    },
    components: {
      Member, MemberPersonalInfo, MemberInsurance, MemberEmployer, MemberDrugList,
      MemberComments, MemberBenefits, MemberAssign, MemberAddress, MemberPatient, MemberMedications,
      MemberMiscellaneous, MemberOtherInsurance
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
            this.isDisabledSave = false
          }
        }, deep: true
      },
      formType: function (v) {
        if (v === 0) {
          this.active = 'member'
        } else {
          this.active = 'patient'
        }
      },
    },
    mounted() {
      console.log('----- Administrator / Member Add mounted -----')
      this.setValues()
//      this.info = {...this.$store.state.selectedMember}
    },
    methods: {
      convertString: function (text) {
        if (text) return text.replace(/_/g, ' ')
        else return ''
      },
      setValues: function () {
        this.formType = this.$store.state.memberFormType
        if (this.formType === 0) {
          this.tabs = [
            {name: 'Member', path: 'member'},
            {name: 'Personal Info', path: 'personal_info'},
            {name: 'Benefits', path: 'benefits'},
            {name: 'Insurance', path: 'insurance'},
            {name: 'Address', path: 'address'},
            {name: 'Employer', path: 'employer'},
            {name: 'Comments', path: 'comments'}
          ]
        } else {
          this.tabs = [
            {name: 'Patient', path: 'patient'},
            {name: 'Miscellaneous', path: 'miscellaneous'},
            {name: 'Other Insurance', path: 'otherInsurance'}
          ]
        }

        const that = this
        setTimeout( () => {
          that.isDisabledSave = true
        }, 700)
      },
      back: function () {
        store.commit('UPDATE_STATUS', true)
        store.commit('CLEAR', 'selectedMember')
        this.$router.push({name: 'member'})
      },
      save() {
        const that = this
//        if (this.$refs.form.validate()) {
        if (this.info.FirstName === ''
          || this.info.LastName === ''
          || this.info.PersonCode === ''
          || this.info.MemberId === ''
          || (new Date(this.info.DateOfBirth)) > (new Date())
        ) {
          if(this.formType === 0){
            this.active = 'member'
          }else {
            this.active = 'patient'
          }
          this.$refs.form.validate()
        } else {
          if (this.info.Comment) {
            this.info = Object.assign({}, {...this.info}, {
              Comment:(new Date()).toLocaleDateString() + ' ' + this.$store.state.user.session_uid + ' ' + '-' + ' ' + this.info.Comment
            })
          }
          memberServices.addMember(this.info, this.$store.state.user).then(function (newMem) {
            that.isDisabledSave = true
            store.commit('UPDATE_STATUS', true)
            window.Vue.$emit('snackbar', 'success', 'Member  Data Created!')
            const data = {
              pcc: that.$store.state.pcn.pcc,
              memberId: newMem['MemberId'],
              personCode: newMem['PersonCode'],
              includeProperties: 'PlanMembers,Allergy,Diagnosis'
            }
            memberServices.getMember(data).then(function (res) {
              res.DependentCount = (res.DependentCount).toString()
              if(!res.Diagnosis){
                res = Object.assign({},{...res},{Diagnosis: {Diagnosis: ''}},{Allergy:{Allergy:''}})
              }
              store.commit('CLEAR', 'selectedMember')
              store.commit('CLEAR', 'selectedPlanMembers')
              store.commit('CLEAR', 'selectedMemberDrugs')

              store.commit('UPDATE_SELECTED_PLAN_MEMBER', res.PlanMembers)
              res.PlanMembers = []
              store.commit('UPDATE_SELECTED_MEMBER', res)
              that.$router.push({path: `edit/${newMem.MemberId}`})
            })
          })
        }
//        }
      },
      clear: function () {
        const d = new Date()
        d.setDate(d.getDate() - 1)
        this.info = {
          Id: 0,
          MemberId: '',
          PersonCode: '01',
          IsActive: true,
          Pcc: this.$store.state.pcn.pcc,
          LastName: '',
          FirstName: '',
          MiddleName: '',
          MailingAddress: {
            County: '',
            Street2: '',
            Street1: '',
            City: '',
            State: '',
            PostalCode: ''
          },
          HomePhoneNumber: '',
          WorkPhoneNumber: '',
          WorkPhoneNumberExt: '',
          CellPhoneNumber: '',
          HomeFaxNumber: '',
          WorkFaxNumber: '',
          PagerNumber: '',
          EmailAddress: '',
          DateOfBirth: (new Date(d)).toLocaleDateString(),
          SocialSecurityNumber: '',
          Gender: 0,
          Relationship: 0,
          PrimaryMemberId: '',
          PrimaryPersonCode: '',
          MaritalStatus: 0,
          DrugTemplateId: 0,
          DependentCount: 0,
          IsStudent: false,
          IsDisabled: false,
          IsSmoker: false,
          IsPregnant: false,
          IsDiabetic: false,
          HasAllergies: false,
          EmployeeId: '',
          EmployerName: '',
          EmployerAddress: {
            Street1: '',
            City: '',
            State: '',
            PostalCode: ''
          },
          EmployerContactName: '',
          Occupation: '',
          CardholderId: '',
          CardholderLastName: '',
          CardholderFirstName: '',
          CardholderDateOfBirth: (new Date(d)).toLocaleDateString(),
          CardholderPlanId: '',
          InsuranceCompanyName: '',
          InsuranceAddress: {
            Street1: '',
            City: '',
            State: '',
            PostalCode: ''
          },
          InsurancePhoneNumber: '',
          AlternateMemberId: '',
          HasPrimaryCoverage: false,
          Comment: '',
          SubPlanId: null,
          PlanMembers: [],
          MemberDrugs: [],
          Allergy: {},
          Diagnosis: {},
          OtherInsurances: [],
          PcOrg: null,
          CreatedBy: '',
          CreatedDate: '',
          UpdatedBy: ''
        }
        console.log(this.info.PrimaryPersonCode)
        console.log(this.info.PersonCode)
        store.commit('UPDATE_SELECTED_MEMBER', this.info)
        store.commit('UPDATE_SELECTED_PLAN_MEMBER', [])
        this.isDisabledSave = true
      }
    }
  }
</script>
<style lang="stylus">
</style>
