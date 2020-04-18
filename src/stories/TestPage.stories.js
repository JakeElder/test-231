import React from 'react'
import styled from 'styled-components'

import { PureTestPage } from '../layouts/TestPage'
import { FirstSectionCurrent as SideBar } from './SideBar.stories'
import { Default as TestPart } from './TestPart.stories'

const TestPageWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`

export default {
  title: 'Layout :: Test Page',
  component: PureTestPage,
  decorators: [storyFn => <TestPageWrapper>{storyFn()}</TestPageWrapper>]
}

export const Default = () => (
  <PureTestPage>
    <PureTestPage.SideBar>
      <SideBar />
    </PureTestPage.SideBar>
    <PureTestPage.TestPart>
      <TestPart />
    </PureTestPage.TestPart>
  </PureTestPage>
)
