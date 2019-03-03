const { datatypes: { isFunction }} = require('@vuepress/shared-utils')
const { getContextSingleton } = require('./contextUtil')

class Plugin {
  constructor (...args) {
    this.args = args
  }

  async init () {
    const [plugin, options, context] = this.args
    this.context = context || (await getContextSingleton())
    this.plugin = isFunction(plugin)
      ? plugin(options, this.context)
      : plugin
    return this
  }

  extendMarkdown () {
    this.plugin.extendMarkdown(this.markdown)
    return this
  }

  get markdown () {
    return this.context.markdown
  }
}

const use = (...options) => new Plugin(...options)

module.exports = {
  use,
  Plugin
}
