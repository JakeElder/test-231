import { useStaticQuery, graphql } from 'gatsby'
import camelcaseKeys from 'camelcase-keys'

import normalizeLang from '../utils/normalize-lang'

function useWIPBlock(lang) {
  const data = useStaticQuery(graphql`
    query WIPBlockQuery {
      blocks: allPrismicWipblock {
        edges {
          node {
            lang
            data {
              author
              primary_copy {
                html
              }
              secondary_copy {
                html
              }
              quote
            }
          }
        }
      }
    }
  `)

  const blocks = data.blocks.edges.reduce((acc, cur) => {
    const curBlockLang = normalizeLang(cur.node.lang)
    return {
      ...acc,
      [curBlockLang]: camelcaseKeys(cur.node.data)
    }
  }, {})

  const block = blocks[lang]

  return block
}

export default useWIPBlock
