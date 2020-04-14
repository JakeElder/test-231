import normalizeLang from './src/utils/normalize-lang'
import i18nPath from './src/utils/i18n-path'

function getComponent(uid) {
  if (uid === 'home-page') {
    return require.resolve(`./src/templates/home-page.js`)
  }

  return require.resolve(`./src/templates/default-page.js`)
}

export async function createPages({ actions, graphql }) {
  actions.createRedirect({
    fromPath: '/',
    toPath: '/th',
    force: true
  })

  const { data } = await graphql(`
    {
      pages: allPrismicPage {
        edges {
          node {
            uid
            lang
            data {
              path
            }
          }
        }
      }
    }
  `)

  data.pages.edges.forEach(({ node }) => {
    const { uid, data } = node

    const skip = [
      '404',
      'practice-with-us',
      'connect-with-us',
      'about-piyapodok',
      'our-location'
    ]

    if (skip.includes(uid)) {
      return
    }

    const lang = normalizeLang(node.lang)
    const path = i18nPath(lang, data.path)

    actions.createPage({
      path,
      component: getComponent(uid),
      context: {
        uid,
        lang
      }
    })
  })
}
