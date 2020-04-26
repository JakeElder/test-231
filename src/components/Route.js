import React, { useEffect, useState } from 'react'

import LoadingPage from './LoadingPage'

import * as Session from '../services/session'
import * as Token from '../services/token'

import { SessionContext } from '../hooks/use-session'

function Route({
  checkAuth,
  requireAuth,
  requireCommencement,
  component: Component,
  ...rest
}) {
  const [authState, setAuthState] = useState(
    requireAuth ? 'UNCONFIRMED' : 'NOT_REQUIRED'
  )
  const [session, setSession] = useState(null)

  useEffect(() => {
    // No need to do anything if auth check isn't required
    if (!requireAuth && !checkAuth) {
      return
    }

    // Confirm as unauthenticated if there is no token
    if (!Token.current()) {
      setAuthState('CONFIRMED')
    }

    // Otherwise check session exists
    Session.find(Token.current()).then(s => {
      // Can be null if token is invalid
      setSession(s)
      setAuthState('CONFIRMED')
    })
  }, [checkAuth, requireAuth])

  if ((requireAuth || checkAuth) && authState !== 'CONFIRMED') {
    return <LoadingPage />
  }

  return (
    <SessionContext.Provider value={session}>
      <Component {...rest} />
    </SessionContext.Provider>
  )
}

export default Route
