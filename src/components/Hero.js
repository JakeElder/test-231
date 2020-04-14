import React from 'react'
import Img from 'gatsby-image'
import styled from 'styled-components'
import hexToRgba from 'hex-to-rgba'
import { SizeMe } from 'react-sizeme'

import Container from './Container'
import Button from './Button'

const Root = styled.div`
  height: 340px;
  position: relative;
`

const ImgContainer = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
`

const HeroImg = styled(Img)`
  height: 100%;
`

const NarrowContentContainer = styled(ImgContainer)`
  box-sizing: border-box;
  padding-top: 22px;
`

const WideContentContainer = styled(Container)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`

const TextBlocks = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const TextBlock = styled.div`
  background-color: ${props => hexToRgba(props.theme.fills.grey[4], 0.8)};
  color: ${props => props.theme.lines.grey[0]};
  padding: 12px;
`

const Title = styled(TextBlock)`
  margin-bottom: 14px;
  font-weight: 300;
  font-size: 28px;
  padding-right: 18px;
`

const Body = styled(TextBlock)`
  font-weight: 300;
  line-height: 1.45;
  font-size: 18px;
  max-width: 460px;
  p:first-child {
    margin-bottom: 14px;
  }
`

const CTAs = styled.div`
  padding-top: 20px;
`
function getCTAContainerBackgroundImage({ showContrastGradient }) {
  if (!showContrastGradient) {
    return 'none'
  }
  return `
    linear-gradient(
      180deg,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 100%
    );
  `
}

const PositionedCTAContainer = styled.div`
  box-sizing: border-box;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100px;
  padding-top: 40px;
  background-image: ${getCTAContainerBackgroundImage};
`

const NarrowContent = ({
  title,
  body,
  secondaryCTA,
  primaryCTA,
  showContrastGradient
}) => (
  <NarrowContentContainer>
    <Container>
      <TextBlocks>
        <Title>{title}</Title>
        <Body dangerouslySetInnerHTML={{ __html: body }} />
      </TextBlocks>
    </Container>
    <PositionedCTAContainer showContrastGradient={showContrastGradient}>
      <Container>
        <Button href={secondaryCTA[1]} styleType="light" secondary>
          {secondaryCTA[0]}
        </Button>
        {primaryCTA && (
          <Button href={primaryCTA[1]} styleType="light">
            {primaryCTA[0]}
          </Button>
        )}
      </Container>
    </PositionedCTAContainer>
  </NarrowContentContainer>
)

const WideContent = ({
  title,
  body,
  secondaryCTA,
  primaryCTA,
  useDarkCTAs
}) => (
  <WideContentContainer>
    <Title>{title}</Title>
    <Body dangerouslySetInnerHTML={{ __html: body }} />
    <CTAs>
      <Button
        href={secondaryCTA[1]}
        styleType={useDarkCTAs ? 'dark' : 'light'}
        secondary
      >
        {secondaryCTA[0]}
      </Button>
      {primaryCTA && (
        <Button href={primaryCTA[1]} styleType={useDarkCTAs ? 'dark' : 'light'}>
          {primaryCTA[0]}
        </Button>
      )}
    </CTAs>
  </WideContentContainer>
)

const Hero = ({
  className,
  image,
  title,
  body,
  primaryCTA,
  secondaryCTA,
  showContrastGradient,
  useDarkCTAs,
  anchorX
}) => {
  const contentProps = {
    title,
    body,
    primaryCTA,
    secondaryCTA,
    useDarkCTAs,
    showContrastGradient
  }

  return (
    <Root className={className}>
      <ImgContainer>
        <HeroImg
          fluid={image.fluid}
          imgStyle={{ objectPosition: `${anchorX} center` }}
        />
      </ImgContainer>
      <SizeMe>
        {({ size }) => {
          const ToRender = size.width >= 800 ? WideContent : NarrowContent
          return <ToRender {...contentProps} />
        }}
      </SizeMe>
    </Root>
  )
}

export default Hero
