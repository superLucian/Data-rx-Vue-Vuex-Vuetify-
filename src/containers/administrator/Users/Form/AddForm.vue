<template>
  <main>
    <v-card-text class="my-scroll-enabled">
      <v-text-field label="User Id" v-model="uid" disabled></v-text-field>
      <v-text-field label="PCN" v-model="pcn_name" disabled v-if="type === 'PCN Permission'"></v-text-field>
      <v-text-field label="Group" v-model="group_name" disabled v-if="type === 'Group Permission'"></v-text-field>

      <template v-if="type === 'PCN'">
        <v-select
          v-bind:items="allPCN"
          v-model="selectedPCN"
          label="PCN"
          item-text="name_txt"
          item-value="pcc"
          autocomplete
          return-object
        ></v-select>
      </template>

      <template v-if="type === 'PCN Permission' || type === 'Group Permission'">
        <v-select
          v-bind:items="allFeatures"
          v-model="selectedFeature"
          label="Select a Feature"
          item-text="desc"
          item-value="feature_id"
          autocomplete
          return-object
        ></v-select>
      </template>
      <template v-if="type === 'Group'">
        <v-select
          v-bind:items="allGroups"
          v-model="selectedGroup"
          label="Select a Group"
          item-text="name"
          item-value="id"
          return-object
        ></v-select>
      </template>
      <template v-if="type === 'PCN' || type === 'Group'">
        <v-select
          v-bind:items="addClasses"
          v-model="selectedClass"
          label="Select a User Class"
          item-text="desc_txt"
          item-value="id"
          return-object
        ></v-select>
      </template>
      <template v-if="type === 'PCN Permission' || type === 'Group Permission'">
        <v-select
          v-bind:items="allAccesses"
          v-model="selectedAccess"
          label="Select a Access Level"
          item-text="name"
          item-value="level"
          return-object
        ></v-select>
      </template>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-block text-xs-center">
      <v-btn color="primary-color" @click.native="save">Save</v-btn>
      <v-btn @click.native="back" v-if="type === 'PCN'">Close</v-btn>
      <v-btn @click.native="back" v-else>Back</v-btn>
    </v-card-actions>
  </main>
</template>

<script>
  import services from '../../../../services/services'
  import claimServices from '../../../../services/claim/claimServices'

  export default {
    name: 'add-form',
    props: ['type', 'data', 'onBack'],
    data() {
      return {
        uid: this.$route.params.uid,
        pcn_name: '',
        group_name: '',
        allPCN: [],
        allGroups: [{name: 'All Groups', id: -1}],
        allFeatures: this.$store.state.allFeatures,
        addClasses: this.$store.state.allClasses,
        allAccesses: this.$store.state.allAccesses,
        selectedPCN: {},
        selectedGroup: {name: 'All Groups', id: -1},
        selectedFeature: this.$store.state.allFeatures[0],
        selectedClass: this.$store.state.allClasses[0],
        selectedAccess: this.$store.state.allAccesses[0]
      }
    },
    watch: {
      type(val) {
        if (val) this.setValues()
      },
      '$store.state.selectedPermission': function (data) {
        if (data) this.pcn_name = data.PCN
        else this.pcn_name = ''
      }
    },
    components: {},
    mounted: function () {
      this.setValues()
    },
    methods: {
      setValues: function () {
        const that = this
        switch (this.type) {
          case 'PCN':
            const allPCN = {
              name_txt: 'All PCNs',
              pcc: '*'
            }
            this.allPCN = []
            this.allPCN = [...this.$store.state.allPCN]
            this.allPCN.unshift(allPCN)
            this.selectedPCN = this.$store.state.allPCN[0]
            return
          case 'PCN Permission':
            this.pcn_name = this.$store.state.selectedPermission.PCN
            return
          case 'Group':
            const data = {
              search: {
                Pcc: this.$store.state.pcn.pcc
              },
              orderBy: '',
              includeProperties: ''
            }

            claimServices.getGroupsList(data).then(function (res) {
              if(res.length > 0) {
                res.forEach(function (d) {
                  that.allGroups.push({name: d.Code + '-' + d.Name,  id: d.Id})
                })
              }
            })
            return
          case 'Group Permission':
            this.group_name = this.data.name
            return
        }
      },
      back: function () {
        switch (this.type) {
          case 'PCN':
            this.onBack()
            return
          case 'PCN Permission':
            this.onBack('main')
            return
          case 'Group':
            this.onBack('main')
            return
          case 'Group Permission':
            this.onBack('groupSid')
            return
        }
      },
      save: function () {
        let data = {}
        const that = this
        switch (this.type) {
          case 'PCN':
            data = {
              uid: this.uid,
              pcc: this.selectedPCN.pcc,
              class_id: this.selectedClass.id,
              updated_by: this.$store.state.user.session_uid
            }
            services.addUserPCN(data).then(function (res) {
              if (res === '0') {
                window.Vue.$emit('snackbar', 'success', 'Add PCN!')
              }
              window.Vue.$emit('updatedUserPermission', that.uid)
              that.onBack()
            })
            return
          case 'PCN Permission':
            data = {
              uid: this.uid,
              pcc: this.pcn_name !== 'All PCNs' ? this.pcn_name : '*',
              feature_id: this.selectedFeature.feature_id,
              access: this.selectedAccess.level,
              created_by: this.$store.state.user.session_uid
            }
            services.addUserPermissionSID(data).then(function (res) {
                if (res.substring(0, 1) !== 'E') {
                  window.Vue.$emit('reloadSidData', res)
                  window.Vue.$emit('snackbar', 'success', 'Add PCN Permission!')
                  that.onBack('main')
                }
              }
            )
            return
          case 'Group':
            data = {
              uid: this.uid,
              pcc: this.$store.state.selectedPermission.PCN === 'All PCNs' ? '*' : this.$store.state.selectedPermission.PCN,
              class_id: this.selectedClass.id,
              group_id: this.selectedGroup.id,
              updated_by: this.$store.state.user.session_uid
            }
            services.addUserGroup(data).then(function (res) {
              if (res === '0') {
                window.Vue.$emit('reloadGroupData', data.uid, data.pcc)
                window.Vue.$emit('snackbar', 'success', 'Add Group!')
                that.onBack('main')
              }
            })
            return
          case 'Group Permission':
            data = {
              uid: this.uid,
              pcc: this.$store.state.selectedPermission.PCN === 'All PCNs' ? '*' : this.$store.state.selectedPermission.PCN,
              group_id: this.data.id === '*' ? 0 : this.data.id,
              feature_id: this.selectedFeature.feature_id,
              access: this.selectedAccess.level,
              created_by: this.$store.state.user.session_uid
            }
            services.addUserGroupPermission(data).then(function (res) {
              if (res.substring(0, 1) !== 'E') {
                window.Vue.$emit('reloadGroupSidData', res)
                window.Vue.$emit('snackbar', 'success', 'Add Group Permission!')
                that.onBack('groupSid')
              }
            })
            return
        }
      }
    }
  }
</script>

<style lang="scss">
</style>
