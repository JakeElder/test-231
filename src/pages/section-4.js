import React from 'react'
import { navigate } from 'gatsby'

import Ident from '../components/Ident'

import useAnswerForm from '../hooks/use-answer-form'

function Section4Page() {
  const { onSubmit, isSubmitting } = useAnswerForm({
    onSuccess: () => navigate('/summary')
  })

  return (
    <div data-page="section-4">
      <Ident />
      <form onSubmit={onSubmit}>
        <button disabled={isSubmitting}>Continue</button>
      </form>
    </div>
  )
}

export default Section4Page
