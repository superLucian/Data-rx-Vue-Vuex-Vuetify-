<template>
  <main>
    <Vodal :show="show" animation="zoom" :closeOnEsc="false" :closeButton="true" :width="900" :closeOnClickMask="true" v-on:hide="closeModal">
      <v-form ref="form">
        <v-card flat>
          <div v-if="!addProviderModalIsVisible">
            <v-toolbar dark>
              <v-toolbar-title class="white--text" v-if="type === 'add'">Add Special Program Provider</v-toolbar-title>
              <v-toolbar-title class="white--text" v-if="type === 'edit'">Edit Special Program Provider</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text class="my-sub-scroll-enabled">
              <v-layout row wrap>
                <v-flex xs12>
                  <v-radio-group row v-model="info['Status']">
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
                    name="pharmacy-name"
                    v-model="info['Pharmacy Name']"
                    label="Pharmacy Name"
                    multi-line
                    auto-grow
                    rows="2"
                    hide-details
                    disabled
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6 class="pr-2">
                  <v-text-field label="NABP" type="number" required :rules="[rules.required]" v-model="info['NABP']" disabled></v-text-field>
                </v-flex>
                <v-flex xs6 class="pl-2">
                  <v-layout row wrap>
                    <v-flex xs9>
                      <v-text-field label="NPI" type="number" v-model="info['NPI']" disabled></v-text-field>
                    </v-flex>
                    <v-flex xs3 v-if="type === 'add'" class="mt-2">
                      <v-btn v-if="type === 'add'" color="primary-color" @click.native="openFindProviderModal">Find</v-btn>
                    </v-flex>
                  </v-layout>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex class="pr-2">
                  <v-text-field :rules="[rules.required, rules.maxHandred]" label="Markup" required type="number" v-model="info['Provider Markup']"></v-text-field>
                </v-flex>
                <v-flex class="pl-2">
                  <v-text-field :rules="[rules.required, rules.maxHandred]" label="Fee" type="number" required number step="0.01" v-model.number="info['Fee']"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex class="pr-2">
                  <v-text-field :rules="[rules.required, rules.maxHandred]" label="Category 1 Markup" required type="number" step="0.000001" v-model="info['Category 1 Markup']"></v-text-field>
                </v-flex>
                <v-flex class="pl-2">
                  <v-text-field :rules="[rules.required, rules.maxHandred]" label="Category 2 Markup" required type="number" step="0.000001" v-model="info['Category 2 Markup']"></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex class="pr-2">
                  <v-text-field :rules="[rules.required, rules.maxHandred]" label="Category 3 Markup" required type="number" step="0.000001" v-model="info['Category 3 Markup']"></v-text-field>
                </v-flex>
                <v-flex class="pl-2">
                  <v-text-field :rules="[rules.required, rules.maxHandred]" label="Category 4 Markup" required type="number" step="0.000001" v-model="info['Category 4 Markup']"></v-text-field>
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
            <provider-find
              :selectable="true"
              :methodName="methodName"
            ></provider-find>
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
  </main>
</template>
<script>
  import store from '../../../../store'
  import services from '../../../../services/specialPrograms/specProgramsServices'
  import Vodal from '../../../../components/common/Vodal.vue'
  import ProviderFind from '../../Provider/ProviderFind.vue'
  import { required, maxHandred } from '../../../../components/utils/FormRuleDefinitions'
  const defaultInfo = {
    "Pharmacy Name": "",
    "Status": "A",
    "Basis": null,
    "Provider Markup": '0.000000',
    "Category 1 Markup": '0.000000',
    "Category 2 Markup": '0.000000',
    "Category 3 Markup": '0.000000',
    "Category 4 Markup": '0.000000',
    "Fee": '0.00',
    "NABP": "",
    "NPI": "",
    "Internal ID": null
  }
  export default {
    name: 'spec-provider-form',
    components: {
      Vodal,
      ProviderFind
    },
    props: ['show', 'close', 'type', 'providerData', 'redrawTable'],
    data() {
      return {
        addProviderModalIsVisible: false,
        methodName: 'selectProviderToAddSpecialProgram',
        info: defaultInfo,
        loading: false,
        rules: {
          required: required,
          maxHandred: maxHandred
        },
        isDisabledSave: true
      }
    },
    mounted() {
      const that = this

      window.Vue.$on(this.methodName, function(item) {
        that.info['Internal ID'] = item.pid
        that.info['NABP'] = item['NABP']
        that.info['NPI'] = item['NPI']
        that.addProviderModalIsVisible = false
      })
    },
    watch: {
      providerData: function(data){
        if(this.type == 'edit') {
          this.info = Object.assign({}, {...defaultInfo}, {...data},
            {
              "Fee": data["Fee"] || '0.00',
              "Provider Markup": data["Provider Markup"] || '0.000000',
              "Category 1 Markup": data["Category 1 Markup"] || '0.000000',
              "Category 2 Markup": data["Category 2 Markup"] || '0.000000',
              "Category 3 Markup": data["Category 3 Markup"] || '0.000000',
              "Category 4 Markup": data["Category 4 Markup"] || '0.000000',
            }
          )
        } else {
          this.info = Object.assign({}, defaultInfo, {desc_txt: data['desc_txt']})
        }
        this.isDisabledSave = true
      },
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        },
        deep: true
      }
    },
    methods: {
      hide: function() {
        this.addProviderModalIsVisible = false
      },
      save: function () {
        if (!this.$refs.form.validate()) return null

        const newInfo = {
          program_id: this.$route.params.spid || 0,
          pid: this.info['Internal ID'] || 0,
          status_cd: this.info['Status'] || 'I',
          provider_markup: this.info['Provider Markup'] || 0,
          tier1_markup: this.info['Category 1 Markup'] || 0,
          tier2_markup: this.info['Category 2 Markup'] || 0,
          tier3_markup: this.info['Category 3 Markup'] || 0,
          tier4_markup: this.info['Category 4 Markup'] || 0,
          provider_fee: this.info['Fee'] || 0,
          uid: this.$store.state.user.session_uid || '',
        }
        const that = this
        this.loading = true
        if(this.type === 'edit') {
          services.updateSpecProgramProvider(newInfo).then(function (res) {
            if (res == '0' || res==0 || !res) {
              window.Vue.$emit('snackbar', 'success', 'Special Program Provider Updated!')
              that.redrawTable()
              that.addProviderModalIsVisible = false
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
          services.updateSpecProgramProvider(newInfo).then(function (res) {
            if (res == '0' || res==0 || !res) {
              window.Vue.$emit('snackbar', 'success', 'New Special Program Provider Added!')
              that.redrawTable()
              that.addProviderModalIsVisible = false
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
        this.addProviderModalIsVisible = false
        this.info = {}
        this.isDisabledSave = true
        this.close()
      },
      openFindProviderModal () {
        this.addProviderModalIsVisible = true
      },
      back() {
        this.addProviderModalIsVisible = false
      }
    }
  }
</script>
<style lang="stylus">
</style>
