<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Manage Users</v-toolbar-title>
      <v-menu offset-y>
        <v-btn flat slot="activator" class="status">
          {{currentFilter}}
        </v-btn>
        <v-list>
          <v-list-tile v-for="item in listFilterItems" :key="item" @click="changeFilter(item)">
            <v-list-tile-title>{{ item }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
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
      <v-btn icon @click.native="addUser">
        <v-icon>add</v-icon>
      </v-btn>
    </v-toolbar>

    <v-container fluid class="my-scroll-enabled">
      <v-layout row wrap>
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="items"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading"
          item-key="UserId"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-left" @click="props.expanded = !props.expanded">
                <v-tooltip top v-if="props.expanded">
                  <v-btn icon slot="activator">
                    <v-icon>expand_less</v-icon>
                  </v-btn>
                  <span>Close</span>
                </v-tooltip>
                <v-tooltip top v-else>
                  <v-btn icon slot="activator">
                    <v-icon>expand_more</v-icon>
                  </v-btn>
                  <span>View details</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left">
                <v-tooltip top>
                  <v-btn icon @click="clickRow(props.item['UserId'])" slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>User Edit</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left">{{ props.item['UserId'] }}</td>
              <td class="text-xs-left">{{ props.item['LastName'] }}</td>
              <td class="text-xs-left">{{ props.item['FirstName'] }}</td>
              <td class="text-xs-left">{{ props.item['EmailAddress'] }}</td>
              <td class="text-xs-center">
                <v-tooltip top>
                  <v-btn icon slot="activator">
                    <v-icon v-if="props.item['IsActive']" color="green">fiber_manual_record</v-icon>
                    <v-icon v-else color="grey">fiber_manual_record</v-icon>
                  </v-btn>
                  <span v-if="props.item['IsActive']">Active</span>
                  <span v-else>Inactive</span>
                </v-tooltip>
              </td>
              <td class="text-xs-center">
                <v-tooltip top>
                  <v-btn icon slot="activator">
                    <v-icon v-if="props.item['SessionStatus'] === '1'" color="green">check_circle</v-icon>
                    <v-icon v-else>cancel</v-icon>
                  </v-btn>
                  <span v-if="props.item['SessionStatus'] === '1'">Open</span>
                  <span v-else>Close</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-layout row wrap>
              <v-flex xs4>
                <v-card-text>
                  <p><span>User Id:</span> {{ props.item['UserId'] }}</p>
                  <p><span>Address:</span> {{ props.item['MailingAddress']['Street1'] }}</p>
                  <p><span>Zip Code:</span> {{ props.item['MailingAddress']['PostalCode'] }}</p>
                  <p><span>Pager Number:</span> {{ props.item['PagerNumber'] }}</p>
                  <p><span>Session Status:</span> {{ props.item['SessionState'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text>
                  <p><span>Last Name:</span> {{ props.item['LastName'] }}</p>
                  <p><span>City:</span> {{ props.item['MailingAddress']['City'] }}</p>
                  <p><span>Phone Number:</span> {{ props.item['PhoneNumber'] }}</p>
                  <p><span>Email:</span> {{ props.item['EmailAddress'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs4>
                <v-card-text>
                  <p><span>First Name:</span> {{ props.item['FirstName'] }}</p>
                  <p><span>State:</span> {{ props.item['MailingAddress']['State'] }}</p>
                  <p><span>Cell Number:</span> {{ props.item['CellPhoneNumber'] }}</p>
                  <p><span>Status Code:</span> {{ props.item['IsActive'] }}</p>
                </v-card-text>
              </v-flex>
            </v-layout>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
  </main>
</template>
<script>
  import services from '../../../services/services'
  import store from '../../../store'

  export default {
    name: 'users-list',
    data() {
      return {
        fullData: [],
        search: '',
        pagination: {
          rowsPerPage: 25
        },
        selected: [],
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'User Id', align: 'left', sortable: true, value: 'UserId'},
          {text: 'Last Name', align: 'left', sortable: true, value: 'LastName'},
          {text: 'First Name', align: 'left', sortable: true, value: 'FirstName'},
          {text: 'Email', align: 'left', sortable: true, value: 'Email'},
          {text: 'Status', align: 'left', sortable: true, value: 'Status'},
          {text: 'Session Status', align: 'left', sortable: true, value: 'SessionStatus'}
        ],
        items: [],
        currentFilter: 'Active',
        listFilterItems: ['Active', 'Inactive', 'All'],
        selectedRowData: {},
        loading: true
      }
    },
    components: {},
    watch: {
      currentFilter() {
        this.setItems()
      }
    },
    mounted() {
      console.log('----- Administrator / Users mounted -----')
      store.commit('CLEAR', 'selectedPermission')
      const that = this

      services.getUsersData(that.$store.state.user, that.$store.state.pcn).then(function (res) {
        that.fullData = []
        res.forEach(function (d) {
          d.PccAccessList.forEach(function (v) {
            if(v.Pcc === that.$store.state.pcn.pcc || d.HasAllPccAccess){
              that.fullData.push(d)
              return
            }
          })
        })
        that.setItems()
        that.loading = false
      })

      window.Vue.$on('loadUsers', function () {
        this.loading = true
        services.getUsersData(that.$store.state.user, that.$store.state.pcn).then(function (res) {
          that.fullData = []
          res.forEach(function (d) {
            d.PccAccessList.forEach(function (v) {
              if(v.Pcc === that.$store.state.pcn.pcc || d.HasAllPccAccess){
                that.fullData.push(d)
                return
              }
            })
          })
          that.setItems()
          that.loading = false
        })
      })
    },
    methods: {
      setItems() {
        const that = this
        this.items = []
        switch (that.currentFilter) {
          case 'All':
            this.items = this.fullData
            return
          case 'Active':
            this.fullData.map(function (item) {
              if (item['IsActive'] === true)
                that.items.push(item)
            })
            return
          case 'Inactive':
            this.fullData.map(function (item) {
              if (item['IsActive'] === false)
                that.items.push(item)
            })
            return
        }
      },
      changeFilter: function (filter) {
        this.currentFilter = filter
      },
      clickRow(uid) {
        this.$router.push({path: `edit/${uid}`})
      },
      addUser() {
        this.$router.push({path: `add`})
      }
    }
  }
</script>
<style lang="stylus">
</style>
