import React, { useRef } from 'react'
import styled from 'styled-components'
import { withSize } from 'react-sizeme'

import App from '../components/App/App'
import Hero from '../components/Hero'
import AboutPiyapodokBlock from '../components/AboutPiyapodokBlock'
import PracticeWithUsBlock from '../components/PracticeWithUsBlock'
import MeetMasterThanadithBlock from '../components/MeetMasterThanadithBlock'

import useI18n from '../hooks/use-i18n'
import usePage from '../hooks/use-page'
import useResponsiveHero from '../hooks/use-responsive-hero'

const HomeAboutPiyapodokBlock = styled(AboutPiyapodokBlock)`
  margin-bottom: 50px;
`

const HomeMeetMasterThanadithBlock = styled(MeetMasterThanadithBlock)`
  margin-bottom: 40px;
`

function HomePage({ pageContext, data, size }) {
  const { lang } = pageContext
  const i18n = useI18n(lang)
  const homePage = usePage('home-page', lang)

  const hero = useResponsiveHero(840, size.width, [
    homePage.narrowHero,
    homePage.wideHero
  ])

  const practiceWithUsRef = useRef()
  const aboutPiyapodokRef = useRef()

  const homeHero = {
    image: hero.data.image.localFile.childImageSharp,
    title: homePage.data.title.text,
    body: homePage.data.segue.html,
    primaryCTA: [i18n.practiceWithUs, practiceWithUsRef],
    secondaryCTA: [i18n.learnMore, aboutPiyapodokRef],
    useDarkCTAs: hero.data.useDarkCTAs,
    showContrastGradient: hero.data.showCTAContrastGradient,
    anchorX: hero.data.anchorX
  }

  return (
    <App>
      <Hero {...homeHero} />
      <section ref={aboutPiyapodokRef} id={i18n.aboutPiyapodokFragment}>
        <HomeAboutPiyapodokBlock />
      </section>
      <section ref={practiceWithUsRef} id={i18n.practiceWithUsFragment}>
        <PracticeWithUsBlock />
      </section>
      <HomeMeetMasterThanadithBlock />
    </App>
  )
}

export default HomePage |> withSize({ noPlaceholder: true })
