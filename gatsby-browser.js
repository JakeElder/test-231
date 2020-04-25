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

  const testURIs = [
    '/section-1/part-1',
    '/section-1/part-2',
    '/section-2',
    '/section-3',
    '/section-4'
  ]

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
        } else {
          // If there is, validate it
          axios.get(`/api/session/${existingToken}`).then(({ status }) => {
            if (status === 200) {
              // What are you doing here guy?!
              setAuthStep('EXISTING_TOKEN_VALIDATED')
            } else {
              // If non OK status, remove the stored token and update state
              setLSToken(null)
              setAuthStep('EXISTING_TOKEN_REJECTED')
            }
          })
        }
      } else if (props.uri === '/introduction') {
        if (!existingToken) {
          // If not, on to next step
          setAuthStep('ESTABLISHED_TOKEN_MISSING')
        } else {
          // If there is, validate it
          axios.get(`/api/session/${existingToken}`).then(({ status }) => {
            if (status === 200) {
              // What are you doing here guy?!
              setAuthStep('EXISTING_TOKEN_VALIDATED')
            } else {
              // If non OK status, remove the stored token and update state
              setLSToken(null)
              setAuthStep('EXISTING_TOKEN_REJECTED')
            }
          })
        }
      } else if (testURIs.includes(props.uri)) {
        if (!existingToken) {
          // If not, on to next step
          setAuthStep('ESTABLISHED_TOKEN_MISSING')
        } else {
          // If there is, validate it
          axios.get(`/api/session/${existingToken}`).then(({ status, data }) => {
            if (status === 200) {
              // Welcome!
              const session = data.data
              if (session.commenced) {
                setAuthStep('EXISTING_TOKEN_VALIDATED')
              } else {
                setAuthStep('ESTABLISHED_TEST_URI_BEFORE_COMMENCEMENT')
              }
            } else {
              // If non OK status, remove the stored token and update state
              setLSToken(null)
              setAuthStep('EXISTING_TOKEN_REJECTED')
            }
          })
        }
      }
    }
  }, [authStep, props.uri, newToken, setLSToken, existingToken, testURIs])

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
    if (['/', '/test-unavailable'].includes(props.uri)) {
      navigate('/introduction')
    }
  }

  if (
    props.uri === '/test-unavailable' &&
    ['ESTABLISHED_TOKEN_MISSING', 'EXISTING_TOKEN_REJECTED'].includes(authStep)
  ) {
    return children
  }

  if (
    props.uri === '/introduction' &&
    authStep === 'EXISTING_TOKEN_VALIDATED'
  ) {
    return children
  }

  if (
    testURIs.includes(props.uri) &&
    authStep === 'EXISTING_TOKEN_VALIDATED'
  ) {
    return children
  }

  if (authStep === 'ESTABLISHED_TEST_URI_BEFORE_COMMENCEMENT') {
    navigate('/introduction')
  }

  return <LoadingPage />
}

export function wrapPageElement({ element, props }) {
  return <Wrapper props={props} children={element} />
}
