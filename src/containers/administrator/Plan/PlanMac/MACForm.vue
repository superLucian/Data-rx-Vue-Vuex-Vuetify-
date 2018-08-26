<template>
  <Vodal
    :show="show"
    animation="zoom"
    :closeButton="false"
    :width="900"
    :height="500"
    :closeOnClickMask="true"
    v-on:hide="close"
  >
    <v-toolbar>
      <v-icon class="white--text">fa-archive</v-icon>
      <v-toolbar-title class="white--text">
        {{ showFind ? 'MAC Find' : 'Plan MAC' }}
      </v-toolbar-title>
    </v-toolbar>
    <v-layout>
      <v-card-text class="my-sub-scroll-enabled py-0 px-0" v-if="mode==='edit'">
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text class="pb-0">
              <v-text-field
                name="plan-id"
                label="Plan"
                v-model="planMac['PlanId']"
                disabled
              ></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="pb-0">
              <v-text-field
                name="network"
                label="Network"
                v-model="planMac['Network']"
                disabled
              ></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs5>
            <v-card-text class="py-0">
              <v-text-field
                name="description"
                label="MAC Description"
                v-model="planMac['Description']"
                disabled
              ></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="py-0">
              <v-text-field
                name="mac-fee"
                label="MAC Fee"
                v-model="planMac['MacFee']"
                type="number"
                step="0.01"
                min="0"
                :rules="[rules.feeRules]" :counter="3"
              ></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="py-0">
              <v-text-field
                name="dispense-fee"
                label="Dispense Fee"
                v-model="planMac['DispenseFee']"
                type="number"
                step="0.01"
                min="0"
                :rules="[rules.feeRules]" :counter="3"
              ></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <date-picker
                v-model="planMac['EffectiveStartDate']"
                label="Start Date"
              ></date-picker>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-3">
              <v-checkbox label="Group Mac has an end date?" v-model="hasEndDate"></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs4 v-if="hasEndDate">
            <v-card-text class="py-0">
              <date-picker
                v-model="planMac['EffectiveEndDate']"
                label="End Date"
              ></date-picker>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-checkbox label="Active"
                          v-model="planMac['IsActive']"></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-checkbox label="340B MAC?" v-model="planMac['Mac'].Is340B"></v-checkbox>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-card-text class="my-sub-scroll-enabled px-0 py-0" v-if="mode==='add'">
        <v-layout row wrap v-if="!showFind">
          <v-flex xs6>
            <v-card-text class="pb-0">
              <v-text-field
                name="plan-id"
                label="Plan"
                v-model="selectedMac['PlanId']"
                disabled
              ></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="pb-0">
              <v-select
                v-bind:items="$store.state.planSetupData.network_list"
                v-model="selectedMac['NetworkId']"
                label="Network"
                bottom
                :item-text="'Network Desc'"
                :item-value="'Network ID'"
              >
              </v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs10>
            <v-card-text class="py-0">
              <v-text-field
                name="description"
                label="MAC Description"
                v-model="selectedMac['Description']"
                disabled
              ></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs2>
            <v-btn color="primary-color" @click.native="find">find</v-btn>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field
                name="mac-fee"
                label="MAC Fee"
                v-model="selectedMac['MacFee']"
                type="number"
                step="0.01"
                min="0"
                :rules="[rules.feeRules]" :counter="3"
              ></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-text-field
                name="dispense-fee"
                label="Dispense Fee"
                v-model="selectedMac['DispenseFee']"
                type="number"
                step="0.01"
                min="0"
                :rules="[rules.feeRules]" :counter="3"
              ></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <date-picker
                v-model="selectedMac['EffectiveStartDate']"
                label="Start Date"
              ></date-picker>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text>
              <v-checkbox label="Group Mac has an end date?" v-model="hasEndDate"></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs4 v-if="hasEndDate">
            <v-card-text class="py-0">
              <date-picker
                v-model="selectedMac['EffectiveEndDate']"
                label="End Date"
              ></date-picker>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-checkbox :label="selectedMac['IsActive'] ? 'Active' : 'InActive'"
                          v-model="selectedMac['IsActive']"></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <v-checkbox label="340B MAC?" v-model="selectedMac['Is340B']"></v-checkbox>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card-text>
    </v-layout>
    <MacFind v-bind:select-mac="selectMac" :close="closeFind" v-show="showFind"></MacFind>
    <v-card-actions v-show="!showFind" class="d-block text-xs-center py-0 pb-2">
      <v-card-text class="pt-0 px-0">
        <v-divider></v-divider>
      </v-card-text>
      <v-btn v-if="mode=='edit'" color="primary-color" @click.native="save(planMac)">Save<i v-if="loading"></i>
      </v-btn>
      <v-btn v-if="mode=='add'" color="primary-color" @click.native="save(selectedMac)" :disabled="isSaveDisabled">
        Save<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      <v-btn @click.native="close">Close</v-btn>
    </v-card-actions>
  </Vodal>
</template>

<script>
  import Vodal from '../../../../components/common/Vodal.vue'
  import MacFind from './MACFindView.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import DatePicker from "../../../../components/common/DatePicker.vue"

  export default {
    name: 'plan-mac-form',
    props: ['show', 'save', 'close', 'mode', 'planMac', 'loading'],
    data() {
      return {
        hasEndDate:false,
        selectedMac: {
          "PlanId": this.$store.state.selectedPlan.plan_id,
          "GroupId": this.$store.state.selectedPlan.group_id,
          "NetworkId": -1,
          "EffectiveStartDate": (new Date()).toLocaleDateString(),
          "EffectiveEndDate": '12/31/9998',
          "Is340B": false,
          "IsActive": true
        },
        showFind: false,
        rules: {
          required: (value) => !!value || 'Required.',
          feeRules: (v) => {
            return v <= 999.9 || 'Limit must be less more than 1000'
          },
        },
        isSaveDisabled: true
      }
    },
    components: {Vodal, MacFind, DatePicker},
    watch: {
      planMac: function (v) {
        this.hasEndDate = !!v['EffectiveEndDate'] && v['EffectiveEndDate'] !== '12/31/9998'
      },
      hasEndDate: function (v) {
        if(!v) {
          this.planMac['EffectiveEndDate'] = '12/31/9998'
        }
      },
      selectedMac: {
        handler: function (v) {
          if (v.hasOwnProperty('Description') && v['Description']) {
            this.isSaveDisabled = false
          } else {
            this.isSaveDisabled = true
          }
        }, deep: true
      }
    },
    mounted() {
      console.log('----- Administrator / Plan / Plan Mac /Form mounted -----')
    },
    methods: {
      find() {
        this.showFind = true
      },
      selectMac(v) {
        if (v) {
          this.selectedMac = Object.assign({}, {...this.selectedMac}, {...v})
          this.showFind = false
        } else {
          window.Vue.$emit('snackbar', 'warning', 'Please select one MAC!')
        }
      },
      closeFind() {
        this.showFind = false
      }
    },
    events: {}
  }
</script>

<style lang="stylus">
  .planMac-form-container {
    max-height: calc(100vh - 80px);
    position: relative;
    overflow: auto;

    .card__actions {
      padding: 0 0 5px 20px;
    }
  }

  .hasEndDate-container {
    padding 0
  }
</style>
