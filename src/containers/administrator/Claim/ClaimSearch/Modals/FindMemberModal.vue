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
      <member-find
        :selectable="true"
        :methodName="methodName"
      ></member-find>
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
  import MemberFind from '../../../Member/MemberList.vue'

  export default {
    name: 'find-member-modal',
    props: ['isShow', 'methodName'],
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
      MemberFind,
    },
    methods: { },
  }
</script>
