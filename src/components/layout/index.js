import React from 'react'
import PropTypes from 'prop-types'
import { StaticQuery, graphql } from 'gatsby'

import Header from '../header'
import './_layout.scss'

const Layout = ({ children, selectedDoc }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <>
        <Header
          siteTitle={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
          doc={selectedDoc}
        />
        <div
          style={{
            margin: `10px auto 0 auto`,
            maxWidth: 1400,
            height: `calc(100vh - 185px)`,
            padding: `0px 1.0875rem 1.45rem`,
            paddingTop: 0,
          }}
        >
          {children}
          <footer id="footer">
            © {new Date().getFullYear()}, Built with
            {` `}
            <a
              href="https://www.gatsbyjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Gatsby
            </a>
            {' & proudly powered by '}
            <a
              href="https://cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Cosmic JS
            </a>
          </footer>
        </div>
      </>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  selectedDoc: PropTypes.object,
}

export default Layout
