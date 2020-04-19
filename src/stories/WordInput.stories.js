import React from 'react'
import { PureWordInput } from '../components/StringInputs'

export default {
  title: 'Input :: Word',
  component: PureWordInput
}

export const Default = () => <PureWordInput>listening</PureWordInput>
export const Selected = () => <PureWordInput selected>listening</PureWordInput>
export const SelectedDisabled = () => (
  <PureWordInput selected disabled>
    listening
  </PureWordInput>
)
export const Grouped = () => (
  <>
    Preceding <PureWordInput selected>Which</PureWordInput>
    <PureWordInput>test</PureWordInput> post
  </>
)
