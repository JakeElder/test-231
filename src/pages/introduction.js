import React from 'react'

import useCurrentUser from '../hooks/use-current-user'

function IntroductionPage() {
  const { user } = useCurrentUser()

  if (user === null) {
    return <div data-page="introduction">introduction</div>
  }

  return (
    <div data-page="introduction">
      <div data-component="ident">{user.name}</div>
      <div>
        introduction
      </div>
    </div>
  )
}

export default IntroductionPage
