<template>
  <main>
    <v-layout row justify-space-between>
      <v-flex xs4>
        <v-text-field label="Search" v-model="search" append-icon="search" single-line>
        </v-text-field>
      </v-flex>
      <v-btn fab dark class="primary mt-3" small @click.native="add()">
        <v-icon>add</v-icon>
      </v-btn>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12>
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="items"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          :loading="loading">
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-center" @click="edit(props.item)">
                <v-tooltip top>
                  <v-btn icon slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Edit Group Field</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left">{{ props.item['Field'] }}</td>
              <td class="text-xs-left">{{ props.item['Edit'] }}</td>
              <td class="text-xs-left">{{ props.item['Message'] }}</td>
              <td class="text-xs-left">
                <v-tooltip top>
                    <span slot="activator">
                      <v-icon v-if="props.item['Status'] === 'Active'" color="green">fiber_manual_record</v-icon>
                      <v-icon v-else color="grey">fiber_manual_record</v-icon>
                    </span>
                  <span>{{ props.item['Status'] }}</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
    <Vodal
      :show="showDialog"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="false"
      :width="800"
      :height="800"
      :closeOnClickMask="true">
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text" v-if="type=='add'">Field Edit Add</v-toolbar-title>
        <v-toolbar-title class="white--text" v-if="type=='edit'">Field Edit Edit</v-toolbar-title>
      </v-toolbar>
      <v-container fluid v-if="type=='add'" class="pb-0">
        <GroupFieldAdd
          :group_id="group_id"
          :refresh="updateList"
          :cancel="cancel">
        </GroupFieldAdd>
      </v-container>
      <v-container fluid v-if="type=='edit'" class="pb-0">
        <GroupFieldEdit
          :group_id="group_id"
          :item="selectedField"
          :refresh="updateList"
          :cancel="cancel">
        </GroupFieldEdit>
      </v-container>
    </Vodal>
  </main>
</template>

<script>
  import services from '../../../../services/group/groupService'
  import store from '../../../../store'
  import GroupFieldAdd from './GroupFieldAdd.vue'
  import GroupFieldEdit from './GroupFieldEdit.vue'
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'

  export default {
    name: 'group-field-edit-list',
    props: ['group_id'],
    components: {
      GroupFieldAdd,
      GroupFieldEdit,
      Vodal
    },
    data() {
      return {
        headers: [
          {text: '', align: 'left', sortable: false, value: ''},
          {text: 'Field', align: 'left', sortable: true, value: 'Field'},
          {text: 'Edit', align: 'left', sortable: true, value: 'Edit'},
          {text: 'Message', align: 'left', sortable: true, value: 'Message'},
          {text: 'Status', align: 'left', sortable: true, value: 'Status'},
        ],
        items: [],
        selectedField: {},
        showDialog: false,
        type: '',
        search: '',
        loading: true,
        pagination: {
          rowsPerPage: 25
        }
      }
    },
    watch: {},
    mounted() {
      this.updateList()
    },
    methods: {
      updateList() {
        const that = this
        that.loading = true
        services.getGroupFieldEdits(this.group_id).then(function (res) {
          that.items = res.group_field_edits
          that.loading = false
        })
      },
      edit(fieldItem) {
        this.type = 'edit'
        this.showDialog = true
        this.selectedField = {...fieldItem}
      },
      add() {
        this.type = 'add'
        this.showDialog = true
      },
      cancel: function () {
        this.showDialog = false
      }
    }
  }
</script>
<style lang="stylus">
</style>
