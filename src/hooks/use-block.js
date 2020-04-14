import { useStaticQuery, graphql } from 'gatsby'
import camelcaseKeys from 'camelcase-keys'
import { get } from 'lodash/fp'

import normalizeLang from '../utils/normalize-lang'

function useBlock(uid, lang) {
  const data = useStaticQuery(graphql`
    query BlockQuery {
      blocks: allPrismicBlock {
        edges {
          node {
            uid
            lang
            data {
              cta_copy
              heading {
                text
              }
              primary_copy {
                html
              }
              secondary_copy {
                html
              }
              images {
                image {
                  localFile {
                    childImageSharp {
                      fluid(quality: 90, maxWidth: 1000) {
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
  `)

  const blocks = data.blocks.edges.reduce((acc, cur) => {
    const curBlockLang = normalizeLang(cur.node.lang)
    const langObject = acc[curBlockLang] || {}
    return {
      ...acc,
      [curBlockLang]: {
        ...langObject,
        [cur.node.uid]: camelcaseKeys(cur.node.data)
      }
    }
  }, {})

  const block = blocks |> get([lang, uid])

  return block
}

export default useBlock
