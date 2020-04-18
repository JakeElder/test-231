import React from 'react'
import styled from 'styled-components'

import { PureTestPartHeader as Header } from '../layouts/TestPartHeader'
import { Default as MainTitle } from './MainTitle.stories.js'
import { WithPart as MainSubTitle } from './MainSubTitle.stories.js'

export default {
  title: 'Test Part Header',
  component: Header
}

export const Default = () => (
  <Header>
    <Header.MainTitle>
      <MainTitle />
    </Header.MainTitle>
    <Header.MainSubTitle>
      <MainSubTitle />
    </Header.MainSubTitle>
  </Header>
)
