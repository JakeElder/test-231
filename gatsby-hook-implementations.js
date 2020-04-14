import React from 'react'
import SEO from './src/components/SEO/SEO'

import PageContextProvider from './src/page-context-provider'

const wrapPageElement = ({ element, props }) => {
  return (
    <PageContextProvider pageContext={props.pageContext}>
      <SEO />
      {element}
    </PageContextProvider>
  )
}

export { wrapPageElement }
