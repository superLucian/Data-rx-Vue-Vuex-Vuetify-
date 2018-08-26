<template>
  <main>
    <v-form ref="form">
      <v-container fluid class="form-scroll-enabled">
        <v-flex xs6>
          <v-text-field
            single-line
            label="Search"
            v-model="search"
            append-icon="search"
          ></v-text-field>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12>
          <v-data-table
            :items="items"
            :headers="headers"
            :loading="loading"
            :pagination.sync="pagination"
          >
            <template slot="items" slot-scope="props">
              <tr>
                <td class="text-xs-jeft">{{ props.item["Ingredient#"] }}</td>
                <td class="text-xs-jeft">{{ props.item["NDC"] }}</td>
                <td class="text-xs-jeft">{{ props.item["Product Name"] }}</td>
                <td class="text-xs-jeft">{{ props.item["Strength"] }}</td>
                <td class="text-xs-jeft">{{ props.item["Qty"] }}</td>
                <td class="text-xs-jeft">{{ props.item["Drug TYPE"] }}</td>
                <td class="text-xs-jeft">{{ props.item["Ingredient Amt"] }}</td>
                <td class="text-xs-jeft">{{ props.item["Pricing Source"] }}</td>
                <td class="text-xs-jeft">{{ props.item["Reject Codes"] }}</td>
              </tr>
            </template>
          </v-data-table>
        </v-flex>
      </v-container>
    </v-form>
  </main>
</template>

<script>
  export default {
    name: 'compound-tab',
    props: ['data', 'claimIngradient'],
    computed: {
      items: function() {
        const items = this.claimIngradient || {}
        this.setHeaders(items)
        return items
      },
    },
    data() {
      return {
        search: '',
        headers: [],
        loading: false,
        pagination: {
          rowsPerPage: 500,
        },
      }
    },
    methods: {
      setHeaders(data) {
        if(data.length > 0)
          this.headers = Object.keys(data[0]).map(el => ({ text: el, align: 'left', sortable: true, value: el }))
      },
      changeSort(column) {
        if (this.pagination.sortBy === column) {
          this.pagination.descending = !this.pagination.descending
        } else {
          this.pagination.sortBy = column
          this.pagination.descending = false
        }
      },
    }
  }
</script>

<style lang="stylus">
</style>
