<template>
  <main>
    <v-container fluid class="my-sub-scroll-enabled">
      <p class="text-lg-left">Claim Paid On - Lower Of</p>
      <v-divider></v-divider>
      <v-layout row wrap>
        <v-flex xs12>
          <v-radio-group v-model="info.use_lower_of_logic_flg" row :mandatory="false">
            <v-radio label="Use plan's First Available Lower of Settings " value=""></v-radio>
            <v-radio label="First Available" value="F"></v-radio>
            <v-radio label="Lower of" value="T"></v-radio>
          </v-radio-group>
          <v-card-text class="py-0">
            <v-layout row wrap>
              <v-flex xs3>
                <v-checkbox v-if="use_group_mac_ind !== ''" label="Plan MAC" v-model="use_group_mac_ind"
                            @change="changedCheckBox(use_group_mac_ind, 'use_group_mac_ind')" :false-value="'N'"
                            :true-value="'Y'"></v-checkbox>
                <v-checkbox v-if="use_group_mac_ind === ''" label="Plan MAC" :input-value="true" indeterminate
                            @change="changedCheckBoxIntermediate('use_group_mac_ind')"></v-checkbox>
              </v-flex>
              <v-flex xs3>
                <v-checkbox v-if="use_brand_mac_ind !== ''" label="Brand MAC" v-model="use_brand_mac_ind"
                            @change="changedCheckBox(use_brand_mac_ind, 'use_brand_mac_ind')" :false-value="'N'"
                            :true-value="'Y'"></v-checkbox>
                <v-checkbox v-if="use_brand_mac_ind === ''" label="Brand MAC" :input-value="true" indeterminate
                            @change="changedCheckBoxIntermediate('use_brand_mac_ind')"></v-checkbox>
              </v-flex>
              <v-flex xs3>
                <v-checkbox v-if="use_generic_mac_ind !== ''" label="Generic MAC" v-model="use_generic_mac_ind"
                            @change="changedCheckBox(use_generic_mac_ind, 'use_generic_mac_ind')" :false-value="'N'"
                            :true-value="'Y'"></v-checkbox>
                <v-checkbox v-if="use_generic_mac_ind === ''" label="Generic MAC" :input-value="true" indeterminate
                            @change="changedCheckBoxIntermediate('use_generic_mac_ind')"></v-checkbox>
              </v-flex>
              <v-flex xs3>
                <v-checkbox v-if="use_pricing_params_ind !== ''" label="Use pricing paramete"
                            v-model="use_pricing_params_ind"
                            @change="changedCheckBox(use_pricing_params_ind, 'use_pricing_params_ind')"
                            :false-value="'N'" :true-value="'Y'"></v-checkbox>
                <v-checkbox v-if="use_pricing_params_ind === ''" label="Use pricing paramete" :input-value="true"
                            indeterminate @change="changedCheckBoxIntermediate('use_pricing_params_ind')"></v-checkbox>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-layout row wrap>
            <v-flex xs6>
              <v-checkbox v-if="use_lower_uc_ind !== ''" label="Usual and Custom" v-model="use_lower_uc_ind"
                          @change="changedCheckBox(use_lower_uc_ind, 'use_lower_uc_ind')" :false-value="'N'"
                          :true-value="'Y'"></v-checkbox>
              <v-checkbox v-if="use_lower_uc_ind === ''" label="Usual and Custom" :input-value="true" indeterminate
                          @change="changedCheckBoxIntermediate('use_lower_uc_ind')"></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox v-if="use_lower_gad_ind !== ''" label="Gross Amount Due" v-model="use_lower_gad_ind"
                          @change="changedCheckBox(use_lower_gad_ind, 'use_lower_gad_ind')" :false-value="'N'"
                          :true-value="'Y'"></v-checkbox>
              <v-checkbox v-if="use_lower_gad_ind === ''" label="Gross Amount Due" :input-value="true" indeterminate
                          @change="changedCheckBoxIntermediate('use_lower_gad_ind')"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-card-text class="py-0 px-0">
        <v-checkbox label="Override Plan Level DAW Settings" v-model="daw_cd"></v-checkbox>
        <template v-if="daw_cd">
          <v-divider></v-divider>
          <v-layout row wrap>
            <v-flex xs6>
              <v-checkbox label="(0) - No Product Selection Indicated" v-model="check0"
                          color="primary-color" true-value="0" false-value=""></v-checkbox>
              <v-checkbox label="(1) - Substitution Not Allowed by Prescriber" v-model="check1"
                          color="primary-color" true-value="1" false-value=""></v-checkbox>
              <v-checkbox label="(2) - Patient Requested Product Dispensed" v-model="check2"
                          color="primary-color" true-value="2" false-value=""></v-checkbox>
              <v-checkbox label="(3) - Pharmacist Selected Product Dispensed" v-model="check3"
                          color="primary-color" true-value="3" false-value=""></v-checkbox>
              <v-checkbox label="(4) - Generic Drug Not in Stock" v-model="check4"
                          color="primary-color" true-value="4" false-value=""></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox label="(5) - Brand Drug Dispensed as a Generic" v-model="check5"
                          color="primary-color" true-value="5" false-value=""></v-checkbox>
              <v-checkbox label="(6) - Override" v-model="check6"
                          color="primary-color" true-value="6" false-value=""></v-checkbox>
              <v-checkbox label="(7) - Brand Drug Mandated by Law" v-model="check7"
                          color="primary-color" true-value="7" false-value=""></v-checkbox>
              <v-checkbox label="(8) - Generic Drug Not Available in Marketplace"
                          v-model="check8" color="primary-color" true-value="8" false-value=""></v-checkbox>
              <v-checkbox label="(9) - Other" v-model="check9"
                          color="primary-color" true-value="9" false-value=""></v-checkbox>
            </v-flex>
          </v-layout>
        </template>
      </v-card-text>
      <v-card-text class="py-0 px-0">
        <p class="text-lg-left">Miscellaneous</p>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text>
              <v-select
                v-bind:items="tierList"
                v-model="info.compound_copay_tier"
                label="Compound Copay Tier:"
                item-text="text"
                item-value="value"
                bottom
              ></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text>
              <v-select
                v-bind:items="planTypeList"
                v-model="info.plan_type_cd"
                label="Plan Type"
                item-text="desc_txt"
                item-value="field_value"
                bottom
              ></v-select>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card-text>
      <v-card-text class="px-0">
        <p class="text-lg-left">Special Program</p>
        <v-divider></v-divider>
        <v-card-text class="py-0">
          <v-checkbox v-if="use_group_mpp_ind !== ''" label="Price It" v-model="use_group_mpp_ind"
                      @change="changedCheckBox(use_group_mpp_ind, 'use_group_mpp_ind')" :false-value="'N'"
                      :true-value="'Y'"></v-checkbox>
          <v-checkbox v-if="use_group_mpp_ind === ''" label="Price It" :input-value="true" indeterminate
                      @change="changedCheckBoxIntermediate('use_group_mpp_ind')"></v-checkbox>
          <v-divider></v-divider>
        </v-card-text>
      </v-card-text>
      <v-card-text class="px-0">
        <p class="text-xs-left">*Checkboxes with an intermediate value
          <v-icon class="icons">indeterminate_check_box</v-icon>
          will NOT add an override for the specified settings. The plan's value for these settings will be used.
        </p>
        <p class="text-xs-left">*Checkboxes with checked or unchecked value
          <v-icon class="icons">check_box</v-icon>
          <v-icon class="icons">check_box_outline_blank</v-icon>
          will add an override for the specified settings. The plan's value for these settings will NOT be used.
        </p>
      </v-card-text>
    </v-container>
    <v-divider></v-divider>
    <v-card-actions class="d-block text-xs-center">
      <v-btn color="primary-color" :disabled="isDisabledSave" @click.native="save">Save<i v-if="saveLoading"
                                                                                          class="fa fa-circle-o-notch fa-spin fa-fw"></i>
      </v-btn>
      <v-btn @click.native="close">Close</v-btn>
    </v-card-actions>
  </main>
