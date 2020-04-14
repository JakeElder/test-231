import React from 'react'
import styled from 'styled-components'

import App from '../components/App/App'
import Container from '../components/Container'

import useCurrentPage from '../hooks/use-current-page'

const TextBlock = styled.div`
  border-top: 1px solid #eee;
  padding: 26px 0 10px 0;
`

const Title = styled(TextBlock)`
  margin-bottom: 14px;
  font-weight: 200;
  font-size: 26px;
`

const Body = styled.pre`
  padding: 20px;
  border: 1px dashed #ccc;
  margin-bottom: 40px;
  border-radius: 2px;
  line-height: 1.4;
  font-weight: 300;
`

const NotFoundPage = () => {
  const page = useCurrentPage()
  const { uid, lang } = page
  return (
    <App>
      <Container>
        <Title>&raquo;&nbsp;&nbsp;{page.data.title.text}</Title>
        <Body>{JSON.stringify({ uid, lang }, null, 2)}</Body>
      </Container>
    </App>
  )
}
export default NotFoundPage
