<template>
  <v-layout row wrap>
    <vodal
      :show="isShow"
      animation="zoom"
      :closeOnEsc="false"
      :closeButton="false"
      :closeOnClickMask="false"
      :width="1200"
      :height="800">
      <v-container fluid class="my-scroll-enabled px-0 py-0">
        <div style="max-height: 600px">
          <prescribers-find :selectable="true" :methodName="methodName">
          </prescribers-find>
        </div>
      </v-container>
      <v-flex xs12>
        <v-divider class="mt-2"></v-divider>
        <v-card-text class="text-xs-center py-1">
          <v-btn @click.native="close">Cancel</v-btn>
        </v-card-text>
      </v-flex>
    </vodal>
  </v-layout>
</template>

<script>
  import Vodal from '../../../components/common/Vodal.vue'
  import PrescribersFind from '../Prescribers/PrescribersFind.vue'

  export default {
    props: ['isShow', 'methodName', 'close'],
    data() {
      return {
        width: 1024,
        height: 0,
        type: null,
        sid: null,
        value: {}
      }
    },
    components: {
      Vodal,
      PrescribersFind
    },
    mounted() {

    },
  }
</script>
