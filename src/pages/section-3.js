import React from 'react'
import { navigate } from 'gatsby'

import Ident from '../components/Ident'
import WrapParenned from '../components/WrapParenned'

import useAnswerForm from '../hooks/use-answer-form'

function makeSyllableWrapper(sentenceNumber) {
  return ({ children }) => {
    return (
      <span>
        {children}
        <input
          name={`sentence-${sentenceNumber}-answers`}
          type="checkbox"
          value={children}
        />
      </span>
    )
  }
}

function Section3Page() {
  const { onSubmit, isSubmitting } = useAnswerForm({
    onSuccess: () => navigate('/section-4')
  })

  const sentence = '{Hon}{est}{y} is the best {po}{li}{cy}'

  return (
    <div data-page="section-3">
      <Ident />
      <form onSubmit={onSubmit}>
        <WrapParenned component={makeSyllableWrapper(1)}>
          {sentence}
        </WrapParenned>
        <button disabled={isSubmitting}>Continue</button>
      </form>
    </div>
  )
}

export default Section3Page
