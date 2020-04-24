import React, { useEffect, useState } from 'react'
import axios from 'axios'

import useToken from './use-token'

function useCurrentSession() {
  const { token } = useToken()
  const [session, set] = useState(null)

  useEffect(() => {
    axios.get(`/api/session/${token}`).then(res => {
      set(res.data.data)
    })
  }, [set, token])

  return session
}

export default useCurrentSession
