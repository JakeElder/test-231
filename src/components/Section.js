import React from 'react'
import styled from 'styled-components'

import SideBarContainer from './SideBarContainer'

import pastCheckbox from '../images/past-checkbox.svg'
import presentCheckbox from '../images/present-checkbox.svg'
import futureCheckbox from '../images/future-checkbox.svg'

const BaseRoot = styled.div`
  font-weight: 15px;
  max-width: 300px;
`

const BaseMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  line-height: 48px;
`

const CheckedCheckbox = styled.img`
  position: relative;
  right: -3px;
  bottom: -1px;
`

const UncheckedCheckbox = styled.img``

const Text = ({ children }) => children

const PurePastSection = (() => {
  const Root = styled(BaseRoot)`
    background: #f3f3f3;
    color: #bebebe;
    text-shadow: 1px 1px 0 rgba(255, 255, 255, 0.7);
  `

  const Main = styled(BaseMain)``

  const Checkbox = styled(CheckedCheckbox).attrs({ src: pastCheckbox })``

  return ({ children, completable }) => (
    <Root>
      <SideBarContainer>
        <Main>
          <Text>{children}</Text>
          {completable && <Checkbox />}
        </Main>
      </SideBarContainer>
    </Root>
  )
})()

const PurePresentSection = (() => {
  const Root = styled(BaseRoot)`
    background: #fff;
    color: #555;
  `

  const Main = styled(BaseMain)``

  const Checkbox = styled(UncheckedCheckbox).attrs({
    src: presentCheckbox
  })``

  return ({ children, completable }) => (
    <Root>
      <SideBarContainer>
        <Main>
          <Text>{children}</Text>
          {completable && <Checkbox />}
        </Main>
      </SideBarContainer>
    </Root>
  )
})()

const PureFutureSection = (() => {
  const Root = styled(BaseRoot)`
    color: #777;
    background: #f3f3f3;
  `

  const Main = styled(BaseMain)``

  const Checkbox = styled(UncheckedCheckbox).attrs({
    src: futureCheckbox
  })``

  return ({ children, completable }) => (
    <Root>
      <SideBarContainer>
        <Main>
          <Text>{children}</Text>
          {completable && <Checkbox />}
        </Main>
      </SideBarContainer>
    </Root>
  )
})()

export const PureSection = ({
  type = 'future',
  completable = true,
  ...rest
}) => {
  const props = { completable, ...rest }
  switch (type) {
    case 'past':
      return <PurePastSection {...props} />
    case 'present':
      return <PurePresentSection {...props} />
    case 'future':
      return <PureFutureSection {...props} />
  }
}

export default props => <PureSection {...props} />
