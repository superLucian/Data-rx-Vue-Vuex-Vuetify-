<template>
  <v-layout row justify-center>
    <Vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="true"
      :closeOnClickMask="true"
      :width="1000"
      :height="500"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text" v-if="this.type == 'edit'">
          Provider Pricing Edit
        </v-toolbar-title>
        <v-toolbar-title class="white--text" v-else>
          Provider Pricing Add
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form">
        <v-container fluid class="my-scroll-enabled px-0 py-0">
          <v-layout row wrap class>
            <v-layout row wrap>
              <v-card-text class="py-0 px-0">
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-card-text v-if="type === 'edit'" class="pb-0">
                      <v-text-field v-model="info['Group Name']" label="Group" :disabled="true"></v-text-field>
                    </v-card-text>
                    <v-card-text v-else>
                      <v-select
                        v-bind:items="groupList" v-model="info['Group Name']" label="Group" bottom
                        item-text="group_name" item-value="group_id"
                      ></v-select>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text class="pb-0">
                      <v-text-field v-model="info['Provider Name']" label="Provider Name"
                                    :disabled="true"></v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text class="py-0">
                      {{info['Pricing Zip']}}
                      <v-select v-bind:items="zipData" v-model="info['Pricing Zip']" label="Zip" bottom
                                item-text="desc_txt" item-value="mpp_id"></v-select>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text class="py-0">
                      <v-select v-bind:items="mppData.price_cd" v-model="info['Price Code']" label="Price Code" bottom
                                item-text="desc_txt" item-value="field_value"></v-select>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="py-0">
                      <v-text-field name="fixed_fee" label="Fixed Fee" v-model="info['fee']" type="number"
                                    hint="This value is less than 1000"
                                    persistent-hint :rules="[rules.feeRules]" :counter="3"></v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="py-0">
                      <v-text-field name="percent_fee" label="Percent Fee" v-model="info['percent_fee']"
                                    type="number" hint="This value is less than 1000"
                                    persistent-hint :rules="[rules.feeRules]" :counter="3"></v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="py-0">
                      <v-text-field name="min_claim_amt" label="Min Claim Amt"
                                    v-model="info['min_claim_amt']" type="number" hint="This value is less than 1000"
                                    persistent-hint :rules="[rules.feeRules]" :counter="3"></v-text-field>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-card-text>
              <v-card-text class="py-0 px-0">
                <v-card-text>
                  <v-flex xs12><p>Brand</p></v-flex>
                  <v-divider></v-divider>
                </v-card-text>
                <v-card-text class="py-0">
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-select v-bind:items="mppData.price_cd" v-model="info['brand_price_cd']" label="Price Code"
                                  bottom
                                  item-text="desc_txt" item-value="field_value"></v-select>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs3>
                      <v-card-text class="py-0">
                        <v-text-field name="brand_markup_$" label="Markup($)" v-model="info['brand_markup']"
                                      type="number" hint="This value is less than 1000"
                                      persistent-hint :rules="[rules.feeRules]" :counter="3"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs3>
                      <v-card-text class="py-0">
                        <v-text-field name="brand_markup_%" label="Markup(%)"
                                      v-model="info['brand_markup_pct']" hint="This value is less than 1000"
                                      persistent-hint :rules="[rules.feeRules]" :counter="3"
                                      type="number"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card-text>
              <v-card-text class="py-0 px-0">
                <v-card-text class="py-0">
                  <v-flex xs12><p>Generic</p></v-flex>
                  <v-divider></v-divider>
                </v-card-text>
                <v-card-text class="py-0">
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card-text>
                        <v-select v-bind:items="mppData.price_cd" v-model="info['generic_price_cd']" label="Price Code"
                                  bottom
                                  item-text="desc_txt" item-value="field_value"></v-select>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs3>
                      <v-card-text>
                        <v-text-field name="generic_markup_$" label="Markup($)"
                                      v-model="info['generic_markup']" type="number" hint="This value is less than 1000"
                                      persistent-hint :rules="[rules.feeRules]" :counter="3"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs3>
                      <v-card-text>
                        <v-text-field name="generic_markup_%" label="Markup(%)"
                                      v-model="info['generic_markup_pct']" type="number"
                                      hint="This value is less than 1000"
                                      persistent-hint :rules="[rules.feeRules]" :counter="3"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card-text>
              <v-card-text class="py-0 px-0">
                <v-card-text class="py-0">
                  <v-flex xs12><p>Narcotic</p></v-flex>
                  <v-divider></v-divider>
                </v-card-text>
                <v-card-text class="py-0">
                  <v-layout row wrap>
                    <v-flex xs6>
                      <v-card-text class="py-0">
                        <v-select v-bind:items="mppData.price_cd" v-model="info['narcotic_price_cd']" label="Price Code"
                                  bottom
                                  item-text="desc_txt" item-value="field_value"></v-select>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs3>
                      <v-card-text class="py-0">
                        <v-text-field name="generic_markup_$" label="Markup($)"
                                      v-model="info['narcotic_markup']" type="number" hint="This value is less tha 1000"
                                      persistent-hint :rules="[rules.feeRules]" :counter="3"></v-text-field>
                      </v-card-text>
                    </v-flex>
                    <v-flex xs3>
                      <v-card-text class="py-0">
                        <v-text-field name="generic_markup_%" label="Markup(%)"
                                      v-model="info['narcotic_markup_pct']" type="number"
                                      hint="This value is less than 1000"
                                      persistent-hint :rules="[rules.feeRules]" :counter="3"></v-text-field>
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-card-text>
            </v-layout>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions class="d-block text-xs-center">
          <v-btn color="primary-color" @click.native="save" :disabled="isDisabledSave">Save<i v-if="loading"
                                                                                              class="fa fa-circle-o-notch fa-spin fa-fw"></i>
          </v-btn>
          <v-btn @click.native="close()">Close</v-btn>
        </v-card-actions>
      </v-form>
    </Vodal>
  </v-layout>
