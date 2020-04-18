import React from 'react'

export function splitMarkPattern(input, pattern) {
  let match
  const output = []
  while ((match = input.match(pattern))) {
    if (match.index > 0) {
      output.push([input.substr(0, match.index), false])
    }
    output.push([match[0].slice(1, -1), true])
    input = input.substr(match.index + match[0].length)
  }
  if (input.length) {
    output.push([input, false])
  }
  return output
}

export function splitMarkParens(input) {
  return splitMarkPattern(input, /{.+?}/)
}

export function wrapMarked(input, Wrapper) {
  return input.map(([substring, isMarked]) => {
    if (isMarked) {
      return <Wrapper key={substring}>{substring}</Wrapper>
    }
    return substring
  })
}

export function wrapMatches(input, pattern, Wrapper) {
  const marked = splitMarkPattern(input, pattern)
  return wrapMarked(marked, Wrapper)
}

export function wrapParenned(input, Wrapper) {
  return wrapMatches(input, /{.+?}/, Wrapper)
}
