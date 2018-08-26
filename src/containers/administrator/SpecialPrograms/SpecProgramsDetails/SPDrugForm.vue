<template>
  <main>
    <v-layout row justify-center>
    <Vodal :show="show" animation="zoom" :closeOnEsc="false" :closeButton="true" :width="900" :closeOnClickMask="true" v-on:hide="closeModal">
      <v-form ref="form">
        <v-card flat>
          <div v-if="!addDrugModalIsVisible">
            <v-toolbar dark>
              <v-toolbar-title v-if="type === 'add'" class="white--text">Add Special Program Drug</v-toolbar-title>
              <v-toolbar-title v-if="type === 'edit'" class="white--text">Special Program Drug Edit</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="my-sub-scroll-enabled">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-radio-group row v-model="info['status_cd']">
                    <v-radio value="A" label="Active"></v-radio>
                    <v-radio value="I" label="Inactive"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    name="program-description"
                    v-model="info['desc_txt']"
                    label="Program Description"
                    multi-line
                    auto-grow
                    rows="2"
                    hide-details
                    disabled
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-text-field
                    name="drug-description"
                    v-model="info['drug_desc']"
                    label="Drug Description"
                    multi-line
                    auto-grow
                    rows="2"
                    hide-details
                    disabled
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-layout row wrap>
                    <v-flex xs12 v-if="type === 'edit'">
                      <v-text-field label="Drug ID" :rules="[rules.required]" required type="number" v-model="info['drug_id']" disabled></v-text-field>
                    </v-flex>
                    <v-flex xs10 v-if="type === 'add'">
                      <v-text-field label="Drug ID" :rules="[rules.required]" required type="number" v-model="info['drug_id']" disabled></v-text-field>
                    </v-flex>
                    <v-flex xs2 v-if="type === 'add'" class="text-xs-center">
                      <v-btn v-if="type === 'add'" color="primary-color" @click.native="openFindProviderModal">Find</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6 class="pr-2">
                  <v-select label="Drug ID Type" v-bind:items="typeIDList" v-model="info['drug_id_type_cd']"></v-select>
                </v-flex>
                <v-flex xs6 class="pl-2">
                  <v-select label="Drug Type" v-bind:items="typeList" v-model="info['drug_type_cd']"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6 class="pr-2">
                  <v-text-field label="Price" :rules="[rules.required]" required type="number" step="0.000001" v-model="info['price_amt']"></v-text-field>
                </v-flex>
                <v-flex xs6 class="pl-2">
                  <v-text-field label="Quantity" :rules="[rules.required]" required type="number" step="0.001" v-model="info['quantity']"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6 class="pr-2">
                  <v-text-field label="Day's Supply" :rules="[rules.required]" required type="number" step="0.000001" v-model="info['days_supply']"></v-text-field>
                </v-flex>
                <v-flex xs6 class="pl-2">
                  <v-text-field label="Tier" type="number" step="0.001" v-model="info['tier']"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6 class="pr-2">
                  <v-text-field label="Pack Size" type="number" v-model="info['pack_size']"></v-text-field>
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-layout>
              <v-card-text class="py-0 px-1">
                <v-divider class="mt-2"></v-divider>
                <small class="red--text">&nbsp;*indicates required field</small>
                <v-card-actions class="d-block text-xs-center">
                  <v-btn class="primary" @click.native="save()" :disabled="isDisabledSave">Save<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
                  <v-btn @click.native="close">Close</v-btn>
                </v-card-actions>
              </v-card-text>
            </v-layout>
          </div>
          <div v-else>
            <drug-find :selectable="true"
                       :methodName="methodName"></drug-find>
            <v-card-text class="py-0 px-1">
              <v-divider class="mt-2"></v-divider>
              <v-card-actions class="d-block text-xs-center">
                <v-btn @click.native="back">Back</v-btn>
              </v-card-actions>
            </v-card-text>
          </div>
        </v-card>
      </v-form>
    </Vodal>
    </v-layout>
  </main>
