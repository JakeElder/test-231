import React, { useEffect } from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'

function LoadingPage({ token }) {
  useEffect(() => {
    ;(async () => {
      const res = await axios.post('/api/session', { token })
      if (res.status === 404) {
        navigate('/test-unavailable')
      }
    })()
  }, [])

  return <div data-page="loading-page">loading</div>
}

export default LoadingPage
