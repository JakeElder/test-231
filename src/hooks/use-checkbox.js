import { useState } from 'react'

function useCheckbox() {
  const [checked, setChecked] = useState(false)
  return {
    checked,
    toggle: () => {
      setChecked(!checked)
    }
  }
}

export default useCheckbox
