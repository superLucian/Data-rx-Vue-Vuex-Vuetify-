<template>
  <div class="group-field-information">
    <v-layout row wrap>
      <v-flex xs6 class="pr-3">
        <v-select
          v-bind:items="field_edits"
          v-model="fieldInfo['field_tag']"
          label="Field"
          single-line
          item-text="field_desc"
          item-value="field_tag"
          bottom>
        </v-select>
      </v-flex>
      <v-flex xs6 class="pl-3">
        <v-text-field label="Edit" v-model="fieldInfo['Edit']"></v-text-field>
      </v-flex>
      <v-flex xs12>
        <v-text-field
          name="input-7-1"
          label="Reject Message"
          v-model="fieldInfo['Message']"
          multi-line
        ></v-text-field>
      </v-flex>
      <v-flex xs6>
        <v-radio-group row v-model="fieldInfo['Status']">
          <v-radio value="Active" label="Active"></v-radio>
          <v-radio value="Inactive" label="Inactive"></v-radio>
        </v-radio-group>
      </v-flex>
      <v-flex xs12>
        <v-divider class="mt-2"></v-divider>
        <v-card-actions class="d-block text-xs-center">
          <v-btn class="primary" @click.native="save()" :disabled="isDisabledSave">Save</v-btn>
          <v-btn @click.native="cancel()">Cancel</v-btn>
        </v-card-actions>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
  import services from '../../../../services/group/groupService'
  import store from '../../../../store'

  export default {
    name: 'group-field-information',
    props: ['type', 'group_id', 'fieldInfo', 'refresh', 'cancel'],
    components: {},
    data() {
      return {
        field_edits: [],
        isDisabledSave: true
      }
    },
    watch: {
      fieldInfo: {
        handler: function (newData, oldData) {
          if (newData && oldData && (newData === oldData)) {
            this.isDisabledSave = false
          } else {
            this.isDisabledSave = true
          }
        },
        deep: true
      }
    },
    mounted() {
      this.getAllFieldEdits()
    },
    methods: {
      getAllFieldEdits: function () {
        const that = this
        services.getAllFieldEdits().then(function (res) {
          that.field_edits = res.field_edits
          that.setValues()
        })
      },
      setValues: function () {
        const that = this
        if (that.type === "add") {
          that.fieldInfo['field_tag'] = that.field_edits[0]['field_tag']
          setTimeout(function () {
            that.isDisabledSave = true
          }, 200)
        }
      },
      save: function () {
        const that = this
        switch (that.type) {
          case 'add':
            services.addGroupFieldEdit(that.fieldInfo, this.group_id, this.$store.state.user).then(function (res) {
              if (res === "0") {
                window.Vue.$emit('snackbar', 'success', 'Field Edit Added !')
                that.cancel()
                that.refresh()
              } else {
                window.Vue.$emit('snackbar', 'warning', res)
              }
            }).catch(function () {
            })
            break

          case 'edit':
            services.updateGroupFieldEdit(that.fieldInfo, this.group_id, this.$store.state.user).then(function (res) {
              if (res === "0") {
                window.Vue.$emit('snackbar', 'success', 'Field Edit updated !')
                that.cancel()
                that.refresh()
              } else {
                window.Vue.$emit('snackbar', 'warning', res)
              }
            }).catch(function () {
            })
            break
        }
      }
    }
  }
</script>

<style>
</style>
