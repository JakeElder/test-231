import React from 'react'
import globalHook from './use-global-hook'

const initialState = { session: null }
const actions = {
  set(store, value) {
    store.setState({ session: value })
  }
}

const useGlobal = globalHook(React, initialState, actions)

function useSession() {
  const [{ session }, { set }] = useGlobal()
  return [session, set]
}

export default useSession
