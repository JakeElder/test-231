import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import LoadingPage from './LoadingPage'

import * as Session from '../services/session'
import * as Token from '../services/token'

function IndexPage({ location }) {
  const newToken = Token.fromSearch(location.search)
  const existingToken = Token.current()

  useEffect(() => {
    if (!newToken && !existingToken) {
      navigate('/test-unavailable')
      return 
    }

    if (newToken) {
      Session.checkToken(newToken).then(isValid => {
        Token.set(isValid ? newToken : null)
        navigate('/', { push: true })
      })
      return
    } 

    Session.checkToken(existingToken).then(isValid => {
      navigate(isValid ? '/introduction' : '/test-unavailable')
    })
  }, [location.pathname, existingToken, newToken])

  return <LoadingPage />
}

export default IndexPage
