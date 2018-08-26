<template>
  <main>
    <v-layout row wrap>
      <v-flex xs4>
        <v-subheader class="pt-3">Select drug file: </v-subheader>
      </v-flex>
      <v-flex xs8>
        <v-card-text class="py-0">
          <v-radio-group v-model="drug_file" row>
            <v-radio label="Standard Drugs" value="0"></v-radio>
            <v-radio label="Special Drugs" value="1"></v-radio>
            <v-radio label="Compound Drugs" value="2"></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-flex>
      <v-flex xs6>
        <v-subheader class="pt-3">
          Enter the name of the Drug. You can use the full name or the first few signification letters of the Drug name.
        </v-subheader>
      </v-flex>
      <v-flex xs6>
        <v-card-text class="py-0">
          <v-text-field label="Drug Name" v-model="drug_name"></v-text-field>
        </v-card-text>
      </v-flex>
      <v-flex md4>
        <v-subheader class="pt-3"> Select the method to list other related drugs </v-subheader>
      </v-flex>
      <v-flex md8>
        <v-card-text class="py-0">
          <v-radio-group v-model="drug_list_type" row>
            <v-radio label="Drug Name Only" value="0"></v-radio>
            <v-radio label="Therapeutic Equivalent" value="1"></v-radio>
            <v-radio label="Same Active Ingredients" value="3"></v-radio>
          </v-radio-group>
        </v-card-text>
      </v-flex>
      <v-flex xs12>
        <v-subheader>
          After entering the name and the related drug list option, select 'Find'.
        </v-subheader>
      </v-flex>
    </v-layout>
    <v-card-actions class="d-block text-xs-center">
      <v-btn class="primary" @click.native="find" :disabled="isDisableFind">Find <i v-if="saveLoading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
    </v-card-actions>

  </main>
</template>

<script>
  export default {
    name: 'drug-find-name',
    props: ['findDrug', 'typeIndex'],
    data() {
      return {
        drug_name: '',
        drug_file: '0',
        drug_list_type: '0',
        isDisableFind: true,
        saveLoading: false,
      }
    },
    watch: {
      drug_name: function (d) {
        this.isDisableFind = d.length <= 0
      }
    },
    mounted() {

    },
    methods: {
      find: function () {
        const data = {
          drug_cd: this.drug_name,
          drug_file_cd: parseInt(this.drug_file),
          drug_type_cd: parseInt(this.typeIndex),
          drug_list_type_cd: parseInt(this.drug_list_type)
        }
        this.saveLoading = true
        this.findDrug(data)
        this.saveLoading = false
        this.isDisableFind = true
      }
    }
  }
</script>
