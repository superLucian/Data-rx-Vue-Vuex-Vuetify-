<template>
  <main>
    <v-toolbar dark>
      <v-btn icon @click="back" dark>
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-toolbar-title class="white--text" v-if="type === 'add'">Add Prescribers</v-toolbar-title>
      <v-toolbar-title class="white--text" v-else>Edit Prescribers</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form ref="form">
      <v-layout row wrap>
        <v-layout row wrap class="my-scroll-enabled-1">
          <v-card-text class="pb-0">
            <p>Prescriber</p>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="NPI" :rules="[rules.required]" v-model="info.npi" v-if="type === 'add'"
                              required></v-text-field>
                <v-text-field label="NPI" disabled :rules="[rules.required]" v-model="info.npi" v-else
                              required></v-text-field>
              </v-flex>
              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="First Name" v-model="info.fname" :rules="[rules.required]" required></v-text-field>
              </v-flex>
              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="Last Name" v-model="info.lname" :rules="[rules.required]" required></v-text-field>
              </v-flex>
              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="Middle Name" v-model="info.mname"></v-text-field>
              </v-flex>


              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="Title" v-model="info.title_txt"></v-text-field>
              </v-flex>

              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="Phone" v-model="info.phone_num"></v-text-field>
              </v-flex>
              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="Fax" v-model="info.fax_num"></v-text-field>
              </v-flex>

              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="Email" v-model="info.email_addr_txt"></v-text-field>
              </v-flex>

              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="UPIN" v-model="info.upin"></v-text-field>
              </v-flex>

              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="SPIN" v-model="info.spin"></v-text-field>
              </v-flex>

              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="Fed License" v-model="info.fed_license_num"></v-text-field>
              </v-flex>
              <v-flex xs3 class="px-3 py-0">
                <v-text-field label="State License" v-model="info.state_license_num"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-text class="py-0">
            <p>Address</p>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs3 class="px-3 py-1">
                <v-text-field label="Address Line 1" v-model="info.addr1_txt"></v-text-field>
              </v-flex>

              <v-flex xs3 class="px-3 py-1">
                <v-text-field label="Address Line 2" v-model="info.addr2_txt"></v-text-field>
              </v-flex>

              <v-flex xs3 class="px-3 py-1">
                <v-text-field label="City" v-model="info.city_txt"></v-text-field>
              </v-flex>
              <v-flex xs1 class="px-3 py-1">
                <v-select
                  v-bind:items="state_items"
                  v-model="info.state_cd"
                  label=""
                  item-value="text"
                ></v-select>
              </v-flex>
              <v-flex xs2 class="px-3 py-1">
                <v-text-field label="Zip Code" v-model="info.zip_cd"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
          <v-card-text class="py-0">
            <p>Comments</p>
            <v-divider></v-divider>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field textarea label="Comments" v-model="info.comment_txt"></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-layout>
        <v-layout>
          <v-card-text class="py-0 px-1">
            <v-divider class="mt-2"></v-divider>
            <small class="red--text">*indicates required field</small>
            <v-card-actions>
              <v-btn @click.native="clear" :disabled="isDisabledSave">Clear</v-btn>
              <v-spacer></v-spacer>
              <v-btn class="primary" @click.native="create" :disabled="isDisabledSave" v-if="type === 'add'">Create
                <i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
              <v-btn class="primary" @click.native="save" :disabled="isDisabledSave" v-else>update<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
            </v-card-actions>
          </v-card-text>
        </v-layout>
      </v-layout>
    </v-form>
  </main>
</template>
<script>
  import prescriberServices from '../../../services/prescriber/prescriberService'
  import store from '../../../store'

  export default {
    name: 'prescribers-edit',
    props: ['type'],
    data() {
      return {
        active: null,
        rules: {
          required: (value) => !!value || 'Required.',
          email: (value) => {
            if (!!value) {
              const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
              return pattern.test(value) || 'Invalid e-mail.(XXX@XXX.com)'
            } else {
              return 'Required'
            }
          },
          phone: (value) => {
            if (!!value) {
              const pattern = /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/
              return pattern.test(value) || 'Invalid Phone Number.(XXX-XXX-XXXX)'
            } else {
              return 'Required'
            }
          }
        },
        state_items: [
          'AL', 'AK', 'AS', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'DC', 'FM', 'FL', 'GA', 'GU',
          'HI', 'ID', 'IL', 'IN', 'IA', 'NC', 'PR', 'KS', 'KY', 'LA', 'ME', 'MH', 'MD', 'MA',
          'MI', 'MN', 'MS', 'MO', 'RI', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'ND', 'MP',
          'OH', 'OK', 'OR', 'PW', 'PA', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VI', 'VA', 'XA', 'WV', 'WI', 'WY'
        ],
        info: {},
        isDisabledSave: true,
        mailPattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        phonePattern: /((\(\d{3}\) ?)|(\d{3}-))?\d{3}-\d{4}/,
        loading: false
      }
    },
    components: {},
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
      console.log('--------- Administrator / Prescribers Edit mounted ---------')
      const that = this
      if (this.type !== 'add') {
        prescriberServices.getPrescriber({did: this.$route.params.did}).then(function (res) {
          that.info = res.prescriber[0]
          that.isDisabledSave = true
        })
      } else {
        this.info = {
          npi: '',
          fname: '',
          mname: '',
          lname: '',
          title_txt: '',
          upin: '',
          spin: '',
          fed_license_num: '',
          state_license_num: '',
          addr1_txt: '',
          addr2_txt: '',
          city_txt: '',
          state_cd: '',
          zip_cd: '',
          phone_num: '',
          fax_num: '',
          email_addr_txt: '',
          comment_txt: '',
        }
      }
      this.$refs.form.validate()
    },
    methods: {
      back: function () {
        this.$router.push({name: 'prescribers'})
      },
      create: function () {
        const that = this
        if (this.$refs.form.validate()) {
          that.loading = true
          prescriberServices.addPrescriber(this.info, this.$store.state.user, this.$store.state.pcn.pcc).then(function (res) {
            if (res === '0') {
              that.loading = false
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'Prescriber Added Successfully!')
              that.$router.push({name: 'prescribers'})
            } else {
              that.loading = false
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      save: function () {
        const that = this
        if (this.$refs.form.validate()) {
          that.loading = false
          prescriberServices.updatePrescriber(this.info, this.$store.state.user, this.$store.state.pcn.pcc, Number(this.$route.params.did)).then(function (res) {
            if (res === '0') {
              that.loading = false
              that.isDisabledSave = true
              window.Vue.$emit('snackbar', 'success', 'Prescriber Updated!')
              that.$router.push({name: 'prescribers'})
            } else {
              that.loading = false
              window.Vue.$emit('snackbar', 'warning', res)
            }
          })
        }
      },
      clear: function () {
        const that = this
        if (this.type === 'add') {
          this.info = {
            npi: '',
            fname: '',
            mname: '',
            lname: '',
            title_txt: '',
            upin: '',
            spin: '',
            fed_license_num: '',
            state_license_num: '',
            addr1_txt: '',
            addr2_txt: '',
            city_txt: '',
            state_cd: '',
            zip_cd: '',
            phone_num: '',
            fax_num: '',
            email_addr_txt: '',
            comment_txt: '',
          }
          this.$refs.form.validate()
        } else {
          prescriberServices.getPrescriber({did: this.$route.params.did}).then(function (res) {
            that.info = res.prescriber[0]
            that.isDisabledSave = true
          })
        }
        this.isDisabledSave = true
      }
    }
  }
</script>
<style lang="stylus">
</style>
