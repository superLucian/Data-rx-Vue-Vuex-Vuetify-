<template>
  <main>
    <v-container fluid class="my-sub-scroll-enabled py-0">
      <v-layout row>
        <v-flex xs12>
          <v-text-field
            name="comments"
            label="Comments"
            v-model="info.Comment"
            textarea
          ></v-text-field>
        </v-flex>
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
  import {convertDate, convertDateTime, pickerFormat} from '../../../../components/utils/DateMethods'
  import store from '../../../../store'
  import memberServices from '../../../../services/member/memberServices'

  export default {
    name: 'comments',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedMember || {},
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
      console.log('----- Administrator / Member / Edit / comments mounted -----')
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
