<template>
  <v-navigation-drawer
    v-model="drawer"
    permanent
    clipped
    fixed
    app
  >
    <v-list dense>
      <template v-for="(item, i) in items">
        <v-list-group v-if="item.children" v-model="item.model" no-action>
          <v-list-tile slot="item">
            <v-list-tile-action>
              <v-icon>{{ item.model ? item.icon : item['icon-alt'] }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            :to="{name: child.to}"
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else
                     :to="{name: item.to}"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
    <!--</v-navigation-drawer v-model="drawer">-->
  </v-navigation-drawer>
</template>
<script>
  export default {
    data() {
      return {
        clipped: true,
        drawer: true,
        mini: false,
        floating: false,
        items: [{
          'icon-alt': 'keyboard_arrow_down',
          icon: 'keyboard_arrow_down',
          text: 'Administration',
          model: false,
          children: [
            {icon: 'person', text: 'Users', to: 'users'},
            {icon: 'group', text: 'Groups', to: 'groups'},
            {icon: 'local_hospital', text: 'Provider', to: 'provider'},
            {icon: 'group_work', text: 'Network', to: 'network'},
            {icon: 'link', text: 'Chain', to: 'chain'},
            {icon: 'note', text: 'Prescribers', to: 'prescribers'},
            {icon: 'description', text: 'Plan', to: 'Plan'},
            {icon: 'face', text: 'Member', to: 'member'},
            {icon: 'receipt', text: 'Claim', to: 'claims'},
            {icon: 'check', text: 'Prior Authorization', to: 'prior-authorization'},
            {icon: 'code', text: 'Diagnosis Codes', to: 'diagnosis-codes'},
            {icon: 'bubble_chart', text: 'EDI', to: 'edi'},
            {icon: 'network_wifi', text: 'PCN', to: 'pcns'},
            {icon: 'list', text: 'Formulary', to: 'formulary'},
            {icon: 'folder_special', text: 'Special Programs', to: 'special-programs'},
          ]
        },
          {
            icon: 'donut_small',
            'icon-alt': 'donut_small',
            text: 'Drugs',
            model: false,
            children: [
              {text: 'Drug Database', to: 'drug-database'},
              {text: 'Drug Pricing', to: 'drug-pricing'},
              {text: 'HMAC Pricing', to: 'hmac-pricing'},
              {text: 'MAC Pricing', to: 'mac-pricing'}
            ]
          }
        ],
        isShow: false
      }
    },
    methods: {},
    components: {},
    watch: {
      '$store.state.pcn': function (val) {
        if (val) this.isShow = true
      },
      '$route.path': function (path) {
        if (path.indexOf('administration') !== -1) {
          this.items.forEach(function (d) {
            if (d.text === 'Administration') d.model = true
            else d.model = false
          })
        } else if (path.indexOf('drugs') !== -1) {
          this.items.forEach(function (d) {
            if (d.text === 'Drugs') d.model = true
            else d.model = false
          })
        } else {
          this.items.forEach(function (d) {
            d.model = false
          })
        }
      },
      '$store.state.isMPP': function (val) {
        if (val) {
          this.items[0]['children'].splice(12, 0, {icon: 'event', text: 'Price It!', to: 'mpp-drug'})
        } else {
          this.items[0]['children'].splice(12, 1)
        }
      }
    },
    mounted: function () {
      console.log('----- Navigation mounted -----')
      if (this.$store.state.pcn) this.isShow = true

      if(this.$store.state.isMPP) {
        this.items[0]['children'].splice(12, 0, {icon: 'event', text: 'Price It!', to: 'mpp-drug'})
      }else {
        if(this.items[0]['children'].length > 15) this.items[0]['children'].splice(12, 1)
      }

      if ((this.$route.path).indexOf('administration') !== -1) {
        this.items.forEach(function (d) {
          if (d.text === 'Administration') d.model = true
          else d.model = false
        })
      } else if ((this.$route.path).indexOf('drugs') !== -1) {
        this.items.forEach(function (d) {
          if (d.text === 'Drugs') d.model = true
          else d.model = false
        })
      }
    }
  }
</script>
<style lang="stylus">
  .list__tile__action {
    min-width: 36px;
  }

  .list--dense {
    padding-top: 0px;
  }

  .list--group__header--active .list__tile {
    background: #fff;
  }

  .list--group {
    padding-left: 30px;
  }

  .navigation-drawer > .list .list__tile--active > *:first-child .icon,
  .navigation-drawer > .list .list--group__container .list__tile--active .list__tile__title {
    color: #5ac787;
    font-weight: bold;
  }
</style>
