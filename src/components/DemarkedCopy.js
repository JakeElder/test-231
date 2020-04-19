import React from 'react'
import styled, { css } from 'styled-components'
import interleave from 'loose-interleave'

const Root = styled.div`
  border: 1px solid #999999;
  border-radius: 2px;
`

const Line = (() => {
  const padTop = css`
    padding-top: 4px;
  `

  const padBottom = css`
    padding-bottom: 4px;
  `

  const Root = styled.div`
    display: flex;
    line-height: 46px;
  `

  const Demarkation = styled.div`
  font-size: 15px;
    background-color: #f3f3f3;
    color: #777;
    width: 156px;
    ${props => props.first && padTop}
    ${props => props.last && padBottom}
  `
  const Container = styled.div`
    padding-left: 20px;
    padding-right: 30px;
  `

  const Content = styled.div`
    flex: 1;
    ${props => props.first && padTop}
    ${props => props.last && padBottom}
  `
  return function({ children, first, last }) {
    const [demarkation, content] = children
    return (
      <Root>
        <Demarkation first={first} last={last}>
          <Container>{demarkation}</Container>
        </Demarkation>
        <Content first={first} last={last}>
          <Container>{content}</Container>
        </Content>
      </Root>
    )
  }
})()

const Divider = (() => {
  const DemarkationDivider = styled.div`
    border-bottom: 1px solid #e9e9e9;
  `
  const ContentDivider = styled.div`
    border-bottom: 1px solid #f0f0f0;
  `
  return function() {
    return (
      <Line>
        {[
          <DemarkationDivider key="demarkation" />,
          <ContentDivider key="content" />
        ]}
      </Line>
    )
  }
})()

export function PureDemarkedCopy({ children }) {
  const lines = React.Children.toArray(children)
  lines[0] = React.cloneElement(lines[0], { first: true })
  lines[lines.length - 1] = React.cloneElement(lines[lines.length - 1], {
    last: true
  })
  const seperatedLines = (() => {
    if (lines.length === 1) {
      return lines
    }
    const toDivider = (_, i) => (
      <Divider key={`${lines[i].key}-${lines[i + 1].key}`} />
    )
    const seperators = Array.from(Array(lines.length - 1)).map(toDivider)
    return interleave(lines, seperators)
  })()
  return <Root>{seperatedLines}</Root>
}

PureDemarkedCopy.Line = Line

export default props => <PureDemarkedCopy {...props} />
