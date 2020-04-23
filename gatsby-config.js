const siteUrl = (() => {
  if (process.env.NODE_ENV === 'production') {
    if (process.env.NOW_GITHUB_DEPLOYMENT) {
      return process.env.NOW_GITHUB_COMMIT_REF === 'master'
        ? 'https://cmu.run'
        : 'https://stage.cmu.run'
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
        name: `Test 231`,
        short_name: `Test 231`,
        start_url: `/`,
        display: `minimal-ui`
      }
    },
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true
      }
    }
  ]
}

if (addGAPlugin) {
  config.plugins.push({
    resolve: `gatsby-plugin-google-analytics`,
    options: {
      trackingId: 'UA-141661441-4'
    }
  })
}

module.exports = config
