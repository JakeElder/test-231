import React, { useEffect } from 'react'
import { navigate } from 'gatsby'
import qs from 'qs'

import LoadingPage from './LoadingPage'

import useToken from '../hooks/use-token'
import * as session from '../services/session'

function IndexPage({ location }) {
  const { token: existingToken, set: setToken } = useToken()
  const { token: newToken } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  })

  useEffect(() => {
    if (newToken) {
      session.checkToken(newToken).then(isValid => {
        setToken(isValid ? newToken : null)
        navigate('/', { push: true })
      })
    } else if (existingToken) {
      session.checkToken(existingToken).then(isValid => {
        navigate(isValid ? '/introduction' : '/test-unavailable')
      })
    } else {
      navigate('/test-unavailable')
    }
  }, [location.pathname, existingToken, newToken, setToken])

  return <LoadingPage />
}

export default IndexPage
