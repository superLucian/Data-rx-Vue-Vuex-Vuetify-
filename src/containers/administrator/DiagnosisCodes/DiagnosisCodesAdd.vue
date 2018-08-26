<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text">Add Diagnosis Codes</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form">
      <v-container fluid class="my-sub-scroll-enabled pb-0">
        <v-layout row wrap>
          <v-flex xs6>
            <v-card-text class="py-0 pl-0">
              <v-text-field v-model="info.diagnosis_code" label="Diagnosis Code" :rules="[rules.required]" required>
              </v-text-field>
            </v-card-text>
          </v-flex>

          <v-flex xs6>
            <v-card-text class="py-0 pr-0">
              <v-text-field v-model="info.diagnosis" label="Diagnosis" :rules="[rules.required]" required>
              </v-text-field>
            </v-card-text>
          </v-flex>

          <v-flex xs12>
            <v-card-text class="py-0 px-0">
              <v-text-field
                textarea
                v-model="info.comments"
                label="Comments"
              >
              </v-text-field>
            </v-card-text>
          </v-flex>
        </v-layout>

      </v-container>
      <v-layout>
        <v-card-text class="py-0 px-1">
          <v-divider class="mt-2"></v-divider>
          <small class="red--text">*indicates required field</small>
          <v-card-actions>
            <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn class="primary" @click.native="save" :disabled="isDisabledSave">create<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
          </v-card-actions>
        </v-card-text>
      </v-layout>
    </v-form>
  </main>
</template>

<script>
  import diagnoseServices from '../../../services/diagnose/diagnoseService'
  import store from '../../../store'

  export default {
    name: 'diagnosis-codes-add',
    data() {
      return {
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
      }
    },
    mounted() {
      console.log('---------- Administrator / Diagnosis Code / Add mounted ---------')
      this.info = {
        diagnosis_code: '',
        diagnosis: '',
        comments: '',
      }
    },
    methods: {
      save: function () {
        const that = this
        const data = {
          diagnosis_code: this.info.diagnosis_code,
          diagnosis: this.info.diagnosis,
          comments: this.info.comments,
          created_by: this.$store.state.user.session_uid
        }
        if (this.$refs.form.validate()) {
          that.loading = true
          diagnoseServices.addDiagnosisCode(data).then(function (res) {
            if (res === '0') {
              that.loading = false
              window.Vue.$emit('snackbar', 'success', 'Diagnosis Code Add!')
              that.$router.push({name: 'diagnosis-codes'})
            } else {
              that.loading = false
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      back() {
        this.$router.push({name: 'diagnosis-codes'})
      },
      clear: function () {
        this.info = {
          diagnosis_code: '',
          diagnosis: '',
          comments: ''
        }
        this.$refs.form.validate()
        this.isDisabledSave = true
      }
    }
  }
</script>

<style lang="scss">

</style>


