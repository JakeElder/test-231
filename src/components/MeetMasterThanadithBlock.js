import React from 'react'
import styled from 'styled-components'

import Container from './Container'
import Button from './Button'
import FramedImage from './FramedImage'

import useBlock from '../hooks/use-block'
import useLang from '../hooks/use-lang'
import useI18n from '../hooks/use-i18n'

const Root = styled(Container)`
  text-align: center;
  padding-top: 50px;
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
  padding-left: 16px;
  padding-right: 16px;
  margin-bottom: 30px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  color: #777;
`

const Mosaic = (() => {
  const Root = styled.div`
    position: relative;
    margin-bottom: 30px;
    max-width: 440px;
    margin-left: auto;
    margin-right: auto;
  `

  const BgImage = styled.div`
    margin-right: 25%;
  `
  const FgImage = styled.div`
    position: absolute;
    width: 50%;
    left: 50%;
    top: 21%;
  `

  return ({ children }) => {
    const [bgImage, fgImage] = React.Children.toArray(children)
    return (
      <Root>
        <BgImage>{bgImage}</BgImage>
        <FgImage>{fgImage}</FgImage>
      </Root>
    )
  }
})()

const MeetMasterThanadithBlock = ({ className }) => {
  const lang = useLang()
  const data = useBlock('meet-master-thanadith', lang)
  const i18n = useI18n(lang)

  const heading = data.heading.text
  const primaryCopy = data.primaryCopy.html
  const bgImage = data.images[0].image.localFile.childImageSharp
  const fgImage = data.images[1].image.localFile.childImageSharp
  const secondaryCopy = data.secondaryCopy.html

  const ctaCopy = data.ctaCopy
  const ctaLink = i18n.links.contactUs.url

  return (
    <Root className={className}>
      <Heading>{heading}</Heading>
      <Copy dangerouslySetInnerHTML={{ __html: primaryCopy }} />
      <Mosaic>
        <FramedImage image={bgImage} />
        <FramedImage image={fgImage} />
      </Mosaic>
      <Copy dangerouslySetInnerHTML={{ __html: secondaryCopy }} />
      <Button href={ctaLink}>{ctaCopy}</Button>
    </Root>
  )
}

export default MeetMasterThanadithBlock
