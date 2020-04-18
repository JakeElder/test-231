import React from 'react'
import { PureMainTitle } from '../components/MainTitle'

export default {
  title: 'Main Title',
  component: PureMainTitle
}

const title = 'English 231: English Phonetics'

export const Default = () => <PureMainTitle>{title}</PureMainTitle>
