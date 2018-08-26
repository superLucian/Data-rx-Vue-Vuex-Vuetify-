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
                    <td class="text-xs-center d-flex">
                      <v-tooltip top>
                        <v-btn icon @click="edit(props.item)" slot="activator">
                          <v-icon>edit</v-icon>
                        </v-btn>
                        <span>Edit</span>
                      </v-tooltip>
                      <delete-confirm v-on:confirmed="deleteItem(props.item)" :message="'Delete'"></delete-confirm>
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
              <v-btn class="save" @click.native="close">Close</v-btn>
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
  import AddForm from '../Form/AddForm.vue'
  import EditForm from '../Form/EditForm.vue'
  import DeleteConfirm from '../../../../components/common/deleteConfirm'

  export default {
    name: 'edit-sid',
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
          rowsPerPage: 5
        },
        sid: null,
        value: {},
        title: ''
      }
    },
    watch: {},
    components: {
      DeleteConfirm, AddForm,
      EditForm,
      Vodal
    },
    mounted() {
      this.headers = [
        {text: '', align: '', sortable: false, value: ''},
        {text: 'Feature', align: 'left', sortable: true, value: 'Feature'},
        {text: 'Access', align: 'left', sortable: true, value: 'Access'},
        {text: 'Updated By', align: 'left', sortable: true, value: 'Updated By'},
        {text: 'Updated Date', align: 'left', sortable: true, value: 'Updated Date'},
        {text: 'Created By', align: 'left', sortable: true, value: 'Created By'},
        {text: 'Created Date', align: 'left', sortable: true, value: 'Created Date'}
      ]

      const that = this
//      Open EditSid signal
      window.Vue.$on('openEditSid', function (sid) {
        that.sid = sid
        if (sid !== '') {
          services.getSidData(sid).then(function (res) {
            that.data = res.sid_permissions_list
          })
        } else {
          that.data = []
        }
        that.open()
      })

      // Reload Sid Data signal
      window.Vue.$on('reloadSidData', function (sid) {
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
      open: function () {
        this.active = 'main'
        this.type = null
        this.show = true
        this.title = 'User PCN Permissions List For ' + this.$store.state.selectedPermission.PCN
      },
      close: function () {
        this.active = 'main'
        this.type = null
        this.show = false
        store.commit('CLEAR', 'selectedPermission')
      },
      edit: function (value) {
        this.value = value
        this.type = 'PCN Permission'
        this.active = 'edit'
        this.title = 'User PCN Permission Edit'
      },
      add: function () {
        this.value = null
        this.type = 'PCN Permission'
        this.active = 'add'
        this.title = 'User PCN Permission Add'
      },
      deleteItem: function (value) {
        const that = this
        const data = {
          uid: this.uid,
          sid: value.SID,
          feature_id: value.feature_id
        }
        services.deleteUserPermissionSID(data).then(function (res) {
          if (res === "0") {
            window.Vue.$emit('reloadSidData', value.SID)
          }
        }).catch(function () {

        })
      },
      back: function (active) {
        if (active === 'main') this.title = 'User PCN Permissions List For ' + this.$store.state.selectedPermission.PCN
        else if (active === 'edit') this.title = 'User PCN Permission Edit'
        else if (active === 'add') this.title = 'User PCN Permission Add'
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
