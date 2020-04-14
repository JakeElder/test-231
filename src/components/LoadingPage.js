import React, { useEffect } from 'react'
import axios from 'axios'

function LoadingPage() {
  useEffect(() => {
    ;(async () => {
      const res = await axios.post('/api/session', {})
      console.log(res.status)
    })()
  }, [])

  return <div className="loading-page">loading</div>
}

export default LoadingPage
