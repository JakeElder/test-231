import React from 'react'
import { PureStepHint } from '../components/StepHint'

export default {
  title: 'Step Hint',
  component: PureStepHint
}

const hint = "Once you are ready to start the test, press the continue button."

export const Default = () => <PureStepHint>{hint}</PureStepHint>
