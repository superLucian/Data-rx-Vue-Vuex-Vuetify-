<template>
  <v-form ref="form">
  <main>
    <v-card-text class="py-0">
      <v-layout row wrap>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field name="Type_Name" label="*Type" v-model="info['Network Type Desc']" disabled
                          id="testing"></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field name="Desc" label="*Desc" v-model="info['desc_txt']" disabled></v-text-field>
          </v-card-text>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field name="AMT" label="Min Claim Amt" v-model="info.min_claim_amt" type="Number" :rules="[rules.claimRules]" :counter="4"></v-text-field>
          </v-card-text>
        </v-flex>
        <v-layout row wrap>
          <v-flex xs3>
            <v-card-text class="py-4">
              <v-checkbox label="Use submitted Prici" v-model="info.use_submitted_ind" true-value="Y"
                          false-value="N"></v-checkbox>
            </v-card-text>
            <v-card-text class="py-0">
              <v-checkbox label="Allow Compoun" v-model="info.compound_covered_ind" true-value="Y"
                          false-value="N"></v-checkbox>
            </v-card-text>
          </v-flex>
          <v-flex xs9>
            <v-card-text class="py-0">
              <v-text-field name="Comment" label="Comment" multi-line v-model="info.comment_txt"></v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-layout>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-block text-xs-center">
      <v-btn color="primary-color" :disabled="isDisabledSave" @click.native="save">Save<i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
      <v-btn @click.native="close">Close</v-btn>
    </v-card-actions>
  </main>
  </v-form>
</template>
<script>
  import planServices from '../../../../../services/plan/planServices'

  export default {
    name: 'plan-network',
    props: ['networkValue', 'networkObj', 'onBack'],
    data() {
      return {
        info: {},
        rules: {
          required: (value) => !!value || 'Required.',
          claimRules: (v) => v < 10000|| 'Min Claim Amt must be less more than 9999.',
        },
        saveLoading: false,
        isDisabledSave: true
      }
    },
    watch: {
      networkValue: function (val) {
        this.info = Object.assign({}, {...val.network[0]}, {...this.networkObj})
      },
      info: {
        handler: function (newData, oldData) {
          if(newData && oldData && newData === oldData)
            this.isDisabledSave = false
        }, deep: true
      },
    },
    mounted() {
      console.log('----- Administrator / Plan / Networks / Edit / Network mounted -----')
      if (this.networkValue.network)
        this.info = Object.assign({}, {...this.networkValue.network[0]}, {...this.networkObj})
    },
    components: {},
    methods: {
      save: function () {
        const that = this
        if(that.$refs.form.validate()){
          planServices.updateGroupPlanNetwork(this.info, this.$store.state.user).then(function (res) {
            that.saveLoading = true
            if (res === "0") {
              that.saveLoading = false
              that.isDisabledSave = true
              window.Vue.$emit('reloadPlanNetwork')
              window.Vue.$emit('snackbar', 'success', 'Update Network!')
              that.onBack()
            } else {
              that.saveLoading = false
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      close: function () {
        this.onBack()
      }
    }
  }
</script>

<style lang="scss">

</style>
