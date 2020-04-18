import React from 'react'
import styled from 'styled-components'

import { PureTestPart } from '../layouts/TestPart'
import { Default as Header } from './TestPartHeader.stories'
import { Default as BodyCopy } from './BodyCopy.stories'
import { Default as Button } from './Button.stories'

const TestPartWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`

export default {
  title: 'Layout :: Test Part',
  component: PureTestPart,
  decorators: [storyFn => <TestPartWrapper>{storyFn()}</TestPartWrapper>]
}

export const Default = () => (
  <PureTestPart>
    <PureTestPart.Header>
      <Header />
    </PureTestPart.Header>
    <PureTestPart.Body>
      <BodyCopy />
    </PureTestPart.Body>
    <PureTestPart.Footer>
      <Button />
    </PureTestPart.Footer>
  </PureTestPart>
)
