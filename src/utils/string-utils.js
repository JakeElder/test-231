import React from 'react'

function splitMarkParens(input) {
  let match
  const output = []
  while (match = input.match(/{.+?}/)) {
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

function wrapMarked(input, Wrapper) {
  return input.map(([substring, isMarked]) => {
    if (isMarked) {
      return <Wrapper key={substring}>{substring}</Wrapper>
    }
    return substring
  })
}

function wrapParenned(input, Wrapper) {
  const marked = splitMarkParens(input)
  return wrapMarked(marked, Wrapper)
}

export { splitMarkParens }
export { wrapMarked }
export { wrapParenned }
