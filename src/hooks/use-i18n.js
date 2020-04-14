import { useStaticQuery, graphql } from 'gatsby'
import camelcaseKeys from 'camelcase-keys'

import logoSrcEn from '../images/logo.en.svg'
import logoSrcTh from '../images/logo.th.svg'

import logoLightSrcEn from '../images/logo-light.en.svg'
import logoLightSrcTh from '../images/logo-light.th.svg'

function useI18n(lang) {
  const data = useStaticQuery(graphql`
    query I18nQuery {
      i18n: allPrismicI18N(sort: { order: ASC, fields: lang }) {
        edges {
          node {
            lang
            data {
              contact_us
              copyright
              english__locale_
              facebook
              find_out_more
              find_us
              our_location
              google
              instagram
              learn_more
              practice_with_us
              thai__locale_
              piyapodok_dhammastan
              practice_with_us__fragment_
              our_plan__fragment_
              about_piyapodok__fragment_
            }
          }
        }
      }
      links: allPrismicLinks(sort: { order: ASC, fields: lang }) {
        edges {
          node {
            data {
              facebook {
                url
              }
              google {
                url
              }
              instagram {
                url
              }
              contact_us {
                url
              }
            }
          }
        }
      }
    }
  `)

  const i18n = {
    en: {
      ...camelcaseKeys(data.i18n.edges[0].node.data),
      images: {
        logo: logoSrcEn,
        logoLight: logoLightSrcEn
      },
      links: camelcaseKeys(data.links.edges[0].node.data)
    },
    th: {
      ...camelcaseKeys(data.i18n.edges[1].node.data),
      images: {
        logo: logoSrcTh,
        logoLight: logoLightSrcTh
      },
      links: camelcaseKeys(data.links.edges[1].node.data)
    }
  }

  return i18n[lang]
}

export default useI18n
