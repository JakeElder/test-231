import React from 'react'
import styled from 'styled-components'

import SideBarContainer from './SideBarContainer'

import uncheckedCheckbox from '../images/unchecked-checkbox.svg'

const Root = styled.div`
  font-weight: 15px;
`

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  line-height: 48px;
`

const Checkbox = styled.img.attrs({ src: uncheckedCheckbox })``

const Text = ({ children }) => children

export const PureSection = ({ children }) => (
  <Root>
    <SideBarContainer>
      <Main>
        <Text>{children}</Text>
        <Checkbox />
      </Main>
    </SideBarContainer>
  </Root>
)
