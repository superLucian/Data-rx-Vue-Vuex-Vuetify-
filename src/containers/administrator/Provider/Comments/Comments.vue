<template>
  <main>
    <v-container fluid class="my-sub-scroll-enabled">
      <v-layout>
        <v-flex xs12>
          <v-text-field
            label="Comments"
            v-model="info.comment_txt"
            textarea
          ></v-text-field>
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
    name: 'Provider-comments',
    props: ['type', 'data'],
    data() {
      return {
        info: this.$store.state.selectedProvider,
        isDisabledSave: true,
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
      console.log('----------- Administrator / Provider / Edit / Comments_tab mounted! -----------')
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
              window.Vue.$emit('snackbar', 'success', ' Provider Comments Updated!')
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      clear: function () {
        if (this.type === 'add') {
          this.info = {
            comment_txt: ''
          }
        } else {
          const that = this
          providerServices.getProvider({pid: this.$route.params.pid}).then(function (res) {
            store.commit('UPDATE_SELECTED_PROVIDER', res.provider[0])
            that.info = that.$store.state.selectedProvider
          })
        }
        this.isDisabledSave = true
        store.commit('UPDATE_STATUS', true)
      },
    }
  }
</script>
<style lang="stylus">
</style>
