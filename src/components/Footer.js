import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Container from './Container'
import SocialIcons from './SocialIcons'

import useI18n from '../hooks/use-i18n'
import useLang from '../hooks/use-lang'
import useFooterLink from '../hooks/use-footer-link'
import usePageHref from '../hooks/use-page-href'

import smallArrowIconSrc from '../images/small-arrow-icon.svg'
import plantImageSrc from '../images/plant.svg'

const LogoAndSocialsBar = styled.div`
  background-color: ${props => props.theme.fills.grey[2]};
`

const LogoAndSocialsBarContainer = styled(Container)`
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.img``

const RepeaterNavAndSmallPrint = styled.div`
  background-color: ${props => props.theme.fills.grey[1]};
`

const RepeaterNavAndSmallPrintContainer = styled(Container)``

const RepeaterNav = styled.div`
  padding-top: 34px;
  padding-bottom: 40px;
  background-image: url(${plantImageSrc});
  background-position: right 32px bottom;
  background-repeat: no-repeat;
`

const SmallPrint = styled.div`
  font-size: 12px;
  color: #d2d2d2;
  border-top: 1px solid #616161;
  padding-top: 28px;
  padding-bottom: 28px;
`

const RepeaterNavList = (() => {
  const Root = styled.div`
    margin-bottom: ${props => (props.last ? '' : '30px')};
  `

  const Heading = styled.h4`
    font-size: 15px;
    text-transform: uppercase;
    color: ${props => props.theme.lines.grey[3]};
    margin-bottom: 14px;
  `

  const ListItem = styled.li`
    font-size: 16px;

    a {
      color: #e2e2e2;
      text-decoration: none;
      margin-left: 16px;
      padding-left: 14px;
      background: url(${smallArrowIconSrc}) no-repeat left center;
    }

    :not(:last-child) {
      margin-bottom: 14px;
    }
  `

  const L = ({ href, target, children }) => {
    if (href[0] === '/') {
      return <Link to={href}>{children}</Link>
    }
    return (
      <a href={href} target={target}>
        {children}
      </a>
    )
  }

  return ({ className, heading, links, last, target = '_self' }) => {
    return (
      <Root last={last} className={className}>
        <Heading>{heading[0]}</Heading>
        <ul>
          {links.map(([text, href, target = '_self']) => (
            <ListItem key={href}>
              <L href={href} target={target}>
                {text}
              </L>
            </ListItem>
          ))}
        </ul>
      </Root>
    )
  }
})()

const Footer = () => {
  const lang = useLang()
  const i18n = useI18n(lang)

  const socialLinks = {
    facebook: [i18n.facebook, i18n.links.facebook.url, '_blank'],
    instagram: [i18n.instagram, i18n.links.instagram.url, '_blank'],
    google: [i18n.google, i18n.links.google.url, '_blank']
  }

  return (
    <footer>
      <LogoAndSocialsBar>
        <LogoAndSocialsBarContainer>
          <Link to={usePageHref('home-page', lang)}>
            <Logo src={i18n.images.logoLight} alt={i18n.piyapodokDhammastan} />
          </Link>
          <SocialIcons />
        </LogoAndSocialsBarContainer>
      </LogoAndSocialsBar>
      <RepeaterNavAndSmallPrint>
        <RepeaterNavAndSmallPrintContainer>
          <RepeaterNav>
            <RepeaterNavList
              heading={useFooterLink('about-piyapodok', lang)}
              links={[
                [i18n.ourLocation, i18n.links.google.url, '_blank'],
                useFooterLink('our-community', lang),
                useFooterLink('our-projects', lang),
                useFooterLink('how-to-get-involved', lang)
              ]}
            />
            <RepeaterNavList
              heading={useFooterLink('practice-with-us', lang)}
              links={[
                useFooterLink('mindfulness-retreats', lang),
                useFooterLink('meet-master-thanadith', lang)
              ]}
            />
            <RepeaterNavList
              last
              heading={useFooterLink('connect-with-us', lang)}
              links={[
                socialLinks.facebook,
                socialLinks.instagram,
                socialLinks.google
              ]}
            />
          </RepeaterNav>
          <SmallPrint>{i18n.copyright}</SmallPrint>
        </RepeaterNavAndSmallPrintContainer>
      </RepeaterNavAndSmallPrint>
    </footer>
  )
}

export default Footer
