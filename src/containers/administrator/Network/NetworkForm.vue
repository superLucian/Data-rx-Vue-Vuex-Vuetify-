<template>
  <main>
    <v-form ref="form">
      <v-layout row wrap>
        <v-tabs v-model="activedTab">
          <v-tabs-bar class="white">
            <v-tabs-slider class="active-line"></v-tabs-slider>
            <v-tabs-item
              v-for="tab in tabs"
              :key="tab.name"
              :href="tab.path">
              {{ tab.name }}
            </v-tabs-item>
          </v-tabs-bar>
        </v-tabs>
        <!-- Network tab-->
        <v-container fluid v-if="activedTab=='network'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs2></v-flex>
            <v-flex xs8>
              <v-select
                label="Type"
                v-bind:items="networkTypeList"
                v-model="selectedNetworkType"
                item-value="type_cd"
                item-text="desc_txt"
                return-object
                required>
              </v-select>
            </v-flex>
            <v-flex xs2></v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6 class="pr-3">
              <v-text-field label="Desc" v-model="netdata['desc_txt']" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-select
                label="Contract"
                v-bind:items="contractList"
                v-model="selectedContract"
                item-value="contract_id"
                item-text="desc_txt"
                return-object>
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-subheader>Comments</v-subheader>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field label="Please Enter Comments Here" v-model="netdata['comment_txt']" multi-line>
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex xs8></v-flex>
            <v-flex xs4>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-radio-group row v-model="netdata['status_cd']">
                      <v-radio value="A" label="Active" light></v-radio>
                      <v-radio value="I" label="Inactive" light></v-radio>
                    </v-radio-group>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Providers tab -->
        <v-container fluid v-if="activedTab=='provider'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12>
              <providerList :netid="netid"></providerList>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Chains tab -->
        <v-container fluid v-if="activedTab=='chain'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12>
              <chainList :netid="netid" :desc="netdata['desc_txt']"></chainList>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Prescribers tab -->
        <v-container fluid v-if="activedTab=='prescriber'" class="form-scroll-enabled">
          <v-layout row wrap>
            <v-flex xs12>
              <prescriberList :netid="netid" :desc="netdata['desc_txt']"></prescriberList>
            </v-flex>
          </v-layout>
        </v-container>
        <!-- Save / Cancel Button -->
        <v-flex xs12>
          <v-divider class="mt-2"></v-divider>
          <small class="red--text">*indicates required field</small>
          <v-card-actions>
            <v-btn @click="clear()" :disabled="disableNetworkSaveBtn">Clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary-color" @click="save()" :disabled="disableNetworkSaveBtn" v-if="type=='new'">Create<i
              v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
            <v-btn color="primary-color" @click="save()" :disabled="disableNetworkSaveBtn" v-else>Update<i v-if="saveLoading"
                                                                                                     class="fa fa-circle-o-notch fa-spin fa-fw"></i>
            </v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
    </v-form>
  </main>
