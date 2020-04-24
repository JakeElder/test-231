import useCurrentSession from '../hooks/use-current-session'

function useCurrentUser() {
  const session = useCurrentSession()
  if (session === null) {
    return null
  }
  return session.name
}

export default useCurrentUser
