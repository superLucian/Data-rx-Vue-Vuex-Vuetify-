<template>
  <main class="delete-confirm-container btn btn--icon btn--raised">
    <v-speed-dial
      :direction="direction"
      :hover="hover"
      :transition="transition"
    >
      <v-tooltip top slot="activator">
        <v-btn icon slot="activator">
          <v-icon>delete</v-icon>
        </v-btn>
        <span>{{message}}</span>
      </v-tooltip>

      <v-btn fab dark small class="success" @click.native="confirm">
        <v-icon>done</v-icon>
      </v-btn>
      <v-btn fab dark small class="red">
        <v-icon>clear</v-icon>
      </v-btn>
    </v-speed-dial>
  </main>
</template>

<script>
  import Vodal from './Vodal.vue'
  import 'vodal/common.css'
  import 'vodal/zoom.css'

  export default {
    name: 'delete-confirm',
    props: ['message'],
    data() {
      return {
        direction: "right",
        hover: false,
        top: true,
        right: true,
        bottom: false,
        left: false,
        transition: 'slide-y-reverse-transition',
        popupWindow: '',
        user: '',
        provider: '',
        signedIn: false
      }
    },
    methods: {
      confirm: function () {
        this.$emit('confirmed')
      }
    }
  }

</script>
