<template>
  <main>
    <v-layout row wrap>
      <v-form ref="form">
      <v-flex xs12>
        <v-subheader> GENERIC FORMULATION CODE </v-subheader>
        <p class="px-3">
          A unique 6-digit code identifying drugs with common active ingredients, master dosage form, strength, and route of administration. The GFC is not manufacturer or package size specific, and can therefore be used in preparation of drug utilization reports and analysis of generic alternatives for substitution and formulary development. </p>
      </v-flex>

      <v-flex xs5 class="py-3">
        <v-subheader> Enter the Generic Formulation Code : </v-subheader>
      </v-flex>
      <v-flex xs5>
        <v-text-field label="Generic Formulation Code" required v-model="drug_gfc" :rules="[rules.required]"
                      type="number"></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-subheader> After entering the GFC code, select 'Find'. </v-subheader>
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
    name: 'drug-find-gfc',
    props: ['findDrug', 'typeIndex'],
    data() {
      return {
        drug_gfc: '',
        isDisableFind: true,
        saveLoading: false,
        rules: {
          required: (v) => (v.length == 8 || 'Code must be 8 digits!')
        }
      }
    },
    watch: {
      drug_gfc: function (d) {
        this.isDisableFind = d.length <= 0
      }
    },
    mounted() {

    },
    methods: {
      find: function () {
        if (this.$refs.form.validate()) {
          const data = {
            drug_cd: this.drug_gfc,
            drug_file_cd: 0,
            drug_type_cd: parseInt(this.typeIndex),
            drug_list_type_cd: 0
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
