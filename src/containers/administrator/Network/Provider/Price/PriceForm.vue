<template>
  <main>
    <v-form ref="form">
      <v-container fluid class="form-scroll-enabled pl-0 pb-0 pt-0">
        <div style="max-height: 500px">
          <v-layout row wrap>
            <v-flex xs6 class="pr-3" v-if="type==='edit'">
              <v-select label="Group" v-bind:items="groupList" v-model="providerData['Group Name']" disabled>
              </v-select>
            </v-flex>
            <v-flex xs6 class="pr-3" v-else>
              <v-select
                label="Group"
                v-bind:items="groupList"
                v-model="priceData['group_id']"
                item-value="group_id"
                item-text="name">
              </v-select>
            </v-flex>
            <v-flex xs6 class="pl-3">
              <v-text-field label="Provider Name" v-model="priceData['name_txt']" disabled>
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs5 class="pr-3">
              <v-select
                label="Zip"
                v-bind:items="mppidList"
                v-model="priceData['zip_cd']"
                item-value="mpp_id"
                item-text="desc">
              </v-select>
            </v-flex>
            <v-flex xs2 class="pl-3 pr-3"></v-flex>
            <v-flex xs5 class="pl-3">
              <v-select
                label="Price Code"
                v-bind:items="priceCodeList"
                v-model="priceData['price_cd']"
                item-value="field_value"
                item-text="desc_txt">
              </v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs4 class="pr-3">
              <v-text-field label="Fixed Fee" v-model="priceData['fee']" type="number"
                            hint="This value is less than 1000" :counter="3" persistent-hint :rules="rules">
              </v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-3 pr-3">
              <v-text-field label="Percent Fee %" v-model="priceData['percent_fee']" type="number"
                            hint="This value is less than 1000"
                            persistent-hint :rules="rules" :counter="3">
              </v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-3">
              <v-text-field label="Min Claim Amt" v-model="priceData['min_claim_amt']" type="number"
                            hint="This value is less than 1000"
                            persistent-hint :rules="rules" :counter="3">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <p class="text-xs-left">Brand</p>
              <v-divider></v-divider>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs4 class="pl-3 pr-3">
                    <v-select
                      label="Price Code"
                      v-bind:items="priceCodeList"
                      v-model="priceData['brand_price_cd']"
                      item-value="field_value"
                      item-text="desc_txt"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4 class="pl-3 pr-3">
                    <v-text-field
                      label="Markup $" v-model="priceData['brand_markup']" type="number"
                      hint="This value is less than 1000"
                      persistent-hint :rules="rules" :counter="3">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 class="pl-3 pr-3">
                    <v-text-field
                      label="Markup %" v-model="priceData['brand_markup_pct']" type="number"
                      hint="This value is less than 1000"
                      persistent-hint :rules="rules" :counter="3">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <p class="text-xs-left">Genernic</p>
              <v-divider></v-divider>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs4 class="pl-3 pr-3">
                    <v-select
                      label="Price Code"
                      v-bind:items="priceCodeList"
                      v-model="priceData['generic_price_cd']"
                      item-value="field_value"
                      item-text="desc_txt"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4 class="pl-3 pr-3">
                    <v-text-field
                      label="Markup $" v-model="priceData['generic_markup']" type="number"
                      hint="This value is less than 1000"
                      persistent-hint :rules="rules" :counter="3">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 class="pl-3 pr-3">
                    <v-text-field
                      label="Markup %" v-model="priceData['generic_markup_pct']" type="number"
                      hint="This value is less than 1000"
                      persistent-hint :rules="rules" :counter="3">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <p class="text-xs-left">Narcotic</p>
              <v-divider></v-divider>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs4 class="pl-3 pr-3">
                    <v-select
                      label="Price Code"
                      v-bind:items="priceCodeList"
                      v-model="priceData['narcotic_price_cd']"
                      item-value="field_value"
                      item-text="desc_txt"
                    ></v-select>
                  </v-flex>
                  <v-flex xs4 class="pl-3 pr-3">
                    <v-text-field
                      label="Markup $" v-model="priceData['narcotic_markup']" type="number"
                      hint="This value is less than 1000"
                      persistent-hint :rules="rules" :counter="3">
                    </v-text-field>
                  </v-flex>
                  <v-flex xs4 class="pl-3 pr-3">
                    <v-text-field
                      label="Markup %" v-model="priceData['narcotic_markup_pct']" type="number"
                      hint="This value is less than 1000"
                      persistent-hint :rules="rules" :counter="3">
                    </v-text-field>
                  </v-flex>
                </v-layout>
              </v-card-text>
            </v-flex>
          </v-layout>
        </div>
      </v-container>
    </v-form>
    <v-divider class="mt-2"></v-divider>
    <v-card-actions class="d-block text-xs-center">
      <v-btn color="primary-color" @click.native="save()">Save</v-btn>
      <v-btn @click.native="cancel()">Cancel</v-btn>
    </v-card-actions>
  </main>
