import React from 'react'
import { PureStandardTitle } from '../components/StandardTitle'

export default {
  title: 'Standard Title',
  component: PureStandardTitle
}

const title = 'English 231: English Phonetics'

export const Default = () => <PureStandardTitle>{title}</PureStandardTitle>
