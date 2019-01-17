import React from 'react'
import showdown from 'showdown'
import PropTypes from 'prop-types'
import Layout from '../components/layout.js'
import { graphql } from 'gatsby'

const converter = new showdown.Converter()

const DocPage = ({ data }) => {
  return (
    <Layout>
      <div
        className="doc-container"
        dangerouslySetInnerHTML={{ __html: converter.makeHtml(data.docs.object.content) }}
      />
    </Layout>
  )
}

export const query = graphql`
  query($title: String!, $readKey: String!) {
    docs {
      object(bucket_slug: "gatsby-docs", slug: $title, read_key: $readKey) {
        title
        content
        created_at
        _id
      }
    }
  }
`

DocPage.propTypes = {
  data: PropTypes.object,
  title: PropTypes.string,
}

export default DocPage
