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
        <div>
          Where are you going?{' '}
          <input type="radio" name="line-1-answer" value="rising" />
          <input type="radio" name="line-1-answer" value="falling" />
          <input type="radio" name="line-1-answer" value="level" />
        </div>
        <div>
          <div>
            We are heading out to dinner now.{' '}
            <input type="radio" name="line-2-sentence-1-answer" value="rising" />
            <input type="radio" name="line-2-sentence-1-answer" value="falling" />
            <input type="radio" name="line-2-sentence-1-answer" value="level" />
          </div>
          <div>
            Do you want to join us?{' '}
            <input type="radio" name="line-2-sentence-2-answer" value="rising" />
            <input type="radio" name="line-2-sentence-2-answer" value="falling" />
            <input type="radio" name="line-2-sentence-2-answer" value="level" />
          </div>
        </div>
        <button disabled={isSubmitting}>Continue</button>
      </form>
    </div>
  )
}

export default Section4Page
