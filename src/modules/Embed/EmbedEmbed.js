import React, { PropTypes } from 'react'
import { customPropTypes, META } from '../../lib'

/**
 * A frame sub-component for the Embed.
 */
function EmbedEmbed(props) {
  const { active, children, src } = props

  if (!active) return null
  if (children) return <div className='embed'>{children}</div>

  return (
    <div className='embed'>
      <iframe
        allowFullScreen=''
        frameBorder='0'
        height='100%'
        scrolling='no'
        src={src}
        width='100%'
      />
    </div>
  )
}

EmbedEmbed._meta = {
  name: 'EmbedFrame',
  type: META.TYPES.MODULE,
  parent: 'Embed',
}

EmbedEmbed.propTypes = {
  /** An embed can be active. */
  active: PropTypes.bool,

  /** Primary content. */
  children: customPropTypes.every([
    customPropTypes.disallow(['src']),
    PropTypes.node,
  ]),

  /** Specifies a url to use for iframe. */
  src: customPropTypes.every([
    customPropTypes.disallow(['children']),
    PropTypes.string,
  ]),
}

export default EmbedEmbed
