import React, { useState } from 'react'
import axios from 'axios'

import Ident from '../../components/Ident'

import useToken from '../../hooks/use-token'

function Section1Part1Page() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { token } = useToken()

  function onSubmit(e) {
    e.preventDefault()
    setIsSubmitting(true)

    axios.post('/api/answers', new FormData(e.target), {
      headers: {
        Authorization: `Bearer: ${token}`,
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  return (
    <div data-page="section-2-part-1">
      <Ident />
      <form onSubmit={onSubmit}>
        <label htmlFor="Which">Which</label>
        <input name="focusWords" value="Which" type="checkbox" />

        <label htmlFor="test">test</label>
        <input name="focusWords" value="test" type="checkbox" />

        <label htmlFor="do">do</label>
        <input name="focusWords" value="do" type="checkbox" />

        <label htmlFor="you">you</label>
        <input name="focusWords" value="you" type="checkbox" />

        <label htmlFor="mean">mean</label>
        <input name="focusWords" value="mean" type="checkbox" />

        <button disabled={isSubmitting}>Continue</button>
      </form>
    </div>
  )
}

export default Section1Part1Page
