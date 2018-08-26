<template>
  <main>
    <v-layout row wrap class="my-sub-scroll-enabled">
      <v-flex xs4>
        <v-card-text class="pb-0">
          <v-text-field label="Employer" v-model="info.EmployeeId"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs4>
        <v-card-text class="pb-0">
          <v-text-field label="Name" v-model="info.EmployerName"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs6>
        <v-card-text class="py-0">
          <v-text-field label="Address" v-model="info.EmployerAddress.Street1"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs4>
        <v-card-text class="py-0">
          <v-text-field label="City" v-model="info.EmployerAddress.City"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-text class="py-0">
          <v-select
            v-bind:items="state_items"
            v-model="info.EmployerAddress.State"
            label=""
            item-value="text"
          ></v-select>
        </v-card-text>
      </v-flex>
      <v-flex xs4>
        <v-card-text class="py-0">
          <v-text-field label="Zip Code" v-model="info.EmployerAddress.PostalCode"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs4>
        <v-card-text class="py-0">
          <v-text-field label="Contact" v-model="info.EmployerContactName"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs4>
        <v-card-text class="py-0">
          <v-text-field label="Occupation" v-model="info.Occupation"></v-text-field>
        </v-card-text>
      </v-flex>
    </v-layout>
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
  import memberServices from '../../../../services/member/memberServices'
  import store from '../../../../store'

  export default {
    name: 'employer',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedMember,
        state_items: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU',
          'HI', 'ID', 'IL', 'IN', 'IA', 'NC', 'PR', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
          'MI', 'MN', 'MS', 'MO', 'RI', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'XA', 'WV', 'WI', 'WY'
        ],
        isDisabledSave: false,
      }
    },
    components: {},
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
      console.log('----- Administrator / Member / Edit / employer mounted -----')
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
