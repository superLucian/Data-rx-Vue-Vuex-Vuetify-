<template>
  <v-layout row>
    <v-flex xs12>
      <v-layout row wrap>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field label="First Name" v-model="group_info.contact_fname"></v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field label="Last Name" v-model="group_info.contact_lname"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field label="Address" v-model="group_info.contact_addr1_txt"></v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field label="" v-model="group_info.contact_addr2_txt"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs5 class="pr-3">
              <v-text-field label="City" v-model="group_info.contact_city_txt"></v-text-field>
            </v-flex>
            <v-flex xs2 class="pl-3 pr-3">
              <v-select
                v-bind:items="items"
                v-model="group_info.contact_state_cd"
                label="State"
                single-line
                bottom
              ></v-select>
            </v-flex>
            <v-flex xs5 class="pl-3">
              <v-text-field label="Zip Code" v-model="group_info.contact_zip_cd"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field label="Phone" v-model="group_info.contact_phone_num"></v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field label="Fax" v-model="group_info.contact_fax_num"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field label="Cell" v-model="group_info.contact_cell_num"></v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field label="Pager" v-model="group_info.contact_pager_num"></v-text-field>
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Email" v-model="group_info.contact_email_addr_txt"></v-text-field>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import services from '../../../../services/group/groupService'
  import store from '../../../../store'

  export default {
    name: 'group-contacts',
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
    methods: {},
    watch: {},
  }
</script>

<style>
</style>
