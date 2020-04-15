import { useState } from 'react'
import axios from 'axios'

import useToken from './use-token'

function useAnswerForm({ onSuccess }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { token } = useToken()

  async function onSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    await axios.post('/api/answers', new FormData(e.target), {
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'multipart/form-data'
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
