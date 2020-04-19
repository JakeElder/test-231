import React from 'react'
import styled from 'styled-components'

import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { Default as StandardTitle } from './StandardTitle.stories.js'
import { WithPart as Subtitle } from './Subtitle.stories.js'

export default {
  title: 'Test Part Header',
  component: Header
}

export const Default = () => (
  <Header>
    <Header.Title>
      <StandardTitle />
    </Header.Title>
    <Header.Subtitle>
      <Subtitle />
    </Header.Subtitle>
  </Header>
)

export const WithoutSubtitle = () => (
  <Header>
    <Header.Title>
      <StandardTitle />
    </Header.Title>
  </Header>
)
