<template>
  <v-layout row justify-center>
    <vodal
      :show="show"
      animation="zoom"
      :closeButton="false"
      :width="width"
      :height="height"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          {{ title }}
        </v-toolbar-title>
      </v-toolbar>
      <v-layout row wrap>
        <v-flex xs12>
          <template v-if="active === 'main'">
            <v-card-text class="my-scroll-enabled">
              <v-layout row>
                <v-flex xs4>
                  <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs4 class="text-xs-right">
                  <div class="subAdd">
                    <v-btn fab dark color="primary-color" small="" @click.native="add">
                      <v-icon dark>add</v-icon>
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <v-data-table
                v-bind:headers="headers"
                :items="data"
                v-bind:search="search"
                v-bind:pagination.sync="pagination"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td>
                      <delete-confirm v-on:confirmed="deleteItem(props.item)" :message="'Group Delete'"></delete-confirm>
                    </td>
                    <td class="text-xs-left">{{ props.item.Group }}</td>
                    <td class="text-xs-left">{{ props.item.Class }}</td>
                    <td class="text-xs-left">{{ props.item['Updated By'] }}</td>
                    <td class="text-xs-left">{{ convertTime(props.item['Updated Date']) }}</td>
                    <td class="text-xs-left">{{ props.item['Created By'] }}</td>
                    <td class="text-xs-left">{{ convertTime(props.item['Created Date']) }}</td>
                    <td class="text-xs-left">
                      <v-btn color="primary-color" @click.native="editClass(props.item)">Edit Class</v-btn>
                      <v-btn color="primary-color" @click.native="editSid(props.item)">Edit Sid</v-btn>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="d-block text-xs-center">
              <v-btn @click.native="close">Close</v-btn>
            </v-card-actions>
          </template>
          <template v-else-if="active === 'groupSid'">
            <v-card-text class="my-scroll-enabled">
              <v-layout row>
                <v-flex xs4>
                  <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-flex xs4 class="text-xs-right">
                  <div class="subAdd">
                    <v-btn fab dark color="primary-color" small="" @click.native="addSubSID">
                      <v-icon dark>add</v-icon>
                    </v-btn>
                  </div>
                </v-flex>
              </v-layout>
              <v-data-table
                v-bind:headers="headers"
                :items="data"
                v-bind:search="search"
                v-bind:pagination.sync="pagination"
              >
                <template slot="items" slot-scope="props">
                  <tr>
                    <td class="text-xs-center d-flex">

                      <v-tooltip top>
                        <v-btn icon @click="editSubSID(props.item)" slot="activator">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <span>Group SID Edit</span>
                      </v-tooltip>

                      <delete-confirm v-on:confirmed="deleteSubSID(props.item)" :message="'Group SID Delete'"></delete-confirm>
                    </td>
                    <td class="text-xs-left">{{ props.item.Feature }}</td>
                    <td class="text-xs-left">{{ props.item.Access }}</td>
                    <td class="text-xs-left">{{ props.item['Updated By'] }}</td>
                    <td class="text-xs-left">{{ convertTime(props.item['Updated Date']) }}</td>
                    <td class="text-xs-left">{{ props.item['Created By'] }}</td>
                    <td class="text-xs-left">{{ convertTime(props.item['Created Date']) }}</td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="d-block text-xs-center">
              <v-btn @click.native="back('main')">Back</v-btn>
            </v-card-actions>
          </template>
          <template v-else-if="active === 'edit'">
            <edit-form :type="type" :data="value" :onBack="back"></edit-form>
          </template>
          <template v-else-if="active === 'add'">
            <add-form :type="type" :data="value" :onBack="back"></add-form>
          </template>
        </v-flex>
      </v-layout>
    </vodal>
  </v-layout>
</template>

