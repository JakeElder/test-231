import { useEffect, useState, useRef } from 'react'
import axios from 'axios'

import useToken from './use-token'

function useCurrentSession() {
  const { token } = useToken()
  const [session, set] = useState(null)

  const clientTimeAtMount = useRef(null)
  const intervalId = useRef(null)

  useEffect(() => {
    axios.get(`/api/session/${token}`).then(res => {
      const session = res.data.data
      set(session)
      if (
        session.commenced !== null &&
        session.completed === null &&
        session.timePassed < session.timeAllocated
      ) {
        clientTimeAtMount.current = Date.now()
        intervalId.current = setInterval(() => {
          set({
            ...session,
            timePassed:
              session.timePassed + (Date.now() - clientTimeAtMount.current)
          })
        }, 1000)
      }
    })
    return () => {
      clearInterval(intervalId.current)
    }
  }, [set, token])

  return session
}

export default useCurrentSession
