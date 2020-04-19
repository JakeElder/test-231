import React from 'react'
import { PureToneInput } from '../components/StringInputs'

export default {
  title: 'Input :: Tone',
  component: PureToneInput
}

export const Default = () => <PureToneInput type="rising"/>
export const Selected = () => <PureToneInput type="falling" selected />
export const SelectedDisabled = () => ( <PureToneInput type="level" selected disabled />)
