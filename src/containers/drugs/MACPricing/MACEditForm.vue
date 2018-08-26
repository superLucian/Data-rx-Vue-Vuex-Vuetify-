<template>
  <main>
    <v-toolbar v-if="active ==='main'">
      <v-icon class="white--text">fa-archive</v-icon>
      <v-toolbar-title class="white--text">Group Mac {{drugType}}</v-toolbar-title>
    </v-toolbar>
    <template v-if="active === 'main'">
      <v-container row wrap class="my-sub-scroll-enabled px-0">
        <v-layout row wrap>
          <template v-if="drugType === 'edit'">
            <v-flex xs12>
              <v-card-text class="pt-0">
                <v-text-field label="Drug Description" v-model="info.drug_name_txt"></v-text-field>
              </v-card-text>
            </v-flex>
          </template>
          <template v-if="drugType === 'add'">
            <v-flex xs8>
              <v-card-text class="pt-0">
                <v-text-field label="Drug Description" v-model="info.drug_name_txt"></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs4>
              <v-card-text class="py-0">
                <v-btn color="primary-color" @click.native="find" block>Find</v-btn>
              </v-card-text>
            </v-flex>
          </template>
          <v-flex xs6>
            <v-card-text class="py-0">
              <p>Drug Type</p>
              <v-divider></v-divider>
              <v-radio-group v-model="info.drug_type_cd" row>
                <v-radio label="Brand" value="B"></v-radio>
                <v-radio label="Generic" value="G"></v-radio>
                <v-radio label="All" value="A"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-flex>
          <v-flex xs6>
            <v-card-text class="py-0">
              <p>Status</p>
              <v-divider></v-divider>
              <v-radio-group v-model="info.status_cd" row>
                <v-radio label="Active" value="A"></v-radio>
                <v-radio label="Inactive" value="I"></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-flex>
          <v-flex xs4>
            <v-card-text class="py-0">
              <v-text-field label="Drug ID" v-model="info.drug_id" disabled></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs2>
            <v-card-text class="py-0">
              <v-select
                v-bind:items="tierList"
                v-model="info.drug_tier"
                label="Tier"
                item-text="text"
                item-value="code"
                bottom
              ></v-select>
            </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="py-0">
              <v-text-field label="Quantity" v-model="info.quantity" type="number"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs3>
            <v-card-text class="py-0">
              <v-text-field label="Unit Price" v-model="info.unit_price_amt" type="number"></v-text-field>
            </v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-card-text class="pt-0">
              <v-text-field
                v-model="info.msg_txt"
                label="Response Message"
                multi-line
                rows="3"
                hide-details
              ></v-text-field>
            </v-card-text>
          </v-flex>

        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn color="primary-color" v-if="drugType === 'edit'" :disabled="isDisabledSave" @click.native="save">update</v-btn>
        <v-btn color="primary-color" v-else :disabled="isDisabledSave" @click.native="save">add</v-btn>
        <v-btn @click.native="close">Back</v-btn>
      </v-card-actions>
    </template>
    <template v-if="active === 'find'">
      <drug-find :selectable="true"></drug-find>
      <v-card-text class="py-0 px-1">
        <v-divider class="mt-2"></v-divider>
        <v-card-actions class="d-block text-xs-center">
          <v-btn @click.native="back">Back</v-btn>
        </v-card-actions>
      </v-card-text>
    </template>
  </main>
</template>

<script>
  import Vodal from '../../../components/common/Vodal.vue'
  import MacFind from './MACFindView.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import GroupMacService from '../../../services/pbmsys/GroupMacService'
  import drugServices from '../../../services/drug/drugServices'
  import DrugFind from '../../drugs/DrugsDatabase/DrugDatabase'

  export default {
    name: 'drug-mac-edit-form',
    props: ['onBack', 'drug', 'drugType'],
    data() {
      return {
        old_quantity: 0,
        active: 'main',
        tierList: [
          {'code': -1, 'text': 'NA'},
          {'code': 0, 'text': '0'},
          {'code': 1, 'text': '1'},
          {'code': 2, 'text': '2'},
          {'code': 3, 'text': '3'},
          {'code': 4, 'text': '4'},
          {'code': 5, 'text': '5'},
          {'code': 6, 'text': '6'},
          {'code': 7, 'text': '7'},
          {'code': 8, 'text': '8'},
          {'code': 9, 'text': '9'}
        ],
        isDisabledSave: true,
        info: {
          'mac_id': this.drug['mac_id'],
          'drug_type_cd': 'G',
          'status_cd': 'A',
          'drug_tier': -1,
          'quantity': 0,
          'unit_price_amt': 0,
          'msg_txt': '',
          'drug_name_txt': '',
          'drug_id': ''
        }
      }
    },
    components: {Vodal, DrugFind},
    mounted() {
      console.log('----- Administrator / Drugs / Mac Pricing / Mac Edit Form -----')
      const that = this
      window.Vue.$on('drugSelected', (item) => {
        if (item.NDC) {
          that.info.drug_id = item.NDC
          item['Product Name'] = item['Product Name'] === null ? '' : item['Product Name']
          item['Form Desc'] = item['Form Desc'] === null ? '' : item['Form Desc']
          item['Strength'] = item['Strength'] === null ? '' : item['Strength']
          that.info.drug_name_txt = item['Product Name'] + ' ' + item['Form Desc'] + ' ' + item['Strength']
        } else {
          that.info.drug_id = item.GPI
          item['Brand Name'] =  item['Brand Name'] === null ? '' : item['Brand Name']
          item['Form'] =  item['Form'] === null ? '' : item['Form']
          that.info.drug_name_txt = item['Brand Name'] + ' ' + item['Form']
        }
        that.back()
      })
    },
    watch: {
      'drug': function (v) {
        if (v.quantity)
          this.old_quantity = v.quantity
        if (!v.drug_type_cd)
          v.drug_type_cd = "A"
        if (!v.drug_tier)
          v.drug_tier = -1
        this.info = v
      },
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
            this.isDisabledSave = false
          }
        },
        deep: true
      },
    },
    methods: {
      save: function () {
        const that = this
        if (that.drugType === 'edit') {
          const data = {...that.info, old_quantity: that.old_quantity}
          drugServices.updateMacDrug(data, that.$store.state.user.session_uid).then(function (res) {
            if (res === '0') {
              that.close()
              window.Vue.$emit('reloadMacDrugList', that.info)
              window.Vue.$emit('snackbar', 'success', 'Updated Group Mac Drug!')
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        } else {
          drugServices.addMacDrug(that.info, that.$store.state.user.session_uid).then(function (res) {
            if (res === '0') {
              window.Vue.$emit('reloadMacDrugList', that.info)
              window.Vue.$emit('snackbar', 'success', 'Added Mac Drug Successfully!')
              that.close()
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      back: function () {
        this.active = 'main'
//        this.drug_name = ''
      },
      find: function () {
//        this.pagination.rowsPerPage = 5
        this.active = 'find'
      },
      close: function () {
        this.onBack()
      },
    },
    events: {}
  }
</script>

<style lang="stylus">
</style>
