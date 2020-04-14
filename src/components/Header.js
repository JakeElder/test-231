import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Container from './Container'
import useI18n from '../hooks/use-i18n'
import useLang from '../hooks/use-lang'
import usePageHref from '../hooks/use-page-href'
import useCurrentPage from '../hooks/use-current-page'

import messageIconSrc from '../images/message-icon.svg'
import pinIconSrc from '../images/pin-icon.svg'
import backArrowIconSrc from '../images/back-arrow-icon.svg'

const BreadcrumbAndLanguageBar = styled.div`
  height: 54px;
  background-color: ${props => props.theme.fills.grey[2]};
  color: ${props => props.theme.lines.grey[0]};
  display: flex;
  align-items: center;
`

const HeaderContainer = styled(Container)`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const BackLink = (() => {
  const Root = styled(Link)`
    width: 22px;
    height: 22px;
    background-image: url(${backArrowIconSrc});
    background-repeat: no-repeat;
    background-position: center center;
    margin-right: 10px;
  `

  return ({ display }) => {
    if (!display) {
      return null
    }
    return <Root to={usePageHref('home-page', useLang())} />
  }
})()

const Breadcrumb = styled.div``

const LanguageSelector = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

const Language = styled(Link)`
  height: 32px;
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.selected ? props.theme.fills.grey[3] : ''};
  border-radius: 2px;
  padding-left: 8px;
  padding-right: 8px;
  text-decoration: none;
  color: inherit;
  &:visited {
    color: inherit;
  }
`

const LogoAndEssentialLinksBar = styled.div`
  height: 88px;
  display: flex;
`

const Logo = styled.img``

const EssentialLinks = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`

const EssentialLink = styled.a`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-size: 13px;
  font-weight: 400;
  text-transform: lowercase;
  color: ${props => props.theme.lines.grey[7]};
  text-decoration: none;
`

const ContactUsLink = styled(EssentialLink)`
  margin-right: 18px;
`

const EssentialLinkIcon = styled.img.attrs({ alt: '' })`
  margin-bottom: 7px;
`

const ContactUsLinkIcon = styled(EssentialLinkIcon).attrs({
  src: messageIconSrc,
  width: 21,
  height: 19
})``
const FindUsLinkIcon = styled(EssentialLinkIcon).attrs({
  src: pinIconSrc,
  width: 14,
  height: 19
})``

const Header = ({ breadcrumb }) => {
  const currentPage = useCurrentPage()
  const lang = useLang()

  const enHref = usePageHref(currentPage.uid, 'en')
  const thHref = usePageHref(currentPage.uid, 'th')

  const i18n = useI18n(lang)

  return (
    <header>
      <BreadcrumbAndLanguageBar>
        <HeaderContainer>
          <BackLink display={currentPage.uid !== 'home-page'} />
          <Breadcrumb>{breadcrumb}</Breadcrumb>
          <LanguageSelector>
            <Language selected={lang === 'th'} to={thHref}>
              {i18n.thaiLocale}
            </Language>
            <Language selected={lang === 'en'} to={enHref}>
              {i18n.englishLocale}
            </Language>
          </LanguageSelector>
        </HeaderContainer>
      </BreadcrumbAndLanguageBar>
      <LogoAndEssentialLinksBar>
        <HeaderContainer>
          <Link to={usePageHref('home-page', lang)}>
            <Logo alt={i18n.piyapodokDhammastan} src={i18n.images.logo} />
          </Link>
          <EssentialLinks>
            <ContactUsLink href={i18n.links.contactUs.url} target="_blank">
              <ContactUsLinkIcon />
              {i18n.contactUs}
            </ContactUsLink>
            <EssentialLink href={i18n.links.google.url} target="_blank">
              <FindUsLinkIcon />
              {i18n.findUs}
            </EssentialLink>
          </EssentialLinks>
        </HeaderContainer>
      </LogoAndEssentialLinksBar>
    </header>
  )
}

export default Header
