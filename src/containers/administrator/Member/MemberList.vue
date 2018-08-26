<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Manage Member</v-toolbar-title>
      <v-menu offset-y v-if="!selectable">
        <v-btn flat slot="activator" class="status">
          {{filter}}
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in listFilterItems" :key="item" @click="changeFilter(item)">
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-btn icon @click.native="add" v-if="!selectable">
        <v-icon dark>add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid class="my-scroll-enabled">
      <v-tabs v-model="active">
        <v-tabs-bar class="transparent">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab"
            :href="'#' + tab"
            ripple
          >
            {{ tab }}
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content id="Name">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <p>Find (list) members using:</p>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="Last Name" v-model="last_name"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text class="py-0">
                  <v-text-field label="First Name" v-model="first_name"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-tabs-content id="Member Id">
            <v-form ref="form">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-card-text class="pb-0">
                    <p>Find a member using:</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-card-text class="py-0">
                    <v-text-field label="Member Id:" v-model="member_id" required
                                  :rules="[rules.required]"></v-text-field>
                  </v-card-text>
                </v-flex>
                <v-flex xs6>
                  <v-card-text class="py-0">
                    <v-text-field label="Person Cd:" v-model="person_cd"></v-text-field>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </v-form>
          </v-tabs-content>
          <v-tabs-content id="DOB">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text class="pb-0">
                  <date-picker
                    :required="true"
                    v-model="dob_date"
                    label="DOB"
                  ></date-picker>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-tabs-content id="All">
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text>
                  <p>List all members</p>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-select
                    v-bind:items="allLists"
                    v-model="all"
                    label="Plan"
                    item-text="desc"
                    item-value="PlanId"
                    return-object
                    bottom
                  ></v-select>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-tabs-content>
          <v-card-actions class="d-block text-xs-center">
            <v-btn class="primary mx-0 my-0" @click.native="find" :disabled="isDisableFind">Find</v-btn>
          </v-card-actions>
        </v-tabs-items>
      </v-tabs>
      <v-card-text v-if="isTable">
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              v-bind:headers="headers"
              :items="items"
              v-bind:pagination.sync="pagination"
              :total-items="totalItems"
              :rows-per-page-items="[5, 10, 25]"
              :loading="loading"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td>
                    <v-btn small v-if="selectable" color="primary-color" @click="selectMember(props.item)">select</v-btn>
                    <v-tooltip top v-else>
                      <v-btn icon @click="clickRow(props.item)" slot="activator">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <span>Member Edit</span>
                    </v-tooltip>
                  </td>
                  <td class="text-xs-left"> {{ props.item['MemberId']}}</td>
                  <td class="text-xs-left"> {{ props.item['PersonCode'] }}</td>
                  <td class="text-xs-left">{{ props.item['LastName'] }}</td>
                  <td class="text-xs-left">{{ props.item['FirstName'] }}</td>
                  <td class="text-xs-left">{{ convertDate(props.item['DateOfBirth']) }}</td>
                  <td class="text-xs-left">{{ gender(props.item.Gender) }}</td>
                  <td class="text-xs-left">
                    <v-icon class="green--text" v-if="props.item.IsActive">fiber_manual_record</v-icon>
                    <v-icon v-else>fiber_manual_record</v-icon>
                  <td class="text-xs-left">{{ props.item.Pcc }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-container>
  </main>
</template>

<script>
  import memberServices from '../../../services/member/memberServices'
  import store from '../../../store'
  import {convertDate, pickerFormat, convertStringToPickerFormat} from '../../../components/utils/DateMethods'
  import DatePicker from "../../../components/common/DatePicker.vue"

  export default {
    components: {DatePicker},
    name: 'member-list',
    props: ['selectable', 'methodName'],
    data() {
      return {
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Member Id', align: 'left', sortable: false, value: 'MemberId'},
          {text: 'Person Code', align: 'left', sortable: false, value: 'PersonCode'},
          {text: 'Last Name', align: 'left', sortable: false, value: 'LastName'},
          {text: 'First Name', align: 'left', sortable: false, value: 'FirstName'},
          {text: 'Date of Birth', align: 'left', sortable: false, value: 'DateOfBirth'},
          {text: 'Gender', align: 'left', sortable: false, value: 'Gender'},
          {text: 'Active', align: 'left', sortable: false, value: 'IsActive'},
          {text: 'PCN', align: 'left', sortable: false, value: 'Pcc'},
        ],
        pagination: {
          page: 1,
          rowsPerPage: 5
        },
        totalItems: 0,
        tabs: ['Name', 'Member Id', 'DOB', 'All'],
        active: null,
        search: '',
        loading: false,
        fullItems: [],
        items: [],
        isDisableFind: true,
        isTable: false,
        last_name: '',
        first_name: '',
        member_id: '',
        person_cd: '',
        dob_date: pickerFormat(new Date()),
        allLists: [],
        all: {},
        filter: 'Active',
        listFilterItems: ['Active', 'Inactive', 'All'],
        rules: {required: (value) => !!value || 'Required.'}
      }
    },
    component: {},
    computed: {
      values: function () {
        return this.last_name + this.first_name + this.member_id
      }
    },
    watch: {
      values: function (d) {
        if (this.active === 'DOB' || this.active === 'All') {
          this.isDisableFind = false
        } else {
          if (d.length > 0)
            this.isDisableFind = false
          else
            this.isDisableFind = true
        }
      },
      person_cd: function () {
        if (this.member_id.length > 0)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      },
      dob_date () {
        this.isDisableFind = false
      },
      all () {
        if (this.active === 'DOB' || this.active === 'All') {
          this.isDisableFind = false
        }
      },
      active: function (val) {
        this.last_name = ''
        this.first_name = ''
        this.member_id = ''
        this.person_cd = ''
        this.dob_date = pickerFormat(new Date())
        this.all = {
          GroupId: 0,
          PlanId: '',
          desc: 'All Listed Plans'
        }
        this.isTable = false
        this.items = []
        if (val === 'DOB' || val === 'All') {
          this.isDisableFind = false
        } else {
          this.isDisableFind = true
        }
      },
      filter() {
        if (this.isTable) this.find()
      },
      pagination: function () {
        if (this.pagination.page > 0) this.find()
      }
    },
    mounted() {
      console.log('----- Administrator / Member Find mounted -----')
      this.$refs.form.validate()

      const that = this
      memberServices.getMemberPlanLists({
        search: {
          pcc: this.$store.state.pcn.pcc
        },
        orderBy: 'PlanId',
        includeProperties: '',
      }).then(function (res) {
        that.allLists = []
        store.commit('UPDATE_MEMBER_PLAN_LISTS', res)
        res.map(function (item) {
          that.allLists.push({
            GroupId: item.GroupId,
            PlanId: item.PlanId,
            desc: item.PlanId + ' - ' + item.Description
          })
        })
        that.allLists.unshift({
          GroupId: 0,
          PlanId: '',
          desc: 'All Listed Plans'
        })
      })
    },
    methods: {
      convertDate: convertDate,
      gender: function (val) {
        const data = ['UnSpecified', 'Male', 'Female', 'Transgender', 'RefusedToReport']
        return data[val]
      },
      find: function () {
        this.loading = true
        this.isTable = true
        let search = {}
        const filter = this.filter === 'Active' ? true : (this.filter === 'Inactive' ? false : '')
        switch (this.active) {
          case 'Name':
            search = {
              pcc: this.$store.state.pcn.pcc,
              IsActive: filter,
              LastName: this.last_name,
              FirstName: this.first_name
            }
            break
          case 'Member Id':
            search = {
              pcc: this.$store.state.pcn.pcc,
              IsActive: filter,
              MemberId: this.member_id,
              PersonCode: this.person_cd
            }
            break
          case 'DOB':
            search = {
              pcc: this.$store.state.pcn.pcc,
              IsActive: filter,
              DateOfBirth: this.dob_date
            }
            break
          case 'All':
            if (this.all.PlanId === '' && this.all.GroupId === 0) {
              search = {
                pcc: this.$store.state.pcn.pcc,
                IsActive: filter
              }
            } else {
              search = {
                pcc: this.$store.state.pcn.pcc,
                IsActive: filter,
                PlanMembers: {
                  PlanId: this.all.PlanId,
                  GroupId: this.all.GroupId
                }
              }
            }
            break
        }
        const that = this
        const countData = {
          searches: [search]
        }

        memberServices.getMemberListCount(countData).then(function (res) {
          that.totalItems = res
          if (that.pagination.rowsPerPage * that.pagination.page > that.totalItems) that.pagination.page = 1
          const sortBy = that.pagination.sortBy === null ? '' : that.pagination.sortBy
          const sortable = that.pagination.descending === true ? ' DESC' : (that.pagination.descending === false ? ' ASC' : '')

          const data = {
            search: search,
            orderBy: sortBy ? sortBy + sortable : 'Id',
            pageNumber: that.pagination.page - 1,
            pageSize: that.pagination.rowsPerPage,
            includeProperties: 'PlanMembers,Allergy,Diagnosis'
          }
          memberServices.getMemberList(data).then(function (res) {
            that.loading = false
            that.items = []
            that.isDisableFind = true
            if (res.length > 0) {
              that.items = res
            } else {
              window.Vue.$emit('snackbar', 'success', 'No Items!')
            }
          })
        })
      },
      add() {
        const d = new Date()
        d.setDate(d.getDate() - 1)
        const data = {
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
          DateOfBirth: (new Date()).toLocaleDateString(),
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
          CardholderDateOfBirth: (new Date()).toLocaleDateString(),
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
          Allergy: {
            Allergy: ''
          },
          Diagnosis: {
            Diagnosis: ''
          },
          OtherInsurances: [],
          PcOrg: null,
          CreatedBy: '',
          CreatedDate: '',
          UpdatedBy: ''
        }
        store.commit('UPDATE_SELECTED_MEMBER', data)
        store.commit('UPDATE_SELECTED_PLAN_MEMBER', [])
        this.$router.push({path: 'add'})
      },
      clickRow(item) {
        const that = this
        const data = {
          pcc: this.$store.state.pcn.pcc,
          memberId: item['MemberId'],
          personCode: item['PersonCode'],
          includeProperties: 'PlanMembers,Allergy,Diagnosis'
        }
        memberServices.getMember(data).then(function (res) {
          res.DependentCount = (res.DependentCount).toString()
          if(!res.Diagnosis){
            res = Object.assign({},{...res},{Diagnosis: {Diagnosis: ''}},{Allergy:{Allergy:''}})
          }
          store.commit('UPDATE_STATUS', true)
          store.commit('UPDATE_SELECTED_PLAN_MEMBER', res.PlanMembers)
          res.PlanMembers = []
          store.commit('UPDATE_SELECTED_MEMBER', res)
          that.$router.push({path: `edit/${item.MemberId}`})
        })
      },
      selectMember(mmbr) {
        window.Vue.$emit(this.methodName, mmbr)
      },
      changeFilter: function (filter) {
        this.filter = filter
      }
    }
  }
</script>
<style lang="stylus">
</style>
