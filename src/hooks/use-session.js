import React from 'react'
import globalHook from './use-global-hook'

const initialState = { session: null, intervalId: null }
const actions = {
  set(store, session) {
    let intervalId = null

    if (store.state.intervalId) {
      clearInterval(store.state.intervalId)
    }

    if (
      session !== null &&
      session.commenced !== null &&
      session.completed === null &&
      session.timePassed < session.timeAllocated
    ) {
      intervalId = setInterval(() => {
        store.actions.tick()
      }, 1000)
    }

    store.setState({ session, intervalId })
  },
  tick(store) {
    const { timePassed, timeAllocated } = store.state.session
    const newTimePassed = Math.min(timePassed + 1000, timeAllocated)
    if (newTimePassed === timeAllocated) {
      clearInterval(store.state.intervalId)
    }
    store.setState({
      session: {
        ...store.state.session,
        timePassed: newTimePassed
      }
    })
  }
}

const useGlobal = globalHook(React, initialState, actions)

function useSession() {
  const [{ session }, { set }] = useGlobal()
  return [session, set]
}

export default useSession
