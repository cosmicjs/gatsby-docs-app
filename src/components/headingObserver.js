import React from 'react'
import PropTypes from 'prop-types'

import { InView } from 'react-intersection-observer'

const HeadingObserver = ({ section }) => {
  return (
    <InView>
      <div
        className="doc-main-chunk"
        dangerouslySetInnerHTML={{ __html: section }}
      />
    </InView>
  )
}

HeadingObserver.propTypes = {
  section: PropTypes.string.isRequired,
}

export default HeadingObserver
