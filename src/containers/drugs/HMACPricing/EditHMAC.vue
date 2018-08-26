<template>
  <v-layout row justify-center>
    <Vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="true"
      :closeOnClickMask="true"
      :width="1000"
      :height="0"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          Edit HMAC Pricing
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form">
        <v-container fluid class="my-sub-scroll-enabled px-0 py-0">
          <v-layout row wrap>
            <v-flex xs6>
              <v-card-text>
                <v-text-field name="Generic DID" label="Generic DID" v-model="info['Generic DID']"
                              :disabled="true"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text>
                <v-text-field name="GCN" label="GCN" v-model="info.GCN" :disabled="true"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text>
                <v-text-field name="Name" label="Drug Name" v-model="info.Name" :disabled="true"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text>
                <v-text-field name="Strength" label="Strength" v-model="info.Strength" :disabled="true"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text>
                <v-text-field name="Price" label="Price" v-model="info.Price" :rules="[rules.feeRules]" :counter="4"
                              type="number"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text>
                <v-radio-group v-model="info.Status" row>
                  <v-radio label="Active" value="A"></v-radio>
                  <v-radio label="Inactive" value="I"></v-radio>
                </v-radio-group>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-actions class="d-block text-xs-center">
          <v-btn color="primary-color" @click.native="save" :disabled="isDisabledSave">Save</v-btn>
          <v-btn @click.native="close()">Close</v-btn>
        </v-card-actions>
      </v-form>
    </Vodal>
  </v-layout>
</template>
<script>
  import Vodal from '../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import drugServices from '../../../services/drug/drugServices'

  export default {
    name: 'edit-hmac',
    data() {
      return {
        type: null,
        info: {},
        show: false,
        search: [],
        selectedValue: {},
        filter: 'Active',
        isDisabledSave: true,
        row: null,
        saveLoading: false,
        rules: {
          required: (value) => !!value || 'Required.',
          feeRules: (v) => {
            return v <= 9999.99 || 'The price must be a numeric value between 0 and 9999.9999'
          },
        },
      }
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        },deep: true
      },
    },
    components: {
      Vodal
    },
    mounted() {
      console.log('------  Drugs / HMACPricing / Edit HMAC mounted ------')
      const that = this
      window.Vue.$on('openEditHMAC', function (val) {
        that.info = val
        that.open()
      })
    },
    methods: {
      setValues: function (data) {
      },
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      },
      save: function () {
        const that = this
        const data = {
          pcc: this.$store.state.pcn.pcc,
          genericDid: this.info['Generic DID'],
          price: this.info.Price,
          status: this.info.Status,
          updated_by: this.$store.state.user.session_uid,
        }
        if (this.$refs.form.validate()) {
          drugServices.UpdateHMACList(data).then(function (res) {
            that.saveLoading = true
            if (res === '0') {
              that.saveLoading = false
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'HMAC Data Updated!')
              window.Vue.$emit('reloadHMACList')
            } else {
              that.saveLoading = false
              window.Vue.$emit('snackbar', 'warning', res)
            }
            that.close()
          });
        }
      },
    }
  }
</script>

<style lang="scss">

</style>
