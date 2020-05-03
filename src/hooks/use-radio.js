import React, { useContext } from 'react'

import globalHook from './use-global-hook'
import SessionContext from '../contexts/SessionContext'

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

function isSelectedInSession(name, value, session) {
  const answers = session.data.answers.find(
    answer => answer['section-id'] === session.sectionId
  )
  return answers[name.replace(/\[\]$/, '')] === value.toString()
}

export default function(name, value) {
  const [{ selections }, { select }] = useGlobal()
  const session = useContext(SessionContext)
  const selected = selections.some(s => s[0] === name && s[1] === value)

  if (!session) {
    return {
      selected,
      select: () => select(name, value),
      disabled: false
    }
  }

  return {
    selected: isSelectedInSession(name, value, session),
    select: () => {},
    disabled: true
  }
}
