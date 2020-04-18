import React from 'react'
import { PureTimer } from '../components/Timer'

export default {
  title: 'Timer',
  component: PureTimer
}

export const Default = () => (
  <PureTimer passed="1 minute 34 seconds" allotted="15 minutes" />
)
