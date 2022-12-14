import { describe, it } from 'vitest'

import { Feed } from '../../../common/types'
import machineToMarkdown from '../../stateMachineTools/machineToMarkdown'
import writeMarkdownFile from '../../stateMachineTools/writeMarkdownFile'

import createMachineForAbonnement from './telechargerUnAbonnement.machine'

const abonnement: Feed = {
  title: 'Blog React',
  url: 'https://reactjs.org/feed.xml',
  type: 'rss',
  key: 'rss:https://reactjs.org/feed.xml',
}

describe('telecharger un abonnement - doc', () => {
  it('should generate documentation', () => {
    const markdown = machineToMarkdown(createMachineForAbonnement(abonnement))
    writeMarkdownFile(markdown, __filename)
  })
})
