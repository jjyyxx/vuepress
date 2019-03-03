import { fs, path } from '@vuepress/shared-utils'
import LRU from 'lru-cache'

const cache = new LRU({ max: 1000 })

async function getFragment (dirname, name) {
  let content = cache.get(name)
  if (content) {
    return content
  }
  const target = path.resolve(dirname, `fragments/${name}.md`)
  content = await fs.readFile(target, 'utf-8')
  cache.set(name, content)
  return content
}

module.exports = {
  getFragment
}
