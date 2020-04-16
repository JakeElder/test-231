import React from 'react'
import { navigate } from 'gatsby'

import Ident from '../../components/Ident'

import useAnswerForm from '../../hooks/use-answer-form'

function Section1Part1Page() {
  const { onSubmit, isSubmitting } = useAnswerForm({
    onSuccess: () => navigate('/section-2')
  })

  return (
    <div data-page="section-1-part-2">
      <Ident />
      <form onSubmit={onSubmit}>
        <label htmlFor="What">What</label>
        <input name="focusWords" value="What" type="checkbox" />

        <label htmlFor="should">should</label>
        <input name="focusWords" value="should" type="checkbox" />

        <label htmlFor="I">I</label>
        <input name="focusWords" value="I" type="checkbox" />

        <label htmlFor="do">do</label>
        <input name="focusWords" value="do" type="checkbox" />

        <button disabled={isSubmitting}>Continue</button>
      </form>
    </div>
  )
}

export default Section1Part1Page
