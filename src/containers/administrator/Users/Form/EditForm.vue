<template>
  <main>
    <v-card-text class="my-scroll-enabled">
      <v-text-field label="User Id" v-model="uid" disabled></v-text-field>
      <v-text-field label="PCN" v-model="pcn_name" disabled v-if="type !== 'Group Permission'"></v-text-field>
      <v-text-field label="Group" v-model="group_name" disabled
                    v-if="type === 'Group Class' || type === 'Group Permission'"></v-text-field>
      <v-text-field label="Feature" v-model="feature_name" disabled
                    v-if="type === 'PCN Permission' || type === 'Group Permission'"></v-text-field>

      <template v-if="type === 'PCN Class' || type === 'Group Class'">
        <v-select
          v-bind:items="addClasses"
          v-model="selectedClass"
          label="Select a User Class"
          item-text="desc_txt"
          item-value="id"
          autocomplete
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
      <template v-if="type === 'PCN Class'">
        <v-checkbox label="Copy this class to ALL PCNs" v-model="copy_all" color="primary-color" true-value="Y"
                    false-value="N" hide-details></v-checkbox>
      </template>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions class="d-block text-xs-center">
      <v-btn color="primary-color" @click.native="save">Save</v-btn>
      <v-btn @click.native="back" v-if="type === 'PCN Class'">Close</v-btn>
      <v-btn @click.native="back" v-else>Back</v-btn>
    </v-card-actions>
  </main>
</template>

<script>
  import services from '../../../../services/services'

  export default {
    name: 'edit-form',
    props: ['type', 'data', 'onBack'],
    data() {
      return {
        uid: this.$route.params.uid,
        pcn_name: '',
        group_name: '',
        feature_name: '',
        addClasses: this.$store.state.allClasses,
        allAccesses: this.$store.state.allAccesses,
        selectedClass: this.$store.state.allClasses[0],
        selectedAccess: this.$store.state.allAccesses[0],
        copy_all: 'N'
      }
    },
    watch: {
      type(val) {
        if (val) this.setValues()
      }
    },
    components: {},
    mounted: function () {
      this.setValues()
    },
    methods: {
      setValues: function () {
        if (this.$store.state.selectedPermission) this.pcn_name = this.$store.state.selectedPermission.PCN

        switch (this.type) {
          case 'PCN Class':
            this.selectedClass = {
              id: this.$store.state.selectedPermission.class_id,
              desc_txt: this.$store.state.selectedPermission.Class
            }
            return
          case 'PCN Permission':
            this.feature_name = this.data.Feature
            this.selectedAccess = {
              level: this.data.access_level,
              name: this.data.Access
            }
            return
          case 'Group Class':
            this.group_name = this.data.Group
            this.selectedClass = {
              id: this.data.class_id,
              desc_txt: this.data.Class
            }
            return
          case 'Group Permission':
            this.group_name = this.data.group.name
            this.feature_name = this.data.value.Feature
            this.selectedAccess = {
              level: this.data.value.access_level,
              name: this.data.value.Access
            }
            return
        }
      },
      back: function () {
        this.isDisabledSave = true
        switch (this.type) {
          case 'PCN Class':
            this.onBack()
            return
          case 'PCN Permission':
            this.onBack('main')
            return
          case 'Group Class':
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
          case 'PCN Class':
            data = {
              uid: this.uid,
              pcc: this.pcn_name,
              class_id: this.selectedClass.id,
              all_pcc: this.copy_all,
              updated_by: this.$store.state.user.session_uid
            }
            services.updateUserClassPermission(data).then(function (res) {
              if (res === "0") {
                window.Vue.$emit('updatedUserPermission', that.uid)
                window.Vue.$emit('snackbar', 'success', 'Update PCN Class!')
                that.isDisabledSave = true
                that.onBack()
              }
            })
            return
          case 'PCN Permission':
            data = {
              uid: this.uid,
              sid: this.data.SID,
              feature_id: this.data.feature_id,
              access: this.selectedAccess.level,
              updated_by: this.$store.state.user.session_uid
            }
            services.updateUserSIDPermission(data).then(function (res) {
              if (res === "0") {
                window.Vue.$emit('reloadSidData', that.data.SID)
                window.Vue.$emit('snackbar', 'success', 'Update PCN Permission!')
                that.onBack('main')
              } else {
                window.Vue.$emit('snackbar', 'warning', res)
              }
            }).catch(function () {
              window.Vue.$emit('snackbar', 'error', 'Error!')
            })
            return
          case 'Group Class':
            data = {
              uid: this.uid,
              pcc: this.$store.state.selectedPermission.PCN === 'All PCNs' ? '*' : this.$store.state.selectedPermission.PCN,
              class_id: this.selectedClass.id,
              group_id: this.data.group_id === '*' ? '0' : this.data.group_id,
              updated_by: this.$store.state.user.session_uid
            }
            services.updateUserGroupClass(data).then(function (res) {
              if (res === "0") {
                window.Vue.$emit('reloadGroupData', data.uid, data.pcc)
                window.Vue.$emit('snackbar', 'success', 'Update Group Class!')
                that.onBack('main')
              } else {
                window.Vue.$emit('snackbar', 'warning', res)
              }
            }).catch(function () {
              window.Vue.$emit('snackbar', 'error', 'Error!')
            })
            return
          case 'Group Permission':
            data = {
              uid: this.uid,
              sid: this.data.value.SID,
              feature_id: this.data.value.feature_id,
              access: this.selectedAccess.level,
              updated_by: this.$store.state.user.session_uid
            }
            services.updateUserSIDPermission(data).then(function (res) {
              if (res === "0") {
                window.Vue.$emit('reloadGroupSidData', data.sid)
                window.Vue.$emit('snackbar', 'success', 'Update Group Permission!')
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
