import React, { useEffect } from 'react'
import { navigate } from 'gatsby'

import LoadingPage from '../components/LoadingPage'

import * as Session from '../services/session'

function DemoPage() {
  useEffect(() => {
    Session.create({ name: 'Demo User' }).then(({ session }) => {
      navigate(`/?token=${session.id}`)
    })
  }, [])
  return <LoadingPage />
}

export default DemoPage
