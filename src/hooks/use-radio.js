import React, { useState } from 'react'
import globalHook from './use-global-hook'

const initialState = { selections: [] }
const actions = {
  select(store, name, value) {
    const newState = [
      ...store.state.selections.filter(s => s[0] !== name),
      [name, value]
    ]
    store.setState({ selections: newState })
  }
}

const useGlobal = globalHook(React, initialState, actions)

export default function(name, value) {
  const [{ selections }, { select }] = useGlobal()
  const selected = selections.some(s => s[0] === name && s[1] === value)
  return {
    selected,
    select: () => select(name, value)
  }
}
