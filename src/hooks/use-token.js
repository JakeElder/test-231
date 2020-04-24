// TODO: useState

function getLocalStorage() {
  if (typeof window !== 'undefined') {
    return window.localStorage
  }
  return {
    setItem: () => {},
    getItem: () => {}
  }
}

function useToken() {
  const ls = getLocalStorage()
  return {
    set: token => ls.setItem('sid', token),
    token: ls.getItem('sid') || null
  }
}

export default useToken
