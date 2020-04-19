import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  font-weight: 500;
  font-size: 28px;
`

export function PureStandardTitle({ children }) {
  return <Root>{children}</Root>
}

export default props => <PureStandardTitle {...props} />
