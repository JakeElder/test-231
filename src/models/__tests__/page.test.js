import normalizePage from '../page'
import homePageData from '../__fixtures__/home-page.json'

describe('normalizePage', () => {
  test('It converts graphQL response to expected format', () => {
    expect(normalizePage(homePageData.data.prismicPage)).toEqual({
      uid: 'home-page',
      lang: 'en',
      datePublished: '2020-02-28T09:40:24+0000',
      dateModified: '2020-03-26T14:56:54+0000',
      data: {
        title: {
          html: '<h1>Welcome to Piyapodok</h1>',
          text: 'Welcome to Piyapodok'
        },
        path: '',
        i18nPath: '/en',
        breadcrumbText: 'Home',
        segue: {
          html:
            '<p>Piyapodok Dhammastan is a buddhist temple based in the serene outskirts of Chiang Mai.</p><p>We invite you to practice with us.</p>',
          text:
            'Piyapodok Dhammastan is a buddhist temple based in the serene outskirts of Chiang Mai. We invite you to practice with us.'
        },
        description: {
          html:
            '<p>Piyapodok Dhammastan is a multi cultured community of people that share a common goal. To make the world a happier, kinder place through mindfulness, meditation and collaborating on projects that enrich our society.</p>',
          text:
            'Piyapodok Dhammastan is a multi cultured community of people that share a common goal. To make the world a happier, kinder place through mindfulness, meditation and collaborating on projects that enrich our society.'
        },
        microDescription: {
          html: null,
          text: null
        },
        footerLinkText: 'Home'
      },
      narrowHero: {
        type: 'image',
        alt: 'A statue of a white Buddha in a peaceful garden',
        data: expect.objectContaining({
          anchorX: expect.any(String),
          showCTAContrastGradient: true,
          image: expect.objectContaining({
            localFile: expect.objectContaining({
              publicURL:
                '/static/fd47a706-5856-435d-b9c4-6a474dadc135_IMG_5794-160b836b98de5221e6fad822d168b12c.jpg',
              childImageSharp: expect.objectContaining({
                fluid: expect.objectContaining({
                  src: expect.any(String)
                })
              })
            })
          })
        })
      },
      wideHero: expect.any(Object),
      cardHero: null,
      ogManifest: {
        data: {
          title: 'Piyapodok Dhammastan',
          description: 'A center for mindfulness.'
        },
        image: {
          alt: 'Piyapodok Dhammastan. A center for mindfulness.',
          dimensions: {
            height: 1256,
            width: 2400
          },
          data: {
            publicURL:
              'https://images.prismic.io/piyapodok/795e7f2f-4ac7-4969-94dc-cd98557dab28_home-page-og-image.jpg?h=1256&rect=0%2C0%2C2400%2C1256&w=2400'
          }
        }
      }
    })
  })
})
