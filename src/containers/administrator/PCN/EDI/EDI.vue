<template>
  <v-form ref="form">
    <v-layout row wrap>
      <v-flex xs12>
        <v-layout row wrap>
          <v-flex xs3></v-flex>
          <v-flex xs6 calss="pr-5 pl-5">
            <v-select label="Wholesaler" v-bind:items="wholesalerList" v-model="wholesalerID"
                      item-value="wholesaler_id" item-text="wholesaler_name">
            </v-select>
          </v-flex>
          <v-flex xs3></v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12>
        <v-subheader>EDI Settings</v-subheader>
        <v-divider class="mt-2"></v-divider>
        <v-layout row wrap>
          <v-flex xs9>
            <v-layout row wrap>
              <v-flex xs12>
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-card-text class="pb-0">
                      <v-text-field label="Sender ID" v-model="pcn['edi_sender_id']"
                                    :disabled="wholesalerDisabled" :rules="[rules.required]">
                      </v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="pb-0">
                      <v-text-field label="Task Name" v-model="pcn['edi_task_name']"
                                    :disabled="wholesalerDisabled" :rules="[rules.required]">
                      </v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="pb-0">
                      <v-text-field label="Reorder Pct" v-model="pcn['reorder_pct']" type="number"
                                    :disabled="wholesalerDisabled" :rules="[rules.required, rules.pctRules]"
                                    :counter="2">
                      </v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="py-0">
                      <v-text-field label="Retry Count" v-model="pcn['retry_count']" type="number"
                                    :disabled="wholesalerDisabled" :rules="[rules.required, rules.wholeRules]"
                                    :counter="4">
                      </v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="py-0">
                      <v-text-field label="Retry Delay" v-model="pcn['retry_delay']" type="number"
                                    :disabled="wholesalerDisabled" :rules="[rules.required, rules.wholeRules]"
                                    :counter="4">
                      </v-text-field>
                    </v-card-text>
                  </v-flex>
                  <v-flex xs4>
                    <v-card-text class="py-0">
                      <v-text-field label="Order Timeout" v-model="pcn['order_time_out']" type="number"
                                    :disabled="wholesalerDisabled" :rules="[rules.required, rules.wholeRules]"
                                    :counter="4">
                      </v-text-field>
                    </v-card-text>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-layout row wrap>
                  <v-flex xs6 class="pr-3 pl-3">
                    <v-text-field label="Base Directory" v-model="pcn['base_dir']"
                                  :disabled="wholesalerDisabled" :rules="[rules.required]">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs6 class="pr-3 pl-3">
                    <v-text-field label="Sent Directory" v-model="pcn['sent_dir']"
                                  :disabled="wholesalerDisabled" :rules="[rules.required]">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs12>
                <v-layout row wrap>
                  <v-flex xs3></v-flex>
                  <v-flex xs6>
                    <date-picker label="Auto Adjustment Start Date"></date-picker>
                  </v-flex>
                  <v-flex xs3></v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="pl-5">
              <p>
                Before stores can run claims and get replenishment orders, they must be in the list of providers both for the plan and for the wholesaler.
                <br>Please check that all stores on this screen are also setup as a provider in the plan edit screen.
              </p>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-layout row wrap v-if="type=='edit'">
      <v-flex xs12>
        <providerList :pcc="pcc"></providerList>
      </v-flex>
    </v-layout>
  </v-form>
</template>
<script>
  import providerList from './../Provider/providerList.vue'
  import DatePicker from "../../../../components/common/DatePicker.vue"

  export default {
    props: ['type', 'pcc', 'pcn', 'wholesalerList', 'wholesaler', 'tab', 'valid'],
    components: {
      DatePicker,
      providerList
    },
    data() {
      return {
        wholesalerDisabled: true,
        wholesalerID: '',
        rules: {
          required: (value) => !!value || 'Required.',
          pctRules: (v) => v <= 100 || 'Reorder Pct must be less more than 100 %.',
          wholeRules: (v) => v <= 9999 || 'This field Limit must be less more than 9999',
        },
      }
    },
    watch: {
      pcn: {
        handler: function () {
          this.setValidationStatus()
        },
        deep: true
      },
      wholesalerID: function () {
        this.pcn['wholesaler_id'] = this.wholesalerID
        this.wholesalerDisabled = this.pcn['wholesaler_id'] <= -1
        this.setValidationStatus()
      },
      valid: function () {
        this.validate()
      },
      wholesaler: function () {
        this.wholesalerID = this.wholesaler
      }
    },
    mounted() {
      this.setValues()
      this.setValidationStatus()
      this.validate()
    },
    methods: {
      setValues: function () {
        this.wholesalerDisabled = this.pcn['wholesaler_id'] <= -1
        this.wholesalerID = this.wholesaler
      },
      setValidationStatus: function () {
        if (this.pcn['wholesaler_id'] <= -1) {
          this.tab['validated'] = true
        } else {
          this.tab['validated'] = this.rules.required(this.pcn['edi_sender_id'] === true) &&
            this.rules.required(this.pcn['edi_task_name'] === true) &&
            this.rules.required(this.pcn['reorder_pct'] === true) &&
            this.rules.required(this.pcn['retry_count'] === true) &&
            this.rules.required(this.pcn['retry_delay'] === true) &&
            this.rules.required(this.pcn['order_time_out'] === true) &&
            this.rules.required(this.pcn['base_dir'] === true) &&
            this.rules.required(this.pcn['sent_dir'] === true)
        }
      },
      validate: function () {
        if (!this.valid && !this.tab['validated']) this.$refs.form.validate()
      }
    },
  }
</script>
<style lang="stylus">
</style>
