import React from 'react'
import styled, { css } from 'styled-components'
import interleave from 'loose-interleave'

const Root = styled.div`
  border: 1px solid #999999;
  border-radius: 2px;
`

const Line = (() => {
  const Demarkation = styled.div`
    font-size: 15px;
    background-color: #f3f3f3;
    color: #777;
    width: 156px;
  `

  const Container = styled.div`
    padding-left: 20px;
    padding-right: 30px;
  `

  const Content = styled.div`
    flex: 1;
  `

  const Root = styled.div`
    &:first-child ${Demarkation}, &:first-child ${Content} {
      padding-top: 15px;
    }
    &:last-child ${Demarkation}, &:last-child ${Content} {
      padding-bottom: 15px;
    }
    display: flex;
    line-height: 28px;
  `

  const ContentGroup = styled.div`
    :not(:last-of-type) {
      margin-bottom: 2px;
    }
  `

  return function({ children }) {
    const [demarkation, content] = children
    const contentArray = [content].flat()
    const groupedContent = contentArray.map((c, idx) => (
      <ContentGroup key={`cgroup-${idx}`}>{c}</ContentGroup>
    ))

    return (
      <Root>
        <Demarkation>
          <Container>{demarkation}</Container>
        </Demarkation>
        <Content>
          <Container>{groupedContent}</Container>
        </Content>
      </Root>
    )
  }
})()

const Divider = (() => {
  const pad = css`
    margin-top: 12px;
    margin-bottom: 12px;
  `

  const DemarkationDivider = styled.div`
    border-bottom: 1px solid #e9e9e9;
    ${pad}
  `
  const ContentDivider = styled.div`
    border-bottom: 1px solid #f0f0f0;
    ${pad}
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
