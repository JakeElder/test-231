import React from 'react'
import { PureSubtitle } from '../components/Subtitle'

export default {
  title: 'Subtitle',
  component: PureSubtitle
}

const title = 'Quiz 3 | Section 1: Identify the Focus Words'

export const Default = () => <PureSubtitle>{title}</PureSubtitle>
export const WithPart = () => <PureSubtitle part={[1, 2]}>{title}</PureSubtitle>
export const ReviewMode = () => (
  <PureSubtitle>Quiz 3 | Answers | Someone B. Personson</PureSubtitle>
)
