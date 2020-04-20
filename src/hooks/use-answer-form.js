import { useState } from 'react'
import axios from 'axios'

import useToken from './use-token'

function useAnswerForm({ onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { token } = useToken()

  async function onSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    await axios.post(`/api/session/${token}/answers`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    setIsSubmitting(true)
    onSuccess()
  }

  return {
    isSubmitting,
    onSubmit
  }
}

export default useAnswerForm
