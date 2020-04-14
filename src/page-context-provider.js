import React from 'react'
import { ThemeProvider } from 'styled-components'

import theme from './theme'

const PageContext = React.createContext()

const PageContextProvider = ({ pageContext, children }) => {
  const { lang = 'en', uid = '404' } = pageContext
  return (
    <PageContext.Provider value={{ lang, uid }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </PageContext.Provider>
  )
}

export { PageContext }
export default PageContextProvider
