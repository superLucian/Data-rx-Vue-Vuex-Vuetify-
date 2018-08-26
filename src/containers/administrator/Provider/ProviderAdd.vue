<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add Provider</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-container fluid>
      <v-tabs v-model="active">
        <v-tabs-bar class="transparent">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab.name"
            :href="tab.path"
            ripple
          >
            {{ tab.name }}
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-items>
          <v-tabs-content key="provider" id="provider">
            <provider type="add" :data="info"></provider>
          </v-tabs-content>
          <v-tabs-content key="location" id="location">
            <provider-location type="add" :data="info"></provider-location>
          </v-tabs-content>
          <v-tabs-content key="mail_address" id="mail_address">
            <provider-mail-address type="add" :data="info"></provider-mail-address>
          </v-tabs-content>
          <v-tabs-content key="contact" id="contact">
            <provider-contact type="add" :data="info"></provider-contact>
          </v-tabs-content>
          <v-tabs-content key="comments" id="comments">
            <provider-comments type="add" :data="info"></provider-comments>
          </v-tabs-content>
        </v-tabs-items>
      </v-tabs>
      <v-layout>
        <v-card-text class="py-0 px-1">
          <v-divider class="mt-2"></v-divider>
          <small class="red--text">*indicates required field</small>
          <v-card-actions>
            <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">create<i v-if="loading"
                                                                                            class="fa fa-circle-o-notch fa-spin fa-fw"></i>
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
  import store from '../../../store'
  import providerServices from '../../../services/provider/providerServices'

  import Provider from './Provider/Provider.vue'
  import ProviderMailAddress from './MailAddress/MailAddress.vue'
  import ProviderLocation from "./Location/Location.vue";
  import ProviderContact from "./Contact/Contact.vue";
  import ProviderComments from "./Comments/Comments.vue";

  export default {
    name: 'Provider-add',
    data() {
      return {
        tabs: [{
          name: 'Provider',
          path: 'provider'
        }, {
          name: 'Location',
          path: 'location'
        }, {
          name: 'Mail Address',
          path: 'mail_address'
        }, {
          name: 'Contact',
          path: 'contact'
        }, {
          name: 'Comments',
          path: 'comments'
        }
        ],
        active: 'provider',
        info: {},
        isDisabledSave: true,
        loading: false
      }
    },
    components: {
      Provider,
      ProviderMailAddress,
      ProviderLocation,
      ProviderContact,
      ProviderComments
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        }, deep: true
      }
    },
    mounted() {
      console.log('----- Administrator / Provider Add mounted -----')
      this.info = {...this.$store.state.selectedProvider}
    },
    methods: {
      back: function () {
        store.commit('CLEAR', 'selectedProvider')
        store.commit('CLEAR', 'providerSetupData')
        this.$router.push({name: 'provider'})
      },
      save: function () {
        const that = this
        if (this.info.nabp === ''
          || this.info.npi === ''
          || this.info.name_txt === ''
          || this.info.phone_num === ''
          || this.info.email_addr_txt === ''
        ) {
          this.active = 'provider'
        } else if (this.info.contact_fname === '' || this.info.contact_lname === '') {
          this.active = 'contact'
        } else {
          this.info.created_dt = (new Date()).toLocaleDateString()
          that.loading = true
          providerServices.addProvider(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
            if (res === "0") {
              that.loading = false
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'Provider Add!')
              store.commit('CLEAR', 'selectedProvider')
              store.commit('CLEAR', 'providerSetupData')
              that.$router.push({name: 'provider'})
            } else {
              that.loading = false
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      clear: function () {
        this.info = {...this.$store.state.selectedProvider}
        this.isDisabledSave = true
      },
    }
  }
</script>
<style lang="stylus">
</style>
