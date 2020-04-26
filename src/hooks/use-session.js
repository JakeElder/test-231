import { createContext, useContext } from 'react'

const SessionContext = createContext(null)

function useSession() {
  return useContext(SessionContext)
}

export default useSession
export { SessionContext }
