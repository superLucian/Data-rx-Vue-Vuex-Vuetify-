<template>
  <v-card-text class="halo-tree">
    <tree-node
      :treeData='store.root'
      :options="treeNodeOptions"
      v-show="itemsShow"
    >
    </tree-node>
  </v-card-text>
</template>
<script>
  import TreeNode from './tree-node.vue'
  import TreeStore from './tree-store'

  const DEFAULTICONCLASS = {
    open: 'keyboard_arrow_down',
    close: 'keyboard_arrow_right',
    add: 'add',
    edit: 'edit'
  }
  export default {
    name: 'tree',
    props: {
      treeData: [Array],
      options: [Object]
    },
    data () {
      return {
        itemsShow: true,
        search: null,

        treeNodeOptions: {},
        store: {
          _last: null,
          root: [],
          set last(v){
            this._last = v
          } ,
          get last(){
            return this._last
          }
        }
      }
    },
    created () {
      this.isTree = true
      this.dealTreeData()

      this.treeNodeOptions = Object.assign({}, {
        rootName: '',

        labelKey: 'label',
        iconClass: DEFAULTICONCLASS,
        lazy: false,
        dynamicAdd: true,
        dynamicAddFilter () { return true },
        dynamicAddNode () {},
        leafIcon () { return '' }

      }, this.options)
    },

    watch: {
      treeData: {
        handler: function (data, oldData) {
          this.dealTreeData()
        },
        deep: true
      }
    },
    methods: {
      /**
       * generate key 0-1-2-3
       * this is very important function for now module
       * @param treeData
       * @param parentKey
       * @returns {Array}
       */
      generateKey (treeData = [], parentKey) {
        treeData = treeData.map((item, i) => {
          item.key = parentKey + '-' + i.toString();

          if (item.hasOwnProperty('children') && item.children.length > 0) {
            this.generateKey(item.children, item.key)
          }

          return item;
        })
        return treeData;
      },
      dealTreeData () {
        this.store = new TreeStore({
          root: (this.generateKey(this.treeData, '0') || []).slice(0),
          last: null
        })
      }

    },
    components: {TreeNode}
  }

</script>
<style scoped>

</style>

