import React from 'react'
import styled from 'styled-components'
import { withSize } from 'react-sizeme'
import striptags from 'striptags'

import Container from './Container'
import Button from './Button'
import FramedImage from './FramedImage'

import useBlock from '../hooks/use-block'
import useLang from '../hooks/use-lang'
import usePageHref from '../hooks/use-page-href'

const Root = styled.div`
  background-color: ${props => props.theme.fills.grey[0]};
  padding-top: 40px;
  padding-bottom: 40px;
  color: #333;
`

const Heading = styled.h1`
  font-size: 34px;
  font-weight: 300;
  line-height: 1.2;
  margin-bottom: 18px;
`

const Copy = styled.div`
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 30px;
  color: #777;
`

const NarrowContent = (() => {
  const Root = styled.div`
    text-align: center;
  `

  const Image = styled(FramedImage)`
    margin-bottom: 30px;
    max-width: 450px;
    margin-left: auto;
    margin-right: auto;
  `

  const NarrowCopy = styled(Copy)`
    max-width: 380px;
    margin-left: auto;
    margin-right: auto;
  `

  return ({ heading, primaryCopy, image, secondaryCopy, ctaLink, ctaCopy }) => (
    <Root>
      <Heading>{heading}</Heading>
      <NarrowCopy dangerouslySetInnerHTML={{ __html: primaryCopy }} />
      <Image image={image} />
      <NarrowCopy dangerouslySetInnerHTML={{ __html: secondaryCopy }} />
      <Button to={ctaLink}>{ctaCopy}</Button>
    </Root>
  )
})()

const WideContent = (() => {
  const Root = styled.div`
    display: flex;
    align-items: center;
  `

  const CopyAndCTA = styled.div`
    flex: 1;
  `

  const CopyAndCTAContainer = styled.div`
    padding-right: 40px;
  `

  const ImageContainer = styled.div`
    flex: 1;
  `

  const Image = styled(FramedImage)``

  return ({ heading, primaryCopy, image, secondaryCopy, ctaLink, ctaCopy }) => (
    <Root>
      <CopyAndCTA>
        <CopyAndCTAContainer>
          <Heading>{heading}</Heading>
          <Copy>
            <p>
              {striptags(primaryCopy)}&nbsp;
              {striptags(secondaryCopy)}
            </p>
          </Copy>
          <Button to={ctaLink}>{ctaCopy}</Button>
        </CopyAndCTAContainer>
      </CopyAndCTA>
      <ImageContainer>
        <Image image={image} />
      </ImageContainer>
    </Root>
  )
})()

const PracticeWithUsBlock = ({ size }) => {
  const lang = useLang()
  const data = useBlock('practice-with-us', lang)

  const contentProps = {
    heading: data.heading.text,
    primaryCopy: data.primaryCopy.html,
    image: data.images[0].image.localFile.childImageSharp,
    secondaryCopy: data.secondaryCopy.html,
    ctaCopy: data.ctaCopy,
    ctaLink: usePageHref('mindfulness-retreats', lang)
  }

  const Content = size.width >= 900 ? WideContent : NarrowContent

  return (
    <Root>
      <Container>
        <Content {...contentProps} />
      </Container>
    </Root>
  )
}

export default PracticeWithUsBlock |> withSize({ noPlacerholder: true })
