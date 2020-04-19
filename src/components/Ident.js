import React from 'react'
import styled from 'styled-components'

import useCurrentUser from '../hooks/use-current-user'

import defaultAvatar from '../images/default-avatar.svg'

const Root = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
`

const Avatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #fff;
  background-image: url(${defaultAvatar});
  background-repeat: no-repeat;
  background-position: center 10px;
  margin-right: 10px;
`

const NameAndInstitute = styled.div`
  margin-top: 2px;
`

const LoadingStrip = styled.div`
  background-color: #676767;
  border-radius: 2px;
  width: ${({ width }) => width}px;
  height: ${({ height }) => height}px;
`

const Name = (() => {
  const Root = styled.div`
    margin-bottom: 2px;
  `

  const Copy = styled.div`
    font-weight: 500;
    font-size: 16px;
  `

  return function({ children: name }) {
    const main = (() => {
      return name ? (
        <Copy>{name}</Copy>
      ) : (
        <LoadingStrip width={140} height={17} />
      )
    })()

    return <Root>{main}</Root>
  }
})()

const Institute = (() => {
  const Root = styled.div``

  const Copy = styled.div`
    font-size: 12px;
  `

  return function({ children: institute }) {
    const main = (() => {
      return institute ? (
        <Copy>{institute}</Copy>
      ) : (
        <LoadingStrip width={120} height={14} />
      )
    })()

    return <Root>{main}</Root>
  }
})()

export function PureIdent({ name, institute }) {
  return (
    <Root data-component="ident">
      <Avatar />
      <NameAndInstitute>
        <Name>{name}</Name>
        <Institute>{institute}</Institute>
      </NameAndInstitute>
    </Root>
  )
}

function Ident() {
  const { user } = useCurrentUser()
  const name = !user ? '' : user.name
  const institute = !user ? null : 'Chiang Mai University'
  return <PureIdent name={name} institute={institute} />
}

export default Ident
