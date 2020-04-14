import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import useScrollToElement from '../hooks/use-scroll-to'

function getColor({ styleType, theme }) {
  if (styleType === 'light') {
    return '#fff'
  }
  if (styleType === 'dark') {
    return '#000'
  }
  return theme.lines.grey[6]
}

function getBorderColor({ styleType, secondary, theme }) {
  if (secondary) {
    return 'transparent'
  }
  if (styleType === 'light') {
    return '#fff'
  }
  if (styleType === 'dark') {
    return '#000'
  }
  return theme.lines.grey[7]
}

const Root = styled.span`
  color: ${getColor};
  padding: 0px 16px;
  border: 2px solid transparent;
  border-color: ${getBorderColor};
  height: 34px;
  line-height: 34px;
  border-radius: 20px;
  display: inline-block;
  cursor: pointer;
  font-weight: 600;
  text-decoration: none;
  white-space: nowrap;
`

const Button = ({
  secondary = false,
  light = false,
  styleType = 'default',
  children,
  to,
  href
}) => {
  const shouldTransition = typeof href === 'object' && 'current' in href
  const isInternal = href && typeof href === 'string' && href[0] === '/'

  if (isInternal) {
    to = href
  }

  const { scrollTo } = useScrollToElement()

  const linkProps =
    href && !isInternal
      ? {
          href: (() => {
            if (!shouldTransition) {
              return href
            }
            return href.current ? `#${href.current.getAttribute('id')}` : '#'
          })(),
          as: 'a'
        }
      : {}

  const onClick = (() => {
    if (!shouldTransition) {
      return
    }
    return e => {
      e.preventDefault()
      scrollTo(href.current)
    }
  })()

  const styled = (
    <Root
      onClick={onClick}
      {...linkProps}
      secondary={secondary}
      styleType={styleType}
    >
      {children}
    </Root>
  )

  if (!to) {
    return styled
  }

  return <Link to={to}>{styled}</Link>
}

export default Button
