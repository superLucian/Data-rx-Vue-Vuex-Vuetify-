<template>
  <div class="user-permission my-scroll-enabled-2">
    <v-card-text>
      <v-layout row>
        <v-flex xs4>
          <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs4 class="text-xs-right">
          <div class="subAdd">
            <v-btn fab dark color="primary-color" small="" @click.native="add()">
              <v-icon dark>add</v-icon>
            </v-btn>
          </div>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12>
          <v-data-table
            v-bind:headers="headers"
            v-bind:items="user_permission"
            v-bind:search="search"
            v-bind:pagination.sync="pagination"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td>
                  <delete-confirm v-on:confirmed="deleteRow(props.item)" :message="'Delete'"></delete-confirm>
                </td>
                <td class="text-xs-left">{{ props.item.PCN }}</td>
                <td class="text-xs-left">{{ props.item.Class }}</td>
                <td class="text-xs-left">{{ props.item['Updated By'] }}</td>
                <td class="text-xs-left">{{ convertTime(props.item['Updated Date']) }}</td>
                <td class="text-xs-left">{{ props.item['Created By'] }}</td>
                <td class="text-xs-left">{{ convertTime(props.item['Created Date']) }}</td>
                <td class="text-xs-left">
                  <v-btn color="primary-color" @click.native="editClass(props.item)">Edit Class</v-btn>
                  <v-btn color="primary-color" @click.native="editSid(props.item)">Edit Sid</v-btn>
                  <v-btn color="primary-color" @click.native="editGroup(props.item)">Edit Group</v-btn>
                </td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-layout>
    </v-card-text>
    <add-pcn></add-pcn>
    <edit-class></edit-class>
    <edit-sid></edit-sid>
    <edit-group></edit-group>
  </div>
</template>
<script>
  import store from '../../../../store/index'
  import services from '../../../../services/services'
  import AddPcn from './AddPCN.vue'
  import editClass from './EditClass.vue'
  import editSid from './EditSid.vue'
  import editGroup from './EditGroup.vue'
  import DeleteConfirm from "../../../../components/common/deleteConfirm.vue";

  export default {
    name: 'user-permission',
    data() {
      return {
        uid: null,
        user_permission: [],
        headers: [],
        search: '',
        pagination: {
          rowsPerPage: 100
        }
      }
    },
    components: {
      DeleteConfirm,
      AddPcn,
      editClass,
      editSid,
      editGroup
    },
    watch: {},
    mounted() {
      console.log('----- Administrator / User Edit / Permission mounted -----')
      this.headers = [
        {text: '', align: 'left', sortable: false, value: ''},
        {text: 'PCN', align: 'left', sortable: true, value: 'PCN'},
        {text: 'Class', align: 'left', sortable: true, value: 'Class'},
        {text: 'Updated By', align: 'left', sortable: true, value: 'Updated By'},
        {text: 'Updated Date', align: 'left', sortable: true, value: 'Updated Date'},
        {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
        {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'},
        {text: '', align: 'left', sortable: false, value: ''}
      ]

      const that = this
      this.uid = this.$route.params.uid
      services.getUserData(this.$route.params.uid).then(function (res) {
        that.user_permission = res.user_class_sid
      })

      window.Vue.$on('updatedUserPermission', function (uid) {
        services.getUserData(uid).then(function (res) {
          that.user_permission = res.user_class_sid
        })
      })
    },
    methods: {
      convertTime(timeData) {
        if (timeData === null) return ''
        const date = new Date(parseInt(timeData.substring(6, 19)))
        return date.toLocaleString()
      },
      add() {
        window.Vue.$emit('openAddPCN')
      },
      deleteRow(column) {
        const data = {
          uid: this.uid,
          pcc: column.PCN === 'All PCNs' ? '*' : column.PCN,
          updated_by: this.$store.state.user.session_uid
        }
        services.deleteUserPCN(data).then(function (res) {
          if (res === "0") {
            window.Vue.$emit('updatedUserPermission', data.uid)
            window.Vue.$emit('snackbar', 'success', 'Delete PCN!')
          }
        })
      },
      editClass(cellInfo) {
        store.commit('UPDATE_SELECTED_PERMISSION', cellInfo)
        window.Vue.$emit('openEditClass')
      },
      editSid(cellInfo) {
        store.commit('UPDATE_SELECTED_PERMISSION', cellInfo)
        window.Vue.$emit('openEditSid', cellInfo.SID)
      },
      editGroup(cellInfo) {
        store.commit('UPDATE_SELECTED_PERMISSION', cellInfo)
        window.Vue.$emit('openEditGroup', cellInfo)
      }
    }
  }
</script>
<style lang="stylus">
</style>
