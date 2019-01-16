require("dotenv").config();
/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions

  if (page.path.match(/^\/doc/)) {
    page.matchPath = "/doc/*"
    createPage(page)
  }

  deletePage(page)
  createPage({
    ...page,
    context: {
      readKey: `${process.env.GATSBY_COSMIC_JS_READ_ACCESS_KEY}`,
      title: "showdown",
    }
  })
}

// exports.createPage = () => { }

// You can delete this file if you're not using it
