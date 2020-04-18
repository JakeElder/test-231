import React from 'react'
import { PureBodyCopy } from '../components/BodyCopy'

export default {
  title: 'Body Copy',
  component: PureBodyCopy
}

export const Default = () => (
  <PureBodyCopy>
    <h1>Welcome to English 231: English Phonetics Quiz 3</h1>

    <p>
      This test is comprised of 4 sections, some of which contain multiple
      sections.
    </p>

    <p>
      You will be required to answer the questions by reading the instructions,
      and selecting the answers using the provided interface.
    </p>

    <p>
      Some questions will require that you listen to an audio clip, so please
      ensure you are in a suitable environment, have headphones equipped where
      necessary and have your volume turned up to a reasonable level.
    </p>
  </PureBodyCopy>
)
