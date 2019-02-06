import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'
import util from '../../util.js'
import logo from '../../images/gd-logo.svg'
import './_header.scss'

const Header = ({ siteTitle, description, doc }) => {
  let docDate = {}
  if (doc) {
    docDate = util.formatDate(doc.created_at)
  }
  return (
    <div className="header-container">
      <div className="header-content">
        <div className={`site-meta${doc ? " doc" : ""}`}>
          <div style={{ margin: 0, height: '75px', width: "300px" }}>
            <Link
              to="/"
              className="site-title"
            >
              <img className="header-logo" src={logo} />
              {doc ? "" : siteTitle}
            </Link>
          </div>
          <p className="site-description">
            {description}
          </p>
        </div>
        {doc ? (
          <div className="doc-meta">
            <h1 className="doc-title">{doc.title}</h1>
            <p className="doc-date">{`Created on ${docDate.month} ${docDate.date}, ${docDate.year} at ${docDate.hour}:${docDate.minutes} ${docDate.dayTime}`}</p>
          </div>
        ) : null}
      </div>
    </div>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
  description: PropTypes.string,
  doc: PropTypes.object,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
