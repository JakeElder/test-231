import React from 'react'
import { PureSyllableInput } from '../components/StringInputs'

export default {
  title: 'Input :: Syllable',
  component: PureSyllableInput
}

export const Default = () => <PureSyllableInput>Hon</PureSyllableInput>
export const Selected = () => (
  <PureSyllableInput selected>Hon</PureSyllableInput>
)
export const SelectedDisabled = () => (
  <PureSyllableInput selected disabled>
    Hon
  </PureSyllableInput>
)
export const Grouped = () => (
  <>
    <PureSyllableInput selected>Hon</PureSyllableInput>
    <PureSyllableInput>est</PureSyllableInput>
    <PureSyllableInput>y</PureSyllableInput>
  </>
)
