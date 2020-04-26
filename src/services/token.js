import qs from 'qs'

function getLocalStorage() {
  if (typeof window !== 'undefined') {
    return window.localStorage
  }
  return {
    setItem: () => {},
    getItem: () => {}
  }
}

const ls = getLocalStorage()

function set(token) {
  token ? ls.setItem('sid', token) : ls.removeItem('sid')
}

function current() {
  return ls.getItem('sid')
}

function fromSearch(search) {
  const { token } = qs.parse(search, {
    ignoreQueryPrefix: true
  })
  return token || null
}

export { set }
export { current }
export { fromSearch }
