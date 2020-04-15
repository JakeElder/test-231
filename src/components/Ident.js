import React from 'react'

import useCurrentUser from '../hooks/use-current-user'

function Ident() {
  const { user } = useCurrentUser()
  const name = user === null ? '' : user.name

  return <div data-component="ident">{name}</div>
}

export default Ident
