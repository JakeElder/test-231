import React from 'react'
import 'reset-css'
import { Router } from '@reach/router'
import { Link } from 'gatsby'
import styled from 'styled-components'

import GlobalStyles from '../GlobalStyles'
import Route from '../Route'
import IndexPage from '../IndexPage'
// import TestUnavailablePage from '../../client-pages/test-unavailable'
// import IntroductionPage from '../../client-pages/introduction'
// import Section1Part1Page from '../../client-pages/section-1-part-1'

// import useTitle from '../../hooks/use-title'
import useAdminReset from '../../hooks/use-admin-reset'

import './App.css'

const App = () => {
  // const title = useTitle()
  useAdminReset()

  return (
    <GlobalStyles>
      <Router basepath="/">
        <Route path="/" component={IndexPage} />
        <Route path="/test-unavailable" />
        <Route path="/introduction" requireAuth />
        <Route path="/section-1/part-1" requireAuth requireCommencement />
        <Route path="/section-1/part-2" requireAuth requireCommencement />
        <Route path="/section-2" requireAuth requireCommencement />
        <Route path="/section-3" requireAuth requireCommencement />
        <Route path="/section-4" requireAuth requireCommencement />
        <Route path="/summary" requireAuth requireCommencement />
      </Router>
    </GlobalStyles>
  )
}

export default App
