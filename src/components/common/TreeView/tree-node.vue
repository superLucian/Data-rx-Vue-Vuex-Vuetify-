<template>
  <ul>
    <li v-for='(item, index) of nodeData'
        v-show="!item.hasOwnProperty('visible') || item.visible"
    >
      <v-card v-show="!item.hasOwnProperty('dynamicAdd')"
              :class="{'node-selected':(item.checked && !options.showCheckbox) || item.searched }"
              class="transparent"
      >
        <v-card-text>
          <v-btn fab flat v-if="isLeaf(item)" @click='handleNodeExpand(item, index)'>
            <v-icon>
              {{ item.open ? options.iconClass.open : options.iconClass.close }}
            </v-icon>
          </v-btn>
          <v-icon v-else>
            {{ leafIcon(item) }}
          </v-icon>

          <v-tooltip top>
            <v-btn fab flat v-if="!canAdd(item)" @click="handleNode(item, index)" slot="activator">
              <v-icon>{{ options.iconClass.edit }}</v-icon>
            </v-btn>
            <span>Plan Edit</span>
          </v-tooltip>

          {{ item[options.labelKey] }}

          <v-tooltip top>
            <v-btn fab flat v-if="canAdd(item)" @click="handleClickAddNode(item, index)" slot="activator">
              <v-icon>{{ options.iconClass.add }}</v-icon>
            </v-btn>
            <span>Plan Add</span>
          </v-tooltip>

        </v-card-text>
      </v-card>
      <tree-node
        ref="treenode"
        v-if="item.children && item.children.length > 0"
        :options="options"
        @handlecheckedChange="handlecheckedChange"
        v-show='item.open'
        :tree-data="item.children"

      >
      </tree-node>
    </li>
  </ul>
</template>
<script>
  import Vue from 'vue'

  Vue.directive('focus', {
    update: function (el) {
      el.focus()
    }
  })

  export default {
    name: 'treeNode',
    props: {
      treeData: Array,
      options: Object
    },
    data() {
      return {
        nodeData: []
      }
    },
    created() {
      const parent = this.$parent
      if (parent.isTree) {
        this.tree = parent
      } else {
        this.tree = parent.tree
      }

      const tree = this.tree
      if (!tree) {
        console.warn('Warning')
      }
      this.nodeData = (this.treeData || []).slice(0)

    },
    watch: {
      treeData: function (data) {
        this.nodeData = (data || []).slice(0)
      }
    },
    methods: {
      handleNodeExpand(node, index) {
        if (node.open) {
          Vue.set(node, 'open', false)
          return false
        }
        if (node.hasOwnProperty('children') && node.children && node.children.length > 0) {
          Vue.set(node, 'open', true)
          return
        }
      },

      handlecheckedChange(node) {
        this.$emit('handlecheckedChange', node)
      },
      handleNode(node) {
        this.tree.$emit('edit-node', node)
      },
      handleClickAddNode(item, index) {
        this.options.dynamicAddNode(item, index)
      },
      canAdd(item) {
        if (this.options.dynamicAdd) {
          return this.options.dynamicAddFilter(item)
        }
        return false
      },
      leafIcon(node) {
        return this.options.leafIcon(node)
      },
      isLeaf(item) {
        if (item.hasOwnProperty('leaf') && item.leaf) {
          return false
        }
        return item.children && item.children.length > 0 || this.options.hasOwnProperty('lazy') && this.options.lazy && !item.hasOwnProperty('loaded')
      }
    }
  }
</script>
<style scoped>

  .halo-tree li {
    line-height: 20px;
    margin: 0;
    padding: 4px 0 4px 4px;
    position: relative;
    list-style: none;
    user-select: none;
  }

  .halo-tree li > span,
  .halo-tree li > i,
  .halo-tree li > a {
    line-height: 20px;
    vertical-align: middle;
  }

  .halo-tree > ul {
    padding-left: 0
  }

  .halo-tree ul ul {
    padding-left: 19px;
    padding-top: 10px;
  }

  .halo-tree li button.btn--floating {
    margin: 0 10px;
    width: 30px;
    height: 30px;
    padding: 3px;
  }

  .halo-tree li button i {
    color: rgb(54, 98, 130);
    height: 24px;
    width: 24px;
  }

</style>
