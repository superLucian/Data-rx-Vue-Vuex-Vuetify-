<template>
  <v-layout row justify-center>
    <Vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="true"
      :closeOnClickMask="true"
      :width="1200"
      :height="500"
    >
      <div v-if="mppOrDrug === 'mpp'">
        <v-toolbar>
          <v-icon class="white--text">fa-archive</v-icon>
          <v-toolbar-title class="white--text">
            Price It Drug {{info.type}}
          </v-toolbar-title>
        </v-toolbar>
        <v-form ref="form">
          <v-container fluid>
            <v-layout row wrap>
              <v-flex xs8>
                <v-layout row wrap v-if="info.type === 'edit'">
                  <v-flex xs12>
                    <v-card-text class="py-0">
                      <v-text-field label="Drug ID" v-model="info.drug_id" disabled required></v-text-field>
                    </v-card-text>
                  </v-flex>
                </v-layout>
                <v-layout row wrap v-else>
                  <v-flex xs10>
                    <v-card-text class="py-0">
                      <v-text-field label="Drug ID" v-model="info.drug_id" disabled :rules="[rules.required]"
                                    required></v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs2>
                    <v-card-text class="py-1">
                      <v-btn color="primary-color" @click.native="find" block>Find</v-btn>
                    </v-card-text>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-card-text class="py-0" v-if="info.type === 'edit'">
                      <v-select v-bind:items="mapDataList.mpp_id" v-model="info.mpp_id" label="Zip" bottom
                                item-text="desc_txt" item-value="mpp_id" disabled></v-select>
                    </v-card-text>
                    <v-card-text class="py-0" v-else>
                      <v-select v-bind:items="zipDataList" v-model="info.mpp_id" label="Zip" bottom
                                item-text="desc_txt" item-value="mpp_id"></v-select>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text class="py-0" v-if="info.type === 'edit'">
                      <v-select v-bind:items="priceDataList" v-model="info.price_cd" label="Price Code" bottom
                                item-text="desc_txt" item-value="field_value" disabled></v-select>
                    </v-card-text>
                    <v-card-text class="py-0" v-else>
                      <v-select v-bind:items="priceDataList" v-model="info.price_cd" label="Price Code" bottom
                                item-text="desc_txt" item-value="field_value"></v-select>
                    </v-card-text>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <v-flex xs4 class="px-3">
                    <date-picker
                      v-model="info.start_dt"
                      label="Start Date"
                    ></date-picker>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="hasEndDate-container pr-0">
                      <v-checkbox label="Include 'End Date'" v-model="hasEndDate"></v-checkbox>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs4 class="pr-3" v-if="hasEndDate">
                    <date-picker
                      v-model="info.end_dt"
                      label="End Date"
                    ></date-picker>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs4>
                <v-layout row wrap>
                  <v-card-text>
                    <v-flex xs12><p>Pricing</p></v-flex>
                    <v-divider></v-divider>
                  </v-card-text>
                  <v-flex xs6>
                    <v-card-text v-if="info.type === 'edit'" class="py-0">
                      <v-text-field label="Qty 1" v-model="info.quantity1" type="number" @input="onTextChanged"
                                    :rules="[rules.qtyRules, rules.q1Rules, rules.q11Rules]" required></v-text-field>
                    </v-card-text>
                    <v-card-text class="py-0" v-else>
                      <v-text-field label="Qty 1" v-model="info.quantity1" type="number"
                                    :rules="[rules.required, rules.qtyRules, rules.q1Rules, rules.q11Rules]"
                                    required></v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text v-if="info.type === 'edit'" class="py-0">
                      <v-text-field label="Price 1" v-model="info.price_amt1" type="number" @input="onTextChanged"
                                    :rules="[rules.priceRules, rules.p1Rules]" required></v-text-field>
                    </v-card-text>
                    <v-card-text class="py-0" v-else>
                      <v-text-field label="Price 1" v-model="info.price_amt1" type="number"
                                    :rules="[rules.required, rules.priceRules, rules.p1Rules]" required></v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text class="py-0">
                      <v-text-field label="Qty 2" v-model="info.quantity2"
                                    :rules="[rules.qtyRules, rules.q2Rules, rules.q22Rules]"
                                    type="number"></v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text class="py-0">
                      <v-text-field label="Price 2" v-model="info.price_amt2" :rules="[rules.priceRules, rules.p2Rules]"
                                    type="number"></v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text class="py-0">
                      <v-text-field label="Qty 3" v-model="info.quantity3"
                                    :rules="[rules.qtyRules, rules.q3Rules, rules.q33Rules]"
                                    type="number"></v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs6>
                    <v-card-text class="py-0">
                      <v-text-field label="Price 3" v-model="info.price_amt3" :rules="[rules.priceRules, rules.p3Rules]"
                                    type="number"></v-text-field>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-container>
          <v-divider></v-divider>
          <v-card-text class="py-0">
            <small class="red--text">*indicates required field</small>
          </v-card-text>
          <v-card-actions class="d-block text-xs-center">
            <v-btn class="primary" @click.native="save" v-if="info.type === 'edit'" :disabled="isDisabledSave">update
            </v-btn>
            <v-btn class="primary" @click.native="save" v-else :disabled="isDisabledSave">create</v-btn>
            <v-btn @click.native="close()">Close</v-btn>
          </v-card-actions>
        </v-form>
      </div>
      <div v-else>
        <drug-find :selectable="true"></drug-find>
        <v-card-text class="py-0 px-1">
          <v-divider class="mt-2"></v-divider>
          <v-card-actions class="d-block text-xs-center">
            <v-btn @click.native="back">Back</v-btn>
          </v-card-actions>
        </v-card-text>
      </div>
    </Vodal>
  </v-layout>
