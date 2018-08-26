<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Price It !</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        dark
        light
        single-line
        append-icon="search"
        placeholder="Search..."
        class="white--text"
        hide-details
      ></v-text-field>
      <v-btn icon @click.native="add">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <div class="my-scroll-enabled-2">
      <v-layout row wrap>
        <v-flex xs5>
          <v-card-text>
            <v-text-field
              label="Drug ID or Drug Description" v-model="drug_cd"
              :rules="[rules.required]" required
            >
            </v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text>
            <v-select
              v-bind:items="zipList"
              v-model="mpp_id"
              label="Zip:"
              item-text="desc_txt"
              item-value="mpp_id"
              bottom
            ></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs3>
          <v-card-text>
            <v-select
              v-bind:items="mapData.price_cd"
              v-model="price_cd"
              label="Price Code:"
              item-text="desc_txt"
              item-value="field_value"
              bottom
            ></v-select>
          </v-card-text>
        </v-flex>
        <v-flex xs12>
          <v-card-actions class="d-block text-xs-center">
            <v-btn color="primary-color" @click.native="find" :disabled="isDisableFind">Find</v-btn>
          </v-card-actions>
        </v-flex>
      </v-layout>
      <v-card-text class="px-4" style="background-color: white" v-if="isFindResult">
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              v-bind:headers="headers"
              :items="tableData"
              v-bind:search="search"
              :loading="loading"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-left handCell">
                    <v-tooltip top>
                      <v-btn icon @click="clickRow(props.item)" slot="activator">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <span>Mpp Drug Edit</span>
                    </v-tooltip>
                  </td>
                  <td class="text-xs-left"> {{ props.item['Zip Code']}}</td>
                  <td class="text-xs-left"> {{ props.item['Price Code'] }}</td>
                  <td class="text-xs-left">{{ props.item['Drug ID'] }}</td>
                  <td class="text-xs-left">{{ props.item['Product Description']}}</td>
                  <td class="text-xs-left">{{ props.item['Drug Type'] }}</td>
                </tr>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-card-text>
    </div>
    <mpp-list-edit :mapDataList="mapData" :zipDataList="zipList" :priceDataList="priceList"></mpp-list-edit>
  </main>
</template>
<script>
  import providerServices from '../../../services/provider/providerServices'
  import priceItServices from '../../../services/priceIt/priceItServices'
  import store from '../../../store'
  import {convertDate, convertStringDate, stringToDate} from '../../../components/utils/DateMethods'
  import MppListEdit from './MppListEdit.vue'

  export default {
    name: 'mpp-drug-list',
    data() {
      return {
        headers: [],
        search: '',
        items: [],
        mapData: [],
        isDisableFind: true,
        loading: false,
        drug_cd: '',
        price_cd: '-1',
        mpp_id: 35,
        isFindResult: false,
        tableData: [],
        zipList: [],
        priceList: [],
        info: {
          mpp_id: '',
          drug_id: '',
          price_cd: '',
          quantity1: '',
          quantity2: '',
          quantity3: '',
          price_amt1: '',
          price_amt2: '',
          price_amt3: '',
          start_dt: new Date().toLocaleDateString(),
          end_dt: new Date().toLocaleDateString(),
        },
        detail: [],
        rules: {
          required: (value) => (!!value && value.length > 2) || 'Length must be more than 3.'
        },
      }
    },
    components: {MppListEdit},
    computed: {
      values: function () {
        return this.price_cd + this.mpp_id
      }
    },
    watch: {
      drug_cd: function (v) {
        if (v.length > 2)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      },
      values: function (d) {
        if (d.length > 0 && this.drug_cd.length > 2)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      }
    },
    mounted() {
      console.log('----- Administrator / Mpp Drug List mounted -----')
      const that = this
      providerServices.getMppData({}).then(function (res) {
        that.priceList = []
        res.price_cd.forEach(function (d) {
          if (d.desc_txt !== 'All' && d.field_value !== '-1')
            that.priceList.push(d)
        })
        that.mapData = res
        that.zipList = []
        res.mpp_id.forEach(function (d) {
          that.zipList.push({desc_txt: d.mpp_id + ' ' + '-' + ' ' + d.desc_txt, mpp_id: d.mpp_id})
        })
        that.mapData.price_cd.unshift({field_value: '-1', desc_txt: 'All'})
      })
      this.headers = [
        {text: '', align: 'left', sortable: false, value: ''},
        {text: 'Zip Code', align: 'left', sortable: true, value: 'Zip Code'},
        {text: 'Price Code', align: 'left', sortable: true, value: 'Price Code'},
        {text: 'Drug ID', align: 'left', sortable: true, value: 'Drug ID'},
        {text: 'Product Description', align: 'left', sortable: true, value: 'Product Description'},
        {text: 'Drug Type', align: 'left', sortable: true, value: 'Drug Type'},
      ]
    },
    methods: {
      add: function () {
        const data = {
          drug_id: '',
          mpp_id: 35,
          price_cd: '01',
          quantity1: '',
          quantity2: '',
          quantity3: '',
          price_amt1: '',
          price_amt2: '',
          price_amt3: '',
          start_dt: new Date().toLocaleDateString(),
          end_dt: new Date().toLocaleDateString(),
          type: 'add'
        }
        window.Vue.$emit('openMppListEdit', data)
      },
      find: function () {
        const that = this
        this.isFindResult = true
        this.loading = true
        const data = {
          drug_cd: that.drug_cd,
          price_cd: that.price_cd,
          mpp_id: that.mpp_id
        }
        priceItServices.getMppDrugList(data).then(function (res) {
          if (res.mpp_drug_list.length > 0) {
            that.tableData = res.mpp_drug_list
            that.loading = false
            that.isDisableFind = true
          } else {
            window.Vue.$emit('snackbar', 'success', 'No results found!')
            that.loading = false
            that.tableData = []
            that.isDisableFind = true
          }
        })
      },
      clickRow: function (item) {

        const that = this
        const data = {
          mpp_id: item.mpp_id,
          price_cd: item.price_cd,
          drug_id: item['Drug ID']
        }
        priceItServices.getMppDrugDetail(data).then(function (res) {
          const data = {
            quantity1: '',
            quantity2: '',
            quantity3: '',
            price_amt1: '',
            price_amt2: '',
            price_amt3: '',
          }
          if (res.mpp_drug_list.length > 0) {
            res.mpp_drug_list.forEach(function (d, k) {
              if (k === 0) {
                data.drug_id = d.drug_id
                data.mpp_id = d.mpp_id
                data.price_cd = d.price_cd
                data.start_dt = stringToDate(convertDate(d.start_dt))
                data.end_dt = stringToDate(convertDate(d.end_dt))
                data.type = 'edit'
              }

              k++
              const quantity = 'quantity' + k
              const price = 'price_amt' + k
              data[quantity] = d.quantity
              data[price] = d.price_amt
            })
          }
          window.Vue.$emit('openMppListEdit', data)
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
