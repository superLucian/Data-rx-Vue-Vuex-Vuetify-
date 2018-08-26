<template>
  <main>
    <v-form ref="form">
    <v-layout row wrap>
      <v-flex xs12>
        <v-subheader> Please insert Drug Description, GPI and NDC. </v-subheader>
      </v-flex>
      <v-flex xs4>
        <v-card-text class="py-0">
          <v-text-field label="Drug Description" v-model="drug_desc"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs4>
        <v-card-text class="py-0">
          <v-text-field label="GPI" v-model="drug_gpi" type="number"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex xs4>
        <v-card-text class="py-0">
          <v-text-field label="NDC" v-model="drug_ndc" type="number"></v-text-field>
        </v-card-text>
      </v-flex>
    </v-layout>
      <v-card-actions class="d-block text-xs-center">
      <v-btn class="primary" @click.native="find" :disabled="isDisableFind">Find</v-btn>
      </v-card-actions>
    </v-form>
  </main>
</template>

<script>
  export default {
    name: 'drug-find-gpi',
    props: ['findDrug', 'typeIndex'],
    data() {
      return {
        drug_desc: '',
        drug_gpi: '',
        drug_ndc: '',
        isDisableFind: true
      }
    },
    watch: {
      drug_desc: function (d) {
        if (d.length > 0)
          this.isDisableFind = false
      },
      drug_gpi: function (d) {
        if (d.length > 0)
          this.isDisableFind = false
      },
      drug_ndc: function (d) {
        if (d.length > 0)
          this.isDisableFind = false
      }
    },
    mounted() {

    },
    methods: {
      find: function () {
        const data = {
          drug_file_cd: 3,  //gpi_drug_file
          drug_type_cd: 0,
          drug_list_type_cd: 0
        }
        this.isDisableFind = true
        if (this.drug_desc.length > 0) {
          return this.findDrug(Object.assign({}, {...data}, {
            drug_cd: this.drug_desc,
            drug_type_cd: 0,
            drug_file_cd: 3
          }))
        }
        if (this.drug_gpi.length > 0) {
          return this.findDrug(Object.assign({}, {...data}, {
            drug_cd: this.drug_gpi,
            drug_type_cd: parseInt(this.typeIndex),
            drug_file_cd: 3
          }))
        }

        if (this.drug_ndc.length > 0) {
          return this.findDrug(Object.assign({}, {...data}, {
            drug_cd: this.drug_ndc,
            drug_type_cd: 1,
            drug_file_cd: 3
          }))
        }
      }
    }
  }
</script>
