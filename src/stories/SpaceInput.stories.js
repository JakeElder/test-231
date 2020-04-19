import React from 'react'
import { PureSpaceInput } from '../components/StringInputs'

export default {
  title: 'Input :: Space',
  component: PureSpaceInput
}

export const Default = () => <PureSpaceInput />
export const Selected = () => <PureSpaceInput selected />
export const SelectedDisabled = () => <PureSpaceInput selected disabled />
export const Grouped = () => (
  <>
    The
    <PureSpaceInput selected />
    students
    <PureSpaceInput />
    wanted
  </>
)
