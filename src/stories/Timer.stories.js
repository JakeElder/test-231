import React from 'react'
import humanInterval from 'human-interval'

import { PureTimer } from '../components/Timer'

export default {
  title: 'Timer',
  component: PureTimer
}

export const Default = () => (
  <PureTimer passed="35 seconds" allocated="1 minute 50 seconds" />
)

export const Loading = () => <PureTimer loading />