</template>
<script>
  import networkServices from '../../../../../services/network/networkServices'
  import store from '../../../../../store'
  import VContent from "vuetify/src/components/VGrid/VContent";

  export default {
    props: ['type', 'pid', 'name', 'item', 'refresh', 'cancel'],
    components: {VContent},
    data() {
      return {
        providerData: {},
        priceData: {},
        groupList: [],
        mppidList: [],
        priceCodeList: [],
        zipList: [],
        disableNetworkSaveBtn: true,
        rules: [
          (v) => !!v || 'Required.',
          (v) => {
            return v <= 999.9 || 'Limit must be less more than 1000'
          }
        ],
      }
    },
    mounted() {
      this.getProviderMppData()
    },
    methods: {
      getProviderMppData: function () {
        const that = this
        if (that.type === "edit") {
          that.providerData = {...this.item}
          const groupId = that.providerData['group_id']
          const pid = that.providerData['pid']
          networkServices.getProviderMppData(groupId, pid).then(function (res) {
            that.priceData = res.provider[0]
            that.mppidList = res.mpp_id
            that.priceCodeList = res.price_cd
            that.setValue()
          })
        } else {
          networkServices.getMppData().then(function (res) {
            that.mppidList = res.mpp_id
            that.priceCodeList = res.price_cd
            that.setValue()
          })
        }
      },
      setValue: function () {
        const that = this
        switch (that.type) {
          case "add":
            that.groupList = that.$store.state.networkParamSetupData.group_list.map(function (item) {
              return {name: item.name, group_id: item.group_id}
            })
            that.priceData['pid'] = that.pid
            that.priceData['group_id'] = that.groupList[0]['group_id']
            that.priceData['name_txt'] = that.name
            that.priceData['zip_cd'] = that.mppidList[0]['mpp_id']
            that.priceCodeList.push({field_value: "-1", desc_txt: "Please Select"})
            that.priceData['price_cd'] = "03"
            that.priceData['brand_price_cd'] = "-1"
            that.priceData['generic_price_cd'] = "-1"
            that.priceData['narcotic_price_cd'] = "-1"
            that.priceData['fee'] = "0"
            that.priceData['percent_fee'] = "0"
            that.priceData['min_claim_amt'] = "0"
            that.priceData['brand_markup_pct'] = "0"
            that.priceData['generic_markup_pct'] = "0"
            that.priceData['narcotic_markup_pct'] = "0"
            that.priceData['brand_markup'] = "0"
            that.priceData['generic_markup'] = "0"
            that.priceData['narcotic_markup'] = "0"
            break
          case "edit":
            that.groupList = []
            that.groupList.push(that.providerData['Group Name'])
            that.priceData['zip_cd'] = parseInt(that.priceData['zip_cd'])
            that.priceCodeList.push({field_value: "-1", desc_txt: "Please Select"})
            if (that.priceData['price_cd'] === null) that.priceData['price_cd'] = "-1"
            if (that.priceData['brand_price_cd'] === null) that.priceData['brand_price_cd'] = "-1"
            if (that.priceData['generic_price_cd'] === null) that.priceData['generic_price_cd'] = "-1"
            if (that.priceData['narcotic_price_cd'] === null) that.priceData['narcotic_price_cd'] = "-1"
            that.priceData['fee'] = that.priceData['fee'].toString()
            that.priceData['percent_fee'] = that.priceData['percent_fee'].toString()
            that.priceData['min_claim_amt'] = that.priceData['min_claim_amt'].toString()
            that.priceData['brand_markup_pct'] = that.priceData['brand_markup_pct'].toString()
            that.priceData['generic_markup_pct'] = that.priceData['generic_markup_pct'].toString()
            that.priceData['narcotic_markup_pct'] = that.priceData['narcotic_markup_pct'].toString()
            that.priceData['brand_markup'] = that.priceData['brand_markup'].toString()
            that.priceData['generic_markup'] = that.priceData['generic_markup'].toString()
            that.priceData['narcotic_markup'] = that.priceData['narcotic_markup'].toString()
            break
        }
      },
      save: function () {
        if (this.$refs.form.validate()) {
          const that = this
          const user = that.$store.state.user
          const info = Object.assign({}, that.priceData)
          let groupId
          switch (that.type) {
            case 'add':
              groupId = that.priceData['group_id']
              networkServices.addProviderMpp(info, user, groupId).then(function (res) {
                if (res === "0") {
                  window.Vue.$emit('snackbar', 'success', 'Mpp Added !')
                  that.cancel()
                  that.refresh()
                } else {
                  window.Vue.$emit('snackbar', 'warning', res)
                }
              }).catch(function (res) {

              })
              return
            case 'edit':
              groupId = that.providerData['pid']
              networkServices.updateProviderMpp(info, user, groupId).then(function (res) {
                if (res === "0") {
                  window.Vue.$emit('snackbar', 'success', 'Mpp Updated !')
                  that.cancel()
                  that.refresh()
                } else {
                  window.Vue.$emit('snackbar', 'warning', res)
                }
              }).catch(function (res) {

              })
              return
          }
        }
      },
    },
    watch: {
      item: function () {
        this.providerData = {...this.item}
        this.getProviderMppData()
      }
    }
  }
</script>
<style lang="stylus">
</style>
