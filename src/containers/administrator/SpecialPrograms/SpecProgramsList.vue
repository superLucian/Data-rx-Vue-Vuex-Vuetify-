<template>
  <main>
    <v-toolbar dark>
      <v-toolbar-title class="white--text">Special Program List</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        dark
        light
        single-line
        append-icon="search"
        placeholder="Search..."
        class="white--text"
        hide-details
      ></v-text-field>
    </v-toolbar>
    <v-container fluid class="my-scroll-enabled">
      <v-layout row wrap>
        <v-data-table
          :items="items"
          :headers="headers"
          :loading="loading"
          :search="search"
        >
          <template slot="items" slot-scope="props">
            <tr>
              <td class="text-xs-left">
                <v-tooltip top>
                  <v-btn icon @click="clickRow(props.item)" slot="activator">
                    <v-icon>edit</v-icon>
                  </v-btn>
                  <span>Edit Program</span>
                </v-tooltip>
              </td>
              <td class="text-xs-left" :key="header.text" v-for="header in headers" v-if="header.text !== ''">
                {{ props.item[header.text] }}
              </td>
            </tr>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
  </main>
</template>
<script>
  import services from '../../../services/specialPrograms/specProgramsServices'
  import {convertDate} from '../../../components/utils/DateMethods'

  export default {
    name: 'special-programs-list',
    components: {},
    data() {
      return {
        items: [],
        fullData: [],
        loading: false,
        headers: [],
        search: ''
      }
    },
    mounted() {
      console.log('----- Administrator / Special Programs List mounted -----')
      const that = this;
      this.loading = true
      const pcn = this.$store.state.pcn.pcc
      services.getSpecProgramList({pcn}).then(function ({spec_program_list: items}) {
        if (items.length > 0) {
          that.setHeaders(items)
          that.items = items.map(item => Object.assign({}, {...item},
            {'Created Date': convertDate(item['Created Date']), 'Updated Date': convertDate(item['Updated Date'])}
          ))
        }
        that.loading = false;
      });
    },
    methods: {
      setHeaders(data) {
        this.headers = Object.keys(data[0]).map(el => ({text: el, align: 'left', sortable: true, value: el}))
        this.headers.unshift({text: '', align: 'left', sortable: false, value: ''})
      },
      clickRow({'Program ID': pid}) {
        if (pid) {
          this.$router.push({path: `edit/${pid}`})
        }
      }
    }
  }
</script>
<style lang="stylus">
</style>
