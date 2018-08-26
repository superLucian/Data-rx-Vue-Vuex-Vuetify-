<template>
  <v-layout row justify-center>
    <vodal
      :show="isShow"
      :width="width"
      :height="height"
      animation="zoom"
      :closeOnEsc="false"
      :closeButton="true"
      @hide="$emit('hide')"
      :closeOnClickMask="false"
    >
      <drug-find :selectable="true"></drug-find>
      <v-card-text class="py-0 px-1">
        <v-divider class="mt-2"></v-divider>
        <v-card-actions class="d-block text-xs-center">
          <v-btn @click.native="$emit('hide')">Close</v-btn>
        </v-card-actions>
      </v-card-text>
    </vodal>
  </v-layout>
</template>

<script>
  import Vodal from '../../../../../components/common/Vodal.vue'
  import DrugFind from '../../../../drugs/DrugsDatabase/DrugDatabase.vue'

  export default {
    name: 'find-drug-modal',
    props: ['isShow', 'data'],
    data() {
      return {
        height: 0,
        value: {},
        sid: null,
        type: null,
        width: 1024,
      }
    },
    components: {
      Vodal,
      DrugFind,
    },
    methods: { },
  }
</script>
