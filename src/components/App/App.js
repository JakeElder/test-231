import React from 'react'
import 'reset-css'
import styled from 'styled-components'
import { useHotkeys } from 'react-hotkeys-hook'
import axios from 'axios'

import Header from '../Header'
import Footer from '../Footer'
import Page from '../Page'
import GlobalStyles from '../GlobalStyles'

import useCurrentPage from '../../hooks/use-current-page'

import './App.css'

const App = ({ children }) => {
  useHotkeys('shift+r', async () => {
    if (
      process.env.NODE_ENV === 'development' &&
      process.env.ENABLE_GATSBY_REFRESH_ENDPOINT
    ) {
      await axios.post('/__refresh')
      console.log('[PRISMIC] refreshing')
    }
  })
  const { lang, data: currentPageData } = useCurrentPage()
  return (
    <GlobalStyles>
      <Page>
        <Header breadcrumb={currentPageData.breadcrumbText} />
        {children}
        <Footer />
      </Page>
    </GlobalStyles>
  )
}

export default App
