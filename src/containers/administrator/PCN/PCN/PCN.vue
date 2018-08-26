<template>
  <v-form ref="form">
    <v-layout row wrap>
      <v-flex xs6 class="pr-3">
        <v-layout row wrap>
          <v-flex xs12>
            <v-text-field label="PCN" v-model="pcn['pcc']" required :disabled="pcnDisabled"
                          :rules="[rules.required]">
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="Description" v-model="pcn['name_txt']" required :rules="[rules.required]">
            </v-text-field>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs7 class="pr-3">
                <v-text-field label="Address" v-model="pcn['addr1_txt']" required :rules="[rules.required]">
                </v-text-field>
              </v-flex>
              <v-flex xs5>
                <v-text-field v-model="pcn['addr2_txt']">
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs8 class="pr-3">
                <v-text-field label="City" v-model="pcn['city_txt']" required :rules="[rules.required]">
                </v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-select label="State" v-bind:items="stateList" v-model="pcn['state_cd']" required
                          :rules="[rules.required]">
                </v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs4 class="pr-3">
                <v-text-field label="Zip Code" v-model="pcn['zip_cd']" type="number">
                </v-text-field>
              </v-flex>
              <v-flex xs4 class="pr-3">
                <v-text-field label="Fax" v-model="pcn['fax_num']">
                </v-text-field>
              </v-flex>
              <v-flex xs4>
                <v-text-field label="Phone" v-model="pcn['phone_num']" hint="xxx-xxx-xxxx" persistent-hint>
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field label="Email" v-model="pcn['email_addr_txt']"></v-text-field>
              </v-flex>
              <v-flex xs6 class="pl-3">
                <v-text-field label="Web Site" v-model="pcn['web_url_txt']">
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field label="Rebate PCN ref#" v-model="pcn['rebate_level_2']">
                </v-text-field>
              </v-flex>
              <v-flex xs6 class="pl-3">
                <v-select
                  label="Member Edit Screen"
                  v-bind:items="memberEditScreenList"
                  v-model="pcn['edit_form_type_cd']">
                </v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs5>
                <v-text-field label="Medicaid Copay Max" v-model="pcn['medicaid_copay_cap']">
                </v-text-field>
              </v-flex>
              <v-flex xs7 class="pl-3">
                <v-select label="Medicaid Edit Type" v-bind:items="medicaidEditTypeList"
                          v-model="pcn['medicaidEditType']" item-value="field_value" item-text="desc_txt">
                </v-select>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs5>
                <v-card-text class="px-0">
                  <v-checkbox label="Track Benefits" v-model="pcn['track_benefits_flg']" light></v-checkbox>
                </v-card-text>
              </v-flex>
              <v-flex xs7>
                <v-card-text class="py-0">
                  <v-layout row wrap class="pl-3">
                    <v-flex xs12>
                      <v-radio-group row v-model="pcn['status_cd']">
                        <v-radio value="A" label="Active" light></v-radio>
                        <v-radio value="I" label="Inactive" light></v-radio>
                      </v-radio-group>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6 class="pl-3">
        <v-layout row wrap>
          <v-flex xs12>
            <v-subheader>Contact</v-subheader>
            <v-divider></v-divider>
            <v-card-text>
              <v-card-text class="pb-0 px-0">
                <v-layout row wrap class="pl-3">
                  <v-flex xs6>
                    <v-text-field label="Last Name" v-model="pcn['contact_lname']">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 class="pl-3">
                    <v-text-field label="First Name" v-model="pcn['contact_fname']">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 class="pr-2">
                    <v-text-field label="Address" v-model="pcn['contact_addr1_txt']">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs3 class="px-1">
                    <v-text-field v-model="pcn['contact_addr2_txt']">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs3 class="px-1">
                    <v-text-field label="City" v-model="pcn['contact_city_txt']">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs2 class="pl-2">
                    <v-select label="State" v-bind:items="stateList" v-model="pcn['contact_state_cd']">
                    </v-select>
                  </v-flex>
                  <v-flex xs4 class="pr-3">
                    <v-text-field label="Zip Code" v-model="pcn['contact_zip_cd']" type="number">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 class="pr-3">
                    <v-text-field label="Fax" v-model="pcn['contact_fax_num']">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4>
                    <v-text-field label="Phone" v-model="pcn['contact_phone_num']" hint="xxx-xxx-xxxx" persistent-hint>
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 class="pr-3">
                    <v-text-field label="Pager" v-model="pcn['contact_pager_num']">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6>
                    <v-text-field label="Cell" v-model="pcn['contact_cell_num']">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field label="Email" v-model="pcn['contact_email_addr_txt']">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-subheader>Comments</v-subheader>
            <v-divider></v-divider>
            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 class="pl-3">
                  <v-text-field label="Please Enter Comments Here" v-model="pcn['comment_txt']" required multi-line>
                  </v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-form>
</template>
<script>
  export default {
    props: ['pcn', 'medicaidEditTypeList', 'pcnDisabled', 'tab', 'valid'],
    components: {},
    data() {
      return {
        memberEditScreenList: ['Standard', '340B'],
        stateList: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC',
          'FM', 'FL', 'GA', 'GU', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS',
          'KY', 'LA', 'ME', 'MH', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO',
          'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'PR', 'RI', 'SC', 'SD', 'TN',
          'TX', 'UT', 'VT', 'VI', 'VA', 'WA', 'WV', 'WI', 'WY', 'AE', 'AA', 'AP'
        ],
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            if (!!value) {
              const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.(XXX@XXX.com)'
            } else {
              return 'Required'
            }
          },
          phone: (value) => {
            if (!!value) {
              const pattern = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
              return pattern.test(value) || 'Invalid Phone Number.(XXX-XXX-XXXX)'
            } else {
              return 'Required'
            }
          }
        }
      }
    },
    watch: {
      pcn: {
        handler: function () {
          this.tab['validated'] = (this.rules.required(this.pcn['pcc']) === true) &&
            (this.rules.required(this.pcn['name_txt']) === true) &&
            (this.rules.required(this.pcn['addr1_txt']) === true) &&
            (this.rules.required(this.pcn['city_txt']) === true) &&
            (this.rules.required(this.pcn['state_cd']) === true)
        },
        deep: true
      },
      valid: function () {
        this.validate()
      }
    },
    mounted() {
      this.validate()
    },
    methods: {
      validate: function () {
        if (!this.valid) this.$refs.form.validate()
      }
    },
  }
</script>
<style lang="stylus">
</style>
