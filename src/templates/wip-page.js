import React from 'react'
import styled from 'styled-components'

import App from '../components/App/App'

import useCurrentPage from '../hooks/use-current-page'

const TextBlock = styled.div`
  border-top: 1px solid #eee;
  padding: 26px 20px 10px 20px;
`

const Title = styled(TextBlock)`
  margin-bottom: 14px;
  font-weight: 200;
  font-size: 26px;
`

const Body = styled.pre`
  padding: 20px;
  border: 1px dashed #ccc;
  margin: 0 20px 40px 20px;
  border-radius: 2px;
  line-height: 1.4;
  font-weight: 300;
`

function DefaultPage() {
  const page = useCurrentPage()

  return (
    <App>
      <Title>&raquo;&nbsp;&nbsp;{page.data.title.text}</Title>
      <Body>{JSON.stringify(page, null, 2)}</Body>
    </App>
  )
}

export default DefaultPage
