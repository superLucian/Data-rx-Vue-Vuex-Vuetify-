<template>
  <main>
    <v-layout row wrap>
      <v-form ref="form">
        <v-flex xs12>
          <v-subheader> GENERIC CLASS CODE </v-subheader>
          <p class="px-3">
            A unique 8-digit code given to any group of products with identical entries in the following fields:  * Generic Cross Reference  * Therapeutic Class Code  * Master Form Code  * Route of Administration  * Strength  * Package Quantity Code  * Package Size  * Product Weight/Volume   Extracting all records containing a common value will yield a list of exact dispensing alternatives. </p>
        </v-flex>

        <v-flex xs3>
          <v-subheader class="pt-4"> Enter the Generic Class Code  :  </v-subheader>
        </v-flex>
        <v-flex xs4>
          <v-card-text class="py-0">
            <v-text-field label="Generic Class Code" v-model="drug_gcc" type="number" required :rules="[rules.required]"
                          size="8"></v-text-field>
          </v-card-text>
        </v-flex>

        <v-flex xs12>
          <v-subheader> After entering the GCC code, select 'Find'. </v-subheader>
        </v-flex>
      </v-form>
    </v-layout>

    <v-card-actions class="d-block text-xs-center">
      <v-btn class="primary" @click.native="find" :disabled="isDisableFind">Find<i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
    </v-card-actions>

  </main>
</template>

<script>
  export default {
    name: 'drug-find-gcc',
    props: ['findDrug', 'typeIndex'],
    data() {
      return {
        drug_gcc: '',
        isDisableFind: true,
        saveLoading: false,
        rules: {
          required: (v) => (v.length == 8 || 'Code must be 8 digits!')
        }
      }
    },
    watch: {
      drug_gcc: function (d) {
        this.isDisableFind = d.length <= 0 || d.length > 8
      }
    },
    mounted() {

    },
    methods: {
      find: function () {
        if (this.$refs.form.validate()) {
          const data = {
            drug_cd: this.drug_gcc,
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