</template>
<script>
  import store from '../../../../store'
  import services from '../../../../services/specialPrograms/specProgramsServices'
  import Vodal from '../../../../components/common/Vodal.vue'
  import DrugFind from '../../../drugs/DrugsDatabase/DrugDatabase'
  import { required } from '../../../../components/utils/FormRuleDefinitions'
  const defaultInfo = {
    "desc_txt": "",
    "program_id": null,
    "drug_desc": "",
    "drug_id_type_cd": "N",
    "drug_id": "",
    "quantity": null,
    "days_supply": null,
    "pack_size": null,
    "tier": null,
    "price_amt": null,
    "drug_type_cd": null,
    "status_cd": "A",
  }

  export default {
    name: 'spec-drug-form',
    components: {
      DrugFind, Vodal,
    },
    props: ['show', 'close', 'type', 'drugData', 'redrawTable'],
    data() {
      return {
        addDrugModalIsVisible: false,
        methodName: 'selectDrugToAddSpecialProgram',
        info: defaultInfo,
        typeIDList: [{text: "NDC", value: "N"}, {text: "GPI", value: "G"}],
        typeList: [{text: "All", value: null}, {text: "Brand", value: "B"}, {text: "Generic", value: "G"}],
        loading: false,
        rules: {
          required: required
        },
        isDisabledSave: true
      }
    },
    mounted() {
      const that = this
      window.Vue.$on('drugSelected', function(item) {
        console.log(item)
        if (item.NDC) {
          that.info['drug_id'] = item.NDC
          that.info['drug_desc'] = item['Product Name']
        } else {
          that.info['drug_id'] = item.GPI
          that.info['drug_desc'] = item['Brand Name']
        }
        that.addDrugModalIsVisible = false
      })
    },
    watch: {
      drugData: function(data){
        if(this.type == 'edit') {
          this.getDrugData(data)
        } else {
          this.info = Object.assign({}, defaultInfo, {desc_txt: data['desc_txt']})
        }
        this.isDisabledSave = true
      },
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData) {
            this.isDisabledSave = false
          }
        },
        deep: true
      }
    },
    methods: {
      getDrugData(data){
        const that = this
        const params = {
          program_id: this.$route.params.spid,
          drug_id: data['Drug ID'],
          qty: data['Qty']
        }
        services.getSpecProgramDrug(params).then(function (data) {
          that.info = data.spec_program_drug[0]
        });
      },
      hide: function() {
        this.addDrugModalIsVisible = false
      },
      save: function () {
        if (!this.$refs.form.validate()) return null
        const newInfo = {
          program_id: parseInt(this.info['program_id']) || parseInt(this.$route.params.spid),
          drug_id_type_cd: this.info['drug_id_type_cd'] || 'N',
          drug_id: this.info['drug_id'] || '',
          curr_quantity: parseInt(this.info['quantity']) || 0,
          qty: parseInt(this.info['quantity']) || 0,
          days_supply: parseInt(this.info['days_supply']) || 0,
          pack_size: parseInt(this.info['pack_size']) || 0,
          tier: parseInt(this.info['tier']) || 0,
          price_amt: parseInt(this.info['price_amt']) || 0,
          drug_type_cd: this.info['drug_type_cd'] || '',
          status_cd: this.info['status_cd'] || 'A',
          uid: this.$store.state.user.session_uid || '',
        }
        const that = this
        this.loading = true
        if(this.type === 'edit') {
          services.updateSpecProgramDrug(newInfo).then(function (res) {
            if (res == '0' || res==0 || !res) {
              window.Vue.$emit('snackbar', 'success', 'Special Program Drug Updated!')
              that.redrawTable()
              that.addDrugModalIsVisible = false
              that.close()
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
            that.loading = false
          }).catch(function (error) {
            window.Vue.$emit('snackbar', 'error', 'Error!')
            that.loading = false
          })
        } else {
          services.addSpecProgramDrug(newInfo).then(function (res) {
            if (res == '0' || res==0 || !res) {
              window.Vue.$emit('snackbar', 'success', 'New Special Program Drug Added!')
              that.redrawTable()
              that.addDrugModalIsVisible = false
              that.close()
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
            that.loading = false
          }).catch(function (error) {
            window.Vue.$emit('snackbar', 'error', 'Error!')
            that.loading = false
          })
        }
      },
      closeModal() {
        this.addDrugModalIsVisible = false
        this.info = {}
        this.isDisabledSave = true
        this.$refs.form.reset()
        this.close()
      },
      openFindProviderModal () {
        this.addDrugModalIsVisible = true
      },
      back() {
        this.addDrugModalIsVisible = false
      }
    }
  }

</script>
<style lang="stylus">
</style>
