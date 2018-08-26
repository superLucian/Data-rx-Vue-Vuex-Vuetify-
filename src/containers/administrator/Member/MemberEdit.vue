<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Edit Member / {{convertString(active)}}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-layout row wrap>
      <v-container fluid>
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
        </v-tabs>
        <router-view></router-view>
      </v-container>
    </v-layout>
  </main>
</template>

<script>
  import store from '../../../store'

  export default {
    name: 'member-edit',
    data() {
      return {
        tabs: [],
        active: null,
        formType: '',
      }
    },
    components: {},
    watch: {
      '$route.meta': function (d) {
        this.active = d
      },
      active: function (val) {
        if (val) {
          this.$router.push({path: `${val}`})
        }
      }
    },
    mounted() {
      console.log('----- Administrator / Member Edit mounted -----')
      this.setValues()
      if (Object.keys(this.$route.meta).length > 0)
        this.active = this.$route.meta
      else {
        if(this.formType === 0){
          this.$router.push({name: 'member-member'})
        } else {
          this.$router.push({name: 'member-patient'})
        }
      }
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
            {name: 'Assign To Plans', path: 'assign_to_plans'},
            {name: 'Drug List', path: 'drug_list'},
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
            {name: 'Medications', path: 'medications'},
            {name: 'Miscellaneous', path: 'miscellaneous'},
            {name: 'Other Insurance', path: 'otherInsurance'}
          ]
        }
      },
      back: function () {
        store.commit('UPDATE_STATUS', true)
        store.commit('CLEAR', 'selectedMember')
        store.commit('CLEAR', 'selectedPlanMembers')
        store.commit('CLEAR', 'selectedMemberDrugs')
        this.$router.push({name: 'member'})
      }
    }
  }
</script>
<style lang="stylus">
</style>
