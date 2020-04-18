import React from 'react'
import { PurePartIndicator } from '../components/PartIndicator'

export default {
  title: 'Part Indicator',
  component: PurePartIndicator
}

export const Default = () => <PurePartIndicator part={[1, 2]} />
