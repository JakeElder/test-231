import React from 'react'
import { Helmet } from 'react-helmet'

import useCurrentPage from '../../hooks/use-current-page'

function Essential() {
  const page = useCurrentPage()

  return (
    <Helmet>
      <meta name="robots" content="noindex" />
      <title>{page.data.title}</title>
    </Helmet>
  )
}

function SEO() {
  return <Essential />
}

export default SEO
