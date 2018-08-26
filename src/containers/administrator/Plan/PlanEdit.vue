<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Edit Plan / {{convertString(active)}} </v-toolbar-title>
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
  import planServices from '../../../services/plan/planServices'
  import store from '../../../store'

  export default {
    name: 'Plan-edit',
    data() {
      return {
        tabs: [{
          name: 'Plan',
          path: 'plan'
        }, {
          name: 'compound',
          path: 'compound'
        }, {
          name: 'Plan parameters',
          path: 'plan_parameters'
        }, {
          name: 'DAW Codes',
          path: 'daw_codes'
        }, {
          name: 'Pricing Parameters',
          path: 'pricing_parameters'
        }, {
          name: 'Networks',
          path: 'networks'
        }, {
          name: 'Plan Drugs',
          path: 'plan_drugs'
        }, {
          name: 'Plan Formulary',
          path: 'plan_formulary'
        }, {
          name: 'Plan Formulary Restrictions',
          path: 'plan_formulary_restrictions'
        }, {
          name: 'Plan Mac',
          path: 'plan_mac'
        }, {
          name: 'Required Fields/Fields Edits',
          path: 'required_fields'
        }, {
          name: 'Support',
          path: 'support'
        }, {
          name: 'Comments',
          path: 'comments'
        }
        ],
        active: null
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
      console.log('----- Administrator / Plan Edit mounted -----')
      const that = this
      const data = {
        session_uid: this.$store.state.user.session_uid,
        session_id: this.$store.state.user.session_id,
        pcc: this.$store.state.pcn.pcc,
        group_cd: this.$store.state.selectedPlanData.group_cd,
        plan_id: this.$store.state.selectedPlanData.plan_id
      }
      planServices.getPlan(data).then(function (res) {
        let dt = res.plan_data[0]
        dt = Object.assign({}, {...res.plan_data[0]}, {fixed_copay_pct: res.plan_data[0].fixed_copay_pct * 100})
        if (dt.base_formulary) dt.base_formulary = dt.base_formulary.replace(/\s/g, '')
        store.commit('UPDATE_SELECTED_PLAN', dt)
        that.loadSetupData()
      })

      if (Object.keys(this.$route.meta).length > 0)
        this.active = this.$route.meta
      else
        this.$router.push({name: 'Plan-main'})
    },

    methods: {
      convertString: function (text) {
        if (text) return text.replace(/_/g, ' ')
        else return ''
      },
      loadSetupData: function () {
        const data = {
          uid: this.$store.state.user.session_uid,
          pcc: this.$store.state.pcn.pcc,
          group_id: this.$store.state.selectedPlan.group_id,
          plan_id: this.$store.state.selectedPlan.plan_id,
          network_id: this.$store.state.selectedPlan.network_id,
          groups: '*'
        }
        planServices.getSetupPlan(data).then(function (res) {
          store.commit('UPDATE_PLAN_SETUP_DATA', res)
        })
      },
      back: function () {
        store.commit('UPDATE_STATUS', true)
        store.commit('CLEAR', 'selectedPlan')
        store.commit('CLEAR', 'selectedPlanData')
        store.commit('CLEAR', 'planSetupData')
        this.$router.push({name: 'Plan'})
      }
    }
  }
</script>
<style lang="stylus">

</style>
