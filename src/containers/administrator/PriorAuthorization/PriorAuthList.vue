<template>
  <main>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs4>
          <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="tableHeaders"
            v-bind:items="tableData"
            v-bind:search="search"
            item-key="Auth Number">
            <template slot="items" slot-scope="props">
              <tr>
                <td @click="props.expanded = !props.expanded">
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
                    <v-btn icon @click="edit(props.item['Auth Number'])" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit</span>
                  </v-tooltip>
                </td>
                <td class="text-xs-left">{{ props.item['Auth Number'] }}</td>
                <td class="text-xs-left">{{ props.item['Provider Id'] }}</td>
                <td class="text-xs-left">{{ props.item['Provider Name'] }}</td>
                <td class="text-xs-left">{{ props.item['Member Id'] }}</td>
                <td class="text-xs-left">{{ props.item['Person Cd'] }}</td>
                <td class="text-xs-left">{{ props.item['Last Name'] }}</td>
                <td class="text-xs-left">{{ props.item['First Name'] }}</td>
                <td class="text-xs-left">{{ props.item['NDC'] }}</td>
                <td class="text-xs-left">{{ props.item['Prescriber NPI'] }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-layout row wrap>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Auth Number:</span> {{ props.item['Auth Number'] }}</p>
                    <p><span>Effective Dt:</span> {{ props.item['Effective Dt'] }}</p>
                    <p><span>Expiration Dt:</span> {{ props.item['Expiration Dt'] }}</p>
                    <p><span>Processed Dt:</span> {{ props.item['Processed Dt'] }}</p>
                    <p><span>Provider Id:</span> {{ props.item['Provider Id'] }}</p>
                    <p><span>Provider Name:</span> {{ props.item['Provider Name'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Member Id:</span> {{ props.item['Member Id'] }}</p>
                    <p><span>Person Cd:</span> {{ props.item['Person Cd'] }}</p>
                    <p><span>Last Name:</span> {{ props.item['Last Name'] }}</p>
                    <p><span>First Name:</span> {{ props.item['First Name'] }}</p>
                    <p><span>NDC:</span> {{ props.item['NDC'] }}</p>
                    <p><span>Tier:</span> {{ props.item['Tier'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Max Days Supply Amt:</span> {{ props.item['Max Days Supply Amt'] }}</p>
                    <p><span>Max Qty Amt:</span> {{ props.item['Max Qty Amt'] }}</p>
                    <p><span>Max Claim Amt:</span> {{ props.item['Max Claim Amt'] }}</p>
                    <p><span>Comments:</span> {{ props.item['Comments'] }}</p>
                    <p><span>Created By:</span> {{ props.item['Created By'] }}</p>
                    <p><span>Created Dt:</span> {{ props.item['Created Dt'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Created By:</span> {{ props.item['Updated By'] }}</p>
                    <p><span>Created Dt:</span> {{ props.item['Updated Dt'] }}</p>
                    <p><span>Static Flag:</span> {{ props.item['Static Flag'] }}</p>
                    <p><span>Prescriber NPI:</span> {{ props.item['Prescriber NPI'] }}</p>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
  </main>
</template>

<script>
  import PriorAuthEdit from './PriorAuthEdit'

  export default {
    components: {
      PriorAuthEdit,
    },
    name: 'prior-auth-list',
    props: ['tableData'],
    data() {
      return {
        tableHeaders: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Auth Number', align: 'left', sortable: true, value: 'Auth Number'},
          {text: 'Provider Id', align: 'left', sortable: true, value: 'Provider Id'},
          {text: 'Provider Name', align: 'left', sortable: true, value: 'Provider Name'},
          {text: 'Member Id', align: 'left', sortable: true, value: 'Member Id'},
          {text: 'Person Cd', align: 'left', sortable: true, value: 'Person Cd'},
          {text: 'Last Name', align: 'left', sortable: true, value: 'Last Name'},
          {text: 'First Name', align: 'left', sortable: true, value: 'First Name'},
          {text: 'NDC', align: 'left', sortable: true, value: 'NDC'},
          {text: 'Prescriber NPI', align: 'left', sortable: true, value: 'Prescriber NPI'}
        ],
        search: "",
      }
    },
    methods: {
      edit(authid) {
        this.$router.push({path: `edit/${authid}`})
      }
    }
  }
</script>
