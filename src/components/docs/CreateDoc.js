import React from 'react'
import Cosmic from 'cosmicjs'
const api = Cosmic()

const initialState = {
  open: false,
  title: '',
  content: '',
  fetching: false,
  error: {},
}

class CreateDoc extends React.Component {
  constructor() {
    super()
    this.state = initialState
    this.toggleDocForm = this.toggleDocForm.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.addDoc = this.addDoc.bind(this)
  }

  render() {
    const isActive = () => {
      if (this.state.open) {
        return 'active'
      }
    }

    return (
      <div className={`create-doc-container ${isActive()}`}>
        <h3>{this.state.fetching ? 'fetching' : 'awaiting'}</h3>
        {this.state.open
          ? <div className="doc-form">
            <button onClick={this.toggleDocForm}>Close</button>
            <input
              className="title-input"
              name="title"
              onChange={this.handleInput}
              value={this.state.title}
              placeholder="Enter a Title"
            />
            <textarea
              className="content-input"
              name="content"
              onChange={this.handleInput}
              value={this.state.content}
              placeholder="Place Content Here..."
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

  handleInput(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  addDoc() {
    this.setState({ fetching: true })
    const bucket = api.bucket({
      slug: 'gatsby-docs',
      write_key: `${process.env.GATSBY_COSMIC_JS_WRITE_ACCESS_KEY}`
    })

    bucket.addObject({
      type_slug: 'docs',
      title: this.state.title,
      content: this.state.content,
    }).then(() => {
      this.setState({ fetching: false, success: true, open: false })
    }).catch(err => {
      this.setState({ fetching: false, error: err })
    })
  }
}

export default CreateDoc