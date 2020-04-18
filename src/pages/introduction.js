import React from 'react'
import { Link } from 'gatsby'

import Ident from '../components/Ident'

function IntroductionPage() {
  return (
    <div data-page="introduction">
      <Ident />
      <div>
        introduction
        <Link data-component="button" to="/section-1/part-1">
          Continue
        </Link>
      </div>
    </div>
  )
}

export default IntroductionPage
