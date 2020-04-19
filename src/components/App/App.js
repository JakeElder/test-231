import React from 'react'
import 'reset-css'

import GlobalStyles from '../GlobalStyles'

import './App.css'

const App = ({ children }) => {
  return <GlobalStyles>{children}</GlobalStyles>
}

export default App
