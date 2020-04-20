import { useEffect, useState } from 'react'
import axios from 'axios'

import useToken from '../hooks/use-token'

function useCurrentUser() {
  const { token } = useToken()
  const [user, set] = useState(null)

  useEffect(() => {
    ;(async () => {
      const res = await axios.get(`/api/session/${token}`)
      set(res.data.data)
    })()
  }, [set, token])

  return { user }
}

export default useCurrentUser
