<template>
  <main class="mac-find-container">
    <v-container fluid>
      <v-layout row>
        <v-flex xs3>
          <v-subheader>Mac Description:</v-subheader>
        </v-flex>
        <v-flex xs6>
          <v-text-field
            name="mac-search"
            label="Search"
            v-model="description"
          ></v-text-field>
        </v-flex>
        <v-flex xs3>
          <v-btn color="primary-color" @click.native="find" class="left">find</v-btn>
        </v-flex>

      </v-layout>
    </v-container>
    <v-divider></v-divider>
    <v-container fluid>
      <v-layout row wrap>
        <div class="left">
          <v-text-field append-icon="search" label="Search" single-line v-model="search"></v-text-field>
        </div>
        <v-data-table
          v-bind:headers="headers"
          v-bind:items="searchResult"
          v-bind:search="search"
          v-bind:pagination.sync="pagination"
          selected-key="MacID"
          v-model="selectedMac"
          :loading="loading"
          class="scrollable-table"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td>
                <v-checkbox primary hide-details v-model="props.selected"></v-checkbox>
              </td>
              <td class="text-xs-left">{{ props.item['MacID'] }}</td>
              <td class="text-xs-left">{{ props.item['Description'] }}</td>
              <td class="text-xs-left">{{ props.item['PCN'] }}</td>
              <td class="text-xs-left">{{ props.item['Is340B'] }}</td>
              <td class="text-xs-left">{{ props.item['CreatedBy'] }}</td>
              <td class="text-xs-left">{{ convertDate(props.item['CreatedDate']) }}</td>
              <td class="text-xs-left">{{ props.item['UpdatedBy'] }}</td>
              <td class="text-xs-left">{{ convertDate(props.item['UpdatedDate']) }}</td>
            </tr>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>

    <v-card-actions>
      <v-btn color="primary-color" @click.native="selectMac(selectedMac)" :disabled="isDisabledSelect">Select</v-btn>
      <v-btn @click.native="close">Back</v-btn>
    </v-card-actions>
  </main>
</template>

<script>

  import { convertDate } from '../../../components/utils/DateMethods'
  import MacService from '../../../services/pbmsys/MacService'

  export default {
    name: 'plan-find-view',
    props: ['selectMac', 'close'],
    data() {
      return {
        description: '',
        headers: [
          { text: 'Mac ID', align: 'left', sortable: true, value: 'MacID' },
          { text: 'Plan Description', align: 'left', sortable: true, value: 'Description' },
          { text: 'PCN', align: 'left', sortable: true, value: 'PCN' },
          { text: 'Is 340B MAC', align: 'left', sortable: true, value: 'Is340B' },
          { text: 'Created By', align: 'left', sortable: true, value: 'CreatedBy' },
          { text: 'Created Date', align: 'left', sortable: true, value: 'CreatedDate' },
          { text: 'Updated By', align: 'left', sortable: true, value: 'UpdatedBy' },
          { text: 'Updated Date', align: 'left', sortable: true, value: 'UpdatedDate' }
        ],
        search: '',
        pagination: {
          rowsPerPage: 50
        },
        isDisabledSelect: true,
        searchResult: [],
        selectedMac: [],
        oldSelectedMac: [],
        loading: false
      }
    },
    components: {},
    watch: {
      selectedMac: function(v) {
        if(v.length > 0) {
          this.isDisabledSelect = false
          if(v.length > 1) {
            this.oldSelectedMac = this.selectedMac.filter((item) => item.MacID !== this.oldSelectedMac[0].MacID)
            this.selectedMac = this.oldSelectedMac
            return false;
          }
        } else {
          this.isDisabledSelect = true
        }

        this.oldSelectedMac = v
      }
    },
    mounted() {
      console.log('----- Administrator / Plan / Plan Mac /Form mounted -----')
    },
    methods: {
      convertDate: convertDate,
      find() {
        const dataWithPcc = {
          "search": {
        		"Pcc": this.$store.state.pcn.pcc,
        		"DescriptionContains": this.description
        	},
          "orderBy":"Id",
          "includeProperties":""
        }
        const dataWithoutPcc = {
        	"search": {
        		"PccIsNull": "true",
        		"DescriptionContains": this.description
        	},
          "orderBy":"Id",
          "includeProperties":""
        }
        const macService = new MacService()
        const that = this
        that.searchResult = []

        macService.get(dataWithPcc).then(function (res) {
          that.searchResult = that.searchResult.concat(that.convertObjectToGroupMac(res))
          macService.get(dataWithoutPcc).then(function (res) {
            that.searchResult = that.searchResult.concat(that.convertObjectToGroupMac(res))
          })
        })
      },
      convertObjectToGroupMac(macList){
        let result = []
        for(let i=0; i<macList.length; i++){
          const {__type, Id, Pcc, ...temp} = macList[i]
          result.push({...temp, MacID: Id, PCN: Pcc})
        }
        return result
      },
      changeSort: function(column) {
        if (this.pagination.sortBy === column.value) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column.value
          this.pagination.descending = false
        }
      }
    },
    events: {
    }
  }
</script>

<style lang="stylus">
  .mac-find-container{
    .subheader{
      padding-top 20px
    }
  }

  .mac-find-container .scrollable-table{
    max-height: calc(100vh - 380px);
    max-width: 100%;
    overflow: auto;
  }

</style>
