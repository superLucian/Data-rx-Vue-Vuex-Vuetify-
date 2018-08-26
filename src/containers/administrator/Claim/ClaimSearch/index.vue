<template>
  <v-layout row wrap class="claim-search-container">
    <v-tabs v-model="active">
      <v-tabs-bar class="transparent">
        <v-tabs-slider class="active-line"></v-tabs-slider>
        <v-tabs-item
          ripple
          :key="tab"
          :href="'#' + tab"
          v-for="tab in tabs"
        >
          {{ tab }}
        </v-tabs-item>
      </v-tabs-bar>
      <v-tabs-items>
        <v-tabs-content id="Ref-Claim Number">
          <ref-claim-number-tab></ref-claim-number-tab>
        </v-tabs-content>

        <v-tabs-content id="Claim">
          <claim-tab></claim-tab>
        </v-tabs-content>

        <v-tabs-content id="Drug">
          <drug-tab></drug-tab>
        </v-tabs-content>

        <v-tabs-content id="Member Id">
          <member-id-tab></member-id-tab>
        </v-tabs-content>

        <v-tabs-content id="Provider">
          <provider-tab></provider-tab>
        </v-tabs-content>

        <v-tabs-content id="Name">
          <name-tab></name-tab>
        </v-tabs-content>

        <v-tabs-content id="Group/Plan">
          <group-tab></group-tab>
        </v-tabs-content>

        <v-tabs-content id="Claim Date">
          <date-tab></date-tab>
        </v-tabs-content>
      </v-tabs-items>
    </v-tabs>
  </v-layout>
</template>

<script>
  import DateTab from './DateTab.vue'
  import DrugTab from './DrugTab.vue'
  import NameTab from './NameTab.vue'
  import GroupTab from './GroupTab.vue'
  import ClaimTab from './ClaimTab.vue'
  import MemberIdTab from './MemberIdTab.vue'
  import ProviderTab from './ProviderTab.vue'
  import RefClaimNumberTab from './RefClaimNumberTab'
  import services from '../../../../services/claim/claimServices'

  export default {
    name: 'claim-search',
    components: {
      DateTab,
      DrugTab,
      NameTab,
      GroupTab,
      ClaimTab,
      MemberIdTab,
      ProviderTab,
      RefClaimNumberTab,
    },
    data () {
      return {
        alertShow: false,
        tabs: [
          'Ref-Claim Number',
          'Claim',
          'Drug',
          'Member Id',
          'Provider',
          'Name',
          'Group/Plan',
          'Claim Date'
        ],
        active: 'Ref-Claim Number',
      }
    },
    mounted() {
    }
  }
</script>
<style lang="stylus">
  .claim-search-container h5{
    margin: 0;
    color: #333;
    font-size: 21px;
  }
</style>
