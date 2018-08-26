<template>
  <v-layout row justify-center>
    <Vodal
      :show="show"
      animation="zoom"
      :closeOnEsc="true"
      :closeButton="true"
      :closeOnClickMask="true"
      :width="1000"
      :height="500"
    >
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          Provider Network List
        </v-toolbar-title>
      </v-toolbar>
      <v-container fluid class="my-sub-scroll-enabled py-0">
        <v-layout row wrap>
          <v-flex xs12>
            <template>
              <v-layout row>
                <v-flex xs4>
                  <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-spacer></v-spacer>
                <v-flex xs4>
                  <v-radio-group v-model="filter" row>
                    <v-radio label="Active" value="Active"></v-radio>
                    <v-radio label="Inactive" value="Inactive"></v-radio>
                    <v-radio label="All" value="All"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
              <v-data-table
                v-bind:headers="headers"
                :items="items"
                v-bind:search="search"
                v-bind:pagination.sync="pagination"
                class="scrollable-table"
              >
                <template slot="items" slot-scope="props">
                  <td class="text-xs-left">
                    <v-btn small color="primary-color" @click="add(props.item)">add</v-btn>
                  </td>
                  <td class="text-xs-left">{{ props.item['Network Type Desc'] }}</td>
                  <td class="text-xs-left">{{ props.item['Network Desc'] }}</td>
                  <td class="text-xs-center">{{ props.item.Status }}</td>
                  <td class="text-xs-center">{{ props.item.Comments }}</td>
                  <td class="text-xs-center">{{ props.item['Network ID'] }}</td>
                  <td class="text-xs-center">{{ props.item.type_cd }}</td>
                </template>
              </v-data-table>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
      <v-divider></v-divider>
      <v-card-actions class="d-block text-xs-center">
        <v-btn class="save" right @click.native="close">Close</v-btn>
      </v-card-actions>
    </Vodal>
  </v-layout>
</template>

<script>
  import Vodal from '../../../../components/common/Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'
  import planServices from '../../../../services/plan/planServices'
  import store from '../../../../store'

  export default {
    name: 'add-net',
    props: ['add-network'],
    data() {
      return {
        show: false,
        search: [],
        filter: 'Active',
        headers: [],
        items: [],
        pagination: {},
        fullData: [],
        info: {},
        item: {},
      }
    },
    components: {
      Vodal
    },
    watch: {
      filter() {
        this.setItems()
      }
    },
    mounted() {
      console.log('----------Administrator / Plan / Networks / AddNET mounted -----------------')
      this.headers = [
        {text: '', align: 'left', sortable: false, value: ''},
        {text: 'Network Type Desc', align: 'left', sortable: true, value: 'Network Type Desc'},
        {text: 'Network Desc', align: 'left', sortable: true, value: 'Network Desc'},
        {text: 'Status', align: 'left', sortable: true, value: 'Status'},
        {text: 'Comments', align: 'center', sortable: true, value: 'Comments'},
        {text: 'Network ID', align: '', sortable: true, value: 'Network ID'},
        {text: 'type_cd', align: '', sortable: true, value: 'type_cd'},

      ]
      const that = this
      window.Vue.$on('openAddNetworkForm', function () {
        that.fullData = that.$store.state.planSetupData.network_list || []
        that.setItems()
        that.open()
      })
    },
    methods: {
      add: function (item) {
        const that = this
        const data = {
          plan_id: this.$store.state.selectedPlan.plan_id,
          group_id: this.$store.state.selectedPlan.group_id,
          network_id: item['Network ID'],
          created_by: this.$store.state.user.session_uid
        }
        planServices.addGroupPlanNetwork(data).then(function (res) {
          if (res === "0") {
            window.Vue.$emit('reloadPlanNetwork')
            that.close()
            window.Vue.$emit('snackbar', 'success', 'Network Added Successfully!')
          } else {
            window.Vue.$emit('snackbar', 'warning', res)
          }
          that.close()
        }).catch(function (res) {
          window.Vue.$emit('snackbar', 'error', 'This network added already!')
        })
      },
      open: function () {
        this.show = true
      },
      close: function () {
        this.show = false
      },
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
              if (item['Status'] === that.filter)
                that.items.push(item)
            })
            return
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
