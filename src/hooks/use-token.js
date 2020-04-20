// TODO: useState

function useToken() {
  const { localStorage } = window || {}

  if (!localStorage) {
    return {
      set: () => {}
    }
  }

  return {
    set: token => localStorage.setItem('sid', token),
    token: localStorage.getItem('sid')
  }
}

export default useToken
