import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  font-size: 20px;
  font-weight: 500;
`

export function PureStepHint({ children }) {
  return <Root>{children}</Root>
}
