<template>
  <v-form ref="form">
    <v-container fluid class="px-0 my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs4 class="px-3">
          <v-text-field label="First Name*" v-model="info.contact_fname" :rules="[rules.required]"></v-text-field>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field label="Last Name*" v-model="info.contact_lname" :rules="[rules.required]"></v-text-field>
        </v-flex>
        <v-flex xs12></v-flex>
        <v-flex xs3 class="px-3">
          <v-text-field label="ADDRESS1" v-model="info.contact_addr1_txt"></v-text-field>
        </v-flex>
        <v-flex xs3 class="px-3">
          <v-text-field label="ADDRESS2" v-model="info.contact_addr2_txt"></v-text-field>
        </v-flex>
        <v-flex xs3 class="px-3">
          <v-text-field label="CITY" v-model="info.contact_city_txt"></v-text-field>
        </v-flex>
        <v-flex xs1 class="px-3">
          <v-select
            v-bind:items="state_items"
            v-model="info.contact_state_cd"
            label="State"
            item-value="text"
          ></v-select>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-text-field label="Zip Code" v-model="info.contact_zip_cd"></v-text-field>
        </v-flex>

        <v-flex xs2 class="px-3">
          <v-text-field label="Phone" v-model="info.contact_phone_num"></v-text-field>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-text-field label="Fax" v-model="info.contact_fax_num"></v-text-field>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-text-field label="Cell" v-model="info.contact_cell_num"></v-text-field>
        </v-flex>
        <v-flex xs2 class="px-3">
          <v-text-field label="Page" v-model="info.contact_pager_num"></v-text-field>
        </v-flex>
        <v-flex xs4 class="px-3">
          <v-text-field label="Email" v-model="info.contact_email_addr_txt"></v-text-field>
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
                                                                                        class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      </v-card-actions>
    </template>
  </v-form>
</template>
<script>
  import providerServices from '../../../../services/provider/providerServices'
  import store from '../../../../store'

  export default {
    name: 'provider-contact',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedProvider,
        isDisabledSave: true,
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
        },
        deep: true
      }
    },
    mounted() {
      console.log('----------- Administrator / Provider / Edit / Contact_tab mounted! -----------')
      this.$refs.form.validate()
      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      save: function () {
        const that = this

        if (this.info.nabp === ''
          || this.info.npi === ''
          || this.info.name_txt === ''
          || this.info.phone_num === ''
          || this.info.email_addr_txt === ''
        ) {
          this.$router.push({path: 'provider'})
        } else if (this.info.contact_fname === '' || this.info.contact_lname === '') {
          this.$router.push({path: 'contact'})
        } else {
          if (this.$refs.form.validate()) {
            that.loading = true
            providerServices.updateProvider(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
              if (res === '0') {
                that.loading = false
                that.isDisabledSave = true
                store.commit('UPDATE_STATUS', true)
                store.commit('UPDATE_SELECTED_PROVIDER', that.info)
                window.Vue.$emit('snackbar', 'success', 'Provider Contact Updated!')
              } else {
                that.loading = false
                window.Vue.$emit('snackbar', 'warning', res)
              }
            })
          }
        }
      },
      clear: function () {
        if (this.type === 'add') {
          this.info = {
            contact_fname: '',
            contact_lname: '',
            contact_addr1_txt: '',
            contact_addr2_txt: '',
            contact_city_txt: '',
            contact_state_cd: '',
            contact_zip_cd: '',
            contact_phone_num: '',
            contact_fax_num: '',
            contact_cell_num: '',
            contact_pager_num: '',
            contact_email_addr_txt: '',
          }
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
