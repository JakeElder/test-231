import React from 'react'
import axios from 'axios'
import { navigate } from 'gatsby'

import useToken from './src/hooks/use-token'

axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.validateStatus = () => true

const Wrapper = ({ props, children }) => {
  const { token } = useToken()

  const preCommencementUris = ['/', '/test-unavailable', '/introduction']

  if (token === null && !preCommencementUris.includes(props.uri)) {
    navigate('/')
    return null
  }

  return children
}

export function wrapPageElement({ element, props }) {
  return <Wrapper props={props} children={element} />
}
