import React from 'react'
import { Helmet } from 'react-helmet'

import useI18n from '../../hooks/use-i18n'
import useCurrentPage from '../../hooks/use-current-page'
import useSiteMetadata from '../../hooks/use-site-metadata'
import usePage from '../../hooks/use-page'

import langToFBLocale from '../../adapters/lang-to-fb-locale'

function WebPage() {
  const page = useCurrentPage()
  const siteMetadata = useSiteMetadata()

  const creator = {
    '@type': 'Organization',
    name: 'Mindful Studio',
    url: 'http://mindfulstudio.io'
  }

  const data = {
    '@context': 'http://schema.org',
    '@type': 'WebPage',
    inLanguage: page.lang,
    headline: page.data.title.text,
    url: `${siteMetadata.url}${page.data.i18nPath}`,
    datePublished: page.datePublished,
    dateModified: page.dateModified,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      contentUrl: `${siteMetadata.url}${page.narrowHero.data.publicURL}`,
      datePublished: page.narrowHero.datePublished,
      name: page.narrowHero.alt,
      creator
    },
    creator
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}

function Facebook() {
  const page = useCurrentPage()
  const i18n = useI18n(page.lang)
  const siteMetadata = useSiteMetadata()

  const url = `${siteMetadata.url}${page.data.i18nPath}`
  const image = `${siteMetadata.url}${page.ogManifest.image.data.publicURL}`
  const alt = page.ogManifest.image.alt

  return (
    <Helmet>
      <meta property="og:site_name" content={i18n.piyapodokDhammastan} />
      <meta property="og:locale" content={langToFBLocale(page.lang)} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={page.ogManifest.data.title} />
      <meta
        property="og:description"
        content={page.ogManifest.data.description}
      />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={alt} />
      <meta
        property="og:image:width"
        content={page.ogManifest.image.dimensions.width}
      />
      <meta
        property="og:image:height"
        content={page.ogManifest.image.dimensions.height}
      />
    </Helmet>
  )
}

function Essential() {
  const page = useCurrentPage()
  const i18n = useI18n(page.lang)

  return (
    <Helmet>
      <html lang={page.lang} />
      <title>
        {page.data.title.text} :: {i18n.piyapodokDhammastan}
      </title>
      <meta name="description" content={page.data.description.text} />
    </Helmet>
  )
}

function BreadcrumbList() {
  const page = useCurrentPage()
  const homePage = usePage('home-page', page.lang)
  const siteMetadata = useSiteMetadata()

  const baseItemListElement = [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@id': `${siteMetadata.url}${homePage.data.i18nPath}`,
        name: homePage.data.title.text
      }
    }
  ]

  const itemListElement =
    page.uid === 'home-page'
      ? baseItemListElement
      : [
          ...baseItemListElement,
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@id': `${siteMetadata.url}${page.data.i18nPath}`,
              name: page.data.title.text
            }
          }
        ]

  const data = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Helmet>
  )
}

function ConditionalNoIndex() {
  if (process.env.NODE_ENV !== 'production') {
    return (
      <Helmet>
        <meta name="robots" content="noindex" />
      </Helmet>
    )
  }
  return null
}

function SEO() {
  const { uid } = useCurrentPage()

  if (uid === '404') {
    return null
  }

  return (
    <>
      <ConditionalNoIndex />
      <Essential />
      <WebPage />
      <BreadcrumbList />
      <Facebook />
    </>
  )
}

export default SEO
