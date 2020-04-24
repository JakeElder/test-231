import { useState } from 'react'
import axios from 'axios'
import serialize from 'form-serialize'

import useToken from './use-token'

function useAnswerForm({ sectionId, onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { token } = useToken()

  async function onSubmit(e) {
    e.preventDefault()
    const data = {
      'section-id': sectionId,
      ...serialize(e.target, { hash: true })
    }
    setIsSubmitting(true)
    await axios.post(`/api/session/${token}/answers`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    onSuccess()
  }

  return {
    isSubmitting,
    onSubmit
  }
}

export default useAnswerForm
