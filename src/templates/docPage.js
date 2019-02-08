import React from 'react'
import showdown from 'showdown'
import PropTypes from 'prop-types'
import Layout from '../components/layout'
import SEO from '../components/seo.js'
import { graphql, Link } from 'gatsby'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import './_docPage.scss'

const converter = new showdown.Converter({ ghCompatibleHeaderId: true })

class DocPage extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      Doc: props.data.docs.object,
    }
  }

  componentDidMount() {
    hljs.initHighlighting()
  }

  componentWillUnmount() {
    hljs.initHighlighting.called = false
  }

  render() {
    let toc
    let doc
    for (const i in this.state.Doc.metafields) {
      if (this.state.Doc.metafields[i].key === 'table_of_contents') {
        toc = this.state.Doc.metafields[i].value
      }
      if (this.state.Doc.metafields[i].key === 'documentation') {
        doc = this.state.Doc.metafields[i].value
      }
    }
    return (
      <Layout selectedDoc={this.state.Doc}>
        <SEO
          title={this.state.Doc.title}
          keywords={[`${this.state.Doctitle}`, 'gatsby', 'documentation']}
        />
        <div className="doc-container">
          <div className="toc-container">
            <div className="back-bttn">
              <i className="arrow left" />
              <Link to="/">Back To List</Link>
            </div>
            <div
              className="doc-toc"
              dangerouslySetInnerHTML={{ __html: converter.makeHtml(toc) }}
            />
          </div>
          <div
            className="doc-main"
            dangerouslySetInnerHTML={{ __html: converter.makeHtml(doc) }}
          />
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
  query($cosmicBucket: String!, $title: String!, $readKey: String!) {
    docs {
      object(bucket_slug: $cosmicBucket, slug: $title, read_key: $readKey) {
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
