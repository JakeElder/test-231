import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'

import LoadingPage from './src/components/LoadingPage'
import useToken from './src/hooks/use-token'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.validateStatus = () => true

const Wrapper = ({ props, children }) => {
  const { token } = useToken()
  const [authState, setAuthState] = useState('IDLE')

  const preCommencementUris = ['/', '/test-unavailable', '/introduction']

  useEffect(() => {
    if (authState === 'IDLE') {
      const authState = token === null ? 'TOKEN_NOT_SET' : 'TOKEN_SET'
      setAuthState(authState)
      return
    }

    if (authState === 'TOKEN_SET') {
      axios.get(`/api/session/${token}`).then(res => {
        if (res.status === 200) {
          setAuthState('SESSION_VALIDATED')
          return
        }
        setAuthState('SESSION_INVALID')
        return
      })
    }
  }, [authState, props.uri, token])

  if (authState === 'TOKEN_NOT_SET' || authState === 'SESSION_INVALID') {
    if (props.uri !== '/test-unavailable') {
      navigate('/test-unavailable')
    }
  }

  if (authState !== 'SESSION_VALIDATED') {
    return <LoadingPage />
  }

  return children
}

export function wrapPageElement({ element, props }) {
  return <Wrapper props={props} children={element} />
}
