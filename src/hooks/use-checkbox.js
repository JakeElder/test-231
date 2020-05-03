import { useState, useContext } from 'react'

import SessionContext from '../contexts/SessionContext'

function isCheckedInSession(name, value, session) {
  const answers = session.data.answers.find(
    answer => answer['section-id'] === session.sectionId
  )
  return answers[name.replace(/\[\]$/, '')].includes(value.toString())
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
