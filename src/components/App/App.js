import React from 'react'
import 'reset-css'
import { Router } from '@reach/router'
import { Helmet } from 'react-helmet'

import GlobalStyles from '../GlobalStyles'
import Route from '../Route'
import IndexPage from '../IndexPage'
import TestUnavailablePage from '../../client-pages/test-unavailable'
import IntroductionPage from '../../client-pages/introduction'
import Section1Part1Page from '../../client-pages/section-1-part-1'
import Section1Part2Page from '../../client-pages/section-1-part-2'
import Section2Page from '../../client-pages/section-2'
import Section3Page from '../../client-pages/section-3'
import Section4Page from '../../client-pages/section-4'
import SummaryPage from '../../client-pages/summary'

import useTitle from '../../hooks/use-title'
import useAdminReset from '../../hooks/use-admin-reset'

import './App.css'

const App = () => {
  const title = useTitle()
  useAdminReset()

  return (
    <GlobalStyles>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{title}</title>
      </Helmet>
      <Router basepath="/">
        <Route path="/" component={IndexPage} />
        <Route
          path="/test-unavailable"
          component={TestUnavailablePage}
          checkAuth
        />
        <Route path="/introduction" requireAuth component={IntroductionPage} />
        <Route
          path="/section-1/part-1"
          requireAuth
          requireCommencement
          component={Section1Part1Page}
        />
        <Route
          path="/section-1/part-2"
          requireAuth
          requireCommencement
          component={Section1Part2Page}
        />
        <Route
          path="/section-2"
          requireAuth
          requireCommencement
          component={Section2Page}
        />
        <Route
          path="/section-3"
          requireAuth
          requireCommencement
          component={Section3Page}
        />
        <Route
          path="/section-4"
          requireAuth
          requireCommencement
          component={Section4Page}
        />
        <Route
          path="/summary"
          requireAuth
          requireCommencement
          component={SummaryPage}
        />
      </Router>
    </GlobalStyles>
  )
}

export default App
