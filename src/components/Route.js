import React, { useEffect, useState } from 'react'
import { navigate } from 'gatsby'

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
  const defaultAuthState = requireAuth ? 'UNCONFIRMED' : 'NOT_REQUIRED'
  const [authState, setAuthState] = useState(defaultAuthState)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // No need to do anything if auth check isn't required
    if (!requireAuth && !checkAuth) {
      return
    }

    // Confirm (unauthenticated) if there is no token
    if (!Token.current()) {
      setAuthState('CONFIRMED')
      return
    }

    // Otherwise check session exists
    Session.find(Token.current()).then(s => {
      // Can be null if token is invalid
      setSession(s)
      setAuthState('CONFIRMED')
    })
  }, [checkAuth, requireAuth])

  // If auth check required and the session request hasn't finished,
  // show the loading page
  if ((requireAuth || checkAuth) && authState !== 'CONFIRMED') {
    return <LoadingPage />
  }

  // If auth is _required_, session request and finished and there
  // is no valid session, navigate to /test-unavailable.
  // Render <LoadingPage /> for easier reconcilliation
  if (requireAuth && authState === 'CONFIRMED' && session === null) {
    navigate('/test-unavailable')
    return <LoadingPage />
  }

  // If commencement is required, the session request has finished,
  // and the session hasn't been commenced, return to /introduction
  if (
    requireAuth &&
    requireCommencement &&
    authState === 'CONFIRMED' &&
    session !== null &&
    session.commenced === null
  ) {
    navigate('/introduction')
    return <LoadingPage />
  }

  // If necessary session checking is complete, render component.
  // `session` can be null
  return (
    <SessionContext.Provider value={session}>
      <Component {...rest} />
    </SessionContext.Provider>
  )
}

export default Route