</template>

<script>
  import diagnoseServices from '../../../services/diagnose/diagnoseService'
  import Vodal from '../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import DatePicker from "../../../components/common/DatePicker.vue"
  import priceItServices from '../../../services/priceIt/priceItServices'
  import store from '../../../store'
  import DrugFind from '../../drugs/DrugsDatabase/DrugDatabase'

  export default {
    name: 'mpp-list-edit',
    props: ['mapDataList', 'zipDataList', 'priceDataList'],
    data() {
      return {
        show: false,
        info: {},
        isDisabledSave: true,
        rules: {
          required: (value) => !!value || 'Required.',
          qtyRules: (v) => v <= 99999 || 'Quantity Limit must be less more than 99999.',
          priceRules: (v) => v <= 999999999 || 'Price Limit must be less more than 99999.',
          p1Rules: (v) => ((!v && !this.info.quantity1) || (!!v && !!this.info.quantity1)) || 'A price is required for quantity 1',
          p2Rules: (v) => ((!v && !this.info.quantity2) || (!!v && !!this.info.quantity2)) || 'A price is required for quantity 2',
          p3Rules: (v) => ((!v && !this.info.quantity3) || (!!v && !!this.info.quantity3)) || 'A price is required for quantity 3',
          q1Rules: (v) => ((!v && !this.info.price_amt1) || (!!v && !!this.info.price_amt1)) || 'A quantity is required for price 1',
          q2Rules: (v) => ((!v && !this.info.price_amt2) || (!!v && !!this.info.price_amt2)) || 'A quantity is required for price 2',
          q3Rules: (v) => ((!v && !this.info.price_amt3) || (!!v && !!this.info.price_amt3)) || 'A quantity is required for price 3',
          q11Rules: (v) => (
            ((v === '' && this.info.quantity3 === '') || (v !== '' && this.info.quantity3 === '') || (v === '' && this.info.quantity3 !== '') || (v !== this.info.quantity3)) &&
            ((v === '' && this.info.quantity2 === '') || (v !== '' && this.info.quantity2 === '') || (v === '' && this.info.quantity2 !== '') || (v !== this.info.quantity2)) )
            || 'Quantity1 is not equal with Q2 and Q3',
          q22Rules: (v) => (
            ((v === '' && this.info.quantity3 === '') || (v !== '' && this.info.quantity3 === '') || (v === '' && this.info.quantity3 !== '') || (v !== this.info.quantity3)) &&
            ((v === '' && this.info.quantity1 === '') || (v !== '' && this.info.quantity1 === '') || (v === '' && this.info.quantity1 !== '') || (v !== this.info.quantity1)) )
            || 'Quantity2 is not equal with Q3 and Q1',
          q33Rules: (v) => (
            ((v === '' && this.info.quantity1 === '') || (v !== '' && this.info.quantity1 === '') || (v === '' && this.info.quantity1 !== '') || (v !== this.info.quantity1)) &&
            ((v === '' && this.info.quantity2 === '') || (v !== '' && this.info.quantity2 === '') || (v === '' && this.info.quantity2 !== '') || (v !== this.info.quantity2)) )
            || 'Quantity3 is not equal with Q2 and Q1',
        },
        loading: false,
        hasEndDate: true,
        mppOrDrug: 'mpp',
      }
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        },
        deep: true
      },
      hasEndDate: function (d) {
        if (d && this.info.end_dt === '9998-12-31') {
          this.info.end_dt = (new Date()).toLocaleDateString()
        }
        this.isDisabledSave = false
      },
      show: function (v) {
        this.isDisabledSave = true
      },
    },
    components: {
      Vodal, DatePicker, DrugFind
    },
    mounted() {
      console.log('------- Administrator / Diagnosis Codeds / Edit mounted ---------')
      const that = this
      window.Vue.$on('openMppListEdit', function (val) {
        that.info = Object.assign({}, {...val}, {
          price_amt1: val.price_amt1.toString(),
          price_amt2: val.price_amt2.toString(),
          price_amt3: val.price_amt3.toString(),
          quantity1: val.quantity1.toString(),
          quantity2: val.quantity2.toString(),
          quantity3: val.quantity3.toString(),
        })
        that.hasEndDate = (that.info.end_dt === '9998-12-31' || that.info.end_dt === (new Date()).toLocaleDateString()) ? false : true
        that.open()
      })
      window.Vue.$on('drugSelected', (item) => {
        if (item.NDC) {
          that.info.drug_id = item.NDC
        } else {
          that.info.drug_id = item.GPI
        }
        that.back()
      })
    },
    methods: {
      onTextChanged: function() {
        this.$refs.form.validate()
      },
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      },
      save: function () {
        if (!this.hasEndDate) this.info.end_dt = '12/31/9998'
        const that = this
        if (this.$refs.form.validate()) {
          priceItServices.UpdateMppDrugList(this.info, this.$store.state.user).then(function (res) {
            if (res === '0') {
              window.Vue.$emit('snackbar', 'success', 'Mpp Drug Updated!')
              that.isDisabledSave = true
              that.close()
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
              that.isDisabledSave = true
              that.close()
            }
          })
        }
      },
      find: function () {
        this.mppOrDrug = 'drug'
      },
      back: function () {
        this.mppOrDrug = 'mpp'
      }
    }
  }
</script>

<style lang="scss">

</style>
