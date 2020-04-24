import React from 'react'
import 'reset-css'
import { Helmet } from 'react-helmet'
import { useHotkeys } from 'react-hotkeys-hook'
import axios from 'axios'

import GlobalStyles from '../GlobalStyles'

import useTitle from '../../hooks/use-title'

import './App.css'

const App = ({ children }) => {
  useHotkeys('shift+r', async () => {
    if (
      process.env.NODE_ENV === 'development') {
      console.log('[ADMIN] resetting')
      await axios.post('/api/admin/reset')
      console.log('[ADMIN] reset')
    }
  })
  const title = useTitle()
  return (
    <GlobalStyles>
      <Helmet>
        <meta name="robots" content="noindex" />
        <title>{title}</title>
      </Helmet>
      {children}
    </GlobalStyles>
  )
}

export default App
