<template>
  <main>
    <v-card-text class="my-scroll-enabled-1" v-if="providerAddBox">
      <v-layout row wrap>
        <v-flex xs3></v-flex>
        <v-flex xs4>
          <v-text-field label="NABP" v-model="wholesalerProvider['NABP']" required disabled>
          </v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn class="primary" @click.native="showFinder()" :disabled="disableShowFinderBtn">Find</v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs4 class="pr-3">
          <v-text-field label="NPI" v-model="wholesalerProvider['NPI']" required disabled>
          </v-text-field>
        </v-flex>
        <v-flex xs4 class="pl-3 pr-3">
          <v-text-field label="Account#" v-model="wholesalerProvider['Account#']" required>
          </v-text-field>
        </v-flex>
        <v-flex xs4 class="pl-3">
          <v-text-field label="Name" v-model="wholesalerProvider['Name']" required disabled>
          </v-text-field>
        </v-flex>
      </v-layout>
      <small class="red--text">Please enter a value in the "Account#"</small>
    </v-card-text>
    <finder
      v-if="showFinderBox==true"
      :select="select"
      :back="back">
    </finder>
    <v-layout row wrap v-else>
      <v-flex xs12>
        <v-divider class="mt-2"></v-divider>
        <v-card-text class="text-xs-center py-0">
          <v-btn class="primary" @click.native="addWholesalerProvider()" :disabled="disableSaveBtn">Save <i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
          <v-btn @click.native="cancel()">Cancel</v-btn>
        </v-card-text>
      </v-flex>
    </v-layout>
  </main>
</template>
<script>
  import pcnServices from '../../../../services/pcn/pcnServices'
  import store from '../../../../store'
  import finder from './Finder/Finder.vue'

  export default {
    props: ['pcc', 'item', 'refresh', 'cancel'],
    components: {
      finder
    },
    data() {
      return {
        wholesalerProvider: {},
        showFinderBox: false,
        providerAddBox: true,
        disableShowFinderBtn: false,
        disableSaveBtn: true,
        saveLoading: false,
      }
    },
    mounted() {
      this.wholesalerProvider = {...this.item}
    },
    methods: {
      addWholesalerProvider: function () {
        const that = this
        const info = Object.assign({}, that.wholesalerProvider)
        const user = that.$store.state.user
        const pcc = that.pcc
        pcnServices.addProviderWholesaler(info, user, pcc).then(function (res) {
          that.saveLoading = true
          if (res === "0") {
            that.saveLoading = false
            that.refresh()
            that.cancel()
          } else {
            that.saveLoading = false
          }
        }).catch(function (res) {
          that.saveLoading = false
          alert(res.body['Message'])
        })
      },
      showFinder: function () {
        this.disableShowFinderBtn = true
        this.showFinderBox = true
        this.providerAddBox = false
      },
      select: function (provider) {
        this.wholesalerProvider = {...provider}
        this.showFinderBox = false
        this.providerAddBox = true
        this.disableShowFinderBtn = false
      },
      back: function () {
        this.showFinderBox = false
        this.providerAddBox = true
        this.disableShowFinderBtn = false
        this.disableSaveBtn = true
      },
    },
    watch: {
      wholesalerProvider: {
        handler(newVal, oldVal) {
          if (this.wholesalerProvider.hasOwnProperty("NABP") && this.wholesalerProvider.hasOwnProperty("NPI") && this.wholesalerProvider.hasOwnProperty("Name") && this.wholesalerProvider.hasOwnProperty("Account#") && this.wholesalerProvider['Account#'].length > 0)
            this.disableSaveBtn = false
          else
            this.disableSaveBtn = true
        },
        deep: true,
      },
      item: {
        handler(newVal, oldVal) {
          this.wholesalerProvider = {...this.item}
          this.disableShowFinderBtn = false
          this.showFinderBox = false
//          this.providerAddBox = true
        },
        deep: true,
      }
    }
  }
</script>
<style lang="stylus">
</style>
