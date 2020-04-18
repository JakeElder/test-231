import React from 'react'
import styled from 'styled-components'

import { PurePartIndicator } from './PartIndicator'

import { wrapMatches } from '../utils/string-utils'

const Root = styled.div`
  font-weight: 200;
  font-size: 20px;
  display: flex;
  color: #555;
`

const DividerWrapper = styled.div`
  color: #bdbdbd;
  margin: 0 10px;
`

const Part = styled.div`
  margin-left: 9px;
`

function MainSubTitleWithPart({ children, part }) {
  return (
    <Root>
      {children}
      <Part>
        <PurePartIndicator part={part} />
      </Part>
    </Root>
  )
}

function MainSubTitle({ children }) {
  return <Root>{children}</Root>
}

export function PureMainSubTitle({ children, part }) {
  const content = wrapMatches(children, /\s\|\s/, DividerWrapper)
  if (!part) {
    return <MainSubTitle>{content}</MainSubTitle>
  }
  return <MainSubTitleWithPart part={part}>{content}</MainSubTitleWithPart>
}

export default props => <PureMainSubTitle {...props} />
