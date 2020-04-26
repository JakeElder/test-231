import React, { useEffect } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'
import qs from 'qs'

import LoadingPage from './LoadingPage'

import useToken from '../hooks/use-token'

function IndexPage({ location }) {
  const { set: setToken } = useToken()
  const { token } = qs.parse(location.search, {
    ignoreQueryPrefix: true
  })

  useEffect(() => {
    if (token) {
      console.log(token)
      axios.get(`/api/session/${token}`).then(({ status }) => {
        if (status === 200) {
          // If valid, store the token as sid
          // setToken(newToken)
          // setAuthStep('NEW_TOKEN_INGESTED')
        } else {
          // Otherwise remove any ls token and
          setToken(null)
          navigate('/', { push: true })
        }
      })
    }
  }, [token, setToken])

  return <LoadingPage />
}

export default IndexPage
