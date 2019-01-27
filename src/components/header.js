import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle, description }) => (
  <div>
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 1200,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `#0481ff`,
            textDecoration: `none`,
            fontFamily: 'Roboto',
            fontWeight: 200,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <p
        style={{
          color: '#188bff',
          fontSize: '120%',
          fontFamily: 'Roboto',
          fontWeight: 100,
        }}
      >
        {description}
      </p>
    </div>
  </div>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  description: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