</template>
<script>
  import planServices from '../../../../../services/plan/planServices'

  export default {
    name: 'plan-network-overrides',
    props: ['networkValue', 'networkObj', 'onBack'],
    components: {},
    data() {
      return {
        info: {},
        use_group_mac_ind: '',
        use_brand_mac_ind: '',
        use_generic_mac_ind: '',
        use_pricing_params_ind: '',
        use_lower_uc_ind: '',
        use_lower_gad_ind: '',
        daw_cd: false,
        check0: '',
        check1: '',
        check2: '',
        check3: '',
        check4: '',
        check5: '',
        check6: '',
        check7: '',
        check8: '',
        check9: '',
        tierList: [
          {value: -99, text: 'Use Plan Level Setting'},
          {value: -1, text: '-1'},
          {value: 0, text: '0'},
          {value: 1, text: '1'},
          {value: 2, text: '2'},
          {value: 3, text: '3'},
          {value: 4, text: '4'},
          {value: 5, text: '5'},
          {value: 6, text: '6'},
          {value: 7, text: '7'},
          {value: 8, text: '8'},
          {value: 9, text: '9'},
          {value: 99, text: '99'}
        ],
        planTypeList: [],
        use_group_mpp_ind: '',
        saveLoading: false,
        isDisabledSave: false
      }
    },
    computed: {
      values: function () {
        return this.check0 + this.check1 + this.check2 + this.check3 + this.check4 + this.check5 + this.check6 + this.check7 + this.check8 + this.check9
      }
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        }, deep: true
      },
      daw_cd: function (d) {
        if (d === false) {
          this.info.daw_cd = ''
          this.check0 = ''
          this.check1 = ''
          this.check2 = ''
          this.check3 = ''
          this.check4 = ''
          this.check5 = ''
          this.check6 = ''
          this.check7 = ''
          this.check8 = ''
          this.check9 = ''
        }
      }
    },
    mounted: function () {
      console.log('----- Administrator / Plan / Networks / Edit / Overrides mounted -----')
      this.info = Object.assign({}, {...this.networkValue.network[0]}, {...this.networkObj})
      this.planTypeList = this.networkValue.plan_type_cd_syscode
      this.setValues()
    },
    methods: {
      setValues: function () {
        if (this.info.use_lower_of_logic_flg === null) this.info.use_lower_of_logic_flg = ''

        if (this.info.use_group_mac_ind !== null) this.use_group_mac_ind = this.info.use_group_mac_ind
        else this.use_group_mac_ind = ''

        if (this.info.use_brand_mac_ind !== null) this.use_brand_mac_ind = this.info.use_brand_mac_ind
        else this.use_brand_mac_ind = ''

        if (this.info.use_generic_mac_ind !== null) this.use_generic_mac_ind = this.info.use_generic_mac_ind
        else this.use_generic_mac_ind = ''

        if (this.info.use_pricing_params_ind !== null) this.use_pricing_params_ind = this.info.use_pricing_params_ind
        else this.use_pricing_params_ind = ''

        if (this.info.use_lower_uc_ind !== null) this.use_lower_uc_ind = this.info.use_lower_uc_ind
        else this.use_lower_uc_ind = ''

        if (this.info.use_lower_gad_ind !== null) this.use_lower_gad_ind = this.info.use_lower_gad_ind
        else this.use_lower_gad_ind = ''

        if (this.info.use_group_mpp_ind !== null) this.use_group_mpp_ind = this.info.use_group_mpp_ind
        else this.use_group_mpp_ind = ''

        if (this.info.daw_cd) {
          this.daw_cd = true
          const checks = this.info.daw_cd.split('')
          const that = this
          checks.forEach(function (d) {
            if (d === '0') that.check0 = d
            else if (d === '1') that.check1 = d
            else if (d === '2') that.check2 = d
            else if (d === '3') that.check3 = d
            else if (d === '4') that.check4 = d
            else if (d === '5') that.check5 = d
            else if (d === '6') that.check6 = d
            else if (d === '7') that.check7 = d
            else if (d === '8') that.check8 = d
            else if (d === '9') that.check9 = d
          })
        } else {
          this.daw_cd = false
        }

        this.planTypeList.unshift({'field_value': '-1', 'desc_txt': 'Use Plan Level Setting'})
        if (this.info.plan_type_cd === null) this.info.plan_type_cd = '-1'
        if (this.info.compound_copay_tier === null) this.info.compound_copay_tier = -99
      },
      changedCheckBox: function (value, name) {
        if (value === 'N') {
          switch (name) {
            case 'use_group_mac_ind':
              this.use_group_mac_ind = ''
              break
            case 'use_brand_mac_ind':
              this.use_brand_mac_ind = ''
              break
            case 'use_generic_mac_ind':
              this.use_generic_mac_ind = ''
              break
            case 'use_pricing_params_ind':
              this.use_pricing_params_ind = ''
              break
            case 'use_lower_uc_ind':
              this.use_lower_uc_ind = ''
              break
            case 'use_lower_gad_ind':
              this.use_lower_gad_ind = ''
              break
            case 'use_group_mpp_ind':
              this.use_group_mpp_ind = ''
              break
          }
        }
      },
      changedCheckBoxIntermediate: function (name) {
        switch (name) {
          case 'use_group_mac_ind':
            this.use_group_mac_ind = 'N'
            break
          case 'use_brand_mac_ind':
            this.use_brand_mac_ind = 'N'
            break
          case 'use_generic_mac_ind':
            this.use_generic_mac_ind = 'N'
            break
          case 'use_pricing_params_ind':
            this.use_pricing_params_ind = 'N'
            break
          case 'use_lower_uc_ind':
            this.use_lower_uc_ind = 'N'
            break
          case 'use_lower_gad_ind':
            this.use_lower_gad_ind = 'N'
            break
          case 'use_group_mpp_ind':
            this.use_group_mpp_ind = 'N'
            break
        }
      },
      save: function () {
        if (this.values === '') this.info.daw_cd = ''
        else this.info.daw_cd = this.values

        this.info.use_group_mac_ind = this.use_group_mac_ind
        this.info.use_brand_mac_ind = this.use_brand_mac_ind
        this.info.use_generic_mac_ind = this.use_generic_mac_ind
        this.info.use_pricing_params_ind = this.use_pricing_params_ind
        this.info.use_lower_uc_ind = this.use_lower_uc_ind
        this.info.use_lower_gad_ind = this.use_lower_gad_ind
        this.info.use_group_mpp_ind = this.use_group_mpp_ind
        const that = this
        planServices.updateGroupPlanNetwork(this.info, this.$store.state.user).then(function (res) {
          that.saveLoading = true

          if (res === "0") {
            that.saveLoading = false
            that.isDisabledSave = true
            window.Vue.$emit('reloadPlanNetwork')
            window.Vue.$emit('snackbar', 'success', 'Update Overrides!')
            that.onBack()
          } else {
            that.saveLoading = false
            that.isDisabledSave = true
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      },
      close: function () {
        this.onBack()
      }
    }
  }

</script>
<style lang="scss">
  .icons {
    color: #366282 !important;
  }
</style>
