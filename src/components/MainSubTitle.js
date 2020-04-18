import React from 'react'
import styled from 'styled-components'

import { wrapMatches } from '../utils/string-utils'

const Root = styled.div`
  font-weight: 200;
  font-size: 20px;
  display: flex;
`

const DividerWrapper = styled.div`
  color: #bdbdbd;
  margin: 0 10px;
`

export function PureMainSubTitle({ children }) {
  const content = wrapMatches(children, /\s\|\s/, DividerWrapper)
  return <Root>{content}</Root>
}

export default props => <PureMainSubTitle {...props} />
