import faker from 'faker'
import React from 'react'

import EmbedEmbed from 'src/modules/Embed/EmbedEmbed'
import * as common from 'test/specs/commonTests'

describe('EmbedEmbed', () => {
  common.rendersChildren(EmbedEmbed, {
    requiredProps: { active: true },
  })

  describe('active', () => {
    it('renders nothing when false', () => {
      shallow(<EmbedEmbed />).should.be.blank()
    })
  })

  describe('src', () => {
    it('renders iframe inside div', () => {
      shallow(<EmbedEmbed active src={faker.internet.url()} />)
        .find('div')
        .children().first()
        .should.have.tagName('iframe')
    })
  })
})
