import React, { useEffect } from 'react'
import axios from 'axios'

import useToken from '../hooks/use-token'

function IntroductionPage() {
  const { token } = useToken()

  useEffect(() => {
    ;(async () => {
      const res = await axios.get('/api/session', {
        headers: {
          Authorization: `Bearer: ${token}`
        }
      })
      console.log(res)
    })()
  }, [])
  return <div data-page="introduction">introduction</div>
}

export default IntroductionPage