</template>
<script>
  import networkServices from '../../../services/network/networkServices'
  import store from '../../../store'
  import providerList from './Provider/providerList.vue'
  import chainList from './Chain/chainList.vue'
  import prescriberList from './Prescriber/prescriberList.vue'

  export default {
    name: 'network-form',
    props: ['type', 'netid'],
    components: {
      providerList,
      chainList,
      prescriberList
    },
    data() {
      return {
        tabs: [{name: 'Network', path: 'network'}],
        activedTab: "network",
        saveLoading: false,
        networkTypeList: [
          {type_cd: "R", desc_txt: "Retail Network"},
          {type_cd: "M", desc_txt: "Mail Order Network"},
          {type_cd: "D", desc_txt: "Prescriber Network"},
          {type_cd: "O", desc_txt: "Other"}],
        selectedNetworkType: {},
        contractList: [],
        selectedContract: {},
        netdata: {},
        disableNetworkSaveBtn: true,
        rules: {
          required: (value) => !!value || 'Required.'
        }
      }
    },
    watch: {
      netdata: {
        handler(newData, oldData) {
          if (newData && oldData && (newData === oldData)) {
            this.disableNetworkSaveBtn = false
          } else {
            this.disableNetworkSaveBtn = true
          }
        },
        deep: true,
      },
      activedTab: function () {
        this.disableNetworkSaveBtn = this.activedTab !== "network"
      }
    },
    mounted() {
      this.getStoreData()
      this.getNetworkData()
    },
    methods: {
      getStoreData: function () {
        this.contractList = this.$store.state.networkParamSetupData.contract_list.map(function (item) {
          return {contract_id: item.contract_id, desc_txt: item.desc_txt}
        })
      },
      getNetworkData: function () {
        const that = this
        if (that.type === "edit") {
          networkServices.getNetwork(that.netid).then(function (res) {
            that.netdata = res.network[0]
            that.setTabs()
            that.setValue()
          })
        } else {
          that.setValue()
        }
      },
      setTabs: function () {
        if (this.type === "edit") {
          if (this.netdata['type_cd'] === "D") {
            this.tabs.push({name: 'Prescribers', path: 'prescriber'})
          } else {
            this.tabs.push({name: 'Providers', path: 'provider'})
            this.tabs.push({name: 'Chains', path: 'chain'})
          }
        }
      },
      setValue: function () {
        const that = this
        switch (that.type) {
          case "new":
            that.netdata = {
              type_cd: "R",
              status_cd: "A",
              desc_txt: "",
              comment_txt: "",
              contract_id: -1
            }
            that.selectedNetworkType = {type_cd: "R", desc_txt: "Retail Network"}
            that.selectedContract = {contract_id: -1, desc_txt: "No Contract"}
            break
          case "edit":
            that.selectedNetworkType = that.networkTypeList.filter(function (item) {
              return item.type_cd === that.netdata['type_cd']
            })[0]
            if (that.netdata['contract_id']) {
              that.selectedContract = that.contractList.filter(function (item) {
                return item.contract_id === that.netdata['contract_id']
              })[0]
            } else {
              that.selectedContract = {contract_id: -1, desc_txt: "No Contract"}
            }
            break
        }
      },
      save: function () {
        if (this.validate()) {
          const that = this
          const user = that.$store.state.user
          const pcc = that.$store.state.pcn.pcc
          const networkID = that.netid
          that.netdata['type_cd'] = that.selectedNetworkType['type_cd']
          that.netdata['contract_id'] = that.selectedContract['contract_id']
          const info = Object.assign({}, that.netdata)
          switch (that.type) {
            case 'new':
              networkServices.addNetwork(info, user, pcc).then(function (res) {
                that.saveLoading = true
                if (res) {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'success', 'Network Added !')
                  window.Vue.$emit('loadNetworkList')
                  const netid = parseInt(res)
                  that.$router.push({path: `edit/${netid}`})
                } else {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'warning', res)
                }
              }).catch(function (res) {
                that.saveLoading = false
              })
              return
            case 'edit':
              networkServices.updateNetwork(info, user, pcc, networkID).then(function (res) {
                that.saveLoading = true
                if (res !== "E") {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'success', 'Network Updated !')
                  window.Vue.$emit('loadNetworkList')
                  that.$router.push({name: 'network'})
                } else {
                  that.saveLoading = false
                  window.Vue.$emit('snackbar', 'warning', res)
                }
              }).catch(function (res) {
                that.saveLoading = false
              })
              return
          }
        }
      },
      validate() {
        return this.$refs.form.validate()
      },
      back: function () {
        this.$router.push({name: 'network'})
      },
      clear: function () {
        const that = this
        if (that.type === "edit") {
          networkServices.getNetwork(that.netid).then(function (res) {
            that.netdata = res.network[0]
            that.setValue()
          })
        } else {
          that.setValue()
        }
      }
    }
  }
</script>
<style lang="stylus">
</style>
