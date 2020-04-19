import { useEffect, useState } from 'react'
import axios from 'axios'

import useToken from '../hooks/use-token'

function useCurrentUser() {
  const { token } = useToken()
  const [user, set] = useState(null)

  useEffect(() => {
    ;(async () => {
      const res = await axios.get('/api/session', {
        headers: {
          Authorization: `Bearer: ${token}`
        }
      })
      set({
        name: 'Jake Elder',
        id: 'jake-elder'
      })
    })()
  }, [set, token])

  return { user }
}

export default useCurrentUser
