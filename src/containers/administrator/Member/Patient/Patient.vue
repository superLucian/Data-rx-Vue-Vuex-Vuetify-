<template>
  <v-form ref="form">
    <main>
      <v-container fluid class="my-sub-scroll-enabled px-0 py-0">
        <v-layout row wrap>
          <v-flex xs8>
            <v-layout row wrap>
              <v-card-text>
                <p>Patient Information</p>
                <v-divider></v-divider>
              </v-card-text>
              <v-flex xs8>
                <v-card-text class="py-0">
                  <v-text-field label="First Name" v-model="info.FirstName" :rules="[rules.required]"
                                required></v-text-field>
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
              <v-flex xs8>
                <v-card-text class="py-0">
                  <v-text-field label="Middle Name" v-model="info.MiddleName"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs8>
                <v-card-text class="py-0">
                  <v-text-field label="Last Name" v-model="info.LastName" :rules="[rules.required]"
                                required></v-text-field>
                </v-card-text>
              </v-flex>
              <template v-if="type !== 'add'">
                <v-flex xs8>
                  <v-card-text class="py-0">
                    <v-text-field label="Member Id" v-model="info.MemberId" :disabled="true"
                                  :rules="[rules.required]"
                                  required></v-text-field>
                  </v-card-text>
                </v-flex>
              </template>
              <template v-else>
                <v-flex xs8>
                  <v-card-text class="py-0">
                    <v-text-field label="Member Id" v-model="info.MemberId" :rules="[rules.required]"
                                  required></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex xs2>
                  <v-card-text class="pt-0">
                    <v-btn @click.native="generate" block class="primary" :disabled="generateDisable">Generate ID
                    </v-btn>
                  </v-card-text>
                </v-flex>
              </template>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <date-picker label="Birthdate" v-model="info.DateOfBirth"
                               :required="[rules.required, rules.birthdayRules]"></date-picker>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="genderList"
                    v-model="info.Gender"
                    label="Gender"
                    item-value="field_value"
                    item-text="desc_txt"
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Phone" v-model="info.HomePhoneNumber"></v-text-field>
                </v-card-text>
              </v-flex>

              <v-flex xs6 v-if="type !== 'add'">
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="PersonCodeList"
                    v-model="info.PersonCode"
                    label="Person Code"
                    item-text="text"
                    item-value="code"
                    bottom
                    disabled
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs6 v-else>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="PersonCodeList"
                    v-model="info.PersonCode"
                    label="Person Code"
                    item-text="text"
                    item-value="code"
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>

              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="SSN" v-model="info.SocialSecurityNumber"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Alternate ID" v-model="info.AlternateMemberId"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Diagnosis" v-model="info.Diagnosis.Diagnosis"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Allergies" v-model="info.Allergy.Allergy"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
            <template v-if="type !== 'add'">
              <v-layout row wrap>
                <v-card-text>
                  <p>Plan</p>
                  <v-divider></v-divider>
                </v-card-text>
                <v-flex xs12>
                  <v-card-text class="py-0">
                    <v-select
                      v-bind:items="plan_items"
                      v-model="plan_info.PlanId"
                      label="Plan"
                      item-text="desc"
                      item-value="PlanId"
                    ></v-select>
                  </v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text class="py-0">
                    <date-picker label="Start Date" v-model="plan_info.EffectiveStartDate"></date-picker>
                  </v-card-text>
                </v-flex>
                <v-flex xs4>
                  <v-card-text class="pb-0">
                    <v-checkbox label="Plan has an end date?" v-model="isEndDate"
                                light></v-checkbox>
                  </v-card-text>
                </v-flex>
                <v-flex xs4 v-if="isEndDate">
                  <v-card-text class="py-0">
                    <date-picker label="End Date" v-model="plan_info.EffectiveEndDate"></date-picker>
                  </v-card-text>
                </v-flex>
                <v-flex xs12 class="text-xs-right">
                  <v-btn class="primary" @click.native="addPlan">add to plan</v-btn>
                </v-flex>
              </v-layout>
            </template>
          </v-flex>
          <v-flex xs4>
            <v-layout row wrap v-if="type !=='add'">
              <v-card-text>
                <p>Comments</p>
                <v-divider></v-divider>
                <v-text-field
                  name="comments"
                  v-model="info.preComment"
                  textarea
                  rows="17"
                  disabled
                ></v-text-field>
                <v-text-field
                  name="field-edits"
                  v-model="info.curComment"
                  label=""
                  multi-line
                  rows="3"
                  hide-details
                ></v-text-field>
              </v-card-text>
            </v-layout>
            <v-layout row wrap v-else>
              <v-card-text>
                <p>Comments</p>
                <v-divider></v-divider>
                <v-text-field
                  name="comments"
                  v-model="info.preComment"
                  textarea
                  rows="17"
                  disabled
                ></v-text-field>
                <v-text-field
                  name="field-edits"
                  v-model="info.Comment"
                  label=""
                  multi-line
                  rows="3"
                  hide-details
                ></v-text-field>
              </v-card-text>
            </v-layout>
          </v-flex>
        </v-layout>
        <template v-if="type !== 'add'">
          <v-layout row wrap>
            <v-flex xs4>
              <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs12>
              <v-data-table
                v-bind:headers="headers"
                :items="planMemberList"
                v-bind:search="search"
                :loading="loading"
                :pagination.sync="pagination"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-left handCell">
                      <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
                    </td>
                    <td class="text-xs-left">{{ getPlanDesc(props.item['PlanId'])}}</td>
                    <td class="text-xs-left">{{ props.item['PlanId'] }}</td>
                    <td class="text-xs-left">{{ convertDate(props.item['EffectiveStartDate']) }}</td>
                    <td class="text-xs-left">{{ convertDate(props.item['EffectiveEndDate']) }}</td>
                    <td class="text-xs-left">{{ props.item.Pcc }}</td>
                    <td class="text-xs-left">{{ props.item['CreatedBy'] }}</td>
                    <td class="text-xs-left">{{ convertDateTime(props.item['CreatedDate']) }}</td>
                    <td class="text-xs-left">{{ props.item['UpdatedBy'] }}</td>
                    <td class="text-xs-left">{{ convertDateTime(props.item['UpdatedDate']) }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
        </template>
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
    </main>
  </v-form>
</template>
<script>
  import {
    convertDate,
    convertDateTime,
    pickerFormat,
    convertStringToPickerFormat
  } from '../../../../components/utils/DateMethods'
  import store from '../../../../store'
  import memberServices from '../../../../services/member/memberServices'
  import DatePicker from "../../../../components/common/DatePicker.vue";
  import DeleteConfirm from '../../../../components/common/deleteConfirm'
  import planServices from '../../../../services/plan/planServices'


  export default {
    name: 'patient',
    props: ['type', 'data', 'generateDisable'],
    data() {
      return {
        isDisabledSave: true,
        info: this.$store.state.selectedMember,
        newInfo: {},
        PersonCodeList: [
          {code: '0', text: '00 - Cardholder'},
          {code: '1', text: '01 - Cardholder'},
          {code: '2', text: '02 - Spouse'},
          {code: '3', text: '03 - Dependent'},
          {code: '4', text: '04 - Dependent'},
          {code: '5', text: '05 - Dependent'},
          {code: '6', text: '06 - Dependent'},
          {code: '7', text: '07 - Dependent'},
          {code: '8', text: '08 - Dependent'},
          {code: '9', text: '09 - Dependent'},
          {code: '10', text: '10 - Dependent'},
          {code: '11', text: '11 - Dependent'},
          {code: '12', text: '12 - Dependent'},
          {code: '13', text: '13 - Dependent'},
          {code: '14', text: '14 - Dependent'},
          {code: '15', text: '15 - Dependent'},
          {code: '16', text: '16 - Dependent'},
          {code: '17', text: '17 - Dependent'},
          {code: '18', text: '18 - Dependent'},
          {code: '19', text: '19 - Dependent'},
          {code: '20', text: '20 - Dependent'},
        ],
        rules: {
          required: (value) => !!value || 'Required.',
          birthdayRules: (v) => (new Date()) > (new Date(v)) || 'Must be less than current date'
        },
        genderList: [],
        planMemberList: this.$store.state.selectedPlanMembers,
        search: '',
        loading: false,
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Plan Description', align: 'left', sortable: false, value: 'Plan Description'},
          {text: 'Plan ID', align: 'left', sortable: true, value: 'PlanId'},
          {text: 'Start Date', align: 'left', sortable: true, value: 'EffectiveStartDate'},
          {text: 'End Date', align: 'left', sortable: true, value: 'EffectiveEndDate'},
          {text: 'PCN', align: 'left', sortable: true, value: 'Pcc'},
          {text: 'Created By', align: 'left', sortable: false, value: 'CreatedBy'},
          {text: 'Created Date', align: 'left', sortable: false, value: 'CreatedDate'},
          {text: 'Last Updated By', align: 'left', sortable: false, value: 'UpdatedBy'},
          {text: 'Last Updated Date', align: 'left', sortable: false, value: 'UpdatedDate'},
        ],
        pagination: {
          rowsPerPage: 5
        },
        plan_items: this.$store.state.memberPlanLists.map(item => (
          {
            GroupId: item.GroupId,
            PlanId: item.PlanId,
            desc: item.PlanId + ' - ' + item.Description
          }
        )) || [],
        plan_info: {},
        isEndDate: false,
      }
    },
    components: {DeleteConfirm, DatePicker},
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
            this.isDisabledSave = false
            store.commit('UPDATE_STATUS', false)
          }
        }, deep: true
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
      console.log('----- Administrator / Member / Edit / Patient mounted -----')
      const that = this
      this.plan_info = {
        PlanId: this.plan_items[0].PlanId,
        EffectiveStartDate: pickerFormat(new Date()),
        EffectiveEndDate: '12/31/9998',
      }
      planServices.getGenderList({}).then(function (res) {
        that.genderList = res.sex_cd_data.map(v => Object.assign({}, {...v}, {field_value: parseInt(v.field_value)}))
        that.genderList.pop()
        that.genderList.unshift({field_value: 0, desc_txt: 'Unspecified'})
        that.setValues()
      })
    },
    methods: {
      convertDate: convertDate,
      convertDateTime: convertDateTime,
      setValues: function () {
        if (this.info.PrimaryMemberId === this.info.MemberId && this.info.PrimaryPersonCode === this.info.PersonCode) {
          this.household = true
        } else {
          this.household = false
        }

        if (this.type === 'add') {
          this.info = this.$store.state.selectedMember
          this.info.PersonCode = '1'
          this.person_items = []
          this.drugList = false
        } else {
          this.person_items = [this.info.LastName + '-' + this.info.FirstName]
          this.newInfo = {...this.$store.state.selectedMember}
          this.info = Object.assign({}, {...this.newInfo}, {
            preComment: this.newInfo.Comment,
            curComment: ''
          })
        }
      },
      getPlanDesc: function (planId) {
        let desc = ''
        this.$store.state.memberPlanLists.some(function (i) {
          if (i.PlanId === planId) {
            desc = i.Description
            return true
          }
        })
        return desc
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
          if (this.info.curComment) {
            this.info = Object.assign({}, {...this.info}, {
              Comment: this.info.preComment + '\n' + '\n' +
              (new Date()).toLocaleDateString() + ' ' + this.$store.state.user.session_uid + ' ' + '-' + ' ' + this.info.curComment
            })
          }
          const {__type, UpdatedDate, ...update} = this.info
          memberServices.updateMember(update, this.$store.state.user).then(function (res) {
            that.isDisabledSave = true
            store.commit('UPDATE_STATUS', true)
            window.Vue.$emit('snackbar', 'success', 'Patient Data Saved!')
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

        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      },
      addPlan() {
        const that = this
        const planData = this.plan_items.filter(item => (
          item.PlanId === this.plan_info.PlanId
        ))[0]
        if (this.$store.state.selectedMember.MemberId !== '' || this.$store.state.selectedMember.PersonCode !== '') {
          const data = {
            pcc: this.$store.state.pcn.pcc,
            groupId: planData.GroupId,
            planId: planData.PlanId,
            memberId: this.$store.state.selectedMember.MemberId,
            personCode: this.$store.state.selectedMember.PersonCode,
            effectiveStartDate: convertDate(this.plan_info.EffectiveStartDate),
            effectiveEndDate: this.isEndDate ? convertDate(this.plan_info.EffectiveEndDate) : '12/31/9998'
          }
          memberServices.addPlanMember(data).then(function (res) {
            const {CreatedDate, ...filtered} = res
            const temp = Object.assign({}, {...filtered}, {
              ActiveDate: convertDate(res.ActiveDate),
              EffectiveStartDate: convertDate(res.EffectiveStartDate),
              EffectiveEndDate: convertDate(res.EffectiveEndDate),
              CreatedDate: convertDate(res.CreatedDate),
            })
            memberServices.addNewPlanMember({"entity": temp}).then(function (r) {
              that.updateItems(r, 'add')
              window.Vue.$emit('snackbar', 'success', 'Assign to Plans Success!')
              that.show = false
              that.isDisabledSave = true
            }).catch(err => (window.Vue.$emit('snackbar', 'error', 'This Plan added already!')))
          }).catch(err => (window.Vue.$emit('snackbar', 'error', err)))
        } else {
          window.Vue.$emit('snackbar', 'error', 'You need Member Id and Person Code! Please add the member info in first.')
        }
      },
      deleteRow(item) {
        const that = this
        const temp = Object.assign({}, {...item}, {
          ActiveDate: convertDate(item.ActiveDate),
          EffectiveStartDate: convertDate(item.EffectiveStartDate),
          EffectiveEndDate: convertDate(item.EffectiveEndDate),
          CreatedDate: convertDate(item.CreatedDate),
          UpdatedDate: convertDate(item.UpdatedDate)
        })
        memberServices.deletePlanMember(temp).then(function () {
          const data = that.planMemberList.filter(v => (v.Id !== temp.Id))
          store.commit('UPDATE_SELECTED_PLAN_MEMBER', data)
          that.planMemberList = data
        })
      },
      updateItems(data, mode) {
        const that = this
        if (mode === 'edit') {
          const dataTemp = that.$store.state.selectedPlanMembers.map(v => (v && (v.Id === data.Id ? data : v)))
          store.commit('UPDATE_SELECTED_PLAN_MEMBER', dataTemp)
          that.planMemberList = dataTemp
        } else {
          const dataTemp = [...that.$store.state.selectedPlanMembers]
          dataTemp.push(data)
          store.commit('UPDATE_SELECTED_PLAN_MEMBER', dataTemp)
          that.planMemberList = dataTemp
        }
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
