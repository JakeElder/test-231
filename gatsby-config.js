require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
})

const siteUrl = (() => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.NOW_GITHUB_DEPLOYMENT) {
      return process.env.NOW_GITHUB_COMMIT_REF === 'master'
        ? 'https://piyapodok.org'
        : 'https://stage.piyapodok.org'
    }
    return 'http://localhost:9000'
  }
  return 'http://localhost:8000'
})()

const addGAPlugin =
  process.env.NODE_ENV === 'production' &&
  process.env.NOW_GITHUB_COMMIT_REF === 'master'

const config = {
  siteMetadata: {
    url: siteUrl,
    siteUrl
  },
  plugins: [
    `gatsby-plugin-remove-generator`,
    `gatsby-plugin-zeit-now`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-image`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@jakeelder/gatsby-source-prismic`,
      options: {
        repositoryName: `piyapodok`,
        accessToken: `${process.env.API_KEY}`,
        linkResolver: () => {}
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        icon: `src/images/favicon.svg`,
        name: `Piyapodok`,
        short_name: `Piyapodok`,
        start_url: `/`,
        display: `minimal-ui`
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`,
      options: {
        exclude: ['/']
      }
    }
  ]
}

if (addGAPlugin) {
  config.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: 'UA-141661441-3'
    }
  })
}

module.exports = config
