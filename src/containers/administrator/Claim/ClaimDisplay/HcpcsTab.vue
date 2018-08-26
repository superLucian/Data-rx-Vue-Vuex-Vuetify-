<template>
  <main>
    <v-form ref="form">
      <v-container fluid class="form-scroll-enabled">
        <v-layout row wrap>
          <v-flex xs6 class="pr-5">
            <v-layout row wrap>
              <v-flex xs10>
                <v-text-field readOnly label="HCPSC Code" v-model="claim['HCPCS Code']"></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-btn icon @click="loadHcpcsList">
                  <v-icon>search</v-icon>
                </v-btn>
              </v-flex>
            </v-layout>
            <v-flex xs12>
              <label class="stateTitle">Modifiers</label>
            </v-flex>
            <v-layout row justify-space-between>
              <v-flex xs2>
                <v-text-field v-model="claim['HCPCS Mod 1']" ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field v-model="claim['HCPCS Mod 2']" ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field v-model="claim['HCPCS Mod 3']" ></v-text-field>
              </v-flex>
              <v-flex xs2>
                <v-text-field v-model="claim['HCPCS Mod 4']"></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex xs12>
              <label class="stateTitle">Claim Type</label>
              <v-select
                bottom
                overflow
                single-line
                label="Select"
                item-text="title"
                item-value="value"
                v-bind:items="claimTypes"
                v-model="claim['1500 Claim Type']"
              ></v-select>
            </v-flex>
          </v-flex>
          <v-flex xs6 class="pr-5" v-if="hcpcsListIsVisible">
            <label class="stateTitle">Valid HCPSC codes for this NDC</label>
            <v-select
              bottom
              overflow
              single-line
              label="Select"
              v-bind:items="hcpsList"
              v-model="claim['HCPCS Code']"
            ></v-select>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs6 class="pr-5">
            <v-text-field label="Other Name (9)" v-model="claim['Other Name 9']"></v-text-field>
          </v-flex>
          <v-flex xs6 class="pr-5"></v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs6 class="pr-5">
            <v-text-field label="Group # (9a)" v-model="claim['Group 9A']"></v-text-field>
          </v-flex>
          <v-flex xs6 class="pr-5">
            <v-text-field label="Group # (11)" v-model="claim['Group 11']"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs6 class="pr-5">
            <v-layout row wrap>
              <v-flex xs10>
                <date-picker label="Birthdate (9b)" v-model="claim['DOB 9B']"></date-picker>
              </v-flex>
              <v-flex xs2 class="pl-2">
                <v-select
                  bottom
                  overflow
                  single-line
                  label="Select"
                  v-model="claim['Gender 9B']"
                  v-bind:items="genderItems"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6 class="pr-5">
            <v-layout row wrap>
              <v-flex xs10>
                <date-picker label="Birthdate (11a)" v-model="claim['DOB 11A']"></date-picker>
              </v-flex>
              <v-flex xs2 class="pl-2">
                <v-select
                  bottom
                  overflow
                  single-line
                  label="Select"
                  v-model="claim['Gender 11A']"
                  v-bind:items="genderItems"
                ></v-select>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs6 class="pr-5">
            <v-text-field label="Employer (9c)" v-model="claim['Employer 9C']"></v-text-field>
          </v-flex>
          <v-flex xs6 class="pr-5">
            <v-text-field label="Employer (11b)" v-model="claim['Employer 11B']"></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex xs6 class="pr-5">
            <v-text-field label="Insurance (9d)" v-model="claim['Insurance 9D']"></v-text-field>
          </v-flex>
          <v-flex xs6 class="pr-5">
            <v-text-field label="Insurance (11c)" v-model="claim['Insurance 11C']"></v-text-field>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </main>
</template>

<script>
  import services from '../../../../services/claim/claimServices'
  import DatePicker from '../../../../components/common/DatePicker.vue'

  export default {
    name: 'hcpcs-tab',
    components: {
      DatePicker,
    },
    props: ['data'],
    computed: {
      claim: function() {
        const newClaim = Object.assign({}, this.data || {})
        if( !newClaim['1500 Claim Type'] ) {
          newClaim['1500 Claim Type'] = 'ME'
        }
        return newClaim
      }
    },
    data() {
      return {
        hcpsList: [],
        hcpcsListIsVisible: false,
        genderItems: ["M", "F", "U"],
        claimTypes: [
          { title: 'Other', value: 'OT' },
          { title: 'ChampVA', value: 'CV' },
          { title: 'Medicare', value: 'ME' },
          { title: 'Medicaid', value: 'MD' },
          { title: 'FECA Black Lung', value: 'BL' },
          { title: 'Tricare Champus', value: 'TC' },
          { title: 'Group Health Plan', value: 'GH' },
        ],
        loading: false
      }
    },
    methods: {
      loadHcpcsList () {
        const that = this

        const data = {
          ndc: that.claim['NDC'],
          group_id: that.claim['Group Id'],
        }

        services.getValidHCPCS(data).then(function(res) {
          that.hcpsList = res.hcpcs_list
          that.hcpcsListIsVisible = true
        })
      },
      save() {
        const { claim } = this

        const data = {
          dob_9b: claim['DOB 9B'],
          dob_11a: claim['DOB 11A'],
          hcpcs: claim['HCPCS Code'],
          claim_id: claim['Claim Id'],
          group_9a: claim['Group 9A'],
          group_11: claim['Group 11'],
          gender_9b: claim['Gender 9B'],
          gender_11a: claim['Gender 11A'],
          modifier_1: claim['HCPCS Mod 1'],
          modifier_2: claim['HCPCS Mod 2'],
          modifier_3: claim['HCPCS Mod 3'],
          modifier_4: claim['HCPCS Mod 4'],
          employer_9c: claim['Employer 9C'],
          type_1500: claim['1500 Claim Type'],
          other_name_9: claim['Other Name 9'],
          insurance_9d: claim['Insurance 9D'],
          employer_11b: claim['Employer 11B'],
          insurance_11c: claim['Insurance 11C'],
          updated_by: this.$store.state.user.session_uid,
        }

        services.updateHcpcsInfo(data).then(function(res) {
          if (res === "0") {

          }
        }).catch(function () {

        })

      }
    },

  }
</script>

<style lang="stylus">
</style>
