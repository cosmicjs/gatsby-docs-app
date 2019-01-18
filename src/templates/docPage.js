import React from 'react'
import showdown from 'showdown'
import PropTypes from 'prop-types'
import Layout from '../components/layout.js'
import SEO from '../components/seo.js'
import { graphql } from 'gatsby'

const converter = new showdown.Converter()

const DocPage = ({ data }) => {
  const Doc = data.docs.object
  if (!Doc) {
    window.location = '/'
  }

  let toc = {}
  for (const i in Doc.metafields) {
    if (Doc.metafields[i].key === "table_of_contents") {
      toc = Doc.metafields[i].value
    }
  }

  return (
    <Layout>
      <SEO title={data.docs.object.title} keywords={[`${data.docs.object.title}`, 'gatsby', 'documentation']} />
      <div className="doc-container">
        <div
          className="doc-toc"
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(toc) }}
        />
        <div
          className="doc-main"
          dangerouslySetInnerHTML={{ __html: converter.makeHtml(Doc.content) }}
        />
      </div>
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
        metafields {
          key
          value
        }
      }
    }
  }
`

DocPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default DocPage
