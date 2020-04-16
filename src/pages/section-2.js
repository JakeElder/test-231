import React from 'react'
import { navigate } from 'gatsby'

import Ident from '../components/Ident'

import useAnswerForm from '../hooks/use-answer-form'

function Section2Page() {
  const { onSubmit, isSubmitting } = useAnswerForm({
    onSuccess: () => navigate('/section-3')
  })

  const sentences = [
    "The students wanted to meet the dean but they have to wait 'til tomorrow",
    "Adam said Jane wanted to buy a new house"
  ].map((sentence, idx) => {
    const words = sentence.split(' ')
    const wordCount = words.length

    for (let i = 0; i < wordCount - 1; i++) {
      words.splice(
        i + i + 1,
        0,
        <input
          key={`sentence-${idx + 1}-space-${i + 1}`}
          name={`sentence-${idx + 1}-answers`}
          value={i + 1}
          type="checkbox"
        />
      )
    }

    return words
  })

  return (
    <div data-page="section-2">
      <Ident />
      <form onSubmit={onSubmit}>
        <div>{sentences[0]}</div>
        <div>{sentences[1]}</div>
        <button disabled={isSubmitting}>Continue</button>
      </form>
    </div>
  )
}

export default Section2Page
