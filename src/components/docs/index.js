import React from 'react'
import PropTypes from 'prop-types'
import showdown from 'showdown'

import CreateDoc from './CreateDoc.js'
import { Link } from 'gatsby'
import './_docs.scss'

const converter = new showdown.Converter()

function formatSlug(title) {
  return title.toLowerCase().replace(/[^a-zA-Z ]/g, "").replace(/\s/g, '-')
}

function formatDate(dateString) {
  const date = new Date(dateString)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const hh = date.getHours()
  let minutes = date.getMinutes()
  let hour = hh
  let dayTime = 'AM'
  if (hour >= 12) {
    hour = hh - 12
    dayTime = 'PM'
  }
  if (hour == 0) {
    hour = 12
  }

  minutes = minutes < 10 ? '0' + minutes : minutes

  return `${
    months[date.getMonth()]
    } ${date.getDate()}, at ${hour}:${minutes} ${dayTime}`
}

const Docs = ({ docs, pageContext }) => (
  <div className="docs-container">
    <CreateDoc pageContext={pageContext} />
    <div className="docs-list">
      {docs.map(doc => (
        <Link
          key={doc._id}
          to={`/doc/${formatSlug(doc.title)}`}
          className="docs-item"
        >
          <p className="doc-date">{formatDate(doc.created_at)}</p>
          <h2 className="doc-title">{doc.title}</h2>
          <div
            className="doc-preview"
            dangerouslySetInnerHTML={{ __html: converter.makeHtml(doc.content) }}
          />
        </Link>
      ))}
    </div>
  </div>
)

Docs.propTypes = {
  docs: PropTypes.array.isRequired,
  pageContext: PropTypes.object,
}

export default Docs
