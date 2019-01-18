require("dotenv").config();
const path = require('path');
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  deletePage(page)
  createPage({
    ...page,
    context: {
      readKey: `${process.env.GATSBY_COSMIC_JS_READ_ACCESS_KEY}`,
    }
  })
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const docTemplate = path.resolve(`src/templates/docPage.js`)

    resolve(
      graphql(`
        query {
          docs {
            objectsByType(bucket_slug: "gatsby-docs", type_slug: "docs", read_key: "${process.env.GATSBY_COSMIC_JS_READ_ACCESS_KEY}") {
              title
            }
          }
        }
      `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        result.data.docs.objectsByType.forEach(doc => {
          let slug = doc.title.toLowerCase().replace(/\s/g, '-')
          createPage({
            path: `/doc/${slug}`,
            component: docTemplate,
            context: {
              readKey: `${process.env.GATSBY_COSMIC_JS_READ_ACCESS_KEY}`,
              title: slug,
            }
          })
        })
      })
    )
  })
}

// You can delete this file if you're not using it
