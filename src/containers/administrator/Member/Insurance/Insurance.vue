<template>
  <main>
    <v-container fluid class="my-sub-scroll-enabled px-0 py-0">
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text>
            <v-checkbox v-bind:label="`Member Has Primary Insurance?:`"
                        v-model="info.HasPrimaryCoverage" hide-details></v-checkbox>
          </v-card-text>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-card-text>
          <v-flex xs12><p>Secondary Insurance</p></v-flex>
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs4>
              <v-card-text class="pb-0">
                <v-text-field label="Cardholder Id:" v-model="info.CardholderId"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="pb-0">
                <v-text-field label="First Name:" v-model="info.CardholderFirstName"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="pb-0">
                <v-text-field label="Last Name:" v-model="info.CardholderLastName"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <date-picker
                  v-model="info.DateOfBirth"
                  label="Birthday"
                ></date-picker>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-text-field label="Plan #:" v-model="info.CardholderPlanId"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-text-field label="Ins Co:" v-model="info.InsuranceCompanyName"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Address:" v-model="info.InsuranceAddress.Street1"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-text-field label="City" v-model="info.InsuranceAddress.City"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs2>
              <v-card-text class="py-0">
                <v-select
                  v-bind:items="state_items"
                  v-model="info.InsuranceAddress.State"
                  label=""
                  item-value="text"
                ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs3>
              <v-card-text class="py-0">
                <v-text-field label="Zip Code" v-model="info.InsuranceAddress.PostalCode"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs9>
              <v-card-text class="py-0">
                <v-text-field label="Phone" v-model="info.InsurancePhoneNumber"></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card-text>
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
  </main>
</template>
<script>
  import store from '../../../../store'
  import memberServices from '../../../../services/member/memberServices'
  import DatePicker from "../../../../components/common/DatePicker.vue";

  export default {
    name: 'insurance',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedMember,
        isDisabledSave: false,
        state_items: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU',
          'HI', 'ID', 'IL', 'IN', 'IA', 'NC', 'PR', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
          'MI', 'MN', 'MS', 'MO', 'RI', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'XA', 'WV', 'WI', 'WY'
        ]
      }
    },
    components: {
      DatePicker,
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
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
      console.log('----- Administrator / Member / Edit / insurance mounted -----')
      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      save() {
        const that = this
        if (this.info.FirstName === ''
          || this.info.LastName === ''
          || this.info.PersonCode === ''
          || this.info.MemberId === ''
        ) {
          this.$router.push({path: 'member'})
        } else {
          const {__type, UpdatedDate, ...update} = this.info
          memberServices.updateMember(update, this.$store.state.user).then(function (res) {
            that.isDisabledSave = true
            store.commit('UPDATE_STATUS', true)
            window.Vue.$emit('snackbar', 'success', 'Member  Data Saved!')
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
        })

        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      }
    }
  }
</script>
<style lang="stylus">
</style>
