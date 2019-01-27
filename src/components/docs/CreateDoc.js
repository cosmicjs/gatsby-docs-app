import React from 'react'
import PropTypes from 'prop-types'
import Cosmic from 'cosmicjs'
import showdown from 'showdown'

const api = Cosmic()
const converter = new showdown.Converter({ ghCompatibleHeaderId: true })

const initialState = {
  open: false,
  sectionType: 'table',
  title: '',
  table: '',
  main: '',
  fetching: false,
  error: {},
}

const sampleToc = `- [Heading](#heading)
  * [Sub-heading](#sub-heading)
    + [Sub-sub-heading](#sub-sub-heading)
- [Heading](#heading-1)
  * [Sub-heading](#sub-heading-1)
    + [Sub-sub-heading](#sub-sub-heading-1)`

const sampleContent = `Headings:
# This is a <h1> tag
## This is an <h2> tag

Italics / Bold:
*This text will be italic*
**This will be bold**

Lists:
* Item 1
  * Item 1a
1. Numbered Item 1
  1. Numbered Item 1a
`

class CreateDoc extends React.Component {
  constructor() {
    super()
    this.state = initialState
    this.toggleDocForm = this.toggleDocForm.bind(this)
    this.handleRadio = this.handleRadio.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.addDoc = this.addDoc.bind(this)
  }

  render() {
    const isActive = () => {
      if (this.state.open) {
        return ' active'
      }
      return ''
    }

    const displaySectionText = () => {
      switch (this.state.sectionType) {
        case 'table':
          return 'This is your Table of Contents, Link content with headings.'
        case 'main':
          return 'This is your Main Content'
        default:
          return 'No Section Selected'
      }
    }

    return (
      <div className={`create-doc-container${isActive()}`}>
        {this.state.successMessage
          ? <h3 className="create-doc-successMessage">{this.state.successMessage}</h3>
          : null}
        <h4 style={{ position: 'absolute', left: '50%' }}>
          {this.state.fetching ? 'loading' : null}
        </h4>
        {this.state.open ? (
          <div className="doc-form">
            <button className="close-bttn" onClick={this.toggleDocForm}>
              Cancel
            </button>
            <label className="helpertext">
              Doc Title
              <input
                className="title-input"
                name="title"
                onChange={this.handleInput}
                value={this.state.title}
                placeholder="Enter a Title"
              />
              <span>required</span>
            </label>
            <div className="content-container">
              <div className="content-info">
                <label>
                  Table of Contents
                    <input
                    type="radio"
                    name="table"
                    value="table"
                    checked={this.state.sectionType === 'table'}
                    onChange={this.handleRadio}
                  />
                </label>
                <label>
                  Main Content
                    <input
                    type="radio"
                    name="main"
                    value="main"
                    checked={this.state.sectionType === 'main'}
                    onChange={this.handleRadio}
                  />
                </label>
              </div>
              <div className="markdown-container">
                <textarea
                  className="markdown-input"
                  name={this.state.sectionType}
                  onChange={this.handleInput}
                  value={this.state[this.state.sectionType]}
                  placeholder={`${displaySectionText()} \n\n ${
                    this.state.sectionType === 'table'
                      ? sampleToc
                      : sampleContent
                    }`}
                />
                <div className="markdown-preview">
                  <h4>Preview</h4>
                  <div className="preview-layout">
                    <div
                      className={`preview-content toc${this.state.sectionType === 'table' ? ' selected' : ''}`}
                      dangerouslySetInnerHTML={{
                        __html: converter.makeHtml(this.state.table),
                      }}
                    />
                    <div
                      className={`preview-content main${this.state.sectionType === 'main' ? ' selected' : ''}`}
                      dangerouslySetInnerHTML={{
                        __html: converter.makeHtml(this.state.main)
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="submit-bttn" onClick={this.addDoc}>
              Submit
            </button>
          </div>
        ) : (
            <p className="create-doc-bttn" onClick={this.toggleDocForm}>
              Create New Doc
          </p>
          )}
      </div>
    )
  }

  toggleDocForm() {
    this.setState({ open: !this.state.open })
  }

  handleRadio(e) {
    const { value } = e.target
    this.setState({ sectionType: value })
  }

  handleInput(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  addDoc() {
    this.setState({ fetching: true })
    const { writeKey, cosmicBucket, buildhookUrl } = this.props.pageContext
    const meta = []
    const bucket = api.bucket({
      slug: cosmicBucket,
      write_key: writeKey,
    })

    if (this.state.table) {
      meta.push({
        title: 'Table of Contents',
        key: `table_of_contents`,
        type: 'markdown',
        value: this.state.table,
      })
    }

    bucket
      .addObject({
        type_slug: 'docs',
        title: this.state.title,
        content: this.state.main,
        metafields: meta,
      })
      .then(() => {
        if (buildhookUrl) {
          initialState.successMessage = 'Doc added, please wait...'
          fetch(`${buildhookUrl}`, {
            method: 'POST',
            body: {},
          }).then(() => {
            setTimeout(() => {
              window.location.reload()
            }, 40000)
          }).catch(err => {
            this.setState({ error: err })
          })
        }
        this.setState(initialState)
      })
      .catch(err => {
        this.setState({ fetching: false, error: err })
      })
  }
}

CreateDoc.propTypes = {
  pageContext: PropTypes.object,
}

export default CreateDoc
