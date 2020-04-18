import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  font-weight: 500;
  font-size: 28px;
`

export function PureMainTitle({ children }) {
  return <Root>{children}</Root>
}

export default props => <PureMainTitle {...props} />
