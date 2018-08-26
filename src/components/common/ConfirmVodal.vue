<template>
  <main v-if="show">
  <Vodal
    :show="show"
    animation="zoom"
    :closeOnEsc="true"
    :closeButton="false"
    :width="500"
    :height="500"
    :closeOnClickMask="true"
  >
    <v-container fluid grid-list-xl>
      <v-layout row>
        <v-flex xs12>
          <slot></slot>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12>
          <v-card-text class="text-xs-center">
            <v-btn class="primary" @click.native="confirm()">Yes</v-btn>
            <v-btn @click.native="cancel()">No</v-btn>
          </v-card-text>
        </v-flex>
      </v-layout>
    </v-container>
  </Vodal>
</main>
</template>

<script>
import Vodal from './Vodal.vue'
import 'vodal/common.css'
import 'vodal/zoom.css'

export default {
  name: 'confirm-vodal',
  components: { Vodal },
  props: ['confirm', 'cancel', 'show'],
  mounted() {
    console.log('----- Confirm VOdal mounted -----')
  },
  methods: {
  }
}

</script>
