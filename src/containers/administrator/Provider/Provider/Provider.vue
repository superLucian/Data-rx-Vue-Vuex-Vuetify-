<template>
  <v-form ref="form">
    <v-container fluid class="px-0 my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs4 class="px-3">
          <v-text-field label="NABP" v-model="info.nabp" counter="7"
                        :rules="[rules.required]" v-if="type !== 'add'" disabled required></v-text-field>
          <v-text-field label="NABP" v-model="info.nabp" counter="7"
                        :rules="[rules.required, rules.nabp]" v-else required></v-text-field>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field label="NPI" v-model="info.npi" counter="11"
                        :rules="[rules.required]" v-if="type !== 'add'" disabled required></v-text-field>
          <v-text-field label="NPI" v-model="info.npi" counter="11"
                        :rules="[rules.required, rules.npi]" v-else required></v-text-field>
        </v-flex>
        <v-flex xs4 class="py-1 px-5">
          <v-radio-group row v-model="info.status_cd">
            <v-radio value="A" label="Active" light></v-radio>
            <v-radio value="I" label="Inactive" light></v-radio>
          </v-radio-group>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field name="Nam_text" label="Name" v-model="info.name_txt"
                        :rules="[rules.required]" required></v-text-field>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field label="Store" v-model="info.store_id"></v-text-field>
        </v-flex>
        <v-flex xs4 class="py-4 px-5">
          <v-checkbox v-bind:label="`Open 24hrs:`" v-model="info.open_24_hours_ind"
                      true-value="Y" false-value="N"></v-checkbox>
        </v-flex>
        <v-flex xs12 v-if="type === 'add'">
          <v-card-text>
            <v-select v-bind:items="chain_items" v-model="info.chain_value" label="Chain" item-text="Chain Name"
                      item-value="Chain ID"></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-text-field label="Phone" v-model="info.phone_num" :rules="[rules.required]"
                        required></v-text-field>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-text-field label="Fax" v-model="info.fax_num"></v-text-field>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field label="Email" v-model="info.email_addr_txt" ></v-text-field>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field label="Web" v-model="info.web_url_txt"></v-text-field>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field label="Fed License" v-model="info.fed_license_txt"></v-text-field>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-text-field label="Tax" v-model="info.fed_tax_id"></v-text-field>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field label="State License" v-model="info.state_license_txt"></v-text-field>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-text-field label="Tax" v-model="info.state_tax_id"></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
    <template v-if="type !== 'add'">
      <v-divider class="mt-2"></v-divider>
      <v-flex xs12>
        <small class="red--text">*indicates required field</small>
      </v-flex>
      <v-card-actions>
        <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
        <v-spacer></v-spacer>
        <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">update<i v-if="loading"
                                                                                        class="fa fa-circle-o-notch fa-spin fa-fw"></i>
        </v-btn>
      </v-card-actions>
    </template>
  </v-form>
</template>
<script>
  import providerServices from '../../../../services/provider/providerServices'
  import store from '../../../../store'

  export default {
    name: 'provider',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedProvider,
        isDisabledSave: true,
        chain_items: [],
        mailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phonePattern: /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/,
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            if (!!value) {
              const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.(XXX@XXX.com)'
            } else {
              return ''
            }
          },
          phone: (value) => {
            if (!!value) {
              const pattern = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
              return pattern.test(value) || 'Invalid Phone Number.(XXX-XXX-XXXX)'
            } else {
              return 'Required'
            }
          },
          nabp: (value) => value.length <=7 || 'The length of NABP must be less than 7.',
          npi: (value) => value.length <=11 || 'The length of NPI must be less than 11.',
        },
        loading: false
      }
    },
    components: {},
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
            this.isDisabledSave = false
            store.commit('UPDATE_STATUS', false)
          }
        },
        deep: true
      },
      data: {
        handler: function (newData, oldData) {
          this.info = newData
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        },
        deep: true
      }
    },
    mounted() {
      console.log('----------- Administrator / Provider / Edit / Provider_tab mounted! -----------')
      this.isDisabledSave = this.$store.state.isUpdateStatus
      const that = this
      providerServices.getChainList({}).then(function (res) {
        that.chain_items = res.chain_list
        that.chain_items.unshift({'Chain ID': 0, 'Chain Name': 'No Chain...'})
      })

      this.$refs.form.validate()
    },
    methods: {
      save: function () {
        const that = this
        if (this.$refs.form.validate()) {
          that.loading = true
          if (this.info.contact_fname === '' || this.info.contact_lname === '') {
            this.$router.push({path: 'contact'})
          } else {
            providerServices.updateProvider(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
              if (res === '0') {
                that.loading = false
                that.isDisabledSave = true
                store.commit('UPDATE_STATUS', true)
                store.commit('UPDATE_SELECTED_PROVIDER', that.info)
                window.Vue.$emit('snackbar', 'success', 'Provider Updated!')
              } else {
                window.Vue.$emit('snackbar', 'warning', res)
              }
            })
          }
        }
      },
      clear: function () {
        if (this.type === 'add') {
          this.info = {
            nabp: '',
            npi: '',
            status_cd: '',
            name_txt: '',
            store_id: '',
            open_24_hours_ind: '',
            chain_value: '',
            phone_num: '',
            fax_num: '',
            email_addr_txt: '',
            web_url_txt: '',
            fed_license_txt: '',
            fed_tax_id: '',
            state_license_txt: '',
            state_tax_id: '',
          }
          this.$refs.form.validate()
        } else {
          const that = this
          providerServices.getProvider({pid: this.$route.params.pid}).then(function (res) {
            store.commit('UPDATE_SELECTED_PROVIDER', res.provider[0])
            that.info = that.$store.state.selectedProvider
          })
        }
        this.isDisabledSave = true
        this.$refs.form.validate()
        store.commit('UPDATE_STATUS', true)
      }
    }
  }
</script>
<style lang="stylus">
</style>
