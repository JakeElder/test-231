import React from 'react'
import { PureButton } from '../components/Button'

export default {
  title: 'Button',
  component: PureButton
}

export const Default = () => <PureButton>Continue</PureButton>
export const Disabled = () => <PureButton disabled>Continue</PureButton>
