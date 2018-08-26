export default class TreeStore {
  constructor(options) {
    for (let option in options) {
      if (options.hasOwnProperty(option)) {
        this[option] = options[option]
      }
    }
    this.datas = new Map()
    const _traverseNodes = (root) => {
      for (let node of root) {
        this.datas.set(node.key, node)
        if (node.children && node.children.length > 0) _traverseNodes(node.children)
      }
    }
    _traverseNodes(this.root)
  }
}