<script>
  import store from '../../../../store/index'
  import services from '../../../../services/services'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import AddForm from '../Form/AddForm.vue'
  import EditForm from '../Form/EditForm.vue'
  import DeleteConfirm from "../../../../components/common/deleteConfirm.vue";

  export default {
    name: 'edit-group',
    data() {
      return {
        uid: this.$route.params.uid,
        show: false,
        width: 800,
        height: 0,
        type: null,
        active: 'main',
        headers: [],
        data: [],
        search: '',
        pagination: {
          rowsPerPage: 10
        },
        sid: null,
        value: {},
        selectedGroupItem: {},
        title: 'User Group Permissions List'
      }
    },
    watch: {},
    components: {
      DeleteConfirm,
      AddForm,
      EditForm,
      Vodal
    },
    mounted() {
      this.headers = [
        {text: '', align: '', sortable: false, value: ''},
        {text: 'Group', align: 'left', sortable: true, value: 'Group'},
        {text: 'Class', align: 'left', sortable: true, value: 'Class'},
        {text: 'Updated By', align: 'left', sortable: true, value: 'Updated By'},
        {text: 'Updated Date', align: 'left', sortable: true, value: 'Updated Date'},
        {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
        {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'},
        {text: '', align: '', sortable: false, value: ''}
      ]

      const that = this
//      Open EditSid signal
      window.Vue.$on('openEditGroup', function (info) {
        that.pcc = info.PCN
        services.getUserGroupData(that.uid, that.pcc).then(function (res) {
          that.data = res.group_permissions_list
        })
        that.open()
      })

      // Reload Sid Data signal
      window.Vue.$on('reloadGroupData', function (uid, pcn) {
        services.getUserGroupData(uid, pcn).then(function (res) {
          that.data = res.group_permissions_list
        })
      })

      // Reload Sid Data signal
      window.Vue.$on('reloadGroupSidData', function (sid) {
        services.getSidData(sid).then(function (res) {
          that.data = res.sid_permissions_list
        })
      })
    },
    methods: {
      convertTime(timeData) {
        if (timeData === null) return ''
        const date = new Date(parseInt(timeData.substring(6, 19)))
        return date.toLocaleString()
      },
      init: function () {
        const that = this
        this.headers = [
          {text: '', align: '', sortable: false, value: ''},
          {text: 'Group', align: 'left', sortable: true, value: 'Group'},
          {text: 'Class', align: 'left', sortable: true, value: 'Class'},
          {text: 'Updated By', align: 'left', sortable: true, value: 'Updated By'},
          {text: 'Updated Date', align: 'left', sortable: true, value: 'Updated Date'},
          {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
          {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'},
          {text: '', align: '', sortable: false, value: ''}
        ]

        services.getUserGroupData(this.uid, this.$store.state.selectedPermission.PCN).then(function (res) {
          that.data = res.group_permissions_list
        })
      },
      open: function () {
        this.active = 'main'
        this.type = null
        this.show = true
      },
      close: function () {
        this.active = 'main'
        this.type = null
        this.show = false
        store.commit('CLEAR', 'selectedPermission')
      },
      editClass: function (value) {
        this.value = value
        this.type = 'Group Class'
        this.active = 'edit'
        this.title = 'User Group Class Edit'
      },
      editSid: function (value) {
        this.selectedGroupItem = {
          name: value.Group,
          id: value.group_id
        }
        const that = this
        this.headers = [
          {text: '', align: '', sortable: false, value: ''},
          {text: 'Feature', align: 'left', sortable: true, value: 'Feature'},
          {text: 'Access', align: 'left', sortable: true, value: 'Access'},
          {text: 'Updated By', align: 'left', sortable: true, value: 'Updated By'},
          {text: 'Updated Date', align: 'left', sortable: true, value: 'Updated Date'},
          {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
          {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'}
        ]
        this.value = value
        if (value.sid && value.sid !== '') {
          services.getSidData(value.sid).then(function (res) {
            that.data = res.sid_permissions_list
          })
        } else {
          that.data = []
        }

        this.type = 'Group Permission'
        this.active = 'groupSid'
        this.title = 'User Group SID Permissions List'
      },
      addSubSID: function () {
        this.value = this.selectedGroupItem
        this.type = 'Group Permission'
        this.active = 'add'
        this.title = 'User Group Permission Add'
      },
      editSubSID: function (value) {
        this.value = {
          group: this.selectedGroupItem,
          value: value
        }
        this.type = 'Group Permission'
        this.active = 'edit'
        this.title = 'User Group Permission Edit'
      },
      deleteSubSID: function (value) {
        const that = this
        const data = {
          uid: this.uid,
          sid: value.SID,
          feature_id: value.feature_id
        }
        services.deleteUserPermissionSID(data).then(function (res) {
          if (res === "0") {
            window.Vue.$emit('reloadGroupSidData', data.sid)
          }
        })
      },
      add: function () {
        this.value = null
        this.type = 'Group'
        this.active = 'add'
        this.title = 'User Group Add'
      },
      deleteItem: function (value) {
        const data = {
          uid: this.uid,
          pcc: this.$store.state.selectedPermission.PCN === 'All PCNs' ? '*' : this.$store.state.selectedPermission.PCN,
          group_id: value.group_id === '*' ? '-1' : value.group_id,
          updated_by: this.$store.state.user.session_uid
        }
        services.deleteUserGroup(data).then(function (res) {
          if (res === "0") {
            window.Vue.$emit('reloadGroupData', data.uid, data.pcc)
          }
        }).catch(function () {

        })
      },
      back: function (active) {
        if (active === 'main') {
          this.init()
          this.title = 'User Group Permissions List'
        }
        else if (active === 'groupSid') this.title = 'User Group SID Permissions List'
        else if (active === 'edit') this.title = 'User Group Class Edit'
        else if (active === 'add') this.title = 'User Group Add'
        this.type = null
        this.active = active
      }
    }
  }
</script>

<style lang="scss">
  .subAdd {
    padding: 8px 0;
  }
</style>
