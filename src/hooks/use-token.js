// TODO: useState

function useToken() {
  const { localStorage } = window
  return {
    set: token => localStorage.setItem('token', token),
    token: localStorage.getItem('token')
  }
}

export default useToken
