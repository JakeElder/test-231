import React from 'react'
import { PureMainSubTitle } from '../components/MainSubTitle'

export default {
  title: 'MainSubTitle',
  component: PureMainSubTitle
}

const title = 'Quiz 3 | Section 1: Identify the Focus Words'

export const Default = () => <PureMainSubTitle>{title}</PureMainSubTitle>
export const WithPart = () => <PureMainSubTitle>{title}</PureMainSubTitle>
