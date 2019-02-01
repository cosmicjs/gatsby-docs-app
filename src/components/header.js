import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle, description }) => (
  <div>
    <div
      style={{
        margin: `0 auto`,
        width: `100vw`,
        padding: `1.45rem 15%`,
        boxShadow: `0 4px 2px -2px black`,
        backgroundColor: `#ffffff`,
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
          color: `#188bff`,
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
