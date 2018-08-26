<template>
  <main>
    <v-layout row wrap>
      <v-form ref="form">
        <v-flex xs12>
          <v-subheader> GENERIC CROSS REFERENCE CODE </v-subheader>
          <p class="px-3">
            A unique 6-digit code assigned to all products that contain the same set of active ingredients. By listing all records containing this code, users can identify comparable products regardless of trade or generic name. </p>
        </v-flex>

        <v-flex xs4 class="py-3">
          <v-subheader> Enter the Generic Cross Reference Code. </v-subheader>
        </v-flex>
        <v-flex xs4>
          <v-text-field label="Generic Cross Reference Code" v-model="drug_gcr" :rules="[rules.required]"
                        type="number"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-subheader> After entering the GCR code, select 'Find'. </v-subheader>
        </v-flex>
      </v-form>
    </v-layout>
    <v-card-actions class="d-block text-xs-center">
      <v-btn class="primary" @click.native="find" :disabled="isDisableFind">Find <i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
    </v-card-actions>

  </main>
</template>

<script>
  export default {
    name: 'drug-find-gcr',
    props: ['findDrug', 'typeIndex'],
    data() {
      return {
        drug_gcr: '',
        isDisableFind: true,
        saveLoading: false,
        rules: {
          required: (v) => (v.length == 6 || 'Code must be 6 digits!')
        }
      }
    },
    watch: {
      drug_gcr: function (d) {
        this.isDisableFind = d.length <= 0
      }
    },
    mounted() {

    },
    methods: {
      find: function () {
        if (this.$refs.form.validate()) {
          const data = {
            drug_cd: this.drug_gcr,
            drug_file_cd: 0,
            drug_type_cd: parseInt(this.typeIndex),
            drug_list_type_cd: 0,
            strength: '',
            form: '',
            repack_flg: 'T',
            outdated_flg: 'T'
          }
          this.saveLoading = true
          this.findDrug(data)
          this.saveLoading = false
          this.isDisableFind = true
        }
      }
    }
  }
</script>
