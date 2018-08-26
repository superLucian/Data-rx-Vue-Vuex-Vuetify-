<template>
  <v-dialog v-model="dialog" scrollable max-width="600" :persistent="isPersistent">
    <v-btn slot="activator" class="edit-button" icon>
      <v-icon class="edit-icon">edit</v-icon>
    </v-btn>
    <v-card>
      <v-toolbar>
        <v-icon class="white--text">fa-archive</v-icon>
        <v-toolbar-title class="white--text">
          Change PCN
        </v-toolbar-title>
      </v-toolbar>
      <v-layout row>
        <v-card-text>
          <v-select
            v-bind:items="items"
            v-model="selectedPCN"
            label="Select a PCN"
            item-text="name_txt"
            item-value="pcc"
            autocomplete
            return-object
          ></v-select>
        </v-card-text>
        <v-card-actions>
          <v-card-text class="right">
            <v-btn class="save" @click.native="cancel">
              Cancel
            </v-btn>
            &nbsp;
            <v-btn color="primary-color" class="save" @click.native="save" :disabled="isDisabledSave">
              Ok
            </v-btn>
          </v-card-text>
        </v-card-actions>
      </v-layout>
    </v-card>
  </v-dialog>
</template>

<script>
  import services from '../../services/services'
  import memberServices from '../../services/member/memberServices'
  import store from '../../store'

  export default {
    data() {
      return {
        dialog: false,
        search: '',
        gridConfig: ['Pcc', 'GroupCode', 'PlanId'],
        pagination: {
          rowsPerPage: 5,
          sortBy: 'Pcc'
        },
        selected: [],
        headers: [],
        items: [],
        groupItems: [],
        selectedPCN: {},
        selectedRowData: {},
        isDisabledSave: true,
        isPersistent: false
      }
    },
    components: {},
    watch: {
      selectedPCN(value) {
        if (value) this.isDisabledSave = false
      }
    },
    mounted: function () {
      console.log('----- Settings Dialog mounted -----')
      if (this.$store.state.pcn) {
        this.selectedPCN = this.$store.state.pcn
        this.dialog = false
      } else {
        setTimeout(() => this.dialog = true, 0)
        this.isPersistent = true
      }
      const that = this
      window.Vue.$on('loaded_allPCN', function () {
        that.items = that.$store.state.allPCN
      })
    },
    methods: {
      clickRow(rowData) {
        const that = this
        this.items.forEach(function (d) {
          if (d.Pcc === rowData.Pcc) {
            that.selectedPCN = d
          }
        })
      },
      save() {
        store.commit('UPDATE_PCN', this.selectedPCN)
        const data = {
          "search": {
            "Pcc": this.selectedPCN.pcc,
            "HasUseGroupMpp": "true"
          },
          "orderBy": "Rank",
          "includeProperties": ""
        }
        services.any(data).then(function (res) {
          store.commit('UPDATE_MPP_FLAG', res)
        })
        this.isDisabledSave = true
        this.dialog = false
        this.isPersistent = false
        const that = this
        memberServices.getMemberType({
          search: {
            pcc: this.selectedPCN.pcc
          },
          orderBy: 'component_name_txt',
          includeProperties: '',
          pageNumber: '0',
          pageSize: '1'
        }).then(function (res) {
          store.commit('UPDATE_MEMBER_FORM_TYPE', res[0].MemberEditFormType)
          that.$router.push({path: '/'})
        })
      },
      cancel() {
        this.dialog = false
        if (this.$store.state.pcn) {

        } else {
          this.$router.push({path: '/login'})
        }
      }
    }
  }
</script>

<style lang="scss">
  .edit-icon {
    font-size: 16px;
  }

  .edit-button {
    width: 25px;
    height: 25px;
  }

  .save {
    margin: 0 auto;
  }
</style>
