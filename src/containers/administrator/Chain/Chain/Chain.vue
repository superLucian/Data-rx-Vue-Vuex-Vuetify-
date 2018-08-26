<template>
  <v-form ref="form">
    <v-layout row wrap class="form-scroll-enabled" v-bind:class="{ add: type === 'add' }">
      <v-flex xs6>
        <v-layout row wrap>
          <v-card-text>
            <v-flex xs12><h5>Chain</h5></v-flex>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <v-card-text>
                  <v-text-field label="Name*" v-model="info['Chain Name']" :rules="[rules.required]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text>
                  <v-text-field label="Reference ID" v-model="info['Reference ID']"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6 v-if="type !== 'add'">
                <v-card-text>
                  <v-radio-group v-model="info.Status" row>
                    <v-radio label="Active" value="A"></v-radio>
                    <v-radio label="Inactive" value="I"></v-radio>
                  </v-radio-group>
                </v-card-text>
              </v-flex>

              <v-flex xs12>
                <v-card-text class="py-0">
                  <v-text-field
                    name="description"
                    label="Desc:"
                    v-model="info.Description"
                    textarea
                  ></v-text-field>
                </v-card-text>
              </v-flex>

            </v-layout>
          </v-card-text>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <v-layout row wrap>
          <v-card-text>
            <v-flex xs12><h5>Address</h5></v-flex>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs6>
                <v-card-text>
                  <v-text-field label="Address*" v-model="info['Address 1']" :rules="[rules.required]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text>
                  <v-text-field label="" v-model="info['Address 2']"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs9>
                <v-card-text>
                  <v-text-field label="City*" v-model="info.City" :rules="[rules.required]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <v-select
                    v-bind:items="state_items"
                    v-model="info.State"
                    label="State"
                    item-value="text"
                  ></v-select>
                </v-card-text>
              </v-flex>
              <v-flex xs6>
                <v-card-text>
                  <v-text-field label="Zip Code*" v-model="info.Zip" :rules="[rules.required]"></v-text-field>
                </v-card-text>
              </v-flex>
              <v-flex xs12>
                <v-card-text>
                  <v-text-field label="Contact" v-model="info.Contact"></v-text-field>
                </v-card-text>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-layout>
      </v-flex>
    </v-layout>
    <v-divider class="mt-2"></v-divider>
    <small class="red--text">*indicates required field</small>
    <v-card-actions>
      <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
      <v-spacer></v-spacer>
      <v-btn class="primary" @click.native="save" :disabled="isDisabledSave" v-if="type === 'add'">Create<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      <v-btn class="primary" @click.native="save" v-else :disabled="isDisabledSave">update<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
    </v-card-actions>
  </v-form>
</template>
<script>
  import chainServices from '../../../../services/chain/chainServices'
  import store from '../../../../store'

  export default {
    name: 'chain',
    props: ['type'],
    data() {
      return {
        info: {},
        isDisabledSave: true,
        chain_items: [],
        row: null,
        state_items: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU',
          'HI', 'ID', 'IL', 'IN', 'IA', 'NC', 'PR', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
          'MI', 'MN', 'MS', 'MO', 'RI', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'XA', 'WV', 'WI', 'WY'
        ],
        rules: {
          required: (value) => !!value || 'Required.'
        },
        loading: false
      }
    },
    components: {},
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        }, deep: true
      }
    },
    mounted() {
      console.log('----------- Administrator / Chain / Edit / Chain_tab mounted! -----------')
      const that = this
      if (this.type === 'add') {
        that.info = {
          'Chain Name': '',
          'Reference ID': '',
          'Description': '',
          'Contact': '',
          'Address 1': '',
          'Address 2': '',
          'City': '',
          'Zip': '',
          'Status': 'A',
        }
      } else {
        chainServices.getChain({chain_id: this.$route.params.cid}).then(function (res) {
          that.info = res.chain_list[0]
          that.isDisabledSave = true
        })
      }
    },
    methods: {
      save: function () {
        const that = this
        if (this.type === 'add') {
          if (this.$refs.form.validate()) {
            that.loading = true
            chainServices.addChain(this.info, this.$store.state.user).then(function (res) {
              if (res === 'No Errors') {
                that.loading = false
                that.isDisabledSave = true
                that.$router.push({name: 'chain'})
                window.Vue.$emit('snackbar', 'success', 'Chain Added!')
              } else {
                that.loading = false
                window.Vue.$emit('snackbar', 'warning', res)
              }
            })
          }
        } else {
          if (this.$refs.form.validate()) {
            that.loading = true
            chainServices.updateChain(this.info, this.$store.state.user).then(function (res) {
              if (res === '0') {
                that.loading = false
                that.isDisabledSave = true
                window.Vue.$emit('snackbar', 'success', 'Chain Updated!')
              } else {
                that.loading = false
                window.Vue.$emit('snackbar', 'warning', res)
              }
            })
          }
        }
      },
      clear: function () {
        const that = this
        if (this.type === 'add') {
          that.info = {
            'Chain Name': '',
            'Reference ID': '',
            'Description': '',
            'Contact': '',
            'Address 1': '',
            'Address 2': '',
            'City': '',
            'Zip': '',
            'Status': 'A',
          }
        } else {
          chainServices.getChain({chain_id: this.$route.params.cid}).then(function (res) {
            that.info = res.chain_list[0]
            that.isDisabledSave = true
          })
        }
        this.isDisabledSave = true
      }
    }
  }
</script>
<style lang="stylus">
</style>
