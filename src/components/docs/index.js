import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'gatsby'
import util from '../../util.js'
import './_docs.scss'

const Docs = ({ docs }) => (
  <div className="docs-container">
    <div className="docs-list">
      {docs.map(doc => {
        const date_created = util.formatDate(doc.created_at)
        return (
          <Link
            key={doc._id}
            to={`/doc/${util.formatSlug(doc.title)}`}
            className="docs-item"
          >
            <div className="date-container">
              <h3 className="date-yearMonthDate">{`${date_created.month} ${
                date_created.date
                }, ${date_created.year}`}</h3>
              <p className="date-timeDayTime">{`at ${date_created.hour}:${
                date_created.minutes
                } ${date_created.dayTime}`}</p>
            </div>
            <h2 className="doc-title">{doc.title}</h2>
            <div
              className="doc-preview"
              dangerouslySetInnerHTML={{
                __html: doc.content,
              }}
            />
          </Link>
        )
      })}
    </div>
  </div>
)

Docs.propTypes = {
  docs: PropTypes.array.isRequired,
  pageContext: PropTypes.object,
}

export default Docs
