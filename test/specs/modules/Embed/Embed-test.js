import faker from 'faker'
import React from 'react'

import Embed from 'src/modules/Embed/Embed'
import EmbedEmbed from 'src/modules/Embed/EmbedEmbed'
import * as common from 'test/specs/commonTests'
import { sandbox } from 'test/utils'

describe('Embed', () => {
  common.isConformant(Embed)
  common.hasSubComponents(Embed[EmbedEmbed])
  common.hasUIClassName(Embed)

  common.propKeyOnlyToClassName(Embed, 'active')
  common.propValueOnlyToClassName(Embed, 'aspectRatio')

  common.implementsIconProp(Embed)

  describe('active', () => {
    it('defaults to false', () => {
      shallow(<Embed />)
        .should.have.not.state('active')
    })

    it('passes to state', () => {
      shallow(<Embed active />)
        .should.have.state('active', true)
    })
  })

  describe('defaultActive', () => {
    it('sets the initial active state', () => {
      const value = faker.random.boolean()

      shallow(<Embed defaultActive={value} />)
        .should.have.state('active', value)
    })
  })

  describe('onClick', () => {
    it('omitted when not defined', () => {
      const click = () => shallow(<Embed />).simulate('click')
      expect(click).to.not.throw()
    })

    it('is called with (event, props) on click', () => {
      const spy = sandbox.spy()
      const event = { target: null }
      const props = { active: faker.random.boolean() }

      mount(<Embed onClick={spy} {...props} />)
        .simulate('click', event)

      spy.should.have.been.calledOnce()
      spy.should.have.been.calledWithMatch(event, props)
    })

    it('updates state', () => {
      const wrapper = mount(<Embed />)

      wrapper.simulate('click')
      wrapper.should.have.state('active', true)
    })
  })

  describe('placeholder', () => {
    it('omitted by default', () => {
      shallow(<Embed />)
        .find('img.placeholder')
        .should.have.length(0)
    })

    it('renders img when defined', () => {
      const url = faker.image.imageUrl()

      shallow(<Embed placeholder={url} />)
        .should.contain(<img className='placeholder' src={url} />)
    })
  })

  describe('source', () => {
    it('generates url for YouTube', () => {
      const sourceId = faker.random.word()

      shallow(<Embed active source='youtube' sourceId={sourceId} />)
        .find(EmbedEmbed)
        .should.have
        .prop('src')
        .contain(`//www.youtube.com/embed/${sourceId}`)
    })

    it('generates url for Vimeo', () => {
      const sourceId = faker.random.word()

      shallow(<Embed active source='vimeo' sourceId={sourceId} />)
        .find(EmbedEmbed)
        .should.have
        .prop('src')
        .contain(`//player.vimeo.com/video/${sourceId}`)
    })
  })

  describe('sourceUrl', () => {
    it('passes url for EmbedEmbed', () => {
      const url = faker.internet.url()

      shallow(<Embed active sourceUrl={url} />)
        .find(EmbedEmbed)
        .should.have.prop('src', url)
    })
  })
})
