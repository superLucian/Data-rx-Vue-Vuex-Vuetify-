<template>
  <v-layout row>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field label="Address" v-model="group_info.mail_addr1_txt"></v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field label="" v-model="group_info.mail_addr2_txt"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs5 class="pr-3">
              <v-text-field label="City" v-model="group_info.mail_city_txt"></v-text-field>
            </v-flex>
            <v-flex xs2 class="pl-3 pr-3">
              <v-select
                v-bind:items="items"
                v-model="group_info.mail_state_cd"
                label="State"
                single-line
                bottom
              ></v-select>
            </v-flex>
            <v-flex xs5 class="pl-3">
              <v-text-field label="Zip Code" v-model="group_info.mail_zip_cd"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import services from '../../../../services/group/groupService'
  import store from '../../../../store'

  export default {
    name: 'group-mail-address',
    props: ['type', 'group_info'],
    components: {},
    data() {
      return {
        items: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
          'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP']
      }
    },
    mounted() {
    },
    watch: {},
  }
</script>

<style>
</style>
