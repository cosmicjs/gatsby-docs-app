import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle, description }) => (
  <div
    style={{
      backgroundColor: '#663399',
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <p
        style={{
          color: '#ffffff',
          fontSize: '120%',
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
