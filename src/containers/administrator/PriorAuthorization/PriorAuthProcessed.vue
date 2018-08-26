<template>
  <main>
    <v-card-title primary-title>
      Find authorizations processed between:
    </v-card-title>
    <v-card-text>
      <v-layout row wrap>
        <v-flex xs4 class="pr-5">
          <date-picker v-model="startDate" label="Start Date"></date-picker>
        </v-flex>
        <v-flex xs4 class="pr-5">
          <date-picker v-model="endDate" label="End Date"></date-picker>
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions class="d-block text-xs-center py-0">
      <v-btn color="primary-color" @click="find">Find<i v-if="loading" class="fa fa-circle-o-notch fa-spin fa-fw"></i></v-btn>
    </v-card-actions>
    <prior-auth-list :tableData="priorAuthList" v-if="showAuthList"></prior-auth-list>
  </main>
</template>

<script>
  import priorAuthorizationService from '../../../services/priorauthorization/priorAuthorizationService'
  import {pickerFormat} from '../../../components/utils/DateMethods'
  import PriorAuthList from "./PriorAuthList.vue"
  import DatePicker from '../../../components/common/DatePicker.vue'


  export default {
    name: 'prior-auth-processed',
    components: {
      PriorAuthList,
      DatePicker
    },
    data() {
      return {
        startDate: pickerFormat(new Date()),
        endDate: pickerFormat(new Date()),
        priorAuthList: [],
        showAuthList: false,
        loading: false
      }
    },
    methods: {
      find() {
        const that = this
        that.loading = true
        const requestData = {
          start_dt: that.startDate,
          end_dt: that.endDate,
          pcc: that.$store.state.pcn.pcc,
        }
        priorAuthorizationService.findProcessedBetween(requestData).then(function (response) {
          that.showAuthList = true
          that.priorAuthList = response.authorization_data
          that.loading = false
        }).catch(function (error) {
          that.loading = false
        })
      }
    }
  }
</script>
