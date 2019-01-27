module.exports = {
  siteMetadata: {
    title: `Gatsby Docs`,
    description: `Create and View Minimalistic Documentation, powered by Cosmic JS`,
    author: `@jacobknaack`,
  },
  plugins: [
    `gatsby-plugin-eslint`,
    `gatsby-plugin-react-helmet`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-docs`,
        short_name: `docs`,
        start_url: `/`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-source-graphql`,
      options: {
        url: `https://graphql.cosmicjs.com/v1`,
        fieldName: `docs`,
        typeName: `Doc`,
        refetchInterval: 10,
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
}
