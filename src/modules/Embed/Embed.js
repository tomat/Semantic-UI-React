import cx from 'classnames'
import React, { PropTypes } from 'react'

import {
  AutoControlledComponent as Component,
  customPropTypes,
  getElementType,
  getUnhandledProps,
  META,
  useKeyOnly,
} from '../../lib'
import Icon from '../../elements/Icon'
import EmbedEmbed from './EmbedEmbed'

const _meta = {
  name: 'Embed',
  type: META.TYPES.MODULE,
  props: {
    aspectRatio: ['4:3', '16:9', '21:9'],
    source: ['youtube', 'vimeo'],
  },
}

/**
 * An embed displays content from other websites like YouTube videos or Google Maps.
 */
export default class Embed extends Component {
  static autoControlledProps = [
    'active',
  ]

  static defaultProps = {
    icon: 'video play',
  }

  static _meta = _meta

  static propTypes = {
    /** An element type to render as (string or function). */
    as: customPropTypes.as,

    /** An embed can be active. */
    active: PropTypes.bool,

    /** An embed can specify an alternative aspect ratio. */
    aspectRatio: PropTypes.oneOf(_meta.props.aspectRatio),

    /** Primary content. */
    children: PropTypes.node,

    /** Additional classes. */
    className: PropTypes.string,

    /** Initial value of active. */
    defaultActive: PropTypes.bool,

    /** Specifies an icon to use with placeholder content. */
    icon: customPropTypes.itemShorthand,

    /** Сalled with event on Embed click with (event, props). */
    onClick: PropTypes.func,

    /** A placeholder image for embed. */
    placeholder: PropTypes.string,

    /** Specifies a source to use. */
    source: customPropTypes.every([
      customPropTypes.disallow(['sourceUrl']),
      PropTypes.oneOf(_meta.props.source),
    ]),

    /** Specifies an id for source. */
    sourceId: customPropTypes.every([
      customPropTypes.demand(['source']),
      PropTypes.string,
    ]),

    /** Settings to configure video behavior. */
    sourceSettings: customPropTypes.every([
      customPropTypes.demand(['source']),
      PropTypes.shape({
        /** Setting to true or false will force autoplay. */
        autoPlay: PropTypes.bool,

        /** Whether to show networks branded UI like title cards, or after video calls to action. */
        brandedUI: PropTypes.bool,

        /** Specifies a default chrome color with Vimeo or YouTube. */
        color: PropTypes.string,

        /** Whether to show networks branded UI like title cards, or after video calls to action. */
        hd: PropTypes.bool,
      }),
    ]),

    /** Specifies a url to use for embed. */
    sourceUrl: customPropTypes.every([
      customPropTypes.disallow(['source']),
      PropTypes.string,
    ]),
  }

  state = {}

  handleClick = (e) => {
    const { onClick } = this.props
    const { active } = this.state

    if (onClick) onClick(e, this.props)
    if (!active) this.trySetState({ active: true })
  }

  getSource() {
    const {
      source,
      sourceId,
      sourceSettings = {},
      sourceUrl,
    } = this.props
    const {
      autoPlay = true,
      brandedUI = false,
      color = '#444444',
      hd = true,
    } = sourceSettings

    if (source === 'youtube') {
      return [
        `//www.youtube.com/embed/${sourceId}`,
        '?autohide=true',
        `&amp;autoplay=${autoPlay}`,
        `&amp;color=${encodeURIComponent(color)}`,
        `&amp;hq=${hd}`,
        '&amp;jsapi=false',
        `&amp;modestbranding=${brandedUI}`,
      ].join('')
    }

    if (source === 'vimeo') {
      return [
        `//player.vimeo.com/video/${sourceId}`,
        '?api=false',
        `&amp;autoplay=${autoPlay}`,
        '&amp;byline=false',
        `&amp;color=${encodeURIComponent(color)}`,
        '&amp;portrait=false',
        '&amp;title=false',
      ].join('')
    }

    return sourceUrl
  }

  render() {
    const {
      aspectRatio,
      children,
      className,
      icon,
      placeholder,
    } = this.props
    const { active } = this.state

    const classes = cx(
      'ui',
      aspectRatio,
      useKeyOnly(active, 'active'),
      'embed',
      className,
    )
    const rest = getUnhandledProps(Embed, this.props)
    const ElementType = getElementType(Embed, this.props)

    return (
      <ElementType {...rest} className={classes} onClick={this.handleClick}>
        {Icon.create(icon)}
        {placeholder && <img className='placeholder' src={placeholder} />}

        <EmbedEmbed active={active} src={this.getSource()}>{children}</EmbedEmbed>
      </ElementType>
    )
  }
}
