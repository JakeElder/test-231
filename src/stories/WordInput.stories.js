import React from 'react'
import { PureWordInput } from '../components/WordInput'

export default {
  title: 'Word Input',
  component: PureWordInput
}

export const Default = () => <PureWordInput>listening</PureWordInput>
export const Selected = () => <PureWordInput selected>listening</PureWordInput>
export const SelectedDisabled = () => (
  <PureWordInput selected disabled>
    listening
  </PureWordInput>
)
