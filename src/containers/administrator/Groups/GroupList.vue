<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Manage Groups</v-toolbar-title>
      <v-menu offset-y>
        <v-btn flat slot="activator" class="status">
          {{filter}}
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
      <v-btn icon @click.native="addGroup">
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
          item-key="group_id">
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center" @click="props.expanded = !props.expanded">
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
                <v-tooltip top>
                  <v-btn icon @click="clickRow(props.item['group_id'])" slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Group Edit</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left">{{ props.item['Group Code'] }}</td>
              <td class="text-xs-left">{{ props.item['Org Code'] }}</td>
              <td class="text-xs-left">{{ props.item['Group Type'] }}</td>
              <td class="text-xs-left">{{ props.item['name'] }}</td>
              <td class="text-xs-left">{{ props.item['Phone'] }}</td>
              <td class="text-xs-left">{{ props.item['Fax'] }}</td>
              <td class="text-xs-left">{{ props.item['Email'] }}</td>
              <td class="text-xs-left">{{ props.item['Web'] }}</td>
              <td class="text-xs-left">
                <v-tooltip top>
                    <span slot="activator">
                      <v-icon v-if="props.item['Status Code'] === 'Active'" color="green">fiber_manual_record</v-icon>
                      <v-icon v-else color="grey">fiber_manual_record</v-icon>
                    </span>
                  <span>{{ props.item['Status Code'] }}</span>
                </v-tooltip>
              </td>

            </tr>
          </template>
          <template slot="expand" slot-scope="props">
            <v-layout row wrap>
              <v-flex xs3>
                <v-card-text>
                  <p><span>Group Code:</span> {{ props.item['Group Code'] }}</p>
                  <p><span>Org Code:</span> {{ props.item['Org Code'] }}</p>
                  <p><span>Status Code:</span> {{ props.item['Status Code'] }}</p>
                  <p><span>Group Type:</span> {{ props.item['Group Type'] }}</p>
                  <p><span>Name:</span> {{ props.item['name'] }}</p>
                  <p><span>Mail Address:</span> {{ props.item['Mail Address'] }}</p>
                  <p><span>Mail City:</span> {{ props.item['Mail City'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p><span>Mail State Code:</span> {{ props.item['Mail State Code'] }}</p>
                  <p><span>Mail Zip Code:</span> {{ props.item['Mail Zip Code'] }}</p>
                  <p><span>Invoice Address:</span> {{ props.item['Invoice Address'] }}</p>
                  <p><span>Invoice City:</span> {{ props.item['Invoice City'] }}</p>
                  <p><span>Invoice State Code:</span> {{ props.item['Invoice State Code'] }}</p>
                  <p><span>Invoice Zip Code:</span> {{ props.item['Invoice Zip Code'] }}</p>
                  <p><span>Cust Svc Phone:</span> {{ props.item['Cust Svc Phone'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p><span>Phone:</span> {{ props.item['Phone'] }}</p>
                  <p><span>Fax:</span> {{ props.item['Fax'] }}</p>
                  <p><span>Email:</span> {{ props.item['Email'] }}</p>
                  <p><span>Web:</span> {{ props.item['Web'] }}</p>
                  <p><span>GL Acct Num:</span> {{ props.item['GL Acct Num'] }}</p>
                  <p><span>Cal Period Start Date:</span> {{ props.item['Cal Period Start Date'] }}</p>
                  <p><span>Cal Period End Date:</span> {{ props.item['Cal Period End Date'] }}</p>
                </v-card-text>
              </v-flex>
              <v-flex xs3>
                <v-card-text>
                  <p><span>Contact Last Name:</span> {{ props.item['Contact Last Name'] }}</p>
                  <p><span>Contact First Name:</span> {{ props.item['Contact First Name'] }}</p>
                  <p><span>Contact Phone Number:</span> {{ props.item['Contact Phone Number'] }}</p>
                  <p><span>Contact Cell Number:</span> {{ props.item['Contact Cell Number'] }}</p>
                  <p><span>Contact Email:</span> {{ props.item['Contact Email'] }}</p>
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
  import services from '../../../services/group/groupService'
  import store from '../../../store'

  export default {
    name: 'group-list',
    data() {
      return {
        fullData: [],
        search: '',
        filter: this.$store.state.selectedGroupFilter,
        listFilterItems: ['Active', 'Inactive', 'All'],
        pagination: {
          rowsPerPage: 25
        },
        selected: [],
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Group Code', align: 'left', sortable: true, value: 'Group Code'},
          {text: 'Org Code', align: 'left', sortable: true, value: 'Org Code'},
          {text: 'Group Type', align: 'left', sortable: true, value: 'Group Type'},
          {text: 'Name', align: 'left', sortable: true, value: 'name'},
          {text: 'Phone', align: 'left', sortable: true, value: 'Phone'},
          {text: 'Fax', align: 'left', sortable: true, value: 'Fax'},
          {text: 'Email', align: 'left', sortable: true, value: 'Email'},
          {text: 'Web', align: 'left', sortable: true, value: 'Web'},
          {text: 'Status Code', align: 'left', sortable: true, value: 'Status Code'},
          /*
          {text: 'Mail Address', align: 'left', sortable: true, value: 'Mail Address'},
          {text: 'Mail City', align: 'left', sortable: true, value: 'Mail City'},
          {text: 'Mail State Code', align: 'left', sortable: true, value: 'Mail State Code'},
          {text: 'Mail Zip Code', align: 'left', sortable: true, value: 'Mail Zip Code'},
          {text: 'Invoice Address', align: 'left', sortable: true, value: 'Invoice Address'},
          {text: 'Invoice City', align: 'left', sortable: true, value: 'Invoice City'},
          {text: 'Invoice State Code', align: 'left', sortable: true, value: 'Invoice State Code'},
          {text: 'Invoice Zip Code', align: 'left', sortable: true, value: 'Invoice Zip Code'},
          {text: 'Cust Svc Phone', align: 'left', sortable: true, value: 'Cust Svc Phone'},
          {text: 'GL Acct Num', align: 'left', sortable: true, value: 'GL Acct Num'},
          {text: 'Cal Period Start Date', align: 'left', sortable: true, value: 'Cal Period Start Date'},
          {text: 'Cal Period End Date', align: 'left', sortable: true, value: 'Cal Period End Date'},
          {text: 'Contact Last Name', align: 'left', sortable: true, value: 'Contact Last Name'},
          {text: 'Contact First Name', align: 'left', sortable: true, value: 'Contact First Name'},
          {text: 'Contact Phone Number', align: 'left', sortable: true, value: 'Contact Phone Number'},
          {text: 'Contact Cell Number', align: 'left', sortable: true, value: 'Contact Cell Number'},
          {text: 'Contact Email', align: 'left', sortable: true, value: 'Contact Email'}
          */
        ],
        items: [],
        selectedRowData: {},
        loading: true,
        groupType: ['Parent', 'Child'],
      }
    },
    components: {},
    watch: {
      filter() {
        this.setItems()
      }
    },
    mounted() {
      console.log('----- Administrator / Groups mounted -----')
      store.commit('CLEAR', 'groupInformation')
      store.commit('CLEAR', 'allSpecialPrograms')
      const that = this
      services.getGroupsData(that.$store.state.user, that.$store.state.pcn, '*').then(function (res) {
        that.fullData = res.group_list
        that.fullData.map(function (item) {
          item['Group Type'] = that.groupType[item['Group Type']]
        })
        store.commit('UPDATE_ALL_GROUPS', res.group_list)
        that.setItems()
        that.loading = false
      })

      services.getSpecProgramList(that.$store.state.pcn).then(function (res) {
        store.commit('UPDATE_ALL_SPECIAL_PROGRAMS', res.spec_program_list)
        that.loading = false
      })

      window.Vue.$on('loadGroups', function () {
        that.loading = true
        services.getGroupsData(that.$store.state.user, that.$store.state.pcn, '*').then(function (res) {
          that.fullData = res.group_list
          that.fullData.map(function (item) {
            item['Group Type'] = that.groupType[item['Group Type']]
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
        switch (that.filter) {
          case 'All':
            this.items = this.fullData
            return
          case 'Active':
          case 'Inactive':
            this.fullData.map(function (item) {
              if (item['Status Code'] === that.filter)
                that.items.push(item)
            })
            return
        }
      },
      changeFilter: function (filter) {
        this.filter = filter
        store.commit('UPDATE_SELECTED_GROUP_FILTER', filter)
      },
      clickRow(groupid) {
        const that = this
        services.getGroupData(this.$store.state.user, groupid).then(function (res) {
          store.commit('UPDATE_GROUP_INFORMATION', res.group)
          store.commit('UPDATE_ALL_SPECIAL_PROGRAMS', res.spec_program_list)
          that.$router.push({path: `edit/${groupid}`})
        })
      },
      addGroup() {
        this.$router.push({path: `add`})
      }
    }
  }
</script>
<style lang="stylus">
</style>
