import { useState } from 'react'
import axios from 'axios'

import useToken from './use-token'

function useAnswerForm({ onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { token } = useToken()

  async function onSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    await axios.post('/api/answers', data, {
      headers: {
        Authorization: `Bearer: ${token}`,
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
