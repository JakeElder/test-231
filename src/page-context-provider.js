import React from 'react'

const PageContext = React.createContext()

const PageContextProvider = ({ uid, children }) => {
  const { uid = '404' } = pageContext
  return (
    <PageContext.Provider value={{ uid }}>
      {children}
    </PageContext.Provider>
  )
}

export { PageContext }
export default PageContextProvider
