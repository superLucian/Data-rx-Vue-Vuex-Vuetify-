<template>
  <main>
    <v-container fluid class="px-0 my-sub-scroll-enabled">
      <v-layout row wrap>
        <v-flex xs6 class="px-3">
          <v-text-field label="ADDRESS1" v-model="info.loc_addr1_txt"></v-text-field>
        </v-flex>
        <v-flex xs6 class="px-3">
          <v-text-field label="ADDRESS2" v-model="info.loc_addr2_txt"></v-text-field>
        </v-flex>
        <v-flex xs6 class="px-3">
          <v-text-field label="CITY" v-model="info.loc_city_txt"></v-text-field>
        </v-flex>
        <v-flex xs3 class="px-3">
          <v-select
            v-bind:items="state_items"
            v-model="info.loc_state_cd"
            label="State"
            item-value="text"
          ></v-select>
        </v-flex>
        <v-flex xs3 class="px-3">
          <v-text-field label="Zip Code" v-model="info.loc_zip_cd"></v-text-field>
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
  </main>
</template>
<script>
  import providerServices from '../../../../services/provider/providerServices'
  import store from '../../../../store'

  export default {
    name: 'Provider-location',
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
        loading: false
      }
    },
    components: {},
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData){
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
      console.log('----------- Administrator / Provider / Edit / Location_tab mounted! -----------')
      this.isDisabledSave = this.$store.state.isUpdateStatus
    },
    methods: {
      save: function () {
        const that = this
        that.loading = true
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
          providerServices.updateProvider(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
            if (res === '0') {
              that.loading = false
              that.isDisabledSave = true
              store.commit('UPDATE_STATUS', true)
              store.commit('UPDATE_SELECTED_PROVIDER', that.info)
              window.Vue.$emit('snackbar', 'success', 'Provider Location Updated!')
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      clear: function () {
        if (this.type === 'add') {
          this.info = {
            loc_addr1_txt: '',
            loc_addr2_txt: '',
            loc_city_txt: '',
            loc_state_cd: '',
            loc_zip_cd: ''
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
