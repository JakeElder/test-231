import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import Img from 'gatsby-image'
import { withSize } from 'react-sizeme'

import useLang from '../hooks/use-lang'
import usePage from '../hooks/use-page'
import useI18n from '../hooks/use-i18n'

const RowRoot = styled.div`
  > *:not(:last-child) {
    margin-bottom: 30px;
  }
`

const ColumnRoot = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  display: flex;
  > *:nth-child(2) {
    margin-left: 40px;
    margin-right: 40px;
  }
`

const CardRoot = styled(Link).attrs(({ link }) => ({ to: link }))`
  flex: 1;
  border-radius: 2px;
  margin: auto;
  max-width: 290px;
  text-decoration: none;
  border: 1px solid;
  border-color: ${props => props.theme.lines.grey[2]};
  padding: 4px 4px 22px 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CardImg = styled(Img)`
  align-self: stretch;
  height: 160px;
  margin-bottom: 24px;
  border-radius: 1px;
`

const Heading = styled.h2`
  font-size: 18px;
  color: #555;
  margin-bottom: 14px;
`

const Copy = styled.div`
  min-height: 50px;
  max-width: 230px;
  color: ${props => props.theme.lines.grey[5]};
  font-size: 16px;
  line-height: 1.45;
  margin-bottom: 26px;
  em {
    font-style: italic;
  }
`

const Score = styled.div`
  align-self: stretch;
  height: 1px;
  background-color: ${props => props.theme.lines.grey[1]};
  margin: 0 22px 22px 22px;
`

const CardLink = styled.span`
  align-self: flex-end;
  margin-right: 32px;
  height: 36px;
  line-height: 36px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: ${props => props.theme.fills.grey[1]};
  color: ${props => props.theme.lines.grey[0]};
  border-radius: 18px;
  text-decoration: none;
`

const Card = ({ image, heading, copy, link, anchorX }) => {
  const lang = useLang()
  const i18n = useI18n(lang)
  return (
    <CardRoot link={link}>
      <CardImg
        fluid={image.fluid}
        imgStyle={{ objectPosition: `${anchorX} center` }}
      />
      <Heading>{heading}</Heading>
      <Copy dangerouslySetInnerHTML={{ __html: copy }} />
      <Score />
      <CardLink to={link}>{i18n.findOutMore}</CardLink>
    </CardRoot>
  )
}

function transformPageToCard(page) {
  return {
    image: page.cardHero.data.image.localFile.childImageSharp,
    anchorX: page.cardHero.data.anchorX,
    heading: page.data.title.text,
    copy: page.data.microDescription.html,
    link: page.data.i18nPath
  }
}

const AboutPiyapodokCards = ({ size }) => {
  const lang = useLang()

  const cards = {
    howToGetInvolved: transformPageToCard(usePage('how-to-get-involved', lang)),
    ourCommunity: transformPageToCard(usePage('our-community', lang)),
    ourProjects: transformPageToCard(usePage('our-projects', lang))
  }

  const Root = size.width >= 860 ? ColumnRoot : RowRoot

  return (
    <Root>
      <Card {...cards.ourCommunity} />
      <Card {...cards.ourProjects} />
      <Card {...cards.howToGetInvolved} />
    </Root>
  )
}

export default AboutPiyapodokCards |> withSize({ noPlaceholder: true })
