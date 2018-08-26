<template>
  <main>
    <v-layout row wrap>
      <v-flex xs6>
        <v-card-text class="pb-0">
          <v-text-field label="NABP" v-model="wholesalerProvider['NABP']" required disabled>
          </v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs6>
        <v-card-text class="pb-0">
          <v-text-field label="NPI" v-model="wholesalerProvider['NPI']" required disabled>
          </v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs6>
        <v-card-text class="pt-0">
          <v-text-field label="Account#" v-model="wholesalerProvider['Account#']" required>
          </v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs6>
        <v-card-text class="pt-0">
          <v-text-field label="Name" v-model="wholesalerProvider['Name']" required disabled>
          </v-text-field>
        </v-card-text>
      </v-flex>
    </v-layout>
    <v-divider></v-divider>
    <v-card-text class="text-xs-center py-0">
      <v-btn class="primary" @click.native="update()" :disabled="updateBtnDisabled">Save <i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      <v-btn @click.native="cancel()">Cancel</v-btn>
    </v-card-text>
  </main>
</template>
<script>
  import pcnServices from '../../../../services/pcn/pcnServices'
  import store from '../../../../store'

  export default {
    props: ['pcc', 'item', 'refresh', 'cancel'],
    data() {
      return {
        wholesalerProvider: {},
        updateBtnDisabled: true,
        saveLoading: false,
      }
    },
    mounted() {
      this.wholesalerProvider = {...this.item}
    },
    methods: {
      update: function () {
        const that = this
        const info = Object.assign({}, that.wholesalerProvider)
        const user = that.$store.state.user
        const pcc = that.pcc
        pcnServices.updateProviderWholesaler(info, user, pcc).then(function (res) {
          that.saveLoading = true
          if (res === "0") {
            that.saveLoading = false
            that.updateBtnDisabled = true
            window.Vue.$emit('snackbar', 'success', 'Wholesaler Updated !')
            that.refresh()
            that.cancel()
          } else {
            that.saveLoading = false
            that.updateBtnDisabled = true
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      }
    },
    watch: {
      wholesalerProvider: {
        handler(newVal, oldVal) {
          if(newVal && oldVal && newVal === oldVal)
          this.updateBtnDisabled = false
        },
        deep: true,
      },
      item: {
        handler(newVal, oldVal) {
          this.wholesalerProvider = {...this.item}
        },
        deep: true,
      }
    }
  }
</script>
<style lang="stylus">
</style>
