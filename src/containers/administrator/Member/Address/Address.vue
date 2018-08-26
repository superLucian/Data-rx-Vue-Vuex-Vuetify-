<template>
  <main>
    <v-layout row wrap class="my-sub-scroll-enabled">
      <v-flex xs6>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text class="pb-0">
              <v-text-field label="Address1:" v-model="info.MailingAddress.Street1"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="py-0">
              <v-text-field label="Address2:" v-model="info.MailingAddress.Street2"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs9>
            <v-card-text class="py-0">
              <v-text-field label="City" v-model="info.MailingAddress.City"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="state_items"
                v-model="info.MailingAddress.State"
                label=""
                item-value="text"
              ></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Zip Code:" v-model="info.MailingAddress.PostalCode"></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text class="pb-0">
              <v-text-field label="County:" v-model="info.MailingAddress.County"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="py-0">
              <v-text-field label="Email:" v-model="info.EmailAddress"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Phone:" v-model="info.HomePhoneNumber"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Cell:" v-model="info.CellPhoneNumber"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Fax:" v-model="info.HomeFaxNumber"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Work Phone:" v-model="info.WorkPhoneNumber"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Ext:" v-model="info.WorkPhoneNumberExt"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Work Fax:" v-model="info.WorkFaxNumber"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field label="Pager:" v-model="info.PagerNumber"></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
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
  import store from '../../../../store'
  import memberServices from '../../../../services/member/memberServices'

  export default {
    name: 'address',
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
        isDisabledSave: false
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
      console.log('----- Administrator / Member / Edit / address mounted -----')
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
            store.commit('UPDATE_SELECTED_PLAN_MEMBER', res.PlanMembers)
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
