import React from 'react'
import 'reset-css'
import { Helmet } from 'react-helmet'

import GlobalStyles from '../GlobalStyles'

import useTitle from '../../hooks/use-title'

import './App.css'

const App = ({ children }) => {
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