</template>

<script>
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import providerServices from '../../../../services/provider/providerServices'

  export default {
    name: 'edit-pricing',
    props: ['groupList', 'mppData','zipData'],
    data() {
      return {
        type: 'edit',
        info: {},
        show: false,
        search: [],
        selectedValue: {},
        zipList:[],
        filter: 'Active',
        isDisabledSave: true,
        rules: {
          required: (value) => !!value || 'Required.',
          feeRules: (v) => {
            return v <= 999.9 || 'Limit must be less more than 1000'
          }
        },
        loading: false
      }
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        }, deep: true
      },
      mppData: function (val) {
        if (this.type === 'edit') {
          this.info = Object.assign({}, {...this.info}, {...val.provider[0]})
        }
        this.setValues(this.info)
      }
    },
    components: {
      Vodal
    },
    mounted() {
      console.log('------  Administrator / Provider / Pricing / Edit mounted ------')
      const that = this
      window.Vue.$on('openEditPrice', function (val, type) {
        that.type = type
        that.info = val
        that.open()
      })
    },
    methods: {
      setValues: function (data) {
        if (this.type === 'add') {
          let initInfo = {
            group_id: this.groupList[0].group_id,
            'Group Name': this.groupList[0].group_id,
            'Pricing Zip': Number(this.mppData.mpp_id[0].mpp_id),
            'Price Code': '03',
            brand_price_cd: '-1',
            generic_price_cd: '-1',
            narcotic_price_cd: '-1',
            pid: this.$store.state.selectedProvider.pid,
            created_by: this.$store.state.selectedProvider.created_by,
            fee:'0.00',
            percent_fee:'0.00',
            min_claim_amt:'0.00',
            brand_markup: '0.00',
            brand_markup_pct: '0.00',
            generic_markup: '0.00',
            generic_markup_pct: '0.00',
            narcotic_markup: '0.00',
            narcotic_markup_pct: '0.00',
          }
          this.info = Object.assign({}, {...this.info}, {...initInfo})
        } else {
//          console.log(this.info)
          this.info['Pricing Zip'] = Number(this.info['Pricing Zip'])
          if (this.info.brand_price_cd === null) this.info.brand_price_cd = '-1'
          if (this.info.generic_price_cd === null) this.info.generic_price_cd = '-1'
          if (this.info.narcotic_price_cd === null) this.info.narcotic_price_cd = '-1'
          this.info = Object.assign({}, {...this.info}, {
            fee: parseFloat(this.info.fee).toFixed(2),
            percent_fee: parseFloat(this.info.percent_fee * 100).toFixed(2),
            min_claim_amt: parseFloat(this.info.min_claim_amt).toFixed(2),
            brand_markup: parseFloat(this.info.brand_markup).toFixed(2),
            brand_markup_pct: parseFloat(this.info.brand_markup_pct * 100).toFixed(2),
            generic_markup: parseFloat(this.info.generic_markup).toFixed(2),
            generic_markup_pct: parseFloat(this.info.generic_markup_pct * 100).toFixed(2),
            narcotic_markup: parseFloat(this.info.narcotic_markup).toFixed(2),
            narcotic_markup_pct: parseFloat(this.info.narcotic_markup_pct * 100).toFixed(2),
          })
        }
      },
      open: function () {
        this.isDisabledSave = true
        this.show = true
      },
      close: function () {
        this.show = false
      },
      save: function () {
        const that = this
        if (this.$refs.form.validate()) {
          if (this.type === 'edit') {
            providerServices.UpdateMppList(this.info, this.$store.state.user).then(function (res) {
              if (res === '0') {
                that.isDisabledSave = true
                that.loading = true
                window.Vue.$emit('reloadPrice')
                window.Vue.$emit('snackbar', 'success', 'PriceData Updated!')
              } else {
                that.loading = false
                window.Vue.$emit('snackbar', 'Error', res)
              }
              that.loading = false
              that.close()
            });
          } else if (this.type === 'add') {
            that.loading = true
            providerServices.AddMppList(this.info).then(function (res) {
              if (res === '0') {
                that.isDisabledSave = true
                window.Vue.$emit('reloadPrice')
                window.Vue.$emit('snackbar', 'success', 'PriceData Added!')
              } else {
                window.Vue.$emit('snackbar', 'Error', res)
              }
              that.loading = false
              that.close()
            });
          }
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
