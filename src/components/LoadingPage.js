import React, { useEffect } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'

import useToken from '../hooks/use-token'

function LoadingPage({ token }) {
  const { set: setToken } = useToken()

  useEffect(() => {
    if (!token) {
      navigate('/test-unavailable')
      return
    }

    axios.get(`/api/session/${token}`).then(res => {
      if (res.status === 404) {
        navigate('/test-unavailable')
      }
      if (res.status === 200) {
        setToken(token)
        navigate('/introduction')
      }
    })
  }, [token, setToken])

  return <div data-page="loading-page">loading</div>
}

export default LoadingPage
