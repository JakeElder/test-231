import { useState, useContext } from 'react'

import SessionContext from '../contexts/SessionContext'

function isCheckedInSession(name, value, session) {
  const answers = session.data.answers.find(
    answer => answer['section-id'] === session.sectionId
  )
  const key = name.replace(/\[\]$/, '')
  if (!answers || !answers[key]) {
    return false
  }
  return answers[key].includes(value.toString())
}

function useCheckbox(name, value) {
  const [checked, setChecked] = useState(false)
  const session = useContext(SessionContext)

  if (!session) {
    return {
      name,
      checked,
      disabled: false,
      onClick: () => setChecked(!checked)
    }
  }

  return {
    checked: isCheckedInSession(name, value, session),
    onClick: () => {},
    disabled: true
  }
}

export default useCheckbox
