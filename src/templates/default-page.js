import React, { useRef } from 'react'
import styled from 'styled-components'
import { withSize } from 'react-sizeme'

import App from '../components/App/App'
import Hero from '../components/Hero'
import WIPBlock from '../components/WIPBlock'

import useCurrentPage from '../hooks/use-current-page'
import useResponsiveHero from '../hooks/use-responsive-hero'
import useNonHomePageCTAs from '../hooks/use-non-home-page-ctas'
import useI18n from '../hooks/use-i18n'

const OurPlan = styled.section`
  padding-top: 30px;
`

function DefaultPage({ pageContext, data, size }) {
  const page = useCurrentPage()
  const i18n = useI18n(page.lang)

  const hero = useResponsiveHero(800, size.width, [
    page.narrowHero,
    page.wideHero
  ])

  const ourPlanRef = useRef()
  const CTAs = useNonHomePageCTAs(ourPlanRef)

  return (
    <App>
      <Hero
        image={hero.data.image.localFile.childImageSharp}
        title={page.data.title.text}
        body={page.data.segue.html}
        anchorX={hero.data.anchorX}
        useDarkCTAs={hero.data.useDarkCTAs}
        showContrastGradient={hero.data.showCTAContrastGradient}
        {...CTAs}
      />
      <OurPlan ref={ourPlanRef} id={i18n.ourPlanFragment}>
        <WIPBlock />
      </OurPlan>
    </App>
  )
}

export default DefaultPage |> withSize({ noPlaceholder: true })
