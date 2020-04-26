import React from 'react'

// import LoadingPage from './LoadingPage'

function Route({ requireAuth, requireCommencement, component, ...rest }) {
  const Component = component ? component : () => 'C'
  return <Component {...rest} />
}

export default Route
