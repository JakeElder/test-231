import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import qs from 'qs'

import LoadingPage from './LoadingPage'

import * as session from '../services/session'
import * as token from '../services/token'

function IndexPage({ location }) {
  const { token: newToken } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  })
  const existingToken = token.current()

  useEffect(() => {
    if (newToken) {
      session.checkToken(newToken).then(isValid => {
        token.set(isValid ? newToken : null)
        navigate('/', { push: true })
      })
    } else if (existingToken) {
      session.checkToken(existingToken).then(isValid => {
        navigate(isValid ? '/introduction' : '/test-unavailable')
      })
    } else {
      navigate('/test-unavailable')
    }
  }, [location.pathname, existingToken, newToken])

  return <LoadingPage />
}

export default IndexPage
