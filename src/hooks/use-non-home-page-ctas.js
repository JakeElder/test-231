import usePageHref from './use-page-href'
import useI18n from '../hooks/use-i18n'
import useCurrentPage from '../hooks/use-current-page'

function useNonHomePageCTAs(ourPlanRef) {
  const page = useCurrentPage()
  const i18n = useI18n(page.lang)

  const secondaryCTA = [i18n.learnMore, ourPlanRef]

  const mindfulnessRetreatsHref = usePageHref('mindfulness-retreats', page.lang)

  if (page.uid === 'mindfulness-retreats') {
    return { secondaryCTA }
  }

  return {
    primaryCTA: [i18n.practiceWithUs, mindfulnessRetreatsHref],
    secondaryCTA
  }
}

export default useNonHomePageCTAs
