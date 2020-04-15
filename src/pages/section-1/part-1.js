import React from 'react'
import { navigate } from 'gatsby'

import Ident from '../../components/Ident'

import useAnswerForm from '../../hooks/use-answer-form'

function Section1Part1Page() {
  const { onSubmit, isSubmitting } = useAnswerForm({
    onSuccess: () => navigate('/section-1/part-2')
  })

  return (
    <div data-page="section-1-part-1">
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
