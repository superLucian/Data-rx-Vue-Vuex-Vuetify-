<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Edit Program</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-layout row wrap>
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
            <v-tabs-content id="Special Program">
              <special-program-edit :data="spec_program_data" :pricing-list="spec_program_syscode"></special-program-edit>
            </v-tabs-content>
            <v-tabs-content id="Providers">
              <special-providers-edit :data="spec_program_data" :providers-list="spec_program_provider_list" :on-update="getSpecData"></special-providers-edit>
            </v-tabs-content>
            <v-tabs-content id="Drug List">
              <special-druglist-edit :data="spec_program_data" :on-update="getSpecData"></special-druglist-edit>
            </v-tabs-content>
          </v-tabs-items>
        </v-tabs>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
  import services from '../../../services/specialPrograms/specProgramsServices'
  import SpecialProgramEdit from './SpecProgramsDetails/SpecProgram'
  import SpecialProvidersEdit from './SpecProgramsDetails/Providers'
  import SpecialDruglistEdit from './SpecProgramsDetails/DrugList'

  export default {
    name: 'spec-program-edit',
    data() {
      return {
        spec_program_data: {},
        spec_program_provider_list: [],
        spec_program_syscode: [],
        tabs: ['Special Program', 'Providers', 'Drug List'],
        active: null,
        loading: false
      }
    },
    components: {SpecialDruglistEdit, SpecialProvidersEdit, SpecialProgramEdit},
    mounted() {
      console.log('----- Administrator / Special Programs Edit mounted -----')
      this.getSpecData()
    },
    methods: {
      getSpecData(){
        const that = this
        const programId = this.$route.params.spid
        services.getSpecProgramData({ program_id: programId }).then(function (data) {
          that.spec_program_data = {...data.spec_program_data[0], program_fee: data.spec_program_data[0]['program_fee'] || '0.00'}
          that.spec_program_provider_list = data.spec_program_provider_list
          that.spec_program_syscode = data.spec_program_syscode.map( data => ({...data, field_value: parseInt(data['field_value'])}))
        });
      },
      back: function () {
        this.$router.push({name: 'special-programs'})
      },
    }
  }
</script>
<style lang="stylus">
</style>
