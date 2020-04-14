import { useMemo } from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { get } from 'lodash/fp'
import update from 'react-addons-update'

import normalizePage from '../models/page'

function usePage(uid, lang) {
  const data = useStaticQuery(graphql`
    fragment HeroImageData on PrismicPage {
      data {
        body {
          ... on PrismicPageBodyNarrowHeroImage {
            slice_type
            primary {
              anchor_x
              show_cta_contrast_gradient
              image {
                document {
                  first_publication_date
                  data {
                    image {
                      alt
                      Narrow {
                        dimensions {
                          width
                          height
                        }
                        localFile {
                          publicURL
                          childImageSharp {
                            fluid(quality: 90, maxWidth: 1200) {
                              ...GatsbyImageSharpFluid_withWebp
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          ... on PrismicPageBodyWideHeroImage {
            slice_type
            primary {
              image {
                document {
                  first_publication_date
                  data {
                    image {
                      Wide {
                        localFile {
                          childImageSharp {
                            fluid(quality: 90, maxWidth: 3840) {
                              ...GatsbyImageSharpFluid_withWebp
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              anchor_x
              use_dark_ctas
            }
          }
          ... on PrismicPageBodyCardHeroImage {
            slice_type
            primary {
              image {
                document {
                  first_publication_date
                  data {
                    image {
                      Card {
                        localFile {
                          childImageSharp {
                            fluid(quality: 90, maxWidth: 580) {
                              ...GatsbyImageSharpFluid_withWebp
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              anchor_x
            }
          }
        }
      }
    }

    query PageQuery {
      pages: allPrismicPage(sort: { order: ASC, fields: uid }) {
        edges {
          node {
            uid
            lang
            first_publication_date
            last_publication_date
            data {
              breadcrumb_text
              title {
                text
              }
              path

              description {
                html
                text
              }
              micro_description {
                html
              }
              segue {
                html
              }
              footer_link_text
              body {
                ... on PrismicPageBodyOgManifest {
                  id
                  slice_type
                  primary {
                    og_description
                    og_title
                    og_image {
                      localFile {
                        publicURL
                      }
                      alt
                      dimensions {
                        width
                        height
                      }
                    }
                  }
                }
              }
            }
            ...HeroImageData
          }
        }
      }
    }
  `)

  const pages = useMemo(() => {
    return data.pages.edges.reduce(
      (acc, cur) => {
        const page = normalizePage(cur.node)

        return update(acc, {
          [page.lang]: {
            $merge: {
              [page.uid]: page
            }
          }
        })
      },
      { en: {}, th: {} }
    )
  }, [data.pages.edges])

  const page = pages |> get([lang, uid])

  return page
}

export default usePage
