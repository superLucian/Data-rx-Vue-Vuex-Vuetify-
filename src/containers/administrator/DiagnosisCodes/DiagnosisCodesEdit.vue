<template>
  <v-layout row justify-center>
    <Vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="true"
      :closeOnClickMask="true"
      :width="800"
      :height="500"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          Diagnosis Code Edit
        </v-toolbar-title>
      </v-toolbar>
      <v-form ref="form">
        <v-container fluid class="pb-0" >
          <v-layout row wrap>
            <v-flex xs5>
              <v-text-field v-model="info['Diagnosis Code']" label="Diagnosis Code" required :rules="[rules.required]"
                            :disabled="true">
              </v-text-field>
            </v-flex>
            <v-spacer></v-spacer>
            <v-flex xs5>
              <v-text-field v-model="info.Diagnosis" label="Diagnosis" required :rules="[rules.required]">
              </v-text-field>
            </v-flex>

            <v-flex xs12>
              <v-text-field textarea v-model="info.Comments" label="Comments">
              </v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-card-text class="py-0">
          <small class="red--text">*indicates required field</small>
        </v-card-text>
        <v-card-actions class="d-block text-xs-center">
          <v-btn color="primary-color" @click.native="save" :disabled="isDisabledSave">Save<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
          <v-btn @click.native="close()">Close</v-btn>
        </v-card-actions>
      </v-form>
    </Vodal>
  </v-layout>
</template>

<script>
  import diagnoseServices from '../../../services/diagnose/diagnoseService'
  import Vodal from '../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'

  export default {
    name: 'edit-diagnosis',
    data() {
      return {
        show: false,
        info: {},
        isDisabledSave: true,
        rules: {
          required: (value) => !!value || 'Required.'
        },
        loading: false
      }
    },
    watch: {
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        },
        deep: true
      },
    },
    components: {
      Vodal
    },
    mounted() {
      console.log('------- Administrator / Diagnosis Codeds / Edit mounted ---------')
      const that = this
      window.Vue.$on('openEditDiagnosis', function (val) {
        that.info = {...val}
        that.open()
      })
    },
    methods: {
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      },
      save: function () {
        const that = this
        const data = {
          diagnosis_code: this.info['Diagnosis Code'],
          diagnosis: this.info.Diagnosis,
          comments: this.info.Comments,
          updated_by: this.$store.state.user.session_uid,
        }

        if (this.$refs.form.validate()) {
          that.loading = true
          diagnoseServices.updateDiagnosisCode(data).then(function (res) {
            if (res === '0') {
              that.loading = false
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'Diagnosis Code Updated!')
              that.$router.push({name: 'diagnosis-codes'})
              window.Vue.$emit('reloadDiagnosisCodeList')
            } else {
              window.Vue.$emit('snackbar', 'warning', res)
            }
            that.close()
          });
        }
      }
    }
  }
</script>

<style lang="scss">

</style>
