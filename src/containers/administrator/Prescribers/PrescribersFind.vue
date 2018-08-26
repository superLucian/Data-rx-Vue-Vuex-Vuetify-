<template>
  <v-form ref="form">
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Manage Prescribers</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        dark
        light
        single-line
        append-icon="search"
        placeholder="Search..."
        class="white--text"
        hide-details
      ></v-text-field>
      <v-btn icon @click.native="add" v-if="!selectable">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>
    <v-container fluid class="my-scroll-enabled">
      <v-tabs v-model="active">
        <v-tabs-bar class="transparent">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in tabs"
            :key="tab"
            :href="'#' + tab"
            ripple
            class="px-0"
          >
            {{ tab }}
          </v-tabs-item>
        </v-tabs-bar>
        <v-tabs-content id="Name">
          <v-layout row wrap>
            <v-flex xs12>
              <v-card-text>
                <p>Find (List) prescribers using :</p>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="Last Name" v-model="lname"
                              :rules="[rules.required]" required></v-text-field>
              </v-card-text>
            </v-flex>
            <v-flex xs6>
              <v-card-text class="py-0">
                <v-text-field label="First Name" v-model="fname"></v-text-field>
              </v-card-text>
            </v-flex>
          </v-layout>
        </v-tabs-content>
        <v-tabs-content id="Prescriber Id">
          <v-layout row wrap>
            <v-flex xs3 class="px-4 py-4">
              <p>Find (List) prescribers using :</p>
            </v-flex>
            <v-flex xs6>
              <v-text-field label="Enter NPI" single-line v-model="npi" required></v-text-field>
            </v-flex>
          </v-layout>
        </v-tabs-content>
        <v-card-actions class="d-block text-xs-center">
          <v-btn color="primary-color" @click.native="find" :disabled="isDisableFind">Find<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
        </v-card-actions>
      </v-tabs>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card-text>
            <v-data-table
              v-bind:headers="headers"
              :items="tableData"
              v-bind:search="search"
              :loading="loading"
            >
              <template slot="items" slot-scope="props">
                <tr>
                  <td class="text-xs-center">
                    <v-btn small v-if="selectable" color="primary-color" @click="selectPrescriber(props.item)">select</v-btn>
                    <v-tooltip top v-else>
                      <v-btn icon @click="clickRow(props.item)" slot="activator">
                        <v-icon>edit</v-icon>
                      </v-btn>
                      <span>Prescriber Edit</span>
                    </v-tooltip>
                  </td>
                  <td class="text-xs-left"> {{ props.item.did}}</td>
                  <td class="text-xs-left"> {{ props.item.NPI }}</td>
                  <td class="text-xs-left">{{ props.item['Last Name']}}</td>
                  <td class="text-xs-left">{{ props.item['First Name']}}</td>
                  <td class="text-xs-left">{{ props.item.UPIN }}</td>
                  <td class="text-xs-left">{{ props.item.Address}}</td>
                  <td class="text-xs-left">{{ props.item.City}}</td>
                  <td class="text-xs-left">{{ props.item.State }}</td>
                  <td class="text-xs-left">{{ props.item.Phone}}</td>
                </tr>
              </template>
            </v-data-table>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>

  </v-form>
</template>
<script>

  import prescriberServices from '../../../services/prescriber/prescriberService'
  import store from '../../../store'

  export default {
    name: 'prescribers-find',
    props: ['selectable', 'methodName'],
    data() {
      return {
        tabs: ['Name', 'Prescriber Id'],
        isDisableFind: true,
        isFindResult: false,
        search: '',
        tableData: [],
        loading: false,
        active: null,
        lname: '',
        fname: '',
        npi: '',
        headers: [],
        rules: {
          required: (value) => !!value || 'Required.'
        },
      }
    },
    components: {},
    watch: {
      active: function () {
        this.fname = ''
        this.lname = ''
        this.npi = ''
        this.isFindResult = false
        this.tableData = []
      },
      lname: function (d) {
        if (d.length > 0)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      },
      npi: function (d) {
        if (d.length > 0)
          this.isDisableFind = false
        else
          this.isDisableFind = true
      }
    },
    mounted() {
      console.log('----- Administrator / Prescribers mounted -----')
      this.headers = [
        {text: '', align: 'left', sortable: true, value: ''},
        {text: 'did', align: 'left', sortable: true, value: 'did'},
        {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
        {text: 'Last Name', align: 'left', sortable: true, value: 'Last Name'},
        {text: 'First Name', align: 'left', sortable: true, value: 'First Name'},
        {text: 'UPIN', align: 'left', sortable: true, value: 'UPIN'},
        {text: 'Address', align: 'left', sortable: true, value: 'Address'},
        {text: 'City', align: 'left', sortable: true, value: 'City'},
        {text: 'State', align: 'left', sortable: true, value: 'State'},
        {text: 'Phone', align: 'left', sortable: true, value: 'Phone'},
      ]
      this.$refs.form.validate()
    },
    methods: {
      find: function () {
        this.loading = true
        const that = this
        let data
        this.isFindResult = true
        switch (this.active) {
          case 'Name':
            data = {
              session_id: this.$store.state.user.session_id,
              session_uid: this.$store.state.user.session_uid,
              pcc: '*',
              lname: this.lname,
              fname: this.fname,
            }
            prescriberServices.getPrescriberListByPrescriberName(data).then(function (res) {
              if(res.prescriber_list.length > 0){
                that.tableData = res.prescriber_list
                that.loading = false
              } else {
                window.Vue.$emit('snackbar', 'success', 'No results found!')
                that.loading = false
                that.tableData = []
              }
            })
            return

          case 'Prescriber Id':
            data = {
              session_id: this.$store.state.user.session_id,
              session_uid: this.$store.state.user.session_uid,
              pcc: '*',
              npi: this.npi
            }

            prescriberServices.getPrescriberListByPrescriberId(data).then(function (res) {
              if(res.prescriber_list.length > 0){
                that.tableData = res.prescriber_list
                that.loading = false
              } else {
                window.Vue.$emit('snackbar', 'success', 'No results found!')
                that.loading = false
                that.tableData = []
              }
            })
            return
        }
      },
      clickRow(cellinfo) {
        this.$router.push({path: `edit/${cellinfo.did}`})
      },
      add() {
        this.$router.push({path: 'add'})
      },
      selectPrescriber(item) {
        window.Vue.$emit(this.methodName, item)
      }
    }
  }
</script>
<style lang="stylus">
</style>
