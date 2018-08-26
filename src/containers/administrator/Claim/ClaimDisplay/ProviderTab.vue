<template>
  <v-form ref="form">
    <v-container fluid class="form-scroll-enabled">
      <v-card-text>
        <v-flex xs12>
          <h5>Find claim(s) using:</h5>
        </v-flex>
        <v-flex xs6>
          <v-text-field label="Provider Id"></v-text-field>

          <v-menu
            lazy
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
            v-model="datePickerFirst"
            transition="scale-transition"
            :close-on-content-click="false"
          >
            <v-text-field
              readonly
              slot="activator"
              label="Claim Date"
              v-model="dateFirst"
              prepend-icon="event"
            ></v-text-field>
            <v-date-picker v-model="dateFirst" no-title scrollable actions>
              <template slot-scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat class="primary" @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat class="primary" @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>

          <v-menu
            lazy
            offset-y
            full-width
            :nudge-left="40"
            max-width="290px"
            v-if="useDateRange"
            v-model="datePickerSecond"
            transition="scale-transition"
            :close-on-content-click="false"
          >
            <v-text-field
              readonly
              slot="activator"
              v-model="dateSecond"
              prepend-icon="event"
              label="Thru Claim Date"
            ></v-text-field>
            <v-date-picker v-model="dateSecond" no-title scrollable actions>
              <template slot-scope="{ save, cancel }">
                <v-card-actions>
                  <v-btn flat class="primary" @click.native="cancel()">Cancel</v-btn>
                  <v-btn flat class="primary" @click.native="save()">Save</v-btn>
                </v-card-actions>
              </template>
            </v-date-picker>
          </v-menu>

          <v-checkbox label="Use Data Range" v-model="useDateRange" light></v-checkbox>

        </v-flex>
      </v-card-text>
    </v-container>
  </v-form>
</template>


<script>
  export default {
    name: 'provider-tab',
    computed: {
      claim: function() {
        return this.$store.state.claimInfo || {}
      }
    },
    data() {
      return {
        dateFirst: null,
        dateSecond: null,
        datePickerFirst: false,
        datePickerSecond: false,
        useDateRange: false,
      }
    },
  }
</script>
<style lang="stylus">
</style>
