import React, { useEffect } from 'react'
import queryString from 'query-string'
import { navigate } from 'gatsby'
import axios from 'axios'

import LoadingPage from '../components/LoadingPage.js'

import useToken from '../hooks/use-token'

function IndexPage({ location }) {
  const { token, set: setToken } = useToken()
  const { token: newToken } = queryString.parse(location.search)

  useEffect(() => {
    const t = newToken ? newToken : token
    if (t) {
      console.log(t)
      axios.get(`/api/session/${t}`).then(res => {
        if (res.status === 200) {
          if (newToken) {
            setToken(t)
            navigate('/', { replace: true })
          } else {
            navigate('/introduction')
          }
        } else {
          setToken()
          navigate('/', { replace: true })
        }
      })
    } else {
      navigate('/test-unavailable')
    }
  }, [token, newToken, setToken])

  return <LoadingPage />
}

export default IndexPage
