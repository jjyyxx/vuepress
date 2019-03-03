import { use } from '@vuepress/test-utils/pluginTestUtils.js'
import { getFragment } from '@vuepress/test-utils/commonUtil.js'
import containerPlugin from '..'

describe('containers', async () => {
  const containerLabels = ['tip', 'tip-override', 'warning', 'danger', 'v-pre']
  const plugin = await use(containerPlugin, { type: 'tip' }).init()

  plugin.extendMarkdown()
  containerLabels.forEach(label => {
    test(label, async () => {
      const input = await getFragment(__dirname, `container-${label}`)
      const output = plugin.markdown.render(input)
      expect(output).toMatchSnapshot()
    })
  })
})
