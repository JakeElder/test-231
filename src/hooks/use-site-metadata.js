import { useStaticQuery, graphql } from 'gatsby'

function useSiteMetadata() {
  const data = useStaticQuery(graphql`
    query siteMetadataQuery {
      site {
        buildTime
        siteMetadata {
          url
        }
      }
    }
  `)

  return {
    buildTime: data.site.buildTime,
    url: data.site.siteMetadata.url
  }
}

export default useSiteMetadata
