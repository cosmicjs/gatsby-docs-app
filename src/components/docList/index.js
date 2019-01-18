import React from 'react'
import PropTypes from 'prop-types'
import CreateDoc from './CreateDoc.js'
import { Link } from 'gatsby'
import './_docs.scss'

function formatSlug(title) {
  return title.toLowerCase().replace(/\s/g, '-');
}

const Docs = ({ docs }) => (
  <div className="docs-container">
    {docs.map(doc => (
      <Link
        key={doc._id}
        className="docs-item"
        to={`/doc/${formatSlug(doc.title)}`}
      >
        <h2>{doc.title}</h2>
        <p>{doc.created_at}</p>
      </Link>
    ))}
    <CreateDoc />
  </div>
)

Docs.propTypes = {
  docs: PropTypes.array.isRequired,
}

export default Docs
