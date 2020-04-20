// TODO: useState


function useToken() {
  const { localStorage } = globalThis

  if (!localStorage) {
    return {
      set: () => {},
    }
  }

  return {
    set: token => localStorage.setItem('token', token),
    token: localStorage.getItem('token')
  }
}

export default useToken
