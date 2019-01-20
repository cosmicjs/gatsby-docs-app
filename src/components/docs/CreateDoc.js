import React from 'react'
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

const sampleTOC = `- [Heading](#heading)
  * [Sub-heading](#sub-heading)
    + [Sub-sub-heading](#sub-sub-heading)
- [Heading](#heading-1)
  * [Sub-heading](#sub-heading-1)
    + [Sub-sub-heading](#sub-sub-heading-1)
- [Heading](#heading-2)
  * [Sub-heading](#sub-heading-2)
    + [Sub-sub-heading](#sub-sub-heading-2)`

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
        case "table":
          return "This is your Table of Contents, Link content with headings."
        case "main":
          return "This is your Main Content"
        default:
          return "No Section Selected"
      }
    }

    return (
      <div className={`create-doc-container${isActive()}`}>
        <h4 style={{ position: 'absolute', left: '50%' }}>{this.state.fetching ? 'loading' : null}</h4>
        {this.state.open
          ? <div className="doc-form">
            <button
              className="close-bttn"
              onClick={this.toggleDocForm}
            >
              Close
            </button>
            <input
              className="title-input"
              name="title"
              onChange={this.handleInput}
              value={this.state.title}
              placeholder="Enter a Title"
            />
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
                <h4>{displaySectionText()}</h4>
              </div>
              <div className="markdown-container">
                <textarea
                  className="markdown-input"
                  name={this.state.sectionType}
                  onChange={this.handleInput}
                  value={this.state[this.state.sectionType]}
                  placeholder={`Place Markdown Here... \n\n ${this.state.sectionType === 'table' ? sampleTOC : sampleContent}`}
                />
                <label className="markdown-preview">
                  Preview
                  <div
                    className="preview-content"
                    dangerouslySetInnerHTML={{ __html: converter.makeHtml(this.state[this.state.sectionType]) }} />
                </label>
              </div>
            </div>
            <button
              className="submit-bttn"
              onClick={this.addDoc}
            >Submit</button>
          </div>
          : <p
            className="create-doc-bttn"
            onClick={this.toggleDocForm}
          >
            Create New Doc
          </p>}
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
    const meta = []
    const bucket = api.bucket({
      slug: 'gatsby-docs',
      write_key: `${process.env.GATSBY_COSMIC_JS_WRITE_ACCESS_KEY}`
    })

    if (this.state.table) {
      meta.push({
        "title": "Table of Contents",
        "key": `table_of_contents`,
        "type": "markdown",
        "value": this.state.table,
      })
    }

    bucket.addObject({
      type_slug: 'docs',
      title: this.state.title,
      content: this.state.main,
      metafields: meta,
    }).then(() => {
      this.setState({ fetching: false, success: true, open: false })
    }).catch(err => {
      this.setState({ fetching: false, error: err })
    })
  }
}

export default CreateDoc