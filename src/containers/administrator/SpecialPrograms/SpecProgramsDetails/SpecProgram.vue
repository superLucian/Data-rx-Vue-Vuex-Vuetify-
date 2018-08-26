<template>
  <main>
    <v-form ref="form">
      <v-card flat style="overflow: auto; max-height: 366px">
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-radio-group row v-model="info['status_cd']">
                <v-radio value="A" label="Active"></v-radio>
                <v-radio value="I" label="Inactive"></v-radio>
              </v-radio-group>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field
                name="program-description"
                v-model="info['desc_txt']"
                label="Program Description"
                multi-line
                auto-grow
                rows="3"
                hide-details
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6>
              <v-card-text class="pl-0">
              <v-select
                v-bind:items="pricingList"
                v-model="info['basis']"
                label="Pricing Basis"
                item-value="field_value"
                item-text="desc_txt"
              ></v-select>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="pr-0">
              <v-text-field label="Fee" type="number" step="0.01" v-model="info['program_fee']"></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
      <v-layout>
        <v-card-text class="py-0 px-1">
          <v-divider class="mt-2"></v-divider>
          <small class="red--text">&nbsp;*indicates required field</small>
          <v-card-actions>
            <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="primary-color" @click.native="save()" :disabled="isDisabledSave">Update<i v-if="loading"
                                                                                              class="fa fa-circle-o-notch fa-spin fa-fw"></i>
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-layout>
    </v-form>
  </main>
</template>

<script>
  import services from '../../../../services/specialPrograms/specProgramsServices'
  import {convertDate} from '../../../../components/utils/DateMethods'

  export default {
    name: 'special-program-edit',
    props: ['data', 'pricingList'],
    data() {
      return {
        info: this.data,
        loading: false,
        isDisabledSave: true
      }
    },
    watch: {
      data: function (d) {
        this.info = {...this.data}
      },
      info: {
        handler: function (newData, oldData) {
          if (newData && oldData && newData === oldData)
            this.isDisabledSave = false
        },
        deep: true
      }
    },
    methods: {
      save: function () {
        if (this.$refs.form.validate()) {
          const newSpec = {
            program_id: this.info.program_id,
            desc_txt: this.info.desc_txt,
            status_cd: this.info.status_cd,
            basis: this.info.basis,
            program_fee: this.info.program_fee,
          }
          services.updateSpecProgram(newSpec).then(res => {
            if (res == '0' || res == 0) {
              window.Vue.$emit('snackbar', 'success', 'Special Program is Updated!')
            }
          })
        }
      },
      close: function () {
        this.$router.push({name: 'special-programs'})
      },
      clear: function () {
        this.info = {...this.data} || {}
      }
    }
  }
</script>
