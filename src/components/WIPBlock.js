import React from 'react'
import styled from 'styled-components'

import Container from './Container'

import useWIPBlock from '../hooks/use-wip-block'
import useLang from '../hooks/use-lang'
import useI18n from '../hooks/use-i18n'

import quoteMarksSrc from '../images/quote-marks.svg'
import instagramGradientSrc from '../images/instagram-gradient.png'
import facebookGlyphSrc from '../images/facebook-glyph-white.svg'
import instagramGlyphSrc from '../images/instagram-glyph-white.svg'
import dividerSrc from '../images/divider.svg'

const Root = styled.div`
  text-align: center;
`

const Header = styled.div`
  margin-bottom: 16px;
  padding-top: 22px;
  max-width: 650px;
  margin: auto;
  overflow: visible;
  position: relative;
  margin-bottom: 32px;
  :before {
    content: '';
    width: 35px;
    height: 34px;
    position: absolute;
    left: -2px;
    top: 0;
    background-image: url(${quoteMarksSrc});
  }
`

const Heading = styled.h3`
  position: relative;
  padding-top: 22px;
  padding-bottom: 22px;
  padding-left: 34px;
  padding-right: 34px;
  font-size: 34px;
  font-weight: 300;
  font-style: italic;
  color: #6a6a6a;
  line-height: 1.3;
  margin-bottom: 10px;
  :before {
    content: '';
    border: 1px solid #d8d8d8;
    position: absolute;
    left: 0;
    top: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    border-radius: 2px;
    clip-path: polygon(48px 1px, 48px 0, 100% 0, 100% 100%, 0 100%, 0 22px);
  }
`

const Attribution = styled.span`
  color: #aaa;
  font-size: 14px;
  font-weight: 300;
  font-style: italic;
  letter-spacing: 0.3px;
  display: block;
  text-align: right;
`

const Copy = styled(Container)`
  text-align: center;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 400;
  color: #777;
  max-width: 570px;
`

const PrimaryCopy = styled(Copy)`
  margin-bottom: 22px;
`

const Divider = styled.img.attrs({
  src: dividerSrc
})`
  margin-bottom: 22px;
`

const SecondaryCopy = styled(Copy)`
  margin-bottom: 50px;
`

const Socials = styled.div`
  margin-bottom: 70px;
  display: flex;
  justify-content: center;
`

const Social = styled.a.attrs({ target: '_blank' })`
  width: 50px;
  height: 50px;
  border-radius: 2px;
`

const Facebook = styled(Social)`
  margin-right: 8px;
  background-color: #3b5998;
  background-image: url(${facebookGlyphSrc});
  background-repeat: no-repeat;
  background-position: 50% 50%;
`
const Instagram = styled(Social)`
  background-image: url(${instagramGlyphSrc}), url(${instagramGradientSrc});
  background-repeat: no-repeat, no-repeat;
  background-size: auto auto, 100% 100%;
  background-position: center, center;
`

const WIPBlock = ({ className }) => {
  const lang = useLang()
  const { quote, author, primaryCopy, secondaryCopy } = useWIPBlock(lang)
  const i18n = useI18n(lang)

  return (
    <Root className={className}>
      <Container>
        <Header>
          <Heading>{quote}</Heading>
          <Attribution>-&nbsp;{author}</Attribution>
        </Header>
      </Container>
      <PrimaryCopy dangerouslySetInnerHTML={{ __html: primaryCopy.html }} />
      <Divider />
      <SecondaryCopy dangerouslySetInnerHTML={{ __html: secondaryCopy.html }} />
      <Socials>
        <Facebook href={i18n.links.facebook.url} />
        <Instagram href={i18n.links.instagram.url} />
      </Socials>
    </Root>
  )
}

export default WIPBlock
