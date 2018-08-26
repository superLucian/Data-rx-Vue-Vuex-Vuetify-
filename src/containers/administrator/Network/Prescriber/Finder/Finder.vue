<template>
  <main>
    <v-layout row wrap>
      <v-tabs v-model="finderMode">
        <v-tabs-bar class="white">
          <v-tabs-slider class="active-line"></v-tabs-slider>
          <v-tabs-item
            v-for="tab in finderTabs"
            :key="tab.name"
            :href="tab.path">
            {{ tab.name }}
          </v-tabs-item>
        </v-tabs-bar>
      </v-tabs>
      <!-- Provider Name tab-->
      <v-flex xs12 v-if="finderMode=='name'">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text class="text-xs-center">Find(list) prescribers using:</v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs6 class="pr-3">
                <v-text-field label="Last Name" v-model="finderKey['last_name']" required>
                </v-text-field>
              </v-flex>
              <v-flex xs6 class="pl-3">
                <v-text-field label="First Name" v-model="finderKey['first_name']">
                </v-text-field>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- Prescriber ID tab-->
      <v-flex xs12 v-if="finderMode=='id'">
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text class="text-xs-center">Find a prescriber using:</v-card-text>
          </v-flex>
          <v-flex xs12>
            <v-text-field label="NPI" v-model="finderKey['npi']" required>
            </v-text-field>
          </v-flex>
        </v-layout>
      </v-flex>
      <!-- Find Result -->
      <v-flex xs12>
        <v-data-table
          v-bind:headers="foundPrescriberHeaders"
          v-bind:items="foundPrescriberList"
          v-bind:pagination.sync="pagination"
          :loading="loading">
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-left handCell" @click="select(props.item)">
                <v-btn icon>
                  <v-tooltip top>
                    <span slot="activator"><v-icon>present_to_all</v-icon></span>
                    <span>Prescriber Add</span>
                  </v-tooltip>
                </v-btn>
              </td>
              <td class="text-xs-left">{{ props.item['did'] }}</td>
              <td class="text-xs-left">{{ props.item['NPI'] }}</td>
              <td class="text-xs-left">{{ props.item['Last Name'] }}</td>
              <td class="text-xs-left">{{ props.item['First Name'] }}</td>
              <td class="text-xs-left">{{ props.item['UPIN'] }}</td>
              <td class="text-xs-left">{{ props.item['Address'] }}</td>
              <td class="text-xs-left">{{ props.item['City'] }}</td>
              <td class="text-xs-left">{{ props.item['State'] }}</td>
              <td class="text-xs-left">{{ props.item['Phone'] }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <v-divider class="mt-2"></v-divider>
    <v-card-actions class="d-block text-xs-center">
      <v-btn color="primary-color" @click.native="find()" :disabled="disableFindBtn">Find</v-btn>
      <v-btn @click.native="cancel()">Cancel</v-btn>
    </v-card-actions>
  </main>
</template>
<script>
  import networkServices from '../../../../../services/network/networkServices'
  import store from '../../../../../store'

  export default {
    props: ['select', 'cancel'],
    components: {},
    data() {
      return {
        finderTabs: [
          {name: 'Name', path: 'name'},
          {name: 'Prescriber Id', path: 'id'},
        ],
        finderMode: 'name',
        finderKey: {
          last_name: '',
          first_name: '',
          npi: ''
        },
        disableFindBtn: true,
        foundPrescriberHeaders: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'did', align: 'left', sortable: true, value: 'did'},
          {text: 'NPI', align: 'left', sortable: true, value: 'NPI'},
          {text: 'Last Name', align: 'left', sortable: true, value: 'Last Name'},
          {text: 'First Name', align: 'left', sortable: true, value: 'First Name'},
          {text: 'UPIN', align: 'left', sortable: true, value: 'UPIN'},
          {text: 'Address', align: 'left', sortable: true, value: 'Address'},
          {text: 'City', align: 'left', sortable: true, value: 'City'},
          {text: 'State', align: 'left', sortable: true, value: 'State'},
          {text: 'Phone', align: 'left', sortable: true, value: 'Phone'},
        ],
        foundPrescriberList: [],
        loading: false,
        pagination: {
          rowsPerPage: 5
        }
      }
    },
    mounted() {
    },
    methods: {
      find: function () {
        const that = this
        const user = that.$store.state.user
        const pcc = that.$store.state.pcn.pcc
        let info
        switch (that.finderMode) {
          case 'name':
            this.loading = true
            info = {
              lname: that.finderKey['last_name'],
              fname: that.finderKey['first_name'],
            }
            networkServices.getPrescriberListByPrescriberName(info, user, pcc).then(function (res) {
              that.foundPrescriberList = res.prescriber_list
            })
            that.loading = false
            return
          case 'id':
            this.loading = true
            info = {
              npi: that.finderKey['npi']
            }
            networkServices.getPrescriberListByPrescriberId(info, user, pcc).then(function (res) {
              that.foundPrescriberList = res.prescriber_list
            })
            that.loading = false
            return
        }
      }
    },
    watch: {
      finderMode: function () {
        this.disableFindBtn = true
        switch (this.finderMode) {
          case "name":
            this.disableFindBtn = this.finderKey['last_name'].length < 1
            break
          case "id":
            this.disableFindBtn = this.finderKey['npi'].length < 1
            break
        }
      },
      finderKey: {
        handler(newVal, oldVal) {
          switch (this.finderMode) {
            case "name":
              this.disableFindBtn = this.finderKey['last_name'].length < 1
              break
            case "id":
              this.disableFindBtn = this.finderKey['npi'].length < 1
              break
          }
        },
        deep: true,
      }
    }
  }
</script>
<style lang="stylus">
</style>
