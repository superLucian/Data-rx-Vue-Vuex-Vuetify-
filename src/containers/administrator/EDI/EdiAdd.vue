<template>
  <main>
    <Vodal :show="show" animation="zoom" :closeOnEsc="false" :closeButton="true" :width="900" :closeOnClickMask="true" v-on:hide="closeModal">
      <v-form ref="form">
        <div v-if="!addProviderModalIsVisible">
          <v-toolbar dark>
            <v-toolbar-title class="white--text">Add EDI Order</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field
                  required
                  type="number"
                  label="Provider Id"
                  v-model="info.pid"
                  :rules="[rules.required]"
                ></v-text-field>
              </v-flex>
              <v-btn color="primary-color" @click.native="openFindProviderModal" class="mt-2">Find</v-btn>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs6>
                <v-text-field
                  required
                  label="NDC"
                  type="number"
                  :counter="11"
                  v-model.trim="info.ndc"
                  :rules="[rules.required, rules.digitEleven]"
                ></v-text-field>
              </v-flex>
              <v-flex xs6 class="pl-3">
                <v-text-field
                  required
                  label="Qty"
                  type="number"
                  v-model="info.qty"
                  :rules="[rules.required, rules.validInteger]"
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-flex xs12>
              <v-text-field
                multi-line
                auto-grow
                rows="3"
                hide-details
                label="Comment"
                v-model="info.comments"
              ></v-text-field>
            </v-flex>
          </v-card-text>
          <v-layout>
            <v-card-text class="py-0 px-1">
              <v-divider class="mt-2"></v-divider>
              <small class="red--text">&nbsp;*indicates required field</small>
              <v-card-actions class="d-block text-xs-center">
                <v-btn class="primary" @click.native="save()" :disabled="isDisabledSave">Save<i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
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
      </v-form>
    </Vodal>
  </main>
</template>
<script>
  import store from '../../../store'
  import services from '../../../services/edi/ediServices'
  import Vodal from '../../../components/common/Vodal.vue'
  import ProviderFind from '../Provider/ProviderFind.vue'
  import {required, validInteger, digitEleven} from '../../../components/utils/FormRuleDefinitions'

  export default {
    name: 'edi-add',
    components: {
      Vodal,
      ProviderFind
    },
    props: ['show', 'close', 'reloadTable'],
    data() {
      return {
        addProviderModalIsVisible: false,
        methodName: 'selectProviderToAddEDI',
        loading: false,
        saveLoading: false,
        info: {
          ndc: '',
          pid: null,
          qty: null,
          comments: '',
          pcc: this.$store.state.pcn.pcc,
          created_by: this.$store.state.user.session_uid,
        },
        rules: {
          required: required,
          validInteger: validInteger,
          digitEleven: digitEleven,
        }
      }
    },
    computed: {
      isDisabledSave: function () {
        const { pid, ndc, qty, comments } = this.info
        return !(pid || ndc || qty || comments)
      }
    },
    mounted() {
      const that = this
      window.Vue.$on(this.methodName, function({pid}) {
        that.info.pid = pid
        that.addProviderModalIsVisible = false
      })
    },
    methods: {
      hide: function() {
        this.addProviderModalIsVisible = false
      },
      save: function () {
        if (this.$refs.form.validate()) {
          const that = this
          services.addProviderNdcAdjustment(this.info).then(function (res) {
            that.saveLoading = true
            if (res === "0") {
              that.saveLoading = false
              window.Vue.$emit('snackbar', 'success', 'New Order Added Successfully!')
              that.reloadTable()
              that.addProviderModalIsVisible = false
              that.close()
            } else {
              that.saveLoading = false
              window.Vue.$emit('snackbar', 'warning', res)
            }
          }).catch(function (error) {
            that.saveLoading = false
            window.Vue.$emit('snackbar', 'error', 'Error!')
          })
        }
      },
      closeModal() {
        this.addProviderModalIsVisible = false
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
