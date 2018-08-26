<template>
  <div class="group-information">
      <v-layout row>
        <v-flex xs12>
          <v-layout row wrap>
            <v-flex xs4 class="pr-3">
              <v-text-field label="Group Code" v-model="group_info.group_cd" :rules="[rules.required]" required>
              </v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-3 pr-3">
              <v-text-field label="Name" v-model="group_info.name_txt" :rules="[rules.required]" required>
              </v-text-field>
            </v-flex>
            <v-flex xs4 class="pl-3">
              <v-text-field label="Org Code" v-model="group_info.org_cd" :counter="3" v-on:keypress="isValidInput">
              </v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs4>
              <v-layout row wrap>
                <v-flex xs12>
                  <v-radio-group row v-model="group_info.status_cd">
                    <v-radio value="A" label="Active"></v-radio>
                    <v-radio value="I" label="Inactive"></v-radio>
                  </v-radio-group>
                </v-flex>
              </v-layout>
            </v-flex>
            <v-flex xs8></v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-subheader>Group Type</v-subheader>
          <v-divider></v-divider>
          <v-card-text>
            <v-layout row wrap class="pl-3">
              <v-flex xs8>
                <v-radio-group row v-model="group_info.type_cd">
                  <v-radio value="0" label="Single / Parent Group Member"></v-radio>
                  <v-radio value="1" label="Child Group Member"></v-radio>
                </v-radio-group>
              </v-flex>
              <v-flex xs4>
                <v-select
                  v-bind:items="group_info.group_list"
                  v-model="group_info.parent_group_id"
                  label="Parent"
                  single-line
                  item-text="name"
                  item-value="group_id"
                  :disabled="group_info.type_cd === '0' ? true : false">
                </v-select>
              </v-flex>
            </v-layout>
          </v-card-text>
        </v-flex>
      </v-layout>
  </div>
</template>
<script>
  import services from '../../../../services/group/groupService'
  import store from '../../../../store'

  export default {
    name: 'group-information',
    props: ['type', 'group_info', 'tab'],
    components: {},
    data() {
      return {
        rules: {
          required: (value) => !!value || 'Required.'
        }
      }
    },
    watch: {
      group_info: {
        handler: function () {
          this.tab['validated'] = this.group_info.group_cd.length > 0 && this.group_info.name_txt.length > 0
          if(this.group_info.type_cd ==='0'){
            this.group_info.parent_group_id = -1
          }else {
            this.group_info.parent_group_id = -1
          }
        },
        deep: true
      }
    },
    mounted() {
    },
    methods: {
      isValidInput: function (evt) {
        evt = (evt) ? evt : window.event;
        if (this.group_info['org_cd'].length >= 3 )
          evt.preventDefault();
      }
    },
  }
</script>
<style lang="stylus">
</style>
