<template>
  <v-layout row justify-center>
    <vodal
      :show="isShow"
      animation="zoom"
      :closeButton="false"
      :width="1200"
      :height="0"
    >
      <provider-find :selectable="true" :methodName="methodName"></provider-find>
      <v-flex xs12>
        <v-divider class="mt-2"></v-divider>
        <v-card-text class="text-xs-center px-0 py-1">
          <v-btn @click.native="close">Cancel</v-btn>
        </v-card-text>
      </v-flex>
    </vodal>
  </v-layout>
</template>

<script>
  import Vodal from '../../../components/common/Vodal.vue'
  import ProviderFind from '../Provider/ProviderFind.vue'

  export default {
    props: ['isShow', 'methodName', 'close'],
    data() {
      return {}
    },
    components: {
      Vodal,
      ProviderFind,
    },
  }
</script>
