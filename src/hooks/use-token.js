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
    set: token => {
      if (token) {
        ls.setItem('sid', token)
        return
      }
      ls.removeItem('sid')
    },
    token: ls.getItem('sid')
  }
}

export default useToken
