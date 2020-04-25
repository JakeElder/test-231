import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'
import queryString from 'query-string'

import LoadingPage from './src/components/LoadingPage'
import useToken from './src/hooks/use-token'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.validateStatus = () => true

const Wrapper = ({ props, children }) => {
  const [authStep, setAuthStep] = useState('PRE')
  const { token: newToken } = queryString.parse(props.location.search)
  const { token: existingToken, set: setLSToken } = useToken()

  useEffect(() => {
    if (authStep === 'PRE') {
      if (props.uri === '/') {
        // First, check if there is qs token
        if (newToken) {
          // If there is, validate it
          axios.get(`/api/session/${newToken}`).then(({ status }) => {
            if (status === 200) {
              // If valid, store the token as sid
              setLSToken(newToken)
              setAuthStep('NEW_TOKEN_INGESTED')
            } else {
              // Otherwise remove any ls token and
              setLSToken(null)
              setAuthStep('NEW_TOKEN_REJECTED')
            }
          })
        } else {
          // If there isn't a new token, check if there is an existing one
          if (!existingToken) {
            // If not, on to next step
            setAuthStep('ESTABLISHED_TOKEN_MISSING')
          } else {
            // If there is, validate it
            axios.get(`/api/session/${existingToken}`).then(({ status }) => {
              if (status === 200) {
                // If valid, update state accordingly
                setAuthStep('EXISTING_TOKEN_VALIDATED')
              } else {
                // Otherwise remove the stored token and update state
                setLSToken(null)
                setAuthStep('EXISTING_TOKEN_REJECTED')
              }
            })
          }
        }
      } else if (props.uri === '/test-unavailable') {
        if (!existingToken) {
          // If not, on to next step
          setAuthStep('ESTABLISHED_TOKEN_MISSING')
        }
      }
    }
  })

  if (['NEW_TOKEN_INGESTED', 'NEW_TOKEN_REJECTED'].includes(authStep)) {
    navigate('/', { replace: true })
  }

  if (
    ['ESTABLISHED_TOKEN_MISSING', 'EXISTING_TOKEN_REJECTED'].includes(authStep)
  ) {
    if (props.uri !== '/test-unavailable') {
      navigate('/test-unavailable')
    }
  }

  if (authStep === 'EXISTING_TOKEN_VALIDATED') {
    navigate('/introduction')
  }

  if (
    props.uri === '/test-unavailable' &&
    authStep === 'ESTABLISHED_TOKEN_MISSING'
  ) {
    return children
  }

  if (authStep !== 'AUTH_VALID') {
    return <LoadingPage />
  }

  return children
}

export function wrapPageElement({ element, props }) {
  return <Wrapper props={props} children={element} />
}
