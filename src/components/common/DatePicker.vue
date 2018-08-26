<template>
  <v-card flat class="transparent">
    <v-menu
      lazy
      :close-on-content-click="false"
      v-model="datePicker"
      transition="scale-transition"
      offset-y
      full-width
      :nudge-right="40"
      max-width="290px"
      min-width="290px"
    >
      <v-text-field
        slot="activator"
        :label="label"
        v-model="formatted"
        prepend-icon="event"
        @blur="update(formatted)"
        @keyup.enter="update(formatted)"
        :rules="typeof (required) === 'boolean' ? [] : required"
      ></v-text-field>
      <v-date-picker v-model="date" @input="updateValue" no-title autosave>
      </v-date-picker>
    </v-menu>
  </v-card>
</template>
<script>
  import { convertDate, convertStringToPickerFormat } from '../utils/DateMethods'

  export default {
    name: 'date-picker',
    props: ['value', 'required', 'label'],
    data () {
      return {
        date: null,
        formatted: null,
        datePicker: null,
      }
    },
    watch: {
      value: function() {
        const date = convertStringToPickerFormat(this.value)
        if (new Date(date) == 'Invalid Date') {
          this.date = ''
          this.formatted = ''
        } else {
          this.date = date
          if(date) {
            this.formatted = this.dateFormatConterver(date)
          }
        }
      }
    },
    mounted: function () {
      if(this.value) {
        this.date = convertStringToPickerFormat(this.value)
        this.formatted = this.dateFormatConterver(this.date)
      }
    },
    methods: {
      parseDate (date) {
        if (!date) {
          return null
        }

        let [month, day, year] = date.split('/')
        if(year && year.length < 4) year = '2000'
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
      },
      update: function (date) {
        const dt = this.parseDate(date)
        this.updateValue(dt)
      },
      updateValue: function (date) {
        if(date) {
          const formatted = this.dateFormatConterver(date)
          this.date = date
          this.formatted = formatted
          this.$emit('input', formatted)
        }
      },
      dateFormatConterver: function(v) {
        const temp = v.split('-')
        return temp[1] + '/' + temp[2] + '/' + temp[0]
      }
    }
  }
</script>

<style lang="stylus">
</style>
