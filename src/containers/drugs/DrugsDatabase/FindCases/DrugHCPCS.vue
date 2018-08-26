<template>
  <main>
    <v-layout row wrap>
      <v-flex xs12>
        <v-subheader> HCFA COMMON PROCEDURE CODING SYSTEM. </v-subheader>
      </v-flex>
      <v-flex xs3 class="py-3">
        <v-subheader> Enter the HCPCS Code : </v-subheader>
      </v-flex>
      <v-flex xs4 class="py-0">
        <v-text-field label="HCPCS Code" v-model="drug_hcpcs" type="number"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-subheader> After entering the HCPCS code, select 'Find'. </v-subheader>
      </v-flex>


    </v-layout>
    <v-card-actions class="d-block text-xs-center">
      <v-btn class="primary" @click.native="find" :disabled="isDisableFind">Find <i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
    </v-card-actions>

  </main>
</template>

<script>
  export default {
    name: 'drug-find-hcpcs',
    props: ['findDrug', 'typeIndex'],
    data() {
      return {
        drug_hcpcs: '',
        isDisableFind: true,
        saveLoading: false,
      }
    },
    watch: {
      drug_hcpcs: function (d) {
        this.isDisableFind = d.length <= 0
      }
    },
    mounted() {

    },
    methods: {
      find: function () {
        const data = {
          drug_cd: this.drug_hcpcs,
          drug_file_cd: 2,
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
</script>
