import React from 'react'
import { PureInstruction } from '../components/Instruction'

export default {
  title: 'Instruction',
  component: PureInstruction
}

export const Default = () => (
  <PureInstruction>
    <p>
      Indicate the rising, falling or level intonation patterns in the blanks
      provided. The first one has been done for you. You may hear the dialogue{' '}
      <em>twice</em>.
    </p>
  </PureInstruction>
)
