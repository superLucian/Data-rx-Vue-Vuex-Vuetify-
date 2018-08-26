<template>
  <main>
    <v-container fluid>
      <v-layout row>
        <v-flex xs4>
          <v-text-field append-icon="search" label="Drug Name" single-line v-model="search"></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4 class="text-xs-right">
          <div class="subAdd">
            <v-btn fab dark color="primary mt-3" small="" @click.native="add()">
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            :items="items"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
            :loading="loading"
            item-key="Drug Name"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-center">

                  <v-tooltip top v-if="props.expanded">
                    <v-btn icon @click="props.expanded = !props.expanded" slot="activator">
                      <v-icon>expand_less</v-icon>
                    </v-btn>
                    <span>Close</span>
                  </v-tooltip>
                  <v-tooltip top v-else>
                    <v-btn icon @click="props.expanded = !props.expanded" slot="activator">
                      <v-icon>expand_more</v-icon>
                    </v-btn>
                    <span>View details</span>
                  </v-tooltip>
                  <v-tooltip top>
                    <v-btn icon @click="editRow(props.item)" slot="activator">
                      <v-icon>edit</v-icon>
                    </v-btn>
                    <span>Edit</span>
                  </v-tooltip>
                  <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
                </td>
                <td class="text-xs-left"> {{ props.item['Drug Name']}}</td>
                <td class="text-xs-left">{{ props.item['Drug Id'] }}</td>
                <td class="text-xs-left">{{ props.item['Drug ID Type Code']}}</td>
                <td class="text-xs-left">{{ props.item['*Tier'] }}</td>
                <td class="text-xs-left">{{ props.item['*Start Dt'] }}</td>
                <td class="text-xs-left">{{ props.item['*End Dt'] }}</td>
                <td class="text-xs-left">{{ props.item['*Inc/Ex'] }}</td>
                <td class="text-xs-left">{{ props.item['*Drug Type'] }}</td>
              </tr>
            </template>
            <template slot="expand" slot-scope="props">
              <v-layout row wrap>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Drug Name:</span> {{ props.item['Drug Name'] }}</p>
                    <p><span>Drug Id:</span> {{ props.item['Drug Id'] }}</p>
                    <p><span>Drug ID Type Code:</span> {{ props.item['Drug ID Type Code'] }}</p>
                    <p><span>Tier:</span> {{ props.item['*Tier'] }}</p>
                    <p><span>Start Dt:</span> {{ props.item['*Start Dt'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>End Dt:</span> {{ props.item['*End Dt'] }}</p>
                    <p><span>Inc/Ex:</span> {{ props.item['*Inc/Ex'] }}</p>
                    <p><span>Drug Type:</span> {{ props.item['*Drug Type'] }}</p>
                    <p><span>Min Qty:</span> {{ props.item['*Min Qty'] }}</p>
                    <p><span>Max Qty:</span> {{ props.item['*Max Qty'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Min Days:</span> {{ props.item['*Min Days'] }}</p>
                    <p><span>Max Days:</span> {{ props.item['*Max Days'] }}</p>
                    <p><span>Supply Limit:</span> {{ props.item['*asdfasdf'] }}</p>
                    <p><span>Response Message:</span> {{ props.item['*Response Message'] }}</p>
                    <p><span>Sig:</span> {{ props.item['*Sig'] }}</p>
                  </v-card-text>
                </v-flex>
                <v-flex xs3>
                  <v-card-text>
                    <p><span>Created By:</span> {{ props.item['Created By'] }}</p>
                    <p><span>Created Dt:</span> {{ convertDateTime(props.item['Created Dt']) }}</p>
                    <p><span>Updated By:</span> {{ props.item['Updated By'] }}</p>
                    <p><span>Updated Dt:</span> {{ convertDateTime(props.item['Updated Dt']) }}</p>
                  </v-card-text>
                </v-flex>
              </v-layout>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-container>
    <member-drug-form></member-drug-form>
  </main>
</template>
<script>
  import memberServices from '../../../../services/member/memberServices'
  import MemberDrugForm from './MemberDrugForm.vue';
  import {convertDateTime} from '../../../../components/utils/DateMethods'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'

  export default {
    name: 'member-drug-list',
    data() {
      return {
        search: '',
        headers: [],
        pagination: {
          rowsPerPage: 10
        },
        items: [],
        loading: false
      }
    },
    components: {
      DeleteConfirm, MemberDrugForm
    },
    mounted() {
      console.log('----- Administrator / Member / Member mounted -----')
      this.headers = [
        {text: '', align: 'center', sortable: false, value: ''},
        {text: 'Drug Name', align: 'left', sortable: true, value: 'Drug Name'},
        {text: 'Drug ID', align: 'left', sortable: true, value: 'Drug Id'},
        {text: 'Drug ID Type Code', align: 'left', sortable: true, value: 'Drug ID Type Code'},
        {text: 'Tier', align: 'left', sortable: true, value: '*Tier'},
        {text: 'Start Dt', align: 'left', sortable: true, value: '*Start Dt'},
        {text: 'End Dt', align: 'left', sortable: true, value: '*End Dt'},
        {text: 'Inc/Ex', align: 'left', sortable: true, value: '*Inc/Ex'},
        {text: 'Drug Type', align: 'left', sortable: true, value: '*Drug Type'}
      ]
      const that = this
      window.Vue.$on('reloadMemberDrugs', function () {
        const data = {
          session_uid: this.$store.state.user.session_uid,
          session_id: this.$store.state.user.session_id,
          pcc: this.$store.state.pcn.pcc,
          member_id: this.$store.state.selectedMember.MemberId,
          person_cd: this.$store.state.selectedMember.PersonCode,
          page_num: 1
        }
        memberServices.getMemberDrugList(data).then(function (res) {
          that.items = [...res.member_drug_list]
        })
      })

      const data = {
        session_uid: this.$store.state.user.session_uid,
        session_id: this.$store.state.user.session_id,
        pcc: this.$store.state.pcn.pcc,
        member_id: this.$store.state.selectedMember.MemberId,
        person_cd: this.$store.state.selectedMember.PersonCode,
        page_num: 1
      }
      memberServices.getMemberDrugList(data).then(function (res) {
        that.items = [...res.member_drug_list]
      })
    },
    methods: {
      convertDateTime: convertDateTime,
      add: function () {
        const data = {
          "Drug Name": "",
          "Drug Id": "",
          "Drug ID Type Code": "",
          "*Tier": "",
          "*Start Dt": (new Date()).toLocaleDateString(),
          "*End Dt": "12/31/9998",
          "*Inc/Ex": "I",
          "*Drug Type": "All",
          "*Min Qty": null,
          "*Max Qty": null,
          "*Min Days": null,
          "*Max Days": null,
          "qty_term_cd": "",
          "*Supply Limit": "",
          "*Response Message": "",
          "*Sig": "",
          "mdid": ""
        }
        window.Vue.$emit('openMemberDrugForm', 'add', data)
      },
      editRow: function (item) {
        window.Vue.$emit('openMemberDrugForm', 'edit', item)
      },
      deleteRow: function (item) {
        memberServices.deleteMemberDrug(item.mdid).then(function (res) {
          if (res === "0") {
            window.Vue.$emit('reloadMemberDrugs')
            window.Vue.$emit('snackbar', 'success', 'Member Drug Deleted!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
        })
      }
    }
  }
</script>
<style lang="stylus">
</style>
