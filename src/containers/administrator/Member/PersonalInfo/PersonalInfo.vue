<template>
  <v-form ref="form">
  <main>
    <v-layout row wrap class="my-sub-scroll-enabled">
      <v-flex xs6>
        <v-card-text>
          <v-select
            v-bind:items="material_status"
            v-model="info.MaritalStatus"
            label="Marital Status"
            item-value="field_value"
            item-text="desc_txt"
          ></v-select>
        </v-card-text>
      </v-flex>
      <v-flex xs6>
        <v-card-text>
          <v-text-field label="Number of Dependents" v-model="info.DependentCount" type="number" :rules="[rules.DependentCountRule]" :counter="2"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-text>
          {{info.IsStudent}}
          <v-checkbox v-bind:label="`Student:`"
                      v-model="info.IsStudent"></v-checkbox>
        </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-text>
          <v-checkbox v-bind:label="`Disabled:`"
                      v-model="info.IsDisabled"></v-checkbox>
        </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-text>
          <v-checkbox v-bind:label="`Smoker:`"
                      v-model="info.IsSmoker"></v-checkbox>
        </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-text>
          <v-checkbox v-bind:label="`Pregnant:`"
                      v-model="info.IsPregnant"></v-checkbox>
        </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-text>
          <v-checkbox v-bind:label="`Allergies:`"
                      v-model="info.HasAllergies"></v-checkbox>
        </v-card-text>
      </v-flex>
      <v-flex xs2>
        <v-card-text>
          <v-checkbox v-bind:label="'Diabetic'"
                      v-model="info.IsDiabetic"></v-checkbox>
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
  </v-form>
</template>
<script>
  import {convertDate, convertDateTime, pickerFormat} from '../../../../components/utils/DateMethods'
  import store from '../../../../store'
  import memberServices from '../../../../services/member/memberServices'

  export default {
    name: 'personalInfo',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedMember,
        screen_repo: false,
        material_status: [
          {field_value: 0, desc_txt: 'Not Specified'},
          {field_value: 1, desc_txt: 'Married'},
          {field_value: 2, desc_txt: 'Single'},
          {field_value: 3, desc_txt: 'Discovered'},
          {field_value: 4, desc_txt: 'Widowed'}
        ],
        isDisabledSave: false,
        rules: {
          required: (value) => !!value || 'Required.',
          DependentCountRule: (v) => v < 100 || 'DependentCount Limit must be less more than 100.',
        },
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
          console.log('asdfasdfasdf')
          if (this.data) {
            this.info = this.data
          }
        }, deep: true
      }
    },
    mounted() {
      console.log('----- Administrator / Member / Edit / Personal Info mounted -----')
      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      save() {
        const that = this
        if (that.$refs.form.validate()) {
          if (this.info.FirstName === ''
            || this.info.LastName === ''
            || this.info.PersonCode === ''
            || this.info.MemberId === ''
          ) {
            that.$refs.form.validate()
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
