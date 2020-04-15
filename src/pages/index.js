import React from 'react'
import queryString from 'query-string'

import LoadingPage from '../components/LoadingPage.js'

function IndexPage({ location }) {
  const { token } = queryString.parse(location.search)
  return <LoadingPage token={token} />
}

export default IndexPage
