import React from 'react'
import Cosmic from 'cosmicjs'
const api = Cosmic()

const initialState = {
  open: false,
  sectionType: 'table',
  title: '',
  table: '',
  main: '',
  fetching: false,
  error: {},
}

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
          return "Add a Table of Contents"
        case "main":
          return "Add your Main Content"
        default:
          return "No Section Selected"
      }
    }

    return (
      <div className={`create-doc-container${isActive()}`}>
        <h4>{this.state.fetching ? 'loading' : null}</h4>
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
            <div className="sectionSelector">
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
            <h4>{displaySectionText()}</h4>
            <textarea
              className="markdown-input"
              name={this.state.sectionType}
              onChange={this.handleInput}
              value={this.state[this.state.sectionType]}
              placeholder="Place Markdown Here..."
            />
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